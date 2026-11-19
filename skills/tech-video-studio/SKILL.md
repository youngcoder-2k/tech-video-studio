---
name: tech-video-studio
description: Autonomous narrative-first pipeline and visual motion graphics engine (v3.0 ByteByteGo + rea-video Edition) for producing 1080p YouTube technical and system design explainer videos. Activate whenever the user wants to create a technical explainer video, system design animation, architecture walkthrough, or ByteByteGo-style visual video.
---

# Tech Video Studio (v3.0 Narrative-First ByteByteGo + `rea-video` Edition) — AI Skill Guide

Produce broadcast-grade **1920x1080** technical explainer videos calibrated to real ByteByteGo videos and **`JuneYaooo/rea-video`'s Narrative-First Content Theory**:
- **Authentic `#232323` Charcoal Canvas** (`palette: 'byteByteGoTrue'`) with 88%–94% clean negative space
- **5 Authentic ByteByteGo Visual Styles** (`comparison-cards`, `flat-step-flow`, `wireframe-fanout`, `dashed-group-stack`, `pill-chain`) + 28 kinetic archetypes & 30 animated SVG icons
- **Narrative-First Content Architecture (`src/core/narrative.js`)** learned from `rea-video` (`hook -> context -> turn -> info -> proof -> payoff`)
- **Crystal-Clear Steffan Senior SA Voice (`en-US-SteffanNeural`, `-5%` light pace, `+280ms` sentence pauses, `maxTempo <= 1.02x`)**

---

## 1. Content & Narrative Theory (Learned from `JuneYaooo/rea-video`)

Never write a flat textbook list of facts. Every beat MUST serve one explicit **Narrative Role** along the story arc:
1. **`hook`** (*Grab Attention*): Open with a sharp speed paradox, surprising benchmark contrast, or production failure in the first 10 seconds.
2. **`context`** (*Set the Scene*): Show the naive/traditional baseline so the viewer feels why the bottleneck exists.
3. **`turn`** (*Architectural Twist*): Reveal the counter-intuitive design flip ("Instead of X, it does Y...").
4. **`info`** (*Layered Mechanics*): Teach ONE clear mechanism per beat, building layer by layer without overcrowding.
5. **`proof`** (*Concrete Evidence*): Prove the theory with live throughput gauges, benchmarks, or side-by-side comparison cards.
6. **`payoff`** (*Golden Rules*): Close with a 2×2 Production Architect Scorecard (`scorecard`) so the viewer walks away with actionable rules.

---

## 2. One-Command Narrative-First Workflow (v3.0)

```bash
# Step 1: Scaffold a Narrative-First Blueprint (deep-dive-3min | speed-paradox-2min | quick-explainer-60s)
node skills/tech-video-studio/scripts/tech-video-studio.js plan-story "How Docker Works" --arc deep-dive-3min -o ./docker.blueprint.json

# Step 2: Fill in domain facts (16-22 words, 2 crisp sentences per beat) and audit Narrative + Visual Diversity
node skills/tech-video-studio/scripts/tech-video-studio.js audit-story ./docker.blueprint.json

# Step 3: One-command compile + Visual QA + Steffan Narration (-5%, +280ms sentence pauses) + 1080p MP4 render
node skills/tech-video-studio/scripts/tech-video-studio.js build-video ./docker.blueprint.json -o ./docker_1080p.mp4 --voice senior-sa --fps 30 --qa

# Step 4 (Optional): Reverse-engineer any ByteByteGo reference & score your remake parity
node skills/tech-video-studio/scripts/tech-video-studio.js rea-learn ./bytebytego_ref.mp4 -o ./out/VIDEO.md
node skills/tech-video-studio/scripts/tech-video-studio.js rea-compare ./bytebytego_ref.mp4 ./docker_1080p.mp4
```

---

## 3. The 8 Golden Visual & Audio Rules (Mandatory)

1. **Zero Watermarks**: Never draw `bytebytego.com` or third-party channel logos on the canvas.
2. **No On-Screen English Subtitles (`showCaptions: false`)**: Use `captions` / `narration` purely to synthesize the Neural Senior SA voiceover audio track. Never burn long subtitle bars onto the bottom of the screen.
3. **Zero Static / Whoosh Transition Noise**: Never emit harsh white-noise `whoosh` or `draw` SFX during scene transitions. Keep the audio track clean for the neural voiceover (`--no-sfx`).
4. **Multi-Style Scene Diversity (Never Repeat Same Layout)**: Every scene in a video MUST rotate across distinct ByteByteGo composition paradigms and backdrops (`dotMatrix`, `spotlight`, `isometric`, `splitHorizontal`, `blueprint`, `waves`) — never repeat 2-3 identical `drawGlassCard` columns across every scene!
   - *Style A*: 3D Hardware Latency Pyramid (`memoryHierarchyPyramid`) + Contiguous Byte-Array Memory Strip (`byteArrayTape`)
   - *Style B*: 360° Radial Hub-and-Spoke Reactor Ring (`radialHubAndSpoke`)
   - *Style C*: Horizontal Top-vs-Bottom "VS" Execution Race (`horizontalLaneRace`) + Multi-Level Tree (`bTreeHierarchy`)
   - *Style D*: Horizontal User-Space / Kernel-Space Strata Divider (`backdrop: 'splitHorizontal'`)
   - *Style E*: Triangular Quorum Consensus Mesh (`quorumTriangleMesh`) + 360° Sharding Ring (`hashSlotRingCluster`)
   - *Style F*: 2x2 Architectural Do's & Don'ts Scorecard Matrix (`scorecardMatrix`)
5. **Ultra-Concise Micro-Labels**: Maximum **2–4 words per diagram node label**. Never write long paragraphs inside diagrams.
6. **Distinct Component Silhouettes**: Use specialized visual primitives (`wireframeBrowser`, `isometricServerStack`, `foldedFileBadge`, `lineArtUser`, `consistentHashRing`, `bTreeHierarchy`, `siliconCpuDie`, etc.).
7. **Generous Negative Space (`>= 35%`)**: Keep at least 35% of the `#262626` canvas open so the viewer's eye locks immediately onto the active flow.
8. **Mandatory Visual QA (`qa_contact_sheet.jpg`)**: Always run the `qa` command and inspect the contact sheet + negative-space telemetry before rendering the final MP4.

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
