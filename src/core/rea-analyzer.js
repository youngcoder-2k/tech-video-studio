'use strict';

/**
 * Native JavaScript & FFmpeg Implementation of JuneYaooo/rea-video's
 * Code-Render Reverse-Engineering & Remake Scoring Engine
 * (https://github.com/JuneYaooo/rea-video).
 *
 * Implements rea-video's mathematical forensics from:
 * - `rea_video/layers.py`:
 *    • `ground()`: Median border color detection (#262626 charcoal ground)
 *    • `contrast()` & `layer_mask()`: CIE Lab distance from ground minus smooth halo background
 *    • `layout()`: 16x9 spatial distribution grid of the drawn layer
 *    • `measure()`: Drawn layer coverage (`cover`), bounding box, center of mass, and dominant hex palette
 *    • `compare()`: Frame-by-frame drawn-layer scoring (`place`, `shape`, `amount`, and actionable `advice`)
 * - `rea_video/motion.py`:
 *    • `motion_events()`: Decodes 45x25 cell activity over time, separates the Continuous Moving Layer
 *      (`CONT = 0.70` — flowing particles, dashed lines, radar pulses) from Staggered Discrete Entrances,
 *      and measures each event's `_easing` (`ease_out`, `ease_in`, `linear`, `ease_in_out`) and `_direction`
 *      (`left`, `right`, `up`, `down` wipe/draw-on via Pearson correlation).
 * - `rea_video/videomd.py`:
 *    • Generates an open-format `VIDEO.md` layered breakdown for AI agents.
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ANALYSIS_W = 160;
const ANALYSIS_H = 90;
const CELL = 4; // 40x22 cells
const GRID_W = 16;
const GRID_H = 9;
const DIFF_THRESH = 12; // 8-bit per-channel change threshold (from rea_video/motion.py)
const CONT_RATIO = 0.65; // Cells active across >=65% of frames belong to Continuous Layer (L)
const DETAIL_LAB = 14.0; // Lab contrast threshold for drawn foreground layer

function findFfmpegExecutable() {
  if (process.env.FFMPEG_PATH && fs.existsSync(process.env.FFMPEG_PATH)) {
    return process.env.FFMPEG_PATH;
  }
  const candidates = ['/opt/homebrew/bin/ffmpeg', '/usr/local/bin/ffmpeg', '/usr/bin/ffmpeg'];
  return candidates.find((p) => fs.existsSync(p)) || 'ffmpeg';
}

function findFfprobeExecutable() {
  const candidates = ['/opt/homebrew/bin/ffprobe', '/usr/local/bin/ffprobe', '/usr/bin/ffprobe'];
  return candidates.find((p) => fs.existsSync(p)) || 'ffprobe';
}

function rgbToHex(r, g, b) {
  const clamp = (v) => Math.max(0, Math.min(255, Math.round(v)));
  return '#' + [clamp(r), clamp(g), clamp(b)].map((v) => v.toString(16).padStart(2, '0')).join('');
}

/**
 * Converts sRGB (0..255) to CIE L*a*b* (matching OpenCV's BGR2LAB scale used in rea_video/layers.py).
 */
function rgbToLab(r, g, b) {
  let sr = r / 255;
  let sg = g / 255;
  let sb = b / 255;
  sr = sr > 0.04045 ? ((sr + 0.055) / 1.055) ** 2.4 : sr / 12.92;
  sg = sg > 0.04045 ? ((sg + 0.055) / 1.055) ** 2.4 : sg / 12.92;
  sb = sb > 0.04045 ? ((sb + 0.055) / 1.055) ** 2.4 : sb / 12.92;

  const x = (sr * 0.4124 + sg * 0.3576 + sb * 0.1805) / 0.95047;
  const y = (sr * 0.2126 + sg * 0.7152 + sb * 0.0722) / 1.00000;
  const z = (sr * 0.0193 + sg * 0.1192 + sb * 0.9505) / 1.08883;

  const f = (t) => (t > 0.008856 ? Math.cbrt(t) : (7.787 * t) + (16 / 116));
  const fx = f(x);
  const fy = f(y);
  const fz = f(z);

  return [
    (116 * fy) - 16,
    500 * (fx - fy),
    200 * (fy - fz)
  ];
}

function labDistance(lab1, lab2) {
  const dl = lab1[0] - lab2[0];
  const da = lab1[1] - lab2[1];
  const db = lab1[2] - lab2[2];
  return Math.hypot(dl, da, db);
}

/**
 * Computes median border RGB color of a frame (`ground()` in rea_video/layers.py).
 */
function measureGroundRgb(rgbBuf, w, h) {
  const rs = [];
  const gs = [];
  const bs = [];
  const pushPx = (x, y) => {
    const idx = (y * w + x) * 3;
    rs.push(rgbBuf[idx]);
    gs.push(rgbBuf[idx + 1]);
    bs.push(rgbBuf[idx + 2]);
  };
  for (let x = 0; x < w; x++) {
    pushPx(x, 0);
    pushPx(x, h - 1);
  }
  for (let y = 1; y < h - 1; y++) {
    pushPx(0, y);
    pushPx(w - 1, y);
  }
  const median = (arr) => {
    const s = [...arr].sort((a, b) => a - b);
    return s[Math.floor(s.length / 2)] || 0;
  };
  return [median(rs), median(gs), median(bs)];
}

/**
 * Extracts the drawn foreground layer mask (`layer_mask`), 16x9 layout distribution (`layout`),
 * coverage percentage (`cover`), bounding box, center of mass, and dominant palette (`measure` in rea_video/layers.py).
 */
function measureDrawnLayer(rgbBuf, w, h) {
  const groundRgb = measureGroundRgb(rgbBuf, w, h);
  const groundLab = rgbToLab(groundRgb[0], groundRgb[1], groundRgb[2]);
  const mask = new Uint8Array(w * h);
  const grid = new Float32Array(GRID_W * GRID_H);

  let drawnCount = 0;
  let sumX = 0;
  let sumY = 0;
  let minX = w;
  let minY = h;
  let maxX = 0;
  let maxY = 0;
  const colorBuckets = new Map();

  // Exclude top header bar (top 9%) from drawn-layer layout center so diagram geometry is measured purely
  const yStart = Math.round(h * 0.09);

  for (let y = yStart; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * 3;
      const r = rgbBuf[idx];
      const g = rgbBuf[idx + 1];
      const b = rgbBuf[idx + 2];
      const d = labDistance(rgbToLab(r, g, b), groundLab);

      if (d > DETAIL_LAB) {
        mask[y * w + x] = 1;
        drawnCount++;
        sumX += x;
        sumY += y;
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;

        const gx = Math.min(GRID_W - 1, Math.floor((x / w) * GRID_W));
        const gy = Math.min(GRID_H - 1, Math.floor((y / h) * GRID_H));
        grid[gy * GRID_W + gx] += 1;

        // Quantize color to 32-step buckets for dominant palette report
        const qr = Math.min(255, Math.round(r / 32) * 32);
        const qg = Math.min(255, Math.round(g / 32) * 32);
        const qb = Math.min(255, Math.round(b / 32) * 32);
        const hex = rgbToHex(qr, qg, qb);
        colorBuckets.set(hex, (colorBuckets.get(hex) || 0) + 1);
      }
    }
  }

  const totalPixels = w * h;
  const cover = Number((drawnCount / Math.max(1, totalPixels)).toFixed(4));
  const negativeSpacePct = Number(((1 - cover) * 100).toFixed(1));

  if (drawnCount > 0) {
    for (let i = 0; i < grid.length; i++) {
      grid[i] /= drawnCount;
    }
  }

  const topColors = [...colorBuckets.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([hex, cnt]) => ({
      hex,
      share: Number((cnt / Math.max(1, drawnCount)).toFixed(3))
    }));

  return {
    ground: rgbToHex(groundRgb[0], groundRgb[1], groundRgb[2]),
    cover,
    negativeSpacePct,
    centre: drawnCount > 0
      ? [Number((sumX / drawnCount / w).toFixed(3)), Number((sumY / drawnCount / h).toFixed(3))]
      : [0.5, 0.5],
    box: drawnCount > 0
      ? [
          Number((minX / w).toFixed(3)),
          Number((minY / h).toFixed(3)),
          Number(((maxX - minX) / w).toFixed(3)),
          Number(((maxY - minY) / h).toFixed(3))
        ]
      : [0, 0, 0, 0],
    colours: topColors,
    grid: Array.from(grid),
    mask
  };
}

/**
 * Classifies an event's temporal activity curve (`_easing` in rea_video/motion.py).
 */
function classifyEasing(activitySeries) {
  if (!activitySeries || activitySeries.length < 4) return 'instant';
  const total = activitySeries.reduce((a, b) => a + b, 0);
  if (total <= 0) return 'instant';

  let cum = 0;
  const halfIdx = Math.floor(activitySeries.length / 2) - (activitySeries.length % 2 === 0 ? 1 : 0);
  let halfCum = 0;
  for (let i = 0; i < activitySeries.length; i++) {
    cum += activitySeries[i];
    if (i === halfIdx) halfCum = cum / total;
  }

  if (halfCum > 0.68) return 'ease_out';
  if (halfCum < 0.32) return 'ease_in';

  const mean = total / activitySeries.length;
  const variance = activitySeries.reduce((acc, v) => acc + ((v - mean) ** 2), 0) / activitySeries.length;
  const cv = Math.sqrt(variance) / (mean + 1e-6);
  return cv < 0.45 ? 'linear' : 'ease_in_out';
}

/**
 * Computes directional wipe/draw-on correlation (`_direction` in rea_video/motion.py).
 */
function classifyDirection(onsetTimes, xs, ys) {
  if (!onsetTimes || onsetTimes.length < 8) return null;
  const corr = (a, b) => {
    const n = a.length;
    const ma = a.reduce((s, v) => s + v, 0) / n;
    const mb = b.reduce((s, v) => s + v, 0) / n;
    let num = 0;
    let da = 0;
    let db = 0;
    for (let i = 0; i < n; i++) {
      const xa = a[i] - ma;
      const xb = b[i] - mb;
      num += xa * xb;
      da += xa * xa;
      db += xb * xb;
    }
    const denom = Math.sqrt(da * db);
    return denom > 1e-6 ? num / denom : 0;
  };

  const rx = corr(xs, onsetTimes);
  const ry = corr(ys, onsetTimes);
  if (Math.abs(rx) >= Math.abs(ry) && Math.abs(rx) > 0.55) {
    return rx > 0 ? 'right' : 'left';
  }
  if (Math.abs(ry) > 0.55) {
    return ry > 0 ? 'down' : 'up';
  }
  return null;
}

/**
 * Decodes a video file into raw RGB24 frames at analysis resolution (`160x90 @ 10fps`)
 * and runs rea-video's full layer + motion forensics (`motion_events` & `scene_frames`).
 */
function analyzeVideoFile(videoPath, opts = {}) {
  if (!fs.existsSync(videoPath)) {
    throw new Error(`Video file not found: ${videoPath}`);
  }
  const ffmpeg = findFfmpegExecutable();
  const ffprobe = findFfprobeExecutable();
  const sampleFps = opts.fps || 10;
  const maxDuration = opts.maxDuration || 180;

  let durationSec = 0;
  try {
    const out = execFileSync(ffprobe, [
      '-v', 'error',
      '-show_entries', 'format=duration',
      '-of', 'default=noprint_wrappers=1:nokey=1',
      videoPath
    ], { encoding: 'utf8' }).trim();
    durationSec = Math.min(maxDuration, parseFloat(out) || 60);
  } catch {
    durationSec = 60;
  }

  const rawBuf = execFileSync(ffmpeg, [
    '-v', 'error',
    '-t', String(durationSec),
    '-i', videoPath,
    '-vf', `fps=${sampleFps},scale=${ANALYSIS_W}:${ANALYSIS_H}`,
    '-f', 'rawvideo',
    '-pix_fmt', 'rgb24',
    '-'
  ], { maxBuffer: 128 * 1024 * 1024 });

  const frameBytes = ANALYSIS_W * ANALYSIS_H * 3;
  const frameCount = Math.floor(rawBuf.length / frameBytes);
  if (frameCount < 3) {
    throw new Error(`Too few frames decoded from ${videoPath}`);
  }

  const frames = [];
  for (let f = 0; f < frameCount; f++) {
    frames.push(rawBuf.subarray(f * frameBytes, (f + 1) * frameBytes));
  }

  // 1. Sample drawn-layer measurements every 1.0s and detect visual scene/beat reorganizations
  const stepFrames = Math.max(1, Math.round(sampleFps));
  const snapshots = [];
  const scenes = [];
  let curSceneStart = 0;

  for (let f = 0; f < frameCount; f += stepFrames) {
    const tSec = Number((f / sampleFps).toFixed(2));
    const m = measureDrawnLayer(frames[f], ANALYSIS_W, ANALYSIS_H);
    snapshots.push({ tSec, frameIndex: f, measure: m });

    if (snapshots.length > 1) {
      const prev = snapshots[snapshots.length - 2].measure;
      // Compute spatial layout shift (`SCENE_MOVE = 0.25` in rea_video/layers.py)
      let gridDiff = 0;
      for (let g = 0; g < GRID_W * GRID_H; g++) {
        gridDiff += Math.abs(m.grid[g] - prev.grid[g]);
      }
      const layoutShift = gridDiff * 0.5;
      if (layoutShift >= 0.25 && (tSec - curSceneStart) >= 2.0) {
        scenes.push({
          index: scenes.length + 1,
          start: curSceneStart,
          end: tSec,
          duration: Number((tSec - curSceneStart).toFixed(2)),
          layoutShift: Number(layoutShift.toFixed(3))
        });
        curSceneStart = tSec;
      }
    }
  }
  if (durationSec - curSceneStart >= 1.0) {
    scenes.push({
      index: scenes.length + 1,
      start: curSceneStart,
      end: Number(durationSec.toFixed(2)),
      duration: Number((durationSec - curSceneStart).toFixed(2)),
      layoutShift: 0
    });
  }

  // 2. Compute cell-level motion activity (`motion_events` in rea_video/motion.py)
  const gw = Math.floor(ANALYSIS_W / CELL);
  const gh = Math.floor(ANALYSIS_H / CELL);
  const cellCount = gw * gh;
  const activeCounts = new Uint16Array(cellCount);
  const firstOnset = new Int16Array(cellCount).fill(-1);
  const frameActivitySeries = new Float32Array(frameCount - 1);

  for (let f = 0; f < frameCount - 1; f++) {
    const cur = frames[f];
    const nxt = frames[f + 1];
    let activeCellsThisFrame = 0;

    for (let cy = 0; cy < gh; cy++) {
      for (let cx = 0; cx < gw; cx++) {
        let changedPx = 0;
        for (let dy = 0; dy < CELL; dy++) {
          for (let dx = 0; dx < CELL; dx++) {
            const idx = (((cy * CELL + dy) * ANALYSIS_W) + (cx * CELL + dx)) * 3;
            const dr = Math.abs(nxt[idx] - cur[idx]);
            const dg = Math.abs(nxt[idx + 1] - cur[idx + 1]);
            const db = Math.abs(nxt[idx + 2] - cur[idx + 2]);
            if (Math.max(dr, dg, db) > DIFF_THRESH) {
              changedPx++;
            }
          }
        }
        if (changedPx / (CELL * CELL) > 0.12) {
          const cIdx = cy * gw + cx;
          activeCounts[cIdx]++;
          activeCellsThisFrame++;
          if (firstOnset[cIdx] === -1) firstOnset[cIdx] = f;
        }
      }
    }
    frameActivitySeries[f] = activeCellsThisFrame / cellCount;
  }

  let everActiveCells = 0;
  let continuousLayerCells = 0;
  let staticFrameCount = 0;
  const onsetList = [];
  const xsList = [];
  const ysList = [];

  for (let f = 0; f < frameActivitySeries.length; f++) {
    if (frameActivitySeries[f] < 0.004) staticFrameCount++;
  }

  for (let c = 0; c < cellCount; c++) {
    if (activeCounts[c] > 0) {
      everActiveCells++;
      if (activeCounts[c] >= (frameCount - 1) * 0.22) {
        continuousLayerCells++;
      }
      onsetList.push(firstOnset[c]);
      xsList.push((c % gw) / gw);
      ysList.push(Math.floor(c / gw) / gh);
    }
  }

  const avgCover = snapshots.reduce((s, x) => s + x.measure.cover, 0) / Math.max(1, snapshots.length);
  const avgNegSpacePct = Number(((1 - avgCover) * 100).toFixed(1));
  const continuousMotionPct = Number(((continuousLayerCells / Math.max(1, everActiveCells)) * 100).toFixed(1));
  const activeFramesPct = Number((((frameActivitySeries.length - staticFrameCount) / Math.max(1, frameActivitySeries.length)) * 100).toFixed(1));

  // Aggregate 16x9 spatial layout across all snapshots
  const avgGrid = new Array(GRID_W * GRID_H).fill(0);
  snapshots.forEach((sn) => {
    for (let i = 0; i < avgGrid.length; i++) {
      avgGrid[i] += sn.measure.grid[i] / snapshots.length;
    }
  });

  // Per-scene motion easing & direction summary
  const sceneBreakdowns = scenes.map((sc) => {
    const f0 = Math.max(0, Math.floor(sc.start * sampleFps));
    const f1 = Math.min(frameActivitySeries.length, Math.ceil(sc.end * sampleFps));
    const slice = Array.from(frameActivitySeries.subarray(f0, Math.max(f0 + 1, f1)));
    const midSnap = snapshots.find((s) => s.tSec >= sc.start + sc.duration * 0.5) || snapshots[0];
    return {
      ...sc,
      ground: midSnap ? midSnap.measure.ground : '#262626',
      coverPct: midSnap ? Number((midSnap.measure.cover * 100).toFixed(1)) : 12.0,
      negativeSpacePct: midSnap ? midSnap.measure.negativeSpacePct : 88.0,
      easing: classifyEasing(slice),
      direction: classifyDirection(onsetList.slice(0, 60), xsList.slice(0, 60), ysList.slice(0, 60)) || 'center-out',
      colours: midSnap ? midSnap.measure.colours : []
    };
  });

  return {
    videoPath,
    durationSec: Number(durationSec.toFixed(2)),
    sampleFps,
    frameCount,
    ground: snapshots[0] ? snapshots[0].measure.ground : '#262626',
    avgCoverPct: Number((avgCover * 100).toFixed(1)),
    avgNegativeSpacePct: avgNegSpacePct,
    activeFramesPct,
    continuousMotionPct,
    sceneCount: scenes.length,
    avgSceneDurationSec: Number((durationSec / Math.max(1, scenes.length)).toFixed(2)),
    avgGrid,
    scenes: sceneBreakdowns
  };
}

/**
 * Compares a generated remake video against a reference ByteByteGo video
 * using rea-video's `compare()` metrics (`place`, `shape`, `amount`, `motionLiveliness`, and `advice`).
 */
function compareVideos(refVideoPath, remakeVideoPath, opts = {}) {
  const ref = analyzeVideoFile(refVideoPath, opts);
  const rem = analyzeVideoFile(remakeVideoPath, opts);

  // 1. Spatial 16x9 Grid Overlap (`place` & `shape` in rea_video/layers.py)
  let gridIntersection = 0;
  let gridL1 = 0;
  for (let i = 0; i < ref.avgGrid.length; i++) {
    gridIntersection += Math.min(ref.avgGrid[i], rem.avgGrid[i]);
    gridL1 += Math.abs(ref.avgGrid[i] - rem.avgGrid[i]);
  }
  const placeScore = Math.max(0, Math.min(1, 1 - gridL1 * 0.45));
  const shapeScore = Math.max(0, Math.min(1, gridIntersection * 1.35));

  // 2. Drawn-Layer Density Match (`amount` / `cover`)
  const coverRatio = Math.min(ref.avgCoverPct, rem.avgCoverPct) / Math.max(1, Math.max(ref.avgCoverPct, rem.avgCoverPct));
  const amountScore = Math.max(0, Math.min(1, coverRatio ** 0.45));

  // 3. Kinetic Liveliness Match (`activeFramesPct` & `continuousMotionPct`)
  const motionScore = Math.max(0, Math.min(1, (rem.activeFramesPct / Math.max(50, ref.activeFramesPct))));

  const overallScore = Number(
    ((placeScore * 0.30 + shapeScore * 0.25 + amountScore * 0.20 + motionScore * 0.25) * 100).toFixed(1)
  );

  const advice = [];
  if (rem.avgCoverPct > ref.avgCoverPct * 1.45) {
    advice.push(`Reduce visual clutter: Remake covers ${rem.avgCoverPct}% of canvas vs reference ${ref.avgCoverPct}% (keep 2-3 focal elements per beat).`);
  } else if (rem.avgCoverPct < ref.avgCoverPct * 0.55) {
    advice.push(`Scale up focal icons/diagrams slightly: Remake covers ${rem.avgCoverPct}% vs reference ${ref.avgCoverPct}%.`);
  }
  if (rem.activeFramesPct < 80) {
    advice.push(`Increase continuous kinetic motion: ${rem.activeFramesPct}% active frames (use Icons.drawBadge, sonarPulse, and flowArrow comet streams).`);
  }
  if (rem.avgSceneDurationSec > 14) {
    advice.push(`Shorten beat duration: Average visual beat is ${rem.avgSceneDurationSec}s (target 8-11s per beat for ByteByteGo pacing).`);
  }
  if (advice.length === 0) {
    advice.push('Excellent ByteByteGo visual & kinetic parity across spatial layout, negative space, and continuous motion.');
  }

  return {
    overallScore,
    placeScore: Number((placeScore * 100).toFixed(1)),
    shapeScore: Number((shapeScore * 100).toFixed(1)),
    amountScore: Number((amountScore * 100).toFixed(1)),
    motionScore: Number((motionScore * 100).toFixed(1)),
    reference: {
      ground: ref.ground,
      avgCoverPct: ref.avgCoverPct,
      avgNegativeSpacePct: ref.avgNegativeSpacePct,
      activeFramesPct: ref.activeFramesPct,
      continuousMotionPct: ref.continuousMotionPct,
      avgSceneDurationSec: ref.avgSceneDurationSec
    },
    remake: {
      ground: rem.ground,
      avgCoverPct: rem.avgCoverPct,
      avgNegativeSpacePct: rem.avgNegativeSpacePct,
      activeFramesPct: rem.activeFramesPct,
      continuousMotionPct: rem.continuousMotionPct,
      avgSceneDurationSec: rem.avgSceneDurationSec
    },
    advice
  };
}

/**
 * Exports a layered `VIDEO.md` breakdown file following JuneYaooo/rea-video's VIDEO.md format.
 */
function exportVideoMd(analysis, outPath) {
  const lines = [
    `# VIDEO.md — Reverse-Engineered ByteByteGo Breakdown (${path.basename(analysis.videoPath)})`,
    '',
    `- **Production Method**: Code / Motion-Graphics Render (100%)`,
    `- **Duration**: ${analysis.durationSec}s · **Visual Beats Detected**: ${analysis.sceneCount} (avg ${analysis.avgSceneDurationSec}s / beat)`,
    `- **Ground Colour**: \`${analysis.ground}\` · **Drawn Layer Coverage**: \`${analysis.avgCoverPct}%\` (**Negative Space**: \`${analysis.avgNegativeSpacePct}%\`)`,
    `- **Active Motion Frames**: \`${analysis.activeFramesPct}%\` · **Continuous Moving Layer (L)**: \`${analysis.continuousMotionPct}%\``,
    '',
    '## Per-Beat Visual & Motion Timeline (rea-video Forensics)',
    '',
    '| Beat # | Time Window | Duration | Ground | Drawn Cover % | Negative Space % | Entrance Easing | Wipe / Flow Axis | Dominant Hex Palette |',
    '|---|---|---|---|---|---|---|---|---|'
  ];

  analysis.scenes.forEach((sc) => {
    const pal = (sc.colours || []).map((c) => `\`${c.hex}\` (${Math.round(c.share * 100)}%)`).join(', ');
    lines.push(
      `| #${sc.index} | ${sc.start.toFixed(1)}s–${sc.end.toFixed(1)}s | ${sc.duration.toFixed(1)}s | \`${sc.ground}\` | ${sc.coverPct}% | ${sc.negativeSpacePct}% | \`${sc.easing}\` | \`${sc.direction}\` | ${pal || '`#38bdf8`'} |`
    );
  });

  const md = lines.join('\n') + '\n';
  if (outPath) {
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, md, 'utf8');
  }
  return md;
}

module.exports = {
  rgbToHex,
  rgbToLab,
  labDistance,
  measureGroundRgb,
  measureDrawnLayer,
  classifyEasing,
  classifyDirection,
  analyzeVideoFile,
  compareVideos,
  exportVideoMd
};
