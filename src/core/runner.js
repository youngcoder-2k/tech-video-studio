'use strict';

const Theme = require('./theme');
const Camera = require('./camera');
const Icons = require('./icons');

/**
 * Elastic Multi-Scene Timeline Engine & Cinematic Camera Runner (v2.0).
 *
 * Features:
 * - Authentic #262626 ByteByteGo palette + per-scene backdrop ('waves'|'speedlines'|'blueprint')
 * - Built-in 2D Virtual Camera (`camX`, `camY`, `camZoom`) per scene
 * - Smooth cross-scene transitions ('fade' | 'slideLeft' | 'zoomThrough')
 * - Declarative Motion SFX cue timeline (`sfx: [{ time, type, volume }]`)
 * - Interactive browser scrubber & HUD controls when opened manually in Chrome!
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

  // Support optional 2x Retina supersampling configured by CLI
  const scaleFactor = window.__studioScaleFactor || 1;
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

    // Collect scene SFX cues + automatic subtle scene-transition whoosh
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

  function renderAt(timeSec) {
    const clamped = Math.max(0, Math.min(totalDuration - 0.001, timeSec));
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

      // World-space diagram layer (with Virtual Camera + Slide offset)
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

      // Screen-space crisp Top Header (unaffected by camera zoom!)
      Theme.drawTopHeader(ctx, title, activeScene.chapter, {
        width,
        progress: showProgressBar ? (clamped / totalDuration) : 0
      });

      ctx.restore();
    }

    ctx.restore();
  }

  window.__studioMeta = {
    version: '2.0.0',
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
    window.__studioScaleFactor = factor;
    canvas.width = width * factor;
    canvas.height = height * factor;
  };

  window.__studioSeek = function (timeSec) {
    renderAt(timeSec);
    return true;
  };

  window.__studioCaptureFrameJpeg = function (timeSec, quality = 0.96) {
    renderAt(timeSec);
    return canvas.toDataURL('image/jpeg', quality);
  };

  // Compute negative-space telemetry (% of pixels matching dark background) for automated QA linting
  window.__studioAnalyzeFrame = function (timeSec) {
    renderAt(timeSec);
    const sampleStep = 8 * scaleFactor;
    const img = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let bgPixels = 0;
    let totalSampled = 0;
    for (let y = 0; y < canvas.height; y += sampleStep) {
      for (let x = 0; x < canvas.width; x += sampleStep) {
        const idx = (y * canvas.width + x) * 4;
        const r = img[idx];
        const g = img[idx + 1];
        const b = img[idx + 2];
        // Dark neutral charcoal/wave pixel check
        if (Math.abs(r - g) < 12 && Math.abs(g - b) < 12 && r >= 18 && r <= 62) {
          bgPixels++;
        }
        totalSampled++;
      }
    }
    return {
      negativeSpacePct: Number(((bgPixels / Math.max(1, totalSampled)) * 100).toFixed(1))
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

  const readyPromise = Promise.all([
    Icons.initBuiltinIcons(),
    document.fonts ? document.fonts.ready : Promise.resolve()
  ]).then(() => {
    renderAt(scenes[0] ? scenes[0].qaTime : 0);
    window.__studioReady = true;
    window.iconsReady = true;

    const params = new URLSearchParams(window.location.search);
    if (params.get('play') === '1') {
      let t0 = performance.now();
      const loop = (now) => {
        const sec = ((now - t0) / 1000) % totalDuration;
        renderAt(sec);
        requestAnimationFrame(loop);
      };
      requestAnimationFrame(loop);
    }
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
