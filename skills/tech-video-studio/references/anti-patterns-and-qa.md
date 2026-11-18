# Visual Anti-Patterns & Multimodal QA Checklist

Every rule below was distilled from iterative real-world comparisons against top-performing technical YouTube channels.

---

## 1. Six Fatal Anti-Patterns to Avoid

| # | Anti-Pattern | Why It Fails | Required Fix |
| :--- | :--- | :--- | :--- |
| **1** | **Encyclopedic 4-Column Text Wall** | Cramming 40–60 labels onto one static screen overwhelms working memory and looks like a spreadsheet. | Show **one focused concept per scene** (`12s–15s`), transitioning cleanly between scenes via `createVideo({ scenes })`. |
| **2** | **Third-Party Channel Branding** | Copying `ByteByteGo.com` or external logos into the top bar violates originality and clutters the frame. | Use `Theme.drawTopHeader(ctx, title, chapter)` — clean topic title on left, numbered chapter breadcrumb on right. |
| **3** | **"Dashed Box + 3 Pills" Monotony** | Reusing the exact same container card with 3 inner rounded rectangles in Scene 1, 2, 3, and 4 bores viewers within 15 seconds. | Enforce **Visual Metaphor Diversity**: every scene must feature distinct domain silhouettes (IDE window, hardware machines, vault safe, X-ray scanner, LIFO chamber, 3D grid + drone, tachometer gauge, silicon die, DB platters, queue pipe). |
| **4** | **Paragraphs Inside Nodes** | Sentences like `"Resolves symbolic links to direct memory addresses"` force viewers to read instead of watch. | Trim every node label to **1–4 punchy words** + a clear sub-tag (`<= 28 chars`). |
| **5** | **Arrow / Icon Label Collisions** | Placing `'javac'` directly on `dashedArrow` while also drawing a `72px` gear at the midpoint causes text overlap. | Split connector `A -> Gear -> B` into two arrows and render the gear label cleanly beneath `cy + size/2 + 24` (`Illustrations.compilerGear`). |
| **6** | **Asymmetric Margins & Late Entrances** | Hardcoding `x = 180` leaves `400px` of dead space on the right; starting Step 4's tween at `52s` leaves `52s` QA frames incomplete. | Always compute `x` via `Layout.horizontalPipeline()` / `Layout.splitColumns()`, and complete entrance tweens within `0.3s – 5.5s` of local scene time (`localT`). |

---

## 2. Mandatory Multimodal QA Gate Checklist

After running `techvid qa <index.html>`, inspect `qa_output/qa_contact_sheet.jpg` with vision tools and verify all 6 checks:

1. **Header Cleanliness**: Top-left title and top-right chapter breadcrumb are crisp, unobstructed, and free of third-party branding.
2. **Horizontal & Vertical Balance**: Left margin equals right margin (`±10px`); ~60% of the `1920x1080` canvas remains calm dark background.
3. **Zero Collisions**: No arrow label touches a container border, pill header, wireframe rim, or icon.
4. **Cross-Scene Diversity**: Looking at all 4 quadrants of `qa_contact_sheet.jpg` side-by-side, each quadrant has a recognizably different silhouette and color accent (`cyan`, `emerald`, `amber`, `purple`).
5. **Complete Mid-Scene State**: At `65%` into each scene (`qaTime`), 100% of that scene's stages, connectors, and takeaway pill are visible.
6. **Legibility at 1080p**: Code/assembly uses high-contrast monospace (`>= 13px`), titles use bold sans-serif (`>= 15px`), and color contrast against card fills is crisp.
