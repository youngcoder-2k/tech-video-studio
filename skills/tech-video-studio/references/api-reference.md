# TechVideoStudio JavaScript API Reference

Load `<script src="./tech-video-studio.bundle.js"></script>` (includes GSAP 3 + all `TechVideoStudio` modules offline).

```js
const { Theme, Layout, Connectors, Icons, Illustrations, createVideo } = window.TechVideoStudio;
```

---

## 1. `createVideo(config)` — Elastic Multi-Scene Engine

Automatically computes scene start/end offsets, cross-scene fades (`0.45s`), QA peak timestamps (`65%` of each scene), `window.__studioSeek(t)`, and `?play=1` live browser preview.

```js
createVideo({
  title: 'How the JVM Works',       // Clean top-left header title
  width: 1920,                      // Default: 1920
  height: 1080,                     // Default: 1080
  fps: 60,                          // Default: 60
  palette: 'charcoal',              // 'charcoal' | 'midnight'
  customIcons: {                    // Optional custom SVG strings
    customChip: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">...</svg>'
  },
  scenes: [
    {
      id: 'compilation',
      chapter: '01. Compilation & Portability', // Top-right breadcrumb
      duration: 15,                             // Seconds
      qaTime: 8,                                // Optional local timestamp (s) for QA snapshot
      initialState: () => ({ editor: 0, arrow: 0, gearDeg: 0 }),
      build(tl, state, duration) {
        // IMPORTANT: `tl` starts at local t = 0 for THIS scene!
        tl.to(state, { editor: 1, duration: 0.6, ease: 'back.out(1.5)' }, 0.3)
          .to(state, { arrow: 1, duration: 0.5, ease: 'power2.out' }, 1.0)
          .to(state, { gearDeg: 360, duration: 4.0, ease: 'none' }, 1.2);
      },
      render(ctx, { state, t, localT, width, height }) {
        // Draw layout, connectors, illustrations, and takeaway pill
      }
    }
  ]
});
```

---

## 2. `Layout` — Mathematical Symmetry Helpers

- **`Layout.horizontalPipeline(widths, { gap = 110, canvasWidth = 1920, centerY = 450, height = 360, heights })`**
  Returns `{ stages: [{ x, y, w, h, cx, cy, right }], connectors: [{ x1, y1, x2, y2 }], marginX }`.
- **`Layout.splitColumns(leftWidth = 460, rightWidth = 460, { gap = 520, canvasWidth = 1920, centerY = 480, height = 440 })`**
  Returns `{ left, right, bridge: { x1, y1, x2, y2 }, marginX }`.
- **`Layout.fanOutTargets(count, { centerY = 450, spacing = 150, targetX = 1300, targetWidth = 320 })`**
  Returns `Array<{ index, x, cy, cx, w }>`.
- **`Layout.scaleAround(ctx, cx, cy, scale, drawFn, alpha = 1)`**
  Safely scales/fades `drawFn` around `(cx, cy)` and restores `ctx`.

---

## 3. `Connectors` — Animated Data Flows

- **`Connectors.dashedArrow(ctx, x1, y1, x2, y2, { progress = 1, label = '', color = '#38BDF8', lineWidth = 3, labelOffset = -14 })`**
- **`Connectors.pulseOrb(ctx, x1, y1, x2, y2, timeSec, { color = '#38BDF8', speed = 1.4, phase = 0 })`**
- **`Connectors.laserBeam(ctx, x1, y1, x2, y2, timeSec, { progress = 1, color = '#38BDF8', label = '' })`**
- **`Connectors.bidirectional(ctx, x1, y1, x2, y2, timeSec, { reqProgress, resProgress, reqLabel, resLabel, reqColor, resColor })`**

---

## 4. `Illustrations` — 17 Rich Visual Primitives

1. `codeEditorWindow(ctx, x, y, w, h, { fileName, icon, lines: [{ text, color }] })`
2. `compilerGear(ctx, cx, cy, angleDeg, { size = 72, label = 'javac', color = '#F59E0B' })`
3. `bytecodeCapsule(ctx, x, y, w, h, { title, badgeTitle, badgeSub, icon, opcodes })`
4. `hardwareMachine(ctx, x, cy, { width = 330, height = 96, type: 'pc'|'server'|'laptop', osIcon, title, status })`
5. `tieredVault(ctx, x, y, w, h, { header, accent, tiers: [{ name, sub, bg, text }] })`
6. `xraySecurityScanner(ctx, x, y, w, h, { header, radarProgress, checks, shieldTitle, shieldNote })`
7. `lifoStackChamber(ctx, x, y, w, h, { header, frames: [{ name, sub, bg, active }] })` -> returns `{ anchorX, anchorY }`
8. `memoryHeapGrid(ctx, x, y, w, h, timeSec, { header, liveTitle, liveSub, deadTitle, deadSub })` -> returns `{ targetX, targetY }`
9. `sequentialReader(ctx, x, y, w, h, { header, items, activeIndex, footer })`
10. `turboForge(ctx, x, y, w, h, { header, counterLabel, countValue, flameScale, title, sub })`
11. `nativeAssemblyBlock(ctx, x, y, w, h, { header, lines, footer })`
12. `siliconCpuDie(ctx, x, y, w, h, { header, cpuPulse, registers })`
13. `browserClient(ctx, x, y, w, h, { url, headline, status })`
14. `isometricDatabase(ctx, x, y, w, h, { title, sub, color, platters })`
15. `messageQueuePipe(ctx, x, y, w, h, timeSec, { title, color, slots })`
16. `cacheMemoryMatrix(ctx, x, y, w, h, timeSec, { header, cols, rows })`
17. `stagePanel(ctx, x, y, w, h, { header, accent, bg })` + `stepBlock(ctx, x, y, w, h, title, sub, { bg, titleColor })`

---

## 5. `Theme` & `Icons`

- **`Theme.drawTakeawayPill(ctx, text, { bg, border, y = 855, alpha = 1 })`**
- **Built-in `Icons.get(name)`**: `javaLogo`, `coffeeMug`, `gear`, `shieldGuard`, `droneBot`, `flameNitro`, `turboMeter`, `cpuSilicon`, `userAvatar`, `winOS`, `linuxPenguin`, `appleLogo`, `dockerContainer`, `lockGold`, `cloudNode`, `lightningBolt`, `globeNet`.
