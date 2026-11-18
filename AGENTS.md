# Tech Video Studio — Agent Instructions

This repository contains both:
1. **The `TechVideoStudio` HTML5 Canvas + GSAP Engine & CLI** (`src/`, `dist/tech-video-studio.bundle.js`, `bin/tech-video-studio.js`) for deterministic 1080p60 YouTube technical video production.
2. **The Portable Multi-Agent Skill & Plugin** (`plugin.json`, `skills/tech-video-studio/SKILL.md`, `.claude-plugin/plugin.json`).

## Workflow When Asked to Create a YouTube Video
1. Read [skills/tech-video-studio/SKILL.md](./skills/tech-video-studio/SKILL.md) first.
2. Search visual metaphors via `node bin/tech-video-studio.js metaphor "<topic>"`.
3. Scaffold or create the scene using `dist/tech-video-studio.bundle.js`.
4. Run `node bin/tech-video-studio.js qa <path/to/index.html>` and inspect `qa_contact_sheet.jpg` visually.
5. Render final 1080p60 H.264 MP4 via `node bin/tech-video-studio.js render <path/to/index.html> -o <output.mp4>`.

## Workflow When Modifying Engine Source (`src/`)
- Always run `npm run build` (which updates `dist/tech-video-studio.bundle.js` and syncs the standalone bundle into `skills/tech-video-studio/scripts/`) followed by `npm test`.
