# Tech Video Studio Guardrails

When generating or editing YouTube technical explainer videos with Tech Video Studio:

- Never include `ByteByteGo.com` or any third-party watermark/logo in video frames; use `Theme.drawTopHeader(ctx, title, chapter)` for clean headers.
- Never cram an entire topic into a static multi-column wall of text; design sequential scenes (`12s–15s` each) with one focused concept per scene and generous dark negative space.
- Keep node text concise (`1–4 words` per title) and never repeat identical "dashed box + 3 inner pills" layouts across consecutive scenes. Use diverse physical and schematic metaphors from `TechVideoStudio.Illustrations` (or custom canvas illustrations).
- Always run `techvid qa <scene.html>` and inspect the generated `qa_contact_sheet.jpg` with multimodal vision to confirm symmetrical margins, complete mid-scene states, visual diversity, and zero overlapping labels before rendering the final 60FPS MP4.
