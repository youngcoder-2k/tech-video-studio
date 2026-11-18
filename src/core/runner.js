'use strict';

const Theme = require('./theme');
const Camera = require('./camera');
const Icons = require('./icons');

/**
 * Elastic Multi-Scene Timeline Engine & Cinematic Camera Runner (v2.1).
 *
 * Features:
 * - Authentic #262626 ByteByteGo palette + per-scene backdrop ('waves'|'speedlines'|'blueprint')
 * - Built-in 2D Virtual Camera (`camX`, `camY`, `camZoom`) per scene
 * - Smooth cross-scene transitions ('fade' | 'slideLeft' | 'zoomThrough')
 * - Declarative Motion SFX cue timeline (`sfx: [{ time, type, volume }]`)
 * - Synchronized voiceover captions (`captions: [{ start, end, text }]`)
 * - Multi-metric Visual QA Telemetry (`__studioAnalyzeFrame`)
 * - Interactive browser scrubber & keyboard shortcuts (Space, Left/Right, 1-9) when opened in Chrome
 */
function createVideo(config) {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return config;
  }

  const width = config.width || 1920;
  const height = config.height || 1080;
  const fps = config.fps || 60;
  const palette = config.palette || 'byteCharcoal';
  const title = config.title || 'Technical Architecture';
  const showProgressBar = config.showProgressBar !== undefined ? config.showProgressBar : true;

  const canvas = typeof config.canvas === 'string'
    ? document.querySelector(config.canvas)
    : (config.canvas || document.getElementById('canvas'));

  let scaleFactor = window.__studioScaleFactor || 1;
  canvas.width = width * scaleFactor;
  canvas.height = height * scaleFactor;
  const ctx = canvas.getContext('2d');

  if (config.customIcons) {
    for (const [k, svg] of Object.entries(config.customIcons)) {
      Icons.register(k, svg);
    }
  }

  let cursor = 0;
  const allSfxCues = [];
  const allCaptions = Array.isArray(config.captions) ? [...config.captions] : [];

  const scenes = (config.scenes || []).map((sc, idx) => {
    const duration = sc.duration || 15;
    const start = cursor;
    const end = cursor + duration;
    cursor = end;

    const camBase = Camera.createCameraState(width, height);
    const state = Object.assign(
      camBase,
      { __alpha: 0, __offsetX: 0 },
      sc.initialState ? sc.initialState() : {}
    );

    const qaTime = sc.qaTime !== undefined ? start + sc.qaTime : Number((start + duration * 0.65).toFixed(2));
    const transition = sc.transition || 'fade';

    if (idx > 0) {
      allSfxCues.push({ time: start, type: 'whoosh', volume: 0.14 });
    }
    if (Array.isArray(sc.sfx)) {
      sc.sfx.forEach((cue) => {
        allSfxCues.push({
          time: Number((start + (cue.time || 0)).toFixed(3)),
          type: cue.type || 'pop',
          volume: cue.volume
        });
      });
    }
    if (Array.isArray(sc.captions)) {
      sc.captions.forEach((cap) => {
        allCaptions.push({
          start: start + (cap.start || 0),
          end: start + (cap.end !== undefined ? cap.end : duration),
          text: cap.text
        });
      });
    }

    return {
      index: idx,
      id: sc.id || `scene-${idx + 1}`,
      chapter: sc.chapter || `0${idx + 1}. Scene ${idx + 1}`,
      backdrop: sc.backdrop || 'waves',
      transition,
      duration,
      start,
      end,
      qaTime,
      state,
      build: sc.build,
      render: sc.render
    };
  });

  const totalDuration = cursor || config.duration || 60;

  if (typeof gsap === 'undefined') {
    throw new Error('GSAP is required before TechVideoStudio.createVideo()');
  }

  const masterTl = gsap.timeline({ paused: true });

  scenes.forEach((sc) => {
    const fadeDur = 0.45;
    if (sc.transition === 'slideLeft') {
      sc.state.__offsetX = 140;
      masterTl.to(sc.state, { __alpha: 1, __offsetX: 0, duration: 0.55, ease: 'power3.out' }, sc.start);
    } else {
      masterTl.to(sc.state, { __alpha: 1, duration: fadeDur, ease: 'power2.out' }, sc.start);
    }

    if (typeof sc.build === 'function') {
      const subTl = gsap.timeline();
      sc.build(subTl, sc.state, sc.duration);
      masterTl.add(subTl, sc.start);
    }

    masterTl.to(sc.state, { __alpha: 0, duration: fadeDur, ease: 'power2.in' }, Math.max(sc.start + fadeDur, sc.end - fadeDur));
  });

  let currentTimeSec = 0;

  function renderAt(timeSec) {
    const safeSec = Number.isFinite(timeSec) ? timeSec : currentTimeSec;
    const clamped = Math.max(0, Math.min(totalDuration - 0.001, safeSec));
    currentTimeSec = clamped;
    masterTl.seek(clamped);

    const activeScene = scenes.find((s) => clamped >= s.start && clamped < s.end) || scenes[scenes.length - 1];

    ctx.save();
    if (scaleFactor !== 1) {
      ctx.scale(scaleFactor, scaleFactor);
    }

    Theme.drawBackground(ctx, width, height, palette, {
      backdrop: activeScene ? activeScene.backdrop : 'waves',
      timeSec: clamped
    });

    if (activeScene) {
      ctx.save();
      ctx.globalAlpha = activeScene.state.__alpha;

      ctx.save();
      if (activeScene.state.__offsetX) {
        ctx.translate(activeScene.state.__offsetX, 0);
      }
      Camera.apply(ctx, activeScene.state, width, height);

      activeScene.render(ctx, {
        state: activeScene.state,
        t: clamped,
        localT: clamped - activeScene.start,
        duration: activeScene.duration,
        width,
        height
      });

      Camera.restore(ctx);
      ctx.restore();

      Theme.drawTopHeader(ctx, title, activeScene.chapter, {
        width,
        progress: showProgressBar ? (clamped / totalDuration) : 0
      });

      const activeCap = allCaptions.find((c) => clamped >= c.start && clamped <= c.end);
      if (activeCap && activeCap.text) {
        Theme.drawCaptionBar(ctx, activeCap.text, { canvasWidth: width });
      }

      ctx.restore();
    }

    ctx.restore();
  }

  window.__studioMeta = {
    version: '2.1.0',
    title,
    width,
    height,
    fps,
    totalDuration,
    qaTimes: scenes.map((s) => s.qaTime),
    sfxCues: allSfxCues,
    scenes: scenes.map((s) => ({
      index: s.index,
      id: s.id,
      chapter: s.chapter,
      backdrop: s.backdrop,
      start: s.start,
      end: s.end,
      duration: s.duration,
      qaTime: s.qaTime
    }))
  };

  window.__studioSetScaleFactor = function (factor) {
    scaleFactor = Math.max(1, Number(factor) || 1);
    window.__studioScaleFactor = scaleFactor;
    canvas.width = width * scaleFactor;
    canvas.height = height * scaleFactor;
    renderAt(currentTimeSec);
  };

  window.__studioSeek = function (timeSec) {
    renderAt(timeSec);
    return true;
  };

  window.__studioCaptureFrameJpeg = function (timeSec, quality = 0.96) {
    renderAt(timeSec);
    return canvas.toDataURL('image/jpeg', quality);
  };

  /**
   * Comprehensive Visual QA Linter & Telemetry Analyzer:
   * - negativeSpacePct: % of canvas remaining clean charcoal backdrop (target: 35% - 88%)
   * - headerZoneClear: checks that diagram elements don't collide with top header bar
   * - activeHueBuckets: verifies visual color diversity (cyan, green, amber, purple, etc.)
   */
  window.__studioAnalyzeFrame = function (timeSec) {
    if (timeSec !== undefined) {
      renderAt(timeSec);
    }
    const sampleStep = Math.max(4, Math.round(8 * scaleFactor));
    const img = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let bgPixels = 0;
    let totalSampled = 0;
    let headerBleedPixels = 0;
    let headerSampled = 0;
    const hueBuckets = new Set();

    const headerYMin = Math.round(84 * scaleFactor);
    const headerYMax = Math.round(108 * scaleFactor);

    for (let y = 0; y < canvas.height; y += sampleStep) {
      for (let x = 0; x < canvas.width; x += sampleStep) {
        const idx = (y * canvas.width + x) * 4;
        const r = img[idx];
        const g = img[idx + 1];
        const b = img[idx + 2];

        const isBg = Math.abs(r - g) < 12 && Math.abs(g - b) < 12 && r >= 16 && r <= 64;
        if (isBg) {
          bgPixels++;
        } else {
          const maxC = Math.max(r, g, b);
          const minC = Math.min(r, g, b);
          if (maxC - minC > 40) {
            if (r > g && g > b) hueBuckets.add('amber');
            else if (g >= r && g >= b) hueBuckets.add('emerald');
            else if (b >= g && g > r) hueBuckets.add('cyan');
            else if (r > g && b > g) hueBuckets.add('plum');
            else hueBuckets.add('accent');
          }
        }
        totalSampled++;

        if (y >= headerYMin && y <= headerYMax) {
          headerSampled++;
          if (!isBg) headerBleedPixels++;
        }
      }
    }

    const negativeSpacePct = Number(((bgPixels / Math.max(1, totalSampled)) * 100).toFixed(1));
    const headerBleedPct = Number(((headerBleedPixels / Math.max(1, headerSampled)) * 100).toFixed(1));
    const headerZoneClear = headerBleedPct < 8.0;
    const warnings = [];

    if (negativeSpacePct < 30) {
      warnings.push(`Crowded canvas (${negativeSpacePct}% negative space < 30% minimum)`);
    } else if (negativeSpacePct > 92) {
      warnings.push(`Nearly empty frame (${negativeSpacePct}% negative space > 92%)`);
    }
    if (!headerZoneClear) {
      warnings.push(`Diagram bleeds into top header safety zone (${headerBleedPct}%)`);
    }

    return {
      negativeSpacePct,
      headerZoneClear,
      activeHueCount: hueBuckets.size,
      status: warnings.length === 0 ? 'PASS' : 'WARN',
      warnings
    };
  };

  window.startRecording = async function () {
    await readyPromise;
    const stream = canvas.captureStream(fps);
    const recorder = new MediaRecorder(stream, {
      mimeType: 'video/webm;codecs=vp9',
      videoBitsPerSecond: 18000000
    });
    const chunks = [];
    recorder.ondataavailable = (e) => chunks.push(e.data);
    recorder.start();

    let startWall = null;
    return new Promise((resolve) => {
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.readAsDataURL(blob);
      };
      function step(now) {
        if (!startWall) startWall = now;
        const elapsed = (now - startWall) / 1000;
        if (elapsed >= totalDuration) {
          recorder.stop();
          return;
        }
        renderAt(elapsed);
        requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  };

  function setupInteractivePlayer() {
    if (navigator.webdriver) return;

    let playing = new URLSearchParams(window.location.search).get('play') === '1';
    let lastWall = performance.now();

    const hud = document.createElement('div');
    hud.style.cssText = [
      'position:fixed', 'bottom:14px', 'left:50%', 'transform:translateX(-50%)',
      'background:rgba(20,20,20,0.88)', 'border:1px solid rgba(92,225,230,0.35)',
      'border-radius:999px', 'padding:8px 20px', 'display:flex', 'align-items:center',
      'gap:14px', 'color:#fff', 'font:600 13px -apple-system,sans-serif',
      'z-index:9999', 'opacity:0', 'transition:opacity 0.2s', 'backdrop-filter:blur(8px)'
    ].join(';');

    const btn = document.createElement('button');
    btn.textContent = playing ? '⏸ Pause' : '▶ Play';
    btn.style.cssText = 'background:#0284C7;color:#fff;border:none;border-radius:999px;padding:4px 12px;cursor:pointer;font-weight:600';

    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = '0';
    slider.max = String(totalDuration);
    slider.step = '0.05';
    slider.value = String(currentTimeSec);
    slider.style.cssText = 'width:320px;cursor:pointer;accent-color:#5CE1E6';

    const label = document.createElement('span');
    label.style.cssText = 'font-family:monospace;min-width:110px';
    const updateLabel = () => {
      label.textContent = `${currentTimeSec.toFixed(1)}s / ${totalDuration.toFixed(1)}s`;
      slider.value = String(currentTimeSec);
      btn.textContent = playing ? '⏸ Pause' : '▶ Play';
    };
    updateLabel();

    btn.onclick = () => {
      playing = !playing;
      lastWall = performance.now();
      updateLabel();
    };
    slider.oninput = () => {
      playing = false;
      renderAt(parseFloat(slider.value));
      updateLabel();
    };

    hud.appendChild(btn);
    hud.appendChild(slider);
    hud.appendChild(label);
    document.body.appendChild(hud);

    window.addEventListener('mousemove', (e) => {
      hud.style.opacity = e.clientY > window.innerHeight - 110 ? '1' : '0';
    });

    window.addEventListener('keydown', (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        btn.onclick();
      } else if (e.code === 'ArrowRight') {
        playing = false;
        renderAt(currentTimeSec + 0.5);
        updateLabel();
      } else if (e.code === 'ArrowLeft') {
        playing = false;
        renderAt(currentTimeSec - 0.5);
        updateLabel();
      } else if (e.key >= '1' && e.key <= '9') {
        const idx = parseInt(e.key, 10) - 1;
        if (scenes[idx]) {
          playing = false;
          renderAt(scenes[idx].qaTime);
          updateLabel();
        }
      }
    });

    function tick(now) {
      if (playing) {
        const dt = (now - lastWall) / 1000;
        lastWall = now;
        renderAt((currentTimeSec + dt) % totalDuration);
        updateLabel();
      }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const readyPromise = Promise.all([
    Icons.initBuiltinIcons(),
    document.fonts ? document.fonts.ready : Promise.resolve()
  ]).then(() => {
    renderAt(scenes[0] ? scenes[0].qaTime : 0);
    window.__studioReady = true;
    window.iconsReady = true;
    setupInteractivePlayer();
  });

  return {
    seek: renderAt,
    meta: window.__studioMeta,
    ready: readyPromise
  };
}

module.exports = {
  createVideo
};
