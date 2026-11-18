'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

const ROOT = path.resolve(__dirname, '..');
const Studio = require('../src/index');
const SfxGen = require('../src/audio/sfx-gen');

test('Studio exposes Camera, Effects, Connectors (incl. curvedArrow & flowArrow), and ByteByteGo Theme', () => {
  assert.ok(Studio.Theme.PALETTES.byteCharcoal, 'byteCharcoal palette exists');
  assert.equal(Studio.Theme.PALETTES.byteCharcoal.bg, '#262626');
  assert.ok(Studio.Theme.GLASS_TINTS.teal, 'GLASS_TINTS.teal exists');
  assert.equal(typeof Studio.Theme.drawGlassCard, 'function');
  assert.equal(typeof Studio.Theme.drawCaptionBar, 'function');
  assert.equal(typeof Studio.Camera.createCameraState, 'function');
  assert.equal(typeof Studio.Camera.zoomTo, 'function');
  assert.equal(typeof Studio.Effects.strokeDraw, 'function');
  assert.equal(typeof Studio.Effects.typeText, 'function');
  assert.equal(typeof Studio.Effects.crossOutFailure, 'function');
  assert.equal(typeof Studio.Connectors.solidArrow, 'function');
  assert.equal(typeof Studio.Connectors.flowArrow, 'function');
  assert.equal(typeof Studio.Connectors.curvedArrow, 'function');
  assert.equal(typeof Studio.Connectors.elbowArrow, 'function');
});

test('All 19 ByteByteGo high-retention archetypes are merged into Studio.Illustrations', () => {
  const expectedArchetypes = [
    'isometricServerStack',
    'foldedFileBadge',
    'wireframeBrowser',
    'wireframeCylinderDb',
    'lineArtUser',
    'stateMutationCard',
    'brokenLinkPlug',
    'evolutionTimeline',
    'heroMetricSlam',
    'comparisonSplitTable',
    'swimlaneSequence',
    'consistentHashRing',
    'bTreeHierarchy',
    'networkPacketFrame',
    'loadBalancerRouter',
    'pubSubTopicBox',
    'circuitBreakerSwitch',
    'cdnEdgeGlobe',
    'rateLimiterBucket'
  ];
  for (const fnName of expectedArchetypes) {
    assert.equal(typeof Studio.Illustrations[fnName], 'function', `Missing archetype: ${fnName}`);
  }
});

test('Built-in SVG Icon Registry includes 22 system design & backend icons + Icons.draw helper', () => {
  const names = Studio.Icons.listNames();
  assert.ok(names.length >= 22, `Expected >= 22 icons, got ${names.length}`);
  for (const requiredIcon of ['kafkaLogo', 'redisCube', 'postgresElephant', 'kubernetesWheel', 'rustGear', 'goGopher']) {
    assert.ok(names.includes(requiredIcon), `Missing built-in icon: ${requiredIcon}`);
  }
  assert.equal(typeof Studio.Icons.draw, 'function');
});

test('Layout.horizontalPipeline guarantees mathematical left/right margin symmetry', () => {
  const layout = Studio.Layout.horizontalPipeline([380, 420, 380], {
    gap: 210,
    canvasWidth: 1920,
    centerY: 470,
    height: 400
  });

  const leftMargin = layout.stages[0].x;
  const rightMargin = 1920 - layout.stages[layout.stages.length - 1].right;
  assert.equal(leftMargin, rightMargin);
  assert.equal(layout.connectors.length, 2);
});

test('Layout.splitColumns produces symmetrical Left/Right panes', () => {
  const split = Studio.Layout.splitColumns(460, 460, { gap: 540, canvasWidth: 1920 });
  assert.equal(split.left.x, 230);
  assert.equal(1920 - split.right.right, 230);
});

test('Procedural 48kHz Stereo WAV SFX Synthesizer writes valid RIFF WAVE header', () => {
  const tmpWav = path.join(os.tmpdir(), `studio_test_sfx_${Date.now()}.wav`);
  try {
    SfxGen.synthesizeSfxTrack(tmpWav, 2.0, [
      { time: 0.1, type: 'pop' },
      { time: 0.4, type: 'draw' },
      { time: 0.8, type: 'whoosh' },
      { time: 1.2, type: 'tick' },
      { time: 1.5, type: 'success' },
      { time: 1.7, type: 'error' }
    ]);
    assert.ok(fs.existsSync(tmpWav));
    const buf = fs.readFileSync(tmpWav);
    assert.equal(buf.toString('ascii', 0, 4), 'RIFF');
    assert.equal(buf.toString('ascii', 8, 12), 'WAVE');
    assert.equal(buf.readUInt32LE(24), 48000);
  } finally {
    if (fs.existsSync(tmpWav)) fs.unlinkSync(tmpWav);
  }
});

test('Standalone browser bundle and standalone skill assets exist', () => {
  const distBundle = path.join(ROOT, 'dist/tech-video-studio.bundle.js');
  const skillBundle = path.join(ROOT, 'skills/tech-video-studio/scripts/tech-video-studio.bundle.js');
  const skillCli = path.join(ROOT, 'skills/tech-video-studio/scripts/tech-video-studio.js');
  const skillSfx = path.join(ROOT, 'skills/tech-video-studio/scripts/sfx-gen.js');
  assert.ok(fs.existsSync(distBundle), 'dist bundle missing');
  assert.ok(fs.existsSync(skillBundle), 'skill bundle missing');
  assert.ok(fs.existsSync(skillCli), 'skill CLI missing');
  assert.ok(fs.existsSync(skillSfx), 'skill sfx-gen.js missing');
});

test('Antigravity plugin.json and SKILL.md adhere to strict customization schemas', () => {
  const pluginJson = JSON.parse(fs.readFileSync(path.join(ROOT, 'plugin.json'), 'utf8'));
  const allowedFields = new Set([
    'name', 'description', 'logo', 'suggestedPrompts',
    'displayName', 'version', 'author', 'homepage', 'repository', 'disabled'
  ]);
  for (const key of Object.keys(pluginJson)) {
    assert.ok(allowedFields.has(key), `Invalid top-level field in plugin.json: ${key}`);
  }
  assert.ok(fs.existsSync(path.join(ROOT, pluginJson.logo)), 'plugin logo file missing');

  const skillMd = fs.readFileSync(path.join(ROOT, 'skills/tech-video-studio/SKILL.md'), 'utf8');
  assert.match(skillMd, /^---\nname:\s*tech-video-studio\ndescription:/);
});

test('CLI metaphor search returns domain-specific visual metaphors including new system design archetypes', () => {
  const out = execFileSync(process.execPath, [
    path.join(ROOT, 'bin/tech-video-studio.js'),
    'metaphor',
    'circuit-breaker rate-limiter load-balancer'
  ], { encoding: 'utf8' });

  assert.match(out, /circuit-breaker-resilience|token-bucket-rate-limiter|load-balancer-reverse-proxy/);
});
