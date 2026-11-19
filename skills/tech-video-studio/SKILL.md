---
name: tech-video-studio
description: Autonomous pipeline and visual motion graphics engine (v2.0 ByteByteGo Edition) for producing 1080p60 YouTube technical and system design explainer videos. Activate whenever the user wants to create a technical explainer video, system design animation, architecture walkthrough, or ByteByteGo-style visual video.
---

# Tech Video Studio (v2.0 ByteByteGo Edition) — AI Skill Guide

Produce broadcast-grade **1920x1080 @ 60FPS** technical explainer videos with **95%+ visual parity to real ByteByteGo YouTube videos**:
- **Authentic `#262626` Charcoal Canvas** with subtle two-layer organic wave geometry (`backdrop: 'waves' | 'speedlines' | 'blueprint'`)
- **Translucent Tinted Glass Cards** (`Theme.drawGlassCard`) with solid top-corner pill badges (`teal`, `emerald`, `plum`, `olive`, `crimson`, `slate`)
- **Progressive Vector Self-Drawing** (`Effects.strokeDraw`) & **Kinetic Typewriter Text** (`Effects.typeText`)
- **2D Virtual Camera** (`Camera.zoomTo`, `Camera.reset`) for smooth overview-to-detail focus zooms
- **14+ Signature ByteByteGo Archetypes** + **14 Hardware/Memory Primitives** + **Procedural 48kHz Stereo Motion SFX**

---

## 1. The 6 Golden Visual Rules (Mandatory)

1. **Zero Watermarks**: Never draw `bytebytego.com` or third-party channel logos on the canvas.
2. **Ultra-Concise Micro-Labels**: Maximum **2–4 words per diagram label**. Never write paragraphs inside diagrams.
3. **Never Repeat Generic Boxes**: Every component must have a distinct silhouette (`wireframeBrowser`, `isometricServerStack`, `foldedFileBadge`, `lineArtUser`, `consistentHashRing`, `bTreeHierarchy`, `siliconCpuDie`, etc.).
4. **Translucent Tinted Glass Grouping**: Group logical subsystems inside `Theme.drawGlassCard(ctx, x, y, w, h, { tint: 'teal', badge: 'Client Side' })` instead of opaque flat boxes.
5. **Generous Negative Space (`>= 35%`)**: Keep at least 35% of the `#262626` canvas open so the viewer's eye locks immediately onto the active flow.
6. **Mandatory Visual QA (`qa_contact_sheet.jpg`)**: Always run the `qa` command and inspect the 2x2 contact sheet + negative-space telemetry before rendering the final MP4.

---

## 2. Step-by-Step Workflow

### Step 1: Query Domain Visual Metaphors
Search the built-in catalog of 17+ domain archetypes to pick diverse visual structures:
```bash
node skills/tech-video-studio/scripts/tech-video-studio.js metaphor "http acid sharding btree"
```

### Step 2: Scaffold or Author the Multi-Scene HTML Canvas
Scaffold a project or load `tech-video-studio.bundle.js` directly:
```bash
node skills/tech-video-studio/scripts/tech-video-studio.js new ./my-video --title "How HTTP/3 Works"
```

### Step 3: Run Automated Keyframe & Negative-Space QA
Capture keyframes across all scenes and generate `qa_contact_sheet.jpg`:
```bash
node skills/tech-video-studio/scripts/tech-video-studio.js qa ./my-video/index.html
```
View `qa_contact_sheet.jpg` with your file reader/vision tool to verify zero text collisions and `>= 35%` negative space.

### Step 4: Render Deterministic 60FPS H.264 MP4 (+ Senior SA VoiceStudio Narration & Motion SFX)
You can synthesize a human-like **Senior Solutions Architect (`senior-sa`)** voiceover track via [debpalash/VoiceStudio](https://github.com/debpalash/VoiceStudio) (`http://localhost:3900`, with automatic mastered local fallback if VoiceStudio is offline) and mux it with procedural Motion SFX in a single command:

```bash
# Check VoiceStudio status & Senior SA personas
node skills/tech-video-studio/scripts/tech-video-studio.js voice status

# Design a custom Senior SA voice profile in VoiceStudio
node skills/tech-video-studio/scripts/tech-video-studio.js voice design --persona senior-sa

# Render 1080p60 MP4 with Senior SA voiceover + procedural Motion SFX (-14 LUFS mastered)
node skills/tech-video-studio/scripts/tech-video-studio.js render ./my-video/index.html -o ./my-video/final_1080p60.mp4 --voice senior-sa
```
Available `--voice` / `--persona` presets:
- `senior-sa`: Warm, authoritative Senior Solutions Architect (English)
- `staff-engineer`: Crisp, pragmatic Principal / Staff Systems Engineer (English)
- `tech-storyteller`: Engaging ByteByteGo-style YouTube host (English)
- `vi-senior-sa`: Kiến trúc sư giải pháp cấp cao (Tiếng Việt tự nhiên, trầm ấm)

---

## 3. Studio v2.0 API Quick Reference (`window.TechVideoStudio`)

### `Theme` (ByteByteGo `#262626` & Translucent Glass)
- `Theme.drawGlassCard(ctx, x, y, w, h, { tint: 'teal'|'emerald'|'plum'|'olive'|'crimson'|'slate', badge, badgeSide, dashed, progress })`
- `Theme.drawSpotlightMask(ctx, width, height, { x, y, rx, ry, alpha })`
- `Theme.drawTakeawayPill(ctx, text, { y, color })`

### `Camera` (2D Virtual Camera Engine)
- `Camera.zoomTo(tl, state, { x, y, zoom: 1.25, duration: 1.1 }, atTime)`
- `Camera.reset(tl, state, atTime, duration)`

### `Effects` (Vector Self-Draw & Kinetic Typography)
- `Effects.strokeDraw(ctx, (ctx) => { ... }, progress, { stroke, lineWidth, fill })`
- `Effects.typeText(ctx, text, x, y, progress, { font, color, align, cursor })`
- `Effects.crossOutFailure(ctx, cx, cy, size, progress)`
- `Effects.sparkBurst(ctx, cx, cy, progress, { radius, color })`

### `Connectors` (Animated Packet Flows)
- `Connectors.solidArrow(ctx, x1, y1, x2, y2, { progress, dashed, label, color, timeSec })`
- `Connectors.flowArrow(ctx, x1, y1, x2, y2, timeSec, { progress, dashed, color, label })`
- `Connectors.curvedArrow(ctx, x1, y1, x2, y2, { curvature: 0.25, progress, dashed, label, color })`
- `Connectors.elbowArrow(ctx, points, { progress, dashed, label, color })`
- `Connectors.bidirectional(ctx, x1, y1, x2, y2, timeSec, { reqProgress, resProgress, reqLabel, resLabel })`
- `Connectors.laserBeam(ctx, x1, y1, x2, y2, timeSec, { progress, label })`

### `Illustrations` (33 Built-In Archetypes & Hardware Primitives)
- **ByteByteGo System Design Archetypes (19)**:
  - `isometricServerStack(ctx, cx, cy, { slabs: 3, progress, label })`
  - `foldedFileBadge(ctx, cx, cy, 'HTML', { ribbonBg: '#F97316', caption, progress })`
  - `wireframeBrowser(ctx, x, y, w, h, { label: 'WWW', progress })`
  - `wireframeCylinderDb(ctx, cx, cy, { width, height, color, label, progress })`
  - `lineArtUser(ctx, cx, cy, { label: 'User A', color, progress })`
  - `stateMutationCard(ctx, x, y, w, h, { title, badge, tint, rows, progress })`
  - `brokenLinkPlug(ctx, cx, cy, { caption, progress })`
  - `evolutionTimeline(ctx, items, { centerY, activeIndex, progress })`
  - `heroMetricSlam(ctx, '2015', { cx, cy, subtitle, scale })`
  - `comparisonSplitTable(ctx, leftSpec, rightSpec, { cardWidth, cardHeight, y })`
  - `swimlaneSequence(ctx, actors, messages, { topY, bottomY, spanWidth, progress })`
  - `consistentHashRing(ctx, cx, cy, radius, nodes, { tokenAngle, sweepToAngle, progress })`
  - `bTreeHierarchy(ctx, cx, topY, { root, children, highlightBranch, progress })`
  - `networkPacketFrame(ctx, cx, cy, segments, { height, progress })`
  - `loadBalancerRouter(ctx, cx, cy, { label, algorithm, progress })`
  - `pubSubTopicBox(ctx, x, y, w, h, { title, offsets, activeSlot, progress })`
  - `circuitBreakerSwitch(ctx, cx, cy, { state: 'CLOSED'|'OPEN', label, progress })`
  - `cdnEdgeGlobe(ctx, cx, cy, radius, { pops, label, progress })`
  - `rateLimiterBucket(ctx, cx, cy, { fillLevel, tokens, label, progress })`
- **Hardware & Runtime Primitives**:
  - `codeEditorWindow`, `compilerGear`, `bytecodeCapsule`, `hardwareMachine`, `tieredVault`, `xraySecurityScanner`, `lifoStackChamber`, `memoryHeapGrid`, `sequentialReader`, `turboForge`, `nativeAssemblyBlock`, `siliconCpuDie`, `isometricDatabase`, `cacheMemoryMatrix`, `messageQueuePipe`, `browserClient`

### Declarative Motion SFX (`sfx: []`)
Each scene can declare subtle procedural 48kHz stereo sound cues:
```js
sfx: [
  { time: 0.3, type: 'pop' },      // Soft marimba pop when card enters
  { time: 1.1, type: 'draw' },     // Felt-pen shimmer during vector stroke draw
  { time: 2.2, type: 'whoosh' },   // Filtered air sweep on camera zoom/pan
  { time: 2.8, type: 'tick' },     // Crisp micro-click on state mutation
  { time: 3.4, type: 'error' },    // Damped low thud on failure/rollback
  { time: 4.2, type: 'success' }   // Harmonic chime on verified takeaway
]
```
