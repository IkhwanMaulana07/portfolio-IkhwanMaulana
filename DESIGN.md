# DESIGN SYSTEM: Top-Tier Interactive Engineering Portfolio

## 1. Visual Direction & Atmosphere
- **Concept:** Cyber-Precision Studio. Feels like entering a high-performance mission console engineered by a top 1% developer.
- **Theme:** Deep obsidian space (`#030712`, `#090e1a`) with crystalline cyan (`#06b6d4`, `#38bdf8`) and electric violet/indigo (`#6366f1`, `#818cf8`) photon accents, punctuated by vibrant emerald (`#10b981`) for live availability and verification markers.
- **Surface Texture:** Ultra-refined glassmorphism with subtle multi-layer borders (`rgba(255,255,255,0.08)` up to `rgba(56,189,248,0.3)` on hover), delicate ambient radial gradients, and interactive cursor particle/glow tracking.
- **Anti-Slop Compliance:**
  - No generic blue-to-purple wash covering the whole screen. Colors are purposeful elevation markers.
  - No fake claims, no fake testimonials, no em dashes (`—`), no dead buttons.
  - Every CTA has an active destination or function.
  - WCAG AA contrast on all text elements (> 4.5:1 ratio).

## 2. Typography
- **Headings:** Outfit (variable font, 600-800 weight), sleek, geometric, commanding, tech-forward.
- **Body & Prose:** Inter (400-500 weight), perfectly legible, generous line height (1.65), balanced text justification.
- **Code & Specs:** JetBrains Mono (400-600 weight) for metrics, badges, system architectures, and technical parameters.

## 3. Color Tokens
- `--bg-base`: `#030712` (Void Black)
- `--bg-surface`: `#090e1a` (Deep Slate Glass)
- `--bg-surface-elevated`: `#111827` (Card Elevated)
- `--accent-primary`: `#06b6d4` (Cyan Photon)
- `--accent-secondary`: `#6366f1` (Electric Indigo)
- `--accent-highlight`: `#38bdf8` (Sky Beam)
- `--accent-success`: `#10b981` (Emerald Verified)
- `--text-heading`: `#f8fafc` (Slate 50)
- `--text-body`: `#cbd5e1` (Slate 300)
- `--text-muted`: `#94a3b8` (Slate 400)
- `--border-subtle`: `rgba(255, 255, 255, 0.08)`
- `--border-glow`: `rgba(56, 189, 248, 0.4)`

## 4. Dials (Antislop & Impeccable)
- **ENERGY:** 3 (Dynamic, tactile, responsive micro-interactions, live hover cards)
- **RHYTHM:** 3 (Varied layouts across sections: Hero split-console, Bento cards, Interactive flow diagram, Project showcase with live modal, Timeline credentials)
- **MOTION:** 2 (Smooth CSS/Canvas interactive feedback, entrance cues, interactive filter transitions, zero over-the-top nauseating motion)

## 5. Interactive Highlights
1. **Interactive Architecture Simulator:** Clickable 5-layer system lifecycle (Client -> API -> DB -> AI -> DevOps) with live animated packet flow and detailed architectural breakdown.
2. **Dynamic Skill Matrix:** Instant category filtering + live text search with match highlights and proficiency badges.
3. **Deep Case Studies Modal:** Modal with full architectural diagrams, problem/solution breakdown, technical stack tags, metrics, and live demo / source code links.
4. **Interactive Contact Console:** Quick copy-to-clipboard for email/phone with instant animated toast feedback, direct WhatsApp dispatch link, and interactive inquiry form.
5. **Back to Top & Sticky Dynamic Nav:** Minimal blur dock with active section indicator and smooth scroll.
