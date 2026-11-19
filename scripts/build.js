#!/usr/bin/env node
'use strict';

/**
 * Zero-dependency browser bundler.
 * Combines vendor/gsap.min.js + CommonJS modules in src/ into standalone dist/tech-video-studio.bundle.js
 * so any HTML scene works 100% offline in headless Chrome without external CDNs.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const modules = {
  './core/theme': fs.readFileSync(path.join(ROOT, 'src/core/theme.js'), 'utf8'),
  './core/camera': fs.readFileSync(path.join(ROOT, 'src/core/camera.js'), 'utf8'),
  './core/draw-effects': fs.readFileSync(path.join(ROOT, 'src/core/draw-effects.js'), 'utf8'),
  './core/layout': fs.readFileSync(path.join(ROOT, 'src/core/layout.js'), 'utf8'),
  './core/connectors': fs.readFileSync(path.join(ROOT, 'src/core/connectors.js'), 'utf8'),
  './core/icons': fs.readFileSync(path.join(ROOT, 'src/core/icons.js'), 'utf8'),
  './illustrations/primitives': fs.readFileSync(path.join(ROOT, 'src/illustrations/primitives.js'), 'utf8'),
  './illustrations/archetypes': fs.readFileSync(path.join(ROOT, 'src/illustrations/archetypes.js'), 'utf8'),
  './core/runner': fs.readFileSync(path.join(ROOT, 'src/core/runner.js'), 'utf8'),
  './index': fs.readFileSync(path.join(ROOT, 'src/index.js'), 'utf8')
};

const gsapCode = fs.readFileSync(path.join(ROOT, 'vendor/gsap.min.js'), 'utf8');

function normalizeId(fromId, req) {
  if (!req.startsWith('.')) return req;
  const fromDir = path.posix.dirname(fromId);
  return './' + path.posix.normalize(path.posix.join(fromDir, req)).replace(/^\.\//, '');
}

const moduleEntries = Object.entries(modules)
  .map(([id, code]) => {
    return `  ${JSON.stringify(id)}: function(module, exports, __require) {\n` +
      `    const require = (r) => __require(${JSON.stringify(id)}, r);\n` +
      code +
      `\n  }`;
  })
  .join(',\n');

const bundle = `/* TechVideoStudio Standalone Bundle v2.0.0 (Includes GSAP + Studio Primitives) */\n` +
  `${gsapCode}\n` +
  `;(function() {\n` +
  `  const __modules = {\n${moduleEntries}\n  };\n` +
  `  const __cache = {};\n` +
  `  function __normalize(fromId, req) {\n` +
  `    if (!req.startsWith('.')) return req;\n` +
  `    const parts = (fromId.split('/').slice(0, -1).join('/') + '/' + req).split('/');\n` +
  `    const out = [];\n` +
  `    for (const p of parts) {\n` +
  `      if (!p || p === '.') continue;\n` +
  `      if (p === '..') out.pop();\n` +
  `      else out.push(p);\n` +
  `    }\n` +
  `    return './' + out.join('/');\n` +
  `  }\n` +
  `  function __require(fromId, req) {\n` +
  `    const id = __normalize(fromId, req);\n` +
  `    if (__cache[id]) return __cache[id].exports;\n` +
  `    if (!__modules[id]) throw new Error('Module not found: ' + id + ' (from ' + fromId + ')');\n` +
  `    const mod = { exports: {} };\n` +
  `    __cache[id] = mod;\n` +
  `    __modules[id](mod, mod.exports, __require);\n` +
  `    return mod.exports;\n` +
  `  }\n` +
  `  __require('./x', './index');\n` +
  `})();\n`;

const outPath = path.join(ROOT, 'dist/tech-video-studio.bundle.js');
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, bundle, 'utf8');

// Also sync standalone CLI, metaphor DB, and bundle into skills/tech-video-studio/scripts/
// so standalone skill copies work anywhere without needing the repo root!
const skillScriptsDir = path.join(ROOT, 'skills/tech-video-studio/scripts');
fs.mkdirSync(skillScriptsDir, { recursive: true });
fs.writeFileSync(path.join(skillScriptsDir, 'tech-video-studio.bundle.js'), bundle, 'utf8');
fs.copyFileSync(path.join(ROOT, 'bin/tech-video-studio.js'), path.join(skillScriptsDir, 'tech-video-studio.js'));
fs.copyFileSync(path.join(ROOT, 'src/audio/sfx-gen.js'), path.join(skillScriptsDir, 'sfx-gen.js'));
fs.copyFileSync(path.join(ROOT, 'src/audio/voicestudio.js'), path.join(skillScriptsDir, 'voicestudio.js'));
fs.copyFileSync(path.join(ROOT, 'src/core/rea-analyzer.js'), path.join(skillScriptsDir, 'rea-analyzer.js'));
fs.copyFileSync(path.join(ROOT, 'src/core/blueprint.js'), path.join(skillScriptsDir, 'blueprint.js'));
fs.copyFileSync(path.join(ROOT, 'data/metaphors.json'), path.join(skillScriptsDir, 'metaphors.json'));

console.log(`Built ${outPath} (${(Buffer.byteLength(bundle) / 1024).toFixed(1)} KB) & synced standalone skill scripts.`);
