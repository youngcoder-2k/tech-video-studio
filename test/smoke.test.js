'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

const ROOT = path.resolve(__dirname, '..');
const Studio = require('../src/index');

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

test('Standalone browser bundle and standalone skill assets exist', () => {
  const distBundle = path.join(ROOT, 'dist/tech-video-studio.bundle.js');
  const skillBundle = path.join(ROOT, 'skills/tech-video-studio/scripts/tech-video-studio.bundle.js');
  const skillCli = path.join(ROOT, 'skills/tech-video-studio/scripts/tech-video-studio.js');
  assert.ok(fs.existsSync(distBundle), 'dist bundle missing');
  assert.ok(fs.existsSync(skillBundle), 'skill bundle missing');
  assert.ok(fs.existsSync(skillCli), 'skill CLI missing');
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

test('CLI metaphor search returns domain-specific visual metaphors', () => {
  const out = execFileSync(process.execPath, [
    path.join(ROOT, 'bin/tech-video-studio.js'),
    'metaphor',
    'stack heap gc'
  ], { encoding: 'utf8' });

  assert.match(out, /stack-vs-heap-memory/);
  assert.match(out, /lifoStackChamber/);
});
