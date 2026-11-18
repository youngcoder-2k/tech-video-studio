# Tech Video Studio (`tech-video-studio` v2.0 — ByteByteGo Edition)

> **AI-Ready Visual Motion Graphics Engine & Multi-Agent Skill Kit for Producing Authentic ByteByteGo-Grade 1080p60 YouTube Technical Explainer Videos.**

[![License: MIT](https://img.shields.io/badge/License-MIT-38BDF8.svg)](#license)
[![Resolution: 1920x1080 @ 60fps](https://img.shields.io/badge/Render-1080p60_Deterministic-34D399.svg)](#deterministic-60fps-rendering)
[![AI Skill Ready](https://img.shields.io/badge/AI_Skill-Antigravity_%7C_Claude_%7C_Cursor_%7C_Codex-A78BFA.svg)](#install-as-an-ai-skill)

**[🇻🇳 Đọc tài liệu Tiếng Việt (Read in Vietnamese)](./README.vi.md)**

---

## ✨ What's New in v2.0 (ByteByteGo Visual Parity Upgrade)

Version 2.0 was engineered from frame-by-frame inspection of real **ByteByteGo** YouTube videos (*HTTP1 vs HTTP2 vs HTTP3*, *Database ACID Transactions*, *Linux Boot Process*) to close the gap between generic code-generated slides and professional motion graphics:

1. **Authentic `#262626` Charcoal & Organic Wave Backdrop**: Replaces stark pitch-black backgrounds with ByteByteGo's warm `#262626` matte charcoal canvas and two-layer organic Bezier waves (`backdrop: 'waves' | 'speedlines' | 'blueprint'`).
2. **Translucent Tinted Glass Containers (`Theme.drawGlassCard`)**: Semi-transparent glass cards (`rgba(..., 0.28)`) in 6 curated tints (`teal`, `emerald`, `plum`, `olive`, `crimson`, `slate`) with solid pill badges docked at the top corner.
3. **Progressive Vector Self-Drawing (`Effects.strokeDraw`) & Typewriter Text (`Effects.typeText`)**: Every diagram node, server stack, and connector draws its own vector stroke progressively from `0 -> 1` before filling.
4. **Cinematic 2D Virtual Camera (`Camera.zoomTo`, `Camera.reset`)**: Smoothly zoom into a specific subsystem or transaction step and pan across the architecture instead of crowding everything at 1x scale.
5. **28 Built-In Visual Primitives & Scene Archetypes**:
   - **14 New ByteByteGo Archetypes**: `isometricServerStack`, `foldedFileBadge`, `wireframeBrowser`, `wireframeCylinderDb`, `lineArtUser`, `stateMutationCard`, `brokenLinkPlug`, `evolutionTimeline`, `heroMetricSlam`, `comparisonSplitTable`, `swimlaneSequence`, `consistentHashRing`, `bTreeHierarchy`, `networkPacketFrame`.
   - **14 Hardware & Runtime Primitives**: `codeEditorWindow`, `compilerGear`, `bytecodeCapsule`, `hardwareMachine`, `tieredVault`, `xraySecurityScanner`, `lifoStackChamber`, `memoryHeapGrid`, `sequentialReader`, `turboForge`, `nativeAssemblyBlock`, `siliconCpuDie`, `isometricDatabase`, `cacheMemoryMatrix`.
6. **Procedural 48kHz Stereo Motion SFX Synthesizer (`src/audio/sfx-gen.js`)**: Automatically synthesizes subtle broadcast sound cues (`pop`, `draw`, `whoosh`, `tick`, `success`, `error`) and muxes them into the final MP4 with zero external audio dependencies.

---

## 🚀 Quick Start

### 1. Install Dependencies
Requires **Node.js >= 18**, **Google Chrome / Chromium**, and **FFmpeg**.
```bash
git clone https://github.com/your-username/tech-video-studio.git
cd tech-video-studio
npm install
npm test
```

### 2. Search Domain Metaphors
```bash
npx techvid metaphor "acid transaction rollback"
npx techvid metaphor "http2 multiplexing"
```

### 3. Scaffold, QA, and Render
```bash
# Scaffold a new 1080p60 project
npx techvid new ./my-explainer --title "How HTTP/2 Multiplexing Works"

# Capture scene keyframes + Negative-Space Telemetry + 2x2 QA Contact Sheet
npx techvid qa ./examples/bytebytego-system-design/index.html

# Render frame-exact 60FPS H.264 MP4 (with auto-synthesized Motion SFX)
npx techvid render ./examples/bytebytego-system-design/index.html -o ./system_design_1080p60.mp4
```

---

## 🤖 Install as an AI Skill (Antigravity, Claude Code, Cursor, Codex)

Install the portable self-contained skill (includes the standalone browser bundle, metaphor catalog, and SFX synthesizer) into your AI coding agent:

```bash
# Google Antigravity / Gemini CLI (~/.gemini/config/skills/tech-video-studio)
npx techvid install-skill --target antigravity

# Claude Code (~/.claude/skills/tech-video-studio)
npx techvid install-skill --target claude

# Cursor / Project-local (.agents/skills/tech-video-studio)
npx techvid install-skill --target cursor
```

---

## 📄 License

MIT
