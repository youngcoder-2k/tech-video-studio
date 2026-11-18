---
name: tech-video-studio
description: >-
  Produces high-retention 1080p60 YouTube technical and system design explainer videos
  (ByteByteGo / Fireship visual storytelling style) using the TechVideoStudio HTML5 Canvas + GSAP
  engine, diverse physical/schematic visual metaphors, mathematical layout symmetry, multimodal
  keyframe QA, and deterministic 60FPS FFmpeg H.264 rendering. Activate whenever the user asks
  to create, animate, design, or render an educational tech, software architecture, CS, or
  system design video for YouTube.
---

# Tech Video Studio — AI YouTube Technical Explainer Runbook

Follow this 5-step runbook whenever creating or updating a technical explainer video for YouTube (`1920x1080`, `60 FPS`).

---

## Non-Negotiable Visual Storytelling Laws

1. **Zero Third-Party Watermarks**:
   - **NEVER** place `ByteByteGo.com`, channel logos, or third-party watermarks in the header or corners.
   - Always use `Theme.drawTopHeader(ctx, title, chapter)` — crisp topic title on the top-left, chapter breadcrumb (`01. Chapter Name`) on the top-right.
2. **Scene-by-Scene Focus (Never Static Multi-Column Text Walls)**:
   - **NEVER** cram an entire system architecture into 4 dense static columns simultaneously.
   - Split the topic into **3–6 sequential scenes** (`12s–15s` per scene). One core concept per scene, keeping `60%–70%` dark negative space (`#1E1E1E`) so the viewer's eye locks immediately onto the active mechanism.
3. **Strict Word Budget (`<= 4 Words` per Visual Node)**:
   - **NEVER** write explanatory sentences or paragraphs inside diagram cards.
   - Keep node titles to `1–4 words` (`App.java`, `0xCAFEBABE`, `Bootstrap Tier`, `GC Sweeper Bot`, `Direct 4.5GHz`).
   - Reserve synthesis for **one** concise bottom takeaway pill (`Theme.drawTakeawayPill`, `<= 8 words`) appearing after the scene settles.
4. **Anti-Monotony Rule (Diverse Physical & Schematic Metaphors)**:
   - **NEVER** reuse the same `"dashed rectangle + colored pill header + 3 inner pills"` template across scenes.
   - Every scene **must** use distinct, domain-appropriate visual metaphors (e.g., Realistic IDE Window, Hardware Silhouettes [Desktop PC / 19" Rack Server / Laptop], Multi-Tier Vault with Locks, Holographic X-Ray Security Scanner, LIFO Stack Chamber, 3D Heap Grid + Autonomous Sweeper Drone, Tachometer Gauge + Nitro Flame Forge, Silicon CPU Die with Live Registers, Browser Viewport, Multi-Platter 3D Database, Partitioned Queue Pipe, RAM Cache Matrix).
5. **Mathematical Symmetry & Early Entrance Completion**:
   - Compute stage positions using `Layout.horizontalPipeline()`, `Layout.splitColumns()`, and `Layout.fanOutTargets()` so left and right canvas margins are mathematically equal.
   - Finish all entrance animations within the first **35%–40%** of each scene (`0s – 5.5s` of a `15s` scene) so the complete diagram holds cleanly for comprehension.

---

## Five-Step Execution Workflow

### Step 1: Map Concepts to Diverse Visual Metaphors
Query the metaphor database before writing any scene code to guarantee visual variety across scenes:

```bash
node scripts/tech-video-studio.js metaphor "<topic keywords>"
```
*(If working inside the repository root, use `node bin/tech-video-studio.js ...`.)*

Review [visual-metaphor-catalog.md](./references/visual-metaphor-catalog.md) when combining built-in primitives or crafting custom canvas illustrations for specialized domains.

### Step 2: Scaffold & Author the Declarative Scene File
Read [api-reference.md](./references/api-reference.md) for exact `TechVideoStudio` function signatures.

1. Scaffold a project directory (or copy `tech-video-studio.bundle.js` next to `index.html`):
   ```bash
   node scripts/tech-video-studio.js new ./video-project --title "How <System> Works"
   ```
2. Build `scenes[]` inside `TechVideoStudio.createVideo({ title, fps: 60, scenes: [...] })`:
   - Use `Layout.scaleAround(ctx, cx, cy, state.scale, () => { ... })` for clean `back.out(1.5)` entrance animations.
   - Connect stages with `Connectors.dashedArrow` + `Connectors.pulseOrb`, `Connectors.laserBeam`, or `Connectors.bidirectional`.
   - Ensure arrow labels (`labelOffset: -14`) never collide with rotating icons, borders, or headers.

### Step 3: Run the Mandatory Multimodal Visual QA Gate
Before rendering 3,600+ frames of video, extract peak keyframes and a `2x2` stitched contact sheet:

```bash
node scripts/tech-video-studio.js qa ./video-project/index.html
```

Inspect `qa_output/qa_contact_sheet.jpg` (and individual `scene_*.png` files) using multimodal vision (`read_file`) against [anti-patterns-and-qa.md](./references/anti-patterns-and-qa.md):
- Are left and right margins symmetrical?
- Is every scene visually distinct from the previous scene (zero box+pill monotony)?
- Are all stages visible at peak time (no empty half-screens from late GSAP timestamps)?
- Is there zero text overlap on arrows, gears, wireframes, or headers?

Fix any layout coordinate issue and re-run `qa` until every frame passes cleanly.

### Step 4: Render Deterministic 1080p60 H.264 MP4
Render the final broadcast-ready YouTube MP4 using deterministic frame-exact piping (`0` dropped frames, `-crf 18`, `-pix_fmt yuv420p`, `+faststart`):

```bash
node scripts/tech-video-studio.js render ./video-project/index.html -o ./video-project/final_1080p60.mp4 --fps 60
```

*(Optional)* To mux a voiceover track with automatic YouTube `-14 LUFS` EBU R128 loudness normalization, pass `--audio ./voiceover.mp3`.

### Step 5: Verify Final Video Stream
Extract at least 1 frame from the encoded `.mp4` or check `ffprobe` stream metadata (`1920x1080`, `h264`, `60 fps`), then deliver clickable links to the final `.mp4` and interactive `.html` source.
