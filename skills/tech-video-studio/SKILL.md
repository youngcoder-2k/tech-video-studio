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

### Step 4: Render Deterministic 60FPS H.264 MP4 (+ Auto Motion SFX)
```bash
node skills/tech-video-studio/scripts/tech-video-studio.js render ./my-video/index.html -o ./my-video/final_1080p60.mp4
```

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
- `Connectors.solidArrow(ctx, x1, y1, x2, y2, { progress, dashed, label, color, startDot })`
- `Connectors.elbowArrow(ctx, points, { progress, dashed, label, color })`
- `Connectors.flowArrow(ctx, x1, y1, x2, y2, timeSec, { progress, color, label })`
- `Connectors.bidirectional(ctx, x1, y1, x2, y2, timeSec, { reqProgress, resProgress, reqLabel, resLabel })`
- `Connectors.laserBeam(ctx, x1, y1, x2, y2, timeSec, { progress, label })`

### `Illustrations` (28 Built-In Archetypes & Hardware Primitives)
- **ByteByteGo v2.0 Archetypes**:
  - `isometricServerStack(ctx, cx, cy, { slabs: 3, progress, label })`
  - `foldedFileBadge(ctx, cx, cy, { badge: 'HTML', badgeColor: '#F97316', progress })`
  - `wireframeBrowser(ctx, x, y, w, h, { centerText: 'WWW', progress })`
  - `wireframeCylinderDb(ctx, cx, cy, w, h, { color, label, progress })`
  - `lineArtUser(ctx, cx, cy, { label: 'User A', color, progress })`
  - `stateMutationCard(ctx, x, y, w, h, { title, badge, tint, rows, progress })`
  - `brokenLinkPlug(ctx, cx, cy, { caption, progress })`
  - `evolutionTimeline(ctx, cx, y, { items, activeIndex, progress })`
  - `heroMetricSlam(ctx, cx, cy, { value: '2015', sub, progress })`
  - `comparisonSplitTable(ctx, x, y, w, h, { leftHeader, rightHeader, rows, progress })`
  - `swimlaneSequence(ctx, x, y, w, h, { actors, messages, progress })`
  - `consistentHashRing(ctx, cx, cy, radius, { nodes, keyAngle, progress })`
  - `bTreeHierarchy(ctx, cx, y, { rootKeys, children, highlightBranch, progress })`
  - `networkPacketFrame(ctx, x, y, w, h, { segments, progress })`
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
