#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const os = require('os');
const { spawn, execFileSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');

function findMetaphorsPath() {
  const candidates = [
    path.join(ROOT, 'data/metaphors.json'),
    path.join(__dirname, 'metaphors.json')
  ];
  return candidates.find((p) => fs.existsSync(p));
}

function findBundlePath() {
  const candidates = [
    path.join(ROOT, 'dist/tech-video-studio.bundle.js'),
    path.join(__dirname, 'tech-video-studio.bundle.js')
  ];
  return candidates.find((p) => fs.existsSync(p));
}

function loadSfxGen() {
  const candidates = [
    path.join(ROOT, 'src/audio/sfx-gen.js'),
    path.join(__dirname, 'sfx-gen.js')
  ];
  const found = candidates.find((p) => fs.existsSync(p));
  return found ? require(found) : null;
}

function loadVoiceStudio() {
  const candidates = [
    path.join(ROOT, 'src/audio/voicestudio.js'),
    path.join(__dirname, 'voicestudio.js')
  ];
  const found = candidates.find((p) => fs.existsSync(p));
  return found ? require(found) : null;
}

function loadReaAnalyzer() {
  const candidates = [
    path.join(ROOT, 'src/core/rea-analyzer.js'),
    path.join(__dirname, 'rea-analyzer.js')
  ];
  const found = candidates.find((p) => fs.existsSync(p));
  return found ? require(found) : null;
}

function loadBlueprintCompiler() {
  const candidates = [
    path.join(ROOT, 'src/core/blueprint.js'),
    path.join(__dirname, 'blueprint.js')
  ];
  const found = candidates.find((p) => fs.existsSync(p));
  return found ? require(found) : null;
}

function loadNarrativeEngine() {
  const candidates = [
    path.join(ROOT, 'src/core/narrative.js'),
    path.join(__dirname, 'narrative.js')
  ];
  const found = candidates.find((p) => fs.existsSync(p));
  return found ? require(found) : null;
}

function findChromeExecutable() {
  if (process.env.CHROME_PATH && fs.existsSync(process.env.CHROME_PATH)) {
    return process.env.CHROME_PATH;
  }
  const candidates = [
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',
    '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
  ];
  const found = candidates.find((p) => fs.existsSync(p));
  if (!found) {
    throw new Error('Chrome/Chromium not found. Set CHROME_PATH environment variable.');
  }
  return found;
}

function findFfmpegExecutable() {
  if (process.env.FFMPEG_PATH && fs.existsSync(process.env.FFMPEG_PATH)) {
    return process.env.FFMPEG_PATH;
  }
  const candidates = [
    '/opt/homebrew/bin/ffmpeg',
    '/usr/local/bin/ffmpeg',
    '/usr/bin/ffmpeg'
  ];
  const found = candidates.find((p) => fs.existsSync(p));
  return found || 'ffmpeg';
}

function parseFlags(argv) {
  const positional = [];
  const flags = {};
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg.startsWith('--')) {
      const eq = arg.indexOf('=');
      if (eq !== -1) {
        flags[arg.slice(2, eq)] = arg.slice(eq + 1);
      } else {
        const key = arg.slice(2);
        const next = argv[i + 1];
        if (next && !next.startsWith('-')) {
          flags[key] = next;
          i++;
        } else {
          flags[key] = true;
        }
      }
    } else if (arg === '-o' && argv[i + 1]) {
      flags.out = argv[++i];
    } else {
      positional.push(arg);
    }
  }
  return { positional, flags };
}

// ============================================================================
// COMMAND 1: metaphor <query>
// ============================================================================
function cmdMetaphor(positional) {
  const query = positional.join(' ').trim().toLowerCase();
  const dataPath = findMetaphorsPath();
  const catalog = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

  if (!query) {
    console.log(`Available Visual Metaphors (${catalog.length}):\n`);
    catalog.forEach((m) => {
      console.log(`- [${m.domain}] ${m.id}: ${m.visualMetaphor}`);
    });
    return;
  }

  const terms = query.split(/\s+/).filter(Boolean);
  const scored = catalog
    .map((item) => {
      const hay = `${item.id} ${item.domain} ${item.keywords.join(' ')} ${item.visualMetaphor}`.toLowerCase();
      let score = 0;
      for (const term of terms) {
        if (item.keywords.some((k) => k.toLowerCase() === term)) score += 5;
        else if (hay.includes(term)) score += 2;
      }
      return { item, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);

  const results = scored.length > 0 ? scored.map((s) => s.item) : catalog.slice(0, 4);
  console.log(`Visual Metaphor Recommendations for "${query}":\n`);
  results.slice(0, 5).forEach((m, idx) => {
    console.log(`${idx + 1}. [${m.domain.toUpperCase()}] ${m.id}`);
    console.log(`   ❌ Avoid:    ${m.antiPattern}`);
    console.log(`   ✅ Metaphor: ${m.visualMetaphor}`);
    console.log(`   🧩 API:      ${m.studioPrimitive}\n`);
  });
}

// ============================================================================
// COMMAND 2: new <dir> [--title "..."]
// ============================================================================
function cmdNew(positional, flags) {
  const targetDir = path.resolve(process.cwd(), positional[0] || 'my-youtube-explainer');
  const title = flags.title || 'How Modern Systems Work';
  fs.mkdirSync(targetDir, { recursive: true });

  const bundleSrc = findBundlePath();
  if (bundleSrc) {
    fs.copyFileSync(bundleSrc, path.join(targetDir, 'tech-video-studio.bundle.js'));
  }

  const starterHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${title}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #262626; width: 1920px; height: 1080px; overflow: hidden; }
    #canvas { display: block; width: 1920px; height: 1080px; }
  </style>
  <script src="./tech-video-studio.bundle.js"></script>
</head>
<body>
  <canvas id="canvas" width="1920" height="1080"></canvas>
  <script>
    const { Theme, Camera, Connectors, Illustrations, createVideo } = window.TechVideoStudio;

    createVideo({
      title: ${JSON.stringify(title)},
      palette: 'byteCharcoal',
      fps: 60,
      scenes: [
        {
          id: 'request-flow',
          chapter: '01. Client Request & Edge Routing',
          duration: 15,
          backdrop: 'waves',
          sfx: [
            { time: 0.3, type: 'pop' },
            { time: 1.1, type: 'draw' },
            { time: 1.8, type: 'pop' },
            { time: 3.2, type: 'whoosh' },
            { time: 4.5, type: 'success' }
          ],
          initialState: () => ({ client: 0, net: 0, server: 0, doc: 0 }),
          build(tl, s) {
            tl.to(s, { client: 1, duration: 0.7, ease: 'power2.out' }, 0.3)
              .to(s, { net: 1, duration: 0.7, ease: 'power2.out' }, 1.1)
              .to(s, { server: 1, duration: 0.8, ease: 'power2.out' }, 1.8)
              .to(s, { doc: 1, duration: 0.6, ease: 'back.out(1.5)' }, 2.6);
            Camera.zoomTo(tl, s, { x: 1120, y: 500, zoom: 1.18, duration: 1.2 }, 3.2);
            Camera.reset(tl, s, 6.0, 1.1);
          },
          render(ctx, { state }) {
            Theme.drawGlassCard(ctx, 210, 310, 420, 380, {
              tint: 'teal',
              badge: 'Client Side',
              badgeSide: 'left',
              progress: state.client
            });
            Illustrations.wireframeBrowser(ctx, 270, 390, 300, 240, {
              progress: state.client,
              centerText: 'WWW'
            });

            Connectors.solidArrow(ctx, 650, 470, 1210, 470, {
              progress: state.net,
              label: 'GET /index.html'
            });
            Connectors.solidArrow(ctx, 1210, 545, 650, 545, {
              progress: state.doc,
              dashed: true,
              color: '#5CE1E6',
              label: '200 OK (TLS 1.3)'
            });

            if (state.doc > 0.05) {
              Illustrations.foldedFileBadge(ctx, 930, 620, {
                badge: 'HTML',
                badgeColor: '#F97316',
                progress: state.doc
              });
            }

            Theme.drawGlassCard(ctx, 1230, 310, 460, 380, {
              tint: 'emerald',
              badge: 'Origin Cluster',
              badgeSide: 'right',
              progress: state.server
            });
            Illustrations.isometricServerStack(ctx, 1460, 495, {
              slabs: 3,
              progress: state.server,
              label: 'Edge Server'
            });

            if (state.doc > 0.6) {
              Theme.drawTakeawayPill(ctx, 'Keep-Alive Multiplexing Cuts Round-Trip Latency by 65%');
            }
          }
        }
      ]
    });
  </script>
</body>
</html>
`;

  const htmlOut = path.join(targetDir, 'index.html');
  fs.writeFileSync(htmlOut, starterHtml, 'utf8');
  console.log(`✅ Scaffolded new ByteByteGo-grade YouTube explainer project at: ${targetDir}`);
  console.log(`   1. Preview & QA: node "${__filename}" qa "${htmlOut}"`);
  console.log(`   2. Render MP4:   node "${__filename}" render "${htmlOut}" -o "${path.join(targetDir, 'video.mp4')}"`);
}

// ============================================================================
// COMMAND 3: qa <html-file> [--times 8,22,36,54] [--out-dir <dir>]
// ============================================================================
async function cmdQa(positional, flags) {
  const puppeteer = require('puppeteer-core');
  const htmlPath = path.resolve(process.cwd(), positional[0]);
  if (!fs.existsSync(htmlPath)) {
    throw new Error(`HTML file not found: ${htmlPath}`);
  }

  const outDir = path.resolve(process.cwd(), flags['out-dir'] || path.join(path.dirname(htmlPath), 'qa_output'));
  fs.mkdirSync(outDir, { recursive: true });

  const browser = await puppeteer.launch({
    executablePath: findChromeExecutable(),
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1920,1080']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });
    await page.goto('file://' + htmlPath, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.__studioReady === true || window.iconsReady === true, { timeout: 15000 });

    const meta = await page.evaluate(() => window.__studioMeta || null);
    const times = flags.times
      ? String(flags.times).split(',').map((n) => parseFloat(n.trim())).filter((n) => !Number.isNaN(n))
      : (meta && meta.qaTimes && meta.qaTimes.length ? meta.qaTimes : [8, 22, 36, 54]);

    const savedFrames = [];
    for (let i = 0; i < times.length; i++) {
      const t = times[i];
      const telemetry = await page.evaluate((sec) => {
        if (typeof window.__studioSeek === 'function') {
          window.__studioSeek(sec);
        } else if (typeof tl !== 'undefined' && typeof render === 'function') {
          tl.seek(sec);
          render(sec);
        }
        if (typeof window.__studioAnalyzeFrame === 'function') {
          return window.__studioAnalyzeFrame(sec);
        }
        return null;
      }, t);

      const framePath = path.join(outDir, `scene_${String(i + 1).padStart(2, '0')}_${t}s.png`);
      await page.screenshot({ path: framePath });
      savedFrames.push(framePath);

      const negInfo = telemetry
        ? ` | NegSpace: ${telemetry.negativeSpacePct}% | HeaderClear: ${telemetry.headerZoneClear ? '✅' : '⚠️'} | Hues: ${telemetry.activeHueCount} (${telemetry.status})`
        : '';
      console.log(`📸 Captured QA keyframe [${i + 1}/${times.length}] @ ${t}s -> ${framePath}${negInfo}`);
      if (telemetry && Array.isArray(telemetry.warnings) && telemetry.warnings.length > 0) {
        telemetry.warnings.forEach((w) => console.log(`   ⚠️  QA Warning @ ${t}s: ${w}`));
      }
    }

    // Stitch 2x2 or Nx2 contact sheet via FFmpeg if >= 2 frames exist
    if (savedFrames.length >= 2) {
      const ffmpeg = findFfmpegExecutable();
      const cols = 2;
      const rows = Math.ceil(savedFrames.length / cols);
      const contactPath = path.join(outDir, 'qa_contact_sheet.jpg');
      const inputs = [];
      savedFrames.forEach((fp) => inputs.push('-i', fp));

      const scaleParts = savedFrames.map((_, idx) => `[${idx}:v]scale=960:540[v${idx}]`).join(';');
      const layoutSpec = savedFrames
        .map((_, idx) => {
          const c = idx % cols;
          const r = Math.floor(idx / cols);
          return `${c * 960}_${r * 540}`;
        })
        .join('|');
      const stackInputs = savedFrames.map((_, idx) => `[v${idx}]`).join('');
      const filter = `${scaleParts};${stackInputs}xstack=inputs=${savedFrames.length}:layout=${layoutSpec}:fill=black[out]`;

      execFileSync(ffmpeg, [
        '-y',
        ...inputs,
        '-filter_complex', filter,
        '-map', '[out]',
        '-frames:v', '1',
        '-q:v', '2',
        '-update', '1',
        contactPath
      ], { stdio: 'ignore' });

      console.log(`🖼️  Generated Visual QA Contact Sheet (${cols}x${rows}): ${contactPath}`);
    }
  } finally {
    await browser.close();
  }
}

// ============================================================================
// COMMAND 4: render <html-file> -o <output.mp4> [--fps 60] [--mode deterministic|stream] [--audio file.mp3]
// ============================================================================
async function cmdRender(positional, flags) {
  const puppeteer = require('puppeteer-core');
  const htmlPath = path.resolve(process.cwd(), positional[0]);
  if (!fs.existsSync(htmlPath)) {
    throw new Error(`HTML file not found: ${htmlPath}`);
  }

  const outMp4 = path.resolve(process.cwd(), flags.out || path.join(path.dirname(htmlPath), 'output_1080p60.mp4'));
  fs.mkdirSync(path.dirname(outMp4), { recursive: true });

  const mode = flags.mode || 'deterministic';
  const fps = parseInt(flags.fps || '60', 10);
  const ffmpeg = findFfmpegExecutable();
  const t0 = Date.now();

  const browser = await puppeteer.launch({
    executablePath: findChromeExecutable(),
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--autoplay-policy=no-user-gesture-required',
      '--window-size=1920,1080'
    ]
  });

  let tmpSfxWav = null;
  let tmpVoiceWav = null;

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });
    await page.goto('file://' + htmlPath, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.__studioReady === true || window.iconsReady === true, { timeout: 15000 });

    if (flags.scale || flags.retina) {
      const factor = flags.retina ? 2 : parseFloat(flags.scale);
      await page.evaluate((f) => {
        if (typeof window.__studioSetScaleFactor === 'function') window.__studioSetScaleFactor(f);
      }, factor);
    }

    const meta = await page.evaluate(() => window.__studioMeta || null);
    const duration = flags.duration
      ? parseFloat(flags.duration)
      : (meta && meta.totalDuration ? meta.totalDuration : 60);

    // Synthesize Senior SA Narration Track via debpalash/VoiceStudio (or local mastered fallback) when --voice is passed
    let activeAudioPath = flags.audio ? path.resolve(process.cwd(), flags.audio) : null;
    if (!activeAudioPath && flags.voice) {
      const vs = loadVoiceStudio();
      if (vs && meta && Array.isArray(meta.narrationSegments) && meta.narrationSegments.length > 0) {
        const personaKey = typeof flags.voice === 'string' ? flags.voice : 'senior-sa';
        tmpVoiceWav = outMp4 + '.narration.wav';
        console.log(`🎙️  Generating Senior SA Narration Track (${personaKey}) across ${meta.narrationSegments.length} scenes...`);
        const navRes = await vs.synthesizeSceneNarrationTrack(meta.narrationSegments, duration, tmpVoiceWav, {
          url: flags['voicestudio-url'],
          persona: personaKey,
          voice: flags['voice-id'],
          lang: flags.lang,
          rate: flags.rate,
          speed: flags.speed,
          allowFallback: !flags['strict-voicestudio']
        });
        activeAudioPath = tmpVoiceWav;
        console.log(`   ✅ Synthesized ${navRes.clipCount} scene voiceovers via [${navRes.engine}] (Avg pace: ${navRes.avgWpm} WPM, Avg gap: ${navRes.avgGapSec}s, MaxTempo: ${navRes.maxTempoApplied}x) -> ${path.basename(tmpVoiceWav)}`);
      }
    }

    // Synthesize procedural motion SFX track if scene defines sfx cues and --no-sfx is not set
    const sfxGen = loadSfxGen();
    if (sfxGen && !flags['no-sfx'] && meta && Array.isArray(meta.sfxCues) && meta.sfxCues.length > 0) {
      tmpSfxWav = outMp4 + '.sfx.wav';
      sfxGen.synthesizeSfxTrack(tmpSfxWav, duration, meta.sfxCues);
      console.log(`🔊 Synthesized ${meta.sfxCues.length} procedural motion SFX cues -> ${path.basename(tmpSfxWav)}`);
    }

    const buildAudioArgs = () => {
      const audioArgs = [];
      if (activeAudioPath && tmpSfxWav) {
        audioArgs.push(
          '-i', activeAudioPath,
          '-i', tmpSfxWav,
          '-filter_complex', '[1:a]volume=1.0[voice];[2:a]volume=0.14[sfx];[voice][sfx]amix=inputs=2:duration=first:dropout_transition=2:normalize=0[aout]',
          '-map', '0:v',
          '-map', '[aout]',
          '-c:a', 'aac',
          '-b:a', '192k',
          '-shortest'
        );
      } else if (activeAudioPath) {
        audioArgs.push(
          '-i', activeAudioPath,
          '-c:a', 'aac',
          '-b:a', '192k',
          '-shortest'
        );
      } else if (tmpSfxWav) {
        audioArgs.push(
          '-i', tmpSfxWav,
          '-c:a', 'aac',
          '-b:a', '192k',
          '-shortest'
        );
      }
      return audioArgs;
    };

    if (mode === 'stream') {
      console.log(`🎬 Recording ${duration}s stream at ${fps} FPS...`);
      const b64 = await page.evaluate(async () => window.startRecording());
      const tmpWebm = outMp4 + '.raw.webm';
      fs.writeFileSync(tmpWebm, Buffer.from(b64, 'base64'));

      const ffArgs = ['-y', '-i', tmpWebm, ...buildAudioArgs()];
      ffArgs.push('-c:v', 'libx264', '-preset', 'fast', '-crf', '18', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', outMp4);
      execFileSync(ffmpeg, ffArgs, { stdio: 'inherit' });
      if (fs.existsSync(tmpWebm)) fs.unlinkSync(tmpWebm);
    } else {
      const totalFrames = Math.round(duration * fps);
      console.log(`🎯 Deterministic Frame-Exact Render: ${totalFrames} frames (${duration}s @ ${fps} FPS)...`);

      const ffArgs = [
        '-y',
        '-f', 'image2pipe',
        '-vcodec', 'mjpeg',
        '-framerate', String(fps),
        '-i', '-',
        ...buildAudioArgs(),
        '-c:v', 'libx264',
        '-preset', 'fast',
        '-crf', '18',
        '-pix_fmt', 'yuv420p',
        '-movflags', '+faststart',
        outMp4
      ];

      const ffProc = spawn(ffmpeg, ffArgs, { stdio: ['pipe', 'ignore', 'pipe'] });
      let ffErr = '';
      ffProc.stderr.on('data', (chunk) => { ffErr += chunk.toString(); });

      const hasCanvasFastCapture = await page.evaluate(() => typeof window.__studioCaptureFrameJpeg === 'function');
      const batchSize = hasCanvasFastCapture ? 12 : 1;

      for (let f = 0; f < totalFrames; f += batchSize) {
        const count = Math.min(batchSize, totalFrames - f);
        if (hasCanvasFastCapture) {
          const dataUrls = await page.evaluate(({ startFrame, countFrames, frameRate }) => {
            const out = [];
            for (let i = 0; i < countFrames; i++) {
              const t = (startFrame + i) / frameRate;
              out.push(window.__studioCaptureFrameJpeg(t, 0.95));
            }
            return out;
          }, { startFrame: f, countFrames: count, frameRate: fps });

          for (const url of dataUrls) {
            const commaIdx = url.indexOf(',');
            const buf = Buffer.from(url.slice(commaIdx + 1), 'base64');
            if (!ffProc.stdin.write(buf)) {
              await new Promise((r) => ffProc.stdin.once('drain', r));
            }
          }
        } else {
          const t = f / fps;
          await page.evaluate((sec) => {
            if (typeof window.__studioSeek === 'function') window.__studioSeek(sec);
            else if (typeof tl !== 'undefined' && typeof render === 'function') { tl.seek(sec); render(sec); }
          }, t);
          const buf = await page.screenshot({ type: 'jpeg', quality: 95 });
          if (!ffProc.stdin.write(buf)) {
            await new Promise((r) => ffProc.stdin.once('drain', r));
          }
        }

        if ((f + count) % (fps * 10) === 0 || f + count === totalFrames) {
          const pct = (((f + count) / totalFrames) * 100).toFixed(0);
          console.log(`   ⏳ Rendered ${f + count}/${totalFrames} frames (${pct}%)`);
        }
      }

      ffProc.stdin.end();
      const exitCode = await new Promise((resolve) => ffProc.on('close', resolve));
      if (exitCode !== 0) {
        throw new Error(`FFmpeg exited with code ${exitCode}:\n${ffErr.slice(-800)}`);
      }
    }

    const sizeMb = (fs.statSync(outMp4).size / 1024 / 1024).toFixed(2);
    const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
    console.log(`✅ Rendered 1080p${fps} H.264 MP4 in ${elapsed}s -> ${outMp4} (${sizeMb} MB)`);
  } finally {
    if (tmpSfxWav && fs.existsSync(tmpSfxWav)) {
      fs.unlinkSync(tmpSfxWav);
    }
    if (tmpVoiceWav && fs.existsSync(tmpVoiceWav)) {
      fs.unlinkSync(tmpVoiceWav);
    }
    await browser.close();
  }
}

// ============================================================================
// COMMAND 5: voice <status|design|narrate> (debpalash/VoiceStudio Integration)
// ============================================================================
async function cmdVoice(positional, flags) {
  const vs = loadVoiceStudio();
  if (!vs) {
    throw new Error('voicestudio.js module not found.');
  }

  const sub = (positional[0] || 'status').toLowerCase();

  if (sub === 'status') {
    const st = await vs.checkStatus({ url: flags.url || flags['voicestudio-url'] });
    console.log(`\n🎙️  VoiceStudio Integration Status (https://github.com/debpalash/VoiceStudio)`);
    console.log(`   Backend URL:      ${st.url}`);
    console.log(`   Server Running:   ${st.running ? `✅ Online (${st.version})` : '⚪ Offline (Local Mastered TTS Fallback Ready)'}`);
    console.log(`   CLI Binary:       ${st.cliPath || 'Not in PATH'}`);
    console.log(`   Desktop App:      ${st.appInstalled ? '✅ /Applications/VoiceStudio.app' : 'Not installed'}`);
    console.log(`   Built-in Senior SA Personas:`);
    Object.values(vs.SENIOR_SA_PERSONAS).forEach((p) => {
      console.log(`     • ${p.id.padEnd(18)} — ${p.name} [${p.language}]`);
    });
    if (st.running && st.profiles && st.profiles.length > 0) {
      console.log(`   Saved VoiceStudio Profiles (${st.profiles.length}):`);
      st.profiles.slice(0, 10).forEach((p) => {
        console.log(`     • ${p.id || p.voice_id}: ${p.name || 'Voice'}`);
      });
    } else if (!st.running && st.installGuide) {
      console.log(`\n💡 To install or launch debpalash/VoiceStudio on your machine:`);
      console.log(`   macOS (Homebrew): ${st.installGuide.macos}`);
      console.log(`   One-line script:  ${st.installGuide.oneCommand}`);
      console.log(`   Docker container: ${st.installGuide.docker}\n`);
    }
    return;
  }

  if (sub === 'design') {
    const personaKey = flags.persona || positional[1] || 'senior-sa';
    console.log(`🎙️  Designing Senior SA Voice Profile (${personaKey}) in VoiceStudio...`);
    const created = await vs.ensureSeniorSaProfile({
      url: flags.url || flags['voicestudio-url'],
      persona: personaKey,
      name: flags.name,
      description: flags.description,
      language: flags.lang,
      engine: flags.engine
    });
    console.log(`✅ Senior SA Voice Profile Ready: "${created.name}" (ID: ${created.profileId})`);
    return;
  }

  if (sub === 'narrate') {
    const puppeteer = require('puppeteer-core');
    const htmlFile = positional[1] || flags.html;
    if (!htmlFile) {
      throw new Error('Usage: techvid voice narrate <scene.html> -o <narration.wav> [--persona senior-sa]');
    }
    const htmlPath = path.resolve(process.cwd(), htmlFile);
    if (!fs.existsSync(htmlPath)) {
      throw new Error(`HTML file not found: ${htmlPath}`);
    }
    const outWav = path.resolve(process.cwd(), flags.out || path.join(path.dirname(htmlPath), 'narration_senior_sa.wav'));
    fs.mkdirSync(path.dirname(outWav), { recursive: true });

    const browser = await puppeteer.launch({
      executablePath: findChromeExecutable(),
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    let meta = null;
    try {
      const page = await browser.newPage();
      await page.goto('file://' + htmlPath, { waitUntil: 'networkidle0' });
      await page.waitForFunction(() => window.__studioReady === true || window.iconsReady === true, { timeout: 15000 });
      meta = await page.evaluate(() => window.__studioMeta || null);
    } finally {
      await browser.close();
    }

    if (!meta || !Array.isArray(meta.narrationSegments) || meta.narrationSegments.length === 0) {
      throw new Error('No narration or caption segments found in HTML scenes.');
    }

    const personaKey = flags.persona || 'senior-sa';
    const res = await vs.synthesizeSceneNarrationTrack(
      meta.narrationSegments,
      meta.totalDuration || 60,
      outWav,
      {
        url: flags.url || flags['voicestudio-url'],
        persona: personaKey,
        voice: flags.voice,
        lang: flags.lang,
        rate: flags.rate,
        speed: flags.speed,
        allowFallback: !flags['strict-voicestudio']
      }
    );

    console.log(`✅ Generated Senior SA Narration WAV (${res.clipCount} clips, ${res.totalDurationSec}s, Avg pace: ${res.avgWpm} WPM, Avg gap: ${res.avgGapSec}s, MaxTempo: ${res.maxTempoApplied}x) via [${res.engine}] -> ${outWav}`);
    return;
  }

  throw new Error(`Unknown voice subcommand "${sub}". Use: status | design | narrate`);
}

// ============================================================================
// COMMAND 6: rea-learn <ref-video.mp4> [-o VIDEO.md] (JuneYaooo/rea-video Forensics)
// ============================================================================
function cmdReaLearn(positional, flags) {
  const rea = loadReaAnalyzer();
  if (!rea) throw new Error('rea-analyzer.js module not found.');
  const videoPath = positional[0] ? path.resolve(process.cwd(), positional[0]) : null;
  if (!videoPath || !fs.existsSync(videoPath)) {
    throw new Error('Usage: techvid rea-learn <reference-video.mp4> [-o out/VIDEO.md]');
  }

  console.log(`🔬 Running rea-video ByteByteGo forensics on: ${path.basename(videoPath)}...`);
  const analysis = rea.analyzeVideoFile(videoPath, {
    fps: flags.fps ? parseInt(flags.fps, 10) : 10,
    maxDuration: flags.max ? parseFloat(flags.max) : 180
  });

  const outMd = flags.out
    ? path.resolve(process.cwd(), flags.out)
    : path.join(path.dirname(videoPath), `${path.basename(videoPath, path.extname(videoPath))}_VIDEO.md`);

  rea.exportVideoMd(analysis, outMd);

  console.log(`\n📊 Reverse-Engineered Visual DNA (rea-video metrics):`);
  console.log(`   Duration:             ${analysis.durationSec}s (${analysis.sceneCount} visual beats, avg ${analysis.avgSceneDurationSec}s/beat)`);
  console.log(`   Ground Colour:        ${analysis.ground}`);
  console.log(`   Drawn Coverage:       ${analysis.avgCoverPct}%  (Negative Space: ${analysis.avgNegativeSpacePct}%)`);
  console.log(`   Active Motion Frames: ${analysis.activeFramesPct}%  (Continuous Layer L: ${analysis.continuousMotionPct}%)`);
  console.log(`   Exported VIDEO.md ->  ${outMd}\n`);
}

// ============================================================================
// COMMAND 7: rea-compare <ref-video.mp4> <remake-video.mp4> (ByteByteGo Parity Scorer)
// ============================================================================
function cmdReaCompare(positional, flags) {
  const rea = loadReaAnalyzer();
  if (!rea) throw new Error('rea-analyzer.js module not found.');
  const refPath = positional[0] ? path.resolve(process.cwd(), positional[0]) : null;
  const remPath = positional[1] ? path.resolve(process.cwd(), positional[1]) : null;
  if (!refPath || !remPath) {
    throw new Error('Usage: techvid rea-compare <reference.mp4> <remake.mp4>');
  }

  console.log(`⚖️  Comparing Remake vs Reference using rea-video drawn-layer metrics...`);
  const res = rea.compareVideos(refPath, remPath, {
    fps: flags.fps ? parseInt(flags.fps, 10) : 8
  });

  console.log(`\n🏆 ByteByteGo Style Parity Score: ${res.overallScore}%`);
  console.log(`   • Spatial Placement (16x9 Grid): ${res.placeScore}%`);
  console.log(`   • Shape Overlap:                 ${res.shapeScore}%`);
  console.log(`   • Drawn Density Balance:         ${res.amountScore}% (Ref: ${res.reference.avgCoverPct}% vs Remake: ${res.remake.avgCoverPct}%)`);
  console.log(`   • Kinetic Liveliness:            ${res.motionScore}% (Ref: ${res.reference.activeFramesPct}% vs Remake: ${res.remake.activeFramesPct}%)`);
  console.log(`   • Beat Pacing:                   Ref ${res.reference.avgSceneDurationSec}s/beat vs Remake ${res.remake.avgSceneDurationSec}s/beat`);
  console.log(`\n💡 Actionable Advice:`);
  res.advice.forEach((a) => console.log(`   - ${a}`));
  console.log('');
}

// ============================================================================
// COMMAND 8: plan-story <topic> [--arc deep-dive-3min|speed-paradox-2min|quick-explainer-60s] [-o out.json]
// ============================================================================
function cmdPlanStory(positional, flags) {
  const nav = loadNarrativeEngine();
  if (!nav) throw new Error('narrative.js module not found.');
  const topic = positional.join(' ').trim() || flags.title || 'How Distributed Systems Scale';
  const arcKey = flags.arc || 'deep-dive-3min';
  const slug = topic.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'story';
  const outJson = path.resolve(process.cwd(), flags.out || `${slug}.blueprint.json`);

  const blueprint = nav.scaffoldNarrativeBlueprint(topic, arcKey);
  fs.mkdirSync(path.dirname(outJson), { recursive: true });
  fs.writeFileSync(outJson, JSON.stringify(blueprint, null, 2), 'utf8');

  const arcMeta = nav.EXPLAINER_ARCS[arcKey] || nav.EXPLAINER_ARCS['deep-dive-3min'];
  console.log(`📖 Scaffolded Narrative-First ByteByteGo Blueprint (${arcMeta.name}):`);
  console.log(`   File: ${outJson}`);
  console.log(`   Narrative Line (rea-video 8-Role Theory):`);
  let n = 0;
  blueprint.scenes.forEach((sc) => {
    sc.beats.forEach((b) => {
      n++;
      console.log(`     #${String(n).padStart(2, '0')} [${b.role.toUpperCase().padEnd(7)}] -> ${b.type.padEnd(18)} (${b.duration}s)`);
    });
  });
  console.log(`\n   Next: Fill in your facts, audit with \`techvid audit-story "${outJson}"\`, and render with \`techvid build-video "${outJson}"\`.`);
}

// ============================================================================
// COMMAND 9: audit-story <blueprint.json> (rea-video Narrative & Pacing Auditor)
// ============================================================================
function cmdAuditStory(positional) {
  const nav = loadNarrativeEngine();
  if (!nav) throw new Error('narrative.js module not found.');
  const bpPath = positional[0] ? path.resolve(process.cwd(), positional[0]) : null;
  if (!bpPath || !fs.existsSync(bpPath)) {
    throw new Error('Usage: techvid audit-story <blueprint.json>');
  }
  const bp = JSON.parse(fs.readFileSync(bpPath, 'utf8'));
  const report = nav.auditBlueprintNarrative(bp);

  console.log(`\n📝 Narrative & Content Quality Audit (${path.basename(bpPath)}):`);
  console.log(`   Score:           ${report.score}/100`);
  console.log(`   Total Duration:  ${report.totalDurationSec}s (${report.beatCount} beats)`);
  console.log(`   Visual Styles:   ${report.uniqueVisualStyles.length} unique (${report.uniqueVisualStyles.join(', ')})`);
  console.log(`   Narrative Roles: ${report.rolesPresent.join(' -> ')}\n`);

  report.narrativeLine.forEach((b) => {
    console.log(`   #${String(b.index).padStart(2, '0')} ${String(b.start).padStart(3)}s-${String(b.end).padStart(3)}s | ${b.role.toUpperCase().padEnd(7)} | ${b.type.padEnd(18)} | ${String(b.words).padStart(2)} words (${b.sentences} sent, ~${b.estWpm} WPM)`);
  });

  if (report.warnings.length > 0) {
    console.log(`\n⚠️  Content & Pacing Recommendations (${report.warnings.length}):`);
    report.warnings.forEach((w) => console.log(`   - ${w}`));
  } else {
    console.log(`\n✅ Narrative arc, visual diversity, and sentence breathability all PASS 100%!`);
  }
  console.log('');
}

// ============================================================================
// COMMAND 10: init-blueprint <out.json> [--title "..."]
// ============================================================================
function cmdInitBlueprint(positional, flags) {
  const bp = loadBlueprintCompiler();
  if (!bp) throw new Error('blueprint.js module not found.');
  const outJson = path.resolve(process.cwd(), positional[0] || 'video.blueprint.json');
  const title = flags.title || 'How Modern Systems Scale';
  fs.mkdirSync(path.dirname(outJson), { recursive: true });
  fs.writeFileSync(outJson, JSON.stringify(bp.createStarterBlueprint(title), null, 2), 'utf8');
  console.log(`✅ Created Declarative ByteByteGo Blueprint at: ${outJson}`);
  console.log(`   Build & render 1080p MP4 with Senior SA voice in one command:`);
  console.log(`   node "${__filename}" build-video "${outJson}" -o "${outJson.replace(/\.json$/i, '.mp4')}" --voice senior-sa`);
}

// ============================================================================
// COMMAND 9: build-video <blueprint.json> -o <video.mp4> [--voice senior-sa] [--fps 30] [--qa]
// ============================================================================
async function cmdBuildVideo(positional, flags) {
  const bp = loadBlueprintCompiler();
  if (!bp) throw new Error('blueprint.js module not found.');
  const bpPath = positional[0] ? path.resolve(process.cwd(), positional[0]) : null;
  if (!bpPath || !fs.existsSync(bpPath)) {
    throw new Error('Usage: techvid build-video <blueprint.json> -o <video.mp4> [--voice senior-sa] [--fps 30]');
  }

  const outMp4 = path.resolve(process.cwd(), flags.out || bpPath.replace(/\.json$/i, '_1080p.mp4'));
  const workDir = path.dirname(outMp4);
  fs.mkdirSync(workDir, { recursive: true });

  // Ensure standalone bundle is accessible next to compiled HTML
  const bundleSrc = findBundlePath();
  const localBundle = path.join(workDir, 'tech-video-studio.bundle.js');
  if (bundleSrc && !fs.existsSync(localBundle)) {
    fs.copyFileSync(bundleSrc, localBundle);
  }

  const compiledHtml = outMp4.replace(/\.mp4$/i, '.html');
  bp.writeBlueprintHtml(bpPath, compiledHtml, {
    bundleSrc: './tech-video-studio.bundle.js'
  });
  console.log(`🧩 Compiled Blueprint -> ${compiledHtml}`);

  if (flags.qa) {
    await cmdQa([compiledHtml], { 'out-dir': path.join(workDir, 'qa_output') });
  }

  const renderFlags = {
    ...flags,
    out: outMp4,
    fps: flags.fps || '30',
    voice: flags.voice !== undefined ? flags.voice : 'senior-sa',
    'no-sfx': flags.sfx ? false : true
  };
  await cmdRender([compiledHtml], renderFlags);
}

// ============================================================================
// COMMAND 10: install-skill [--target antigravity|claude|cursor|codex] [--dest <dir>]
// ============================================================================
function copyDirRecursive(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDirRecursive(s, d);
    else fs.copyFileSync(s, d);
  }
}

function cmdInstallSkill(flags) {
  const target = String(flags.target || 'local').toLowerCase();
  const home = os.homedir();

  const defaultTargets = {
    antigravity: path.join(home, '.gemini/config/skills/tech-video-studio'),
    gemini: path.join(home, '.gemini/config/skills/tech-video-studio'),
    claude: path.join(home, '.claude/skills/tech-video-studio'),
    codex: path.join(home, '.codex/skills/tech-video-studio'),
    cursor: path.resolve(process.cwd(), '.agents/skills/tech-video-studio'),
    local: path.resolve(process.cwd(), '.agents/skills/tech-video-studio')
  };

  const dest = flags.dest ? path.resolve(process.cwd(), flags.dest) : (defaultTargets[target] || defaultTargets.local);
  const skillSrc = path.join(ROOT, 'skills/tech-video-studio');

  copyDirRecursive(skillSrc, dest);
  // Ensure standalone CLI, SFX synth, & metaphor DB are bundled inside skill scripts/
  const scriptsDir = path.join(dest, 'scripts');
  fs.mkdirSync(scriptsDir, { recursive: true });
  fs.copyFileSync(__filename, path.join(scriptsDir, 'tech-video-studio.js'));
  const sfxSrc = path.join(ROOT, 'src/audio/sfx-gen.js');
  if (fs.existsSync(sfxSrc)) fs.copyFileSync(sfxSrc, path.join(scriptsDir, 'sfx-gen.js'));
  const vsSrc = path.join(ROOT, 'src/audio/voicestudio.js');
  if (fs.existsSync(vsSrc)) fs.copyFileSync(vsSrc, path.join(scriptsDir, 'voicestudio.js'));
  const reaSrc = path.join(ROOT, 'src/core/rea-analyzer.js');
  if (fs.existsSync(reaSrc)) fs.copyFileSync(reaSrc, path.join(scriptsDir, 'rea-analyzer.js'));
  const bpSrc = path.join(ROOT, 'src/core/blueprint.js');
  if (fs.existsSync(bpSrc)) fs.copyFileSync(bpSrc, path.join(scriptsDir, 'blueprint.js'));
  const navSrc = path.join(ROOT, 'src/core/narrative.js');
  if (fs.existsSync(navSrc)) fs.copyFileSync(navSrc, path.join(scriptsDir, 'narrative.js'));
  const mPath = findMetaphorsPath();
  if (mPath) fs.copyFileSync(mPath, path.join(scriptsDir, 'metaphors.json'));
  const bPath = findBundlePath();
  if (bPath) fs.copyFileSync(bPath, path.join(scriptsDir, 'tech-video-studio.bundle.js'));

  console.log(`✅ Installed "tech-video-studio" (v3.0 Narrative-First ByteByteGo + rea-video Edition) AI Skill to: ${dest}`);
}

function printHelp() {
  console.log(`
Tech Video Studio CLI (v3.0.0 — Narrative-First ByteByteGo + VoiceStudio + rea-video Edition)

Usage:
  techvid plan-story "<Topic>" [--arc deep-dive-3min|speed-paradox-2min|quick-explainer-60s] [-o out.json]
                                                  Scaffold a rea-video 8-role Narrative-First ByteByteGo Blueprint
  techvid audit-story <blueprint.json>            Audit narrative arc (hook->context->turn->info->proof->payoff) & pacing
  techvid init-blueprint <out.json> [--title "..."]
                                                  Create a starter declarative JSON video blueprint
  techvid build-video <blueprint.json> -o <out.mp4> [--voice senior-sa] [--fps 30] [--qa]
                                                  One-command compile + Steffan narration (-5%, +280ms pauses) + 1080p MP4
  techvid rea-learn <ref.mp4> [-o VIDEO.md]       Reverse-engineer a ByteByteGo video's layout, motion & easing
  techvid rea-compare <ref.mp4> <remake.mp4>      Score remake parity against a reference ByteByteGo video
  techvid metaphor <keywords>                     Search diverse visual metaphors & avoid box monotony
  techvid new <folder> [--title "Video Title"]    Scaffold a custom 1080p60 HTML5 Canvas explainer project
  techvid qa <scene.html> [--times 8,22,36,54]    Capture keyframes + negative-space QA + 2x2 contact sheet
  techvid voice status [--url http://localhost:3900]
                                                  Check debpalash/VoiceStudio connection & Senior SA personas
  techvid voice narrate <scene.html> -o <out.wav> [--persona senior-sa] [--lang en|vi] [--rate -5%]
                                                  Synthesize sentence-paused Senior SA voiceover track
  techvid render <scene.html> -o <video.mp4>      Deterministic frame-exact H.264 MP4 render
          [--voice senior-sa] [--audio voice.mp3] [--fps 60] [--no-sfx] [--retina]
  techvid install-skill [--target antigravity|claude|cursor|codex|local] [--dest <path>]
`);
}

(async () => {
  const [cmd, ...rest] = process.argv.slice(2);
  const { positional, flags } = parseFlags(rest);

  try {
    switch (cmd) {
      case 'plan-story':
      case 'story':
        cmdPlanStory(positional, flags);
        break;
      case 'audit-story':
      case 'audit':
        cmdAuditStory(positional);
        break;
      case 'init-blueprint':
      case 'blueprint':
        cmdInitBlueprint(positional, flags);
        break;
      case 'build-video':
      case 'create':
        await cmdBuildVideo(positional, flags);
        break;
      case 'metaphor':
      case 'metaphors':
        cmdMetaphor(positional);
        break;
      case 'new':
      case 'init':
        cmdNew(positional, flags);
        break;
      case 'qa':
        await cmdQa(positional, flags);
        break;
      case 'rea-learn':
      case 'learn':
        cmdReaLearn(positional, flags);
        break;
      case 'rea-compare':
      case 'compare':
        cmdReaCompare(positional, flags);
        break;
      case 'voice':
      case 'voicestudio':
        await cmdVoice(positional, flags);
        break;
      case 'render':
        await cmdRender(positional, flags);
        break;
      case 'install-skill':
        cmdInstallSkill(flags);
        break;
      default:
        printHelp();
        break;
    }
  } catch (err) {
    console.error(`❌ Error: ${err.message}`);
    process.exit(1);
  }
})();
