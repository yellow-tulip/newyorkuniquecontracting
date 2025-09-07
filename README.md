# New York Unique Contracting — Website (Swiss/Grid Inspired)

This repository contains the production version of our small‑business website.
It follows a Swiss/grid‑inspired composition with restrained type, ample negative
space, and a trustworthy, professional tone. Business context lives in
`business-info.md`.

--

## Current Pages and Intent

-  Home / Landing
   - Hero intro with conservative, bold headline.
   - Thin monospaced ticker banner (exact pacing preserved).
   - About + Metrics section inspired by `assets/inspo/homeabout.png`:
     - Two columns with a right‑dominant split (5fr / 7fr).
     - Left: architectural wireframe style visual that aligns to the viewport
       left and subtly bleeds into the right column (sits behind text).
     - Right: lead paragraph and a 2×2 metrics grid (#2, 450+, 200+, 20 years)
       with left‑aligned labels beneath each value.
     - Tightened visual gap to the next section by trimming bottom spacing.
   - Vision Forge section (2‑column) with right image and FAQ accordion.
   - Testimonials/Why‑Choose‑Us: temporarily removed per direction.
-  About, Services/Portfolio, FAQ, Contact (stubs)

Focus is visual design and client‑side only (no backend).

---

## Design Principles

- Swiss/grid composition; pacing through spacing and negative space.
- Inter/system sans, restrained scale (hero ~3.6rem max; metrics 44–64px).
- Neutral palette with a subtle red accent for CTAs; body copy is grayscale.
- Accessibility: respect `prefers-reduced-motion`; strong contrast.

### Navigation & Progress
- Header/nav is truly fixed across the site (no movement while scrolling).
- Content starts below the header (JS sets `body { padding-top: <header-height> }` on load/resize/font‑ready).
- No bottom divider on the header; rely on spacing and composition.
- Horizontal scroll progress bar: 3px accent line anchored to the header’s bottom edge, full‑width, visible on mobile.
- No background track and no smoothing transition; updates immediately with scroll.
- In‑page anchors are not used in the nav; links route to separate pages.

### Typography Scale (Universal)
- Root headings
  - `h1` → `--fs-xxl` = `clamp(2.3rem, 5.2vw, 3.6rem)`; weight 600
  - `h2` → `--fs-xl` = `clamp(1.625rem, 2.8vw, 2.125rem)`; weight 600
  - `h3` → `--fs-lg` = `clamp(1.0625rem, 1.9vw, 1.4375rem)`
- Body text → `--fs-md` = `1rem` (with body base 17px)
- Small text (labels, captions) → `--fs-sm` = `0.9rem`
- Hero h1 uses the same token (`--fs-xxl`) for complete consistency.

### Section Rhythm (Universal)
- Inside padding for major sections → `--section-pad-y = clamp(3.5rem, 8vw, 6rem)`
- Gap between consecutive sections → `--section-gap-y = clamp(0.5rem, 2vw, 1rem)`
- Implementation
  - Apply `.section` to each major band.
  - `.section { padding-block: var(--section-pad-y); }`
  - `.section + .section { margin-top: var(--section-gap-y); padding-top: 0; }`
  - `.section > :last-child { margin-bottom: 0; }` to avoid trailing paragraph margins inflating gaps.
  - About + Metrics uses a small negative bottom margin to compensate for its internal upward transform, reducing the visual gap before Vision Forge by ~100px.

---

## Tech Stack

- HTML5, CSS (vanilla); no build step.

---

## File Structure

- Root pages: `index.html`, `about.html`, `contact.html`, `faq.html`, `portfolio.html` (stubs for now)
- Assets: `assets/` static files; `assets/inspo/` is reference‑only (do not link in production pages)
- Styles: `assets/styles/tokens.css`, `assets/styles/base.css`, `assets/styles/components.css`

Key header/progress implementation files:
- Markup: each page’s `<header class="masthead nav">` plus `<div id="progress-h"><div class="bar"></div></div>` inside the header.
- CSS: `.masthead` fixed layout and `#progress-h` in `assets/styles/base.css`.
- JS: inline on each page — sets `--header-offset`, `body` padding‑top, and updates the progress bar width on scroll.

---

## Maintenance Notes
When files, sections, or design rules change, update `README.md` in the same
commit with a short rationale. Use Conventional Commits.

---

### 🏗 Business Context
This project represents the digital presence of our **Brooklyn-based general contracting business**.  
The website is designed to:  
- Communicate **trust, professionalism, and reputation** in the local community  
- Showcase a curated **portfolio of projects** and highlight customer testimonials  
- Introduce our **team, story, and values** in a friendly but premium way  
- Provide a clear **path for potential clients** to get in touch  

All company-specific details (services, tagline, testimonials, story) are maintained separately in [`business-info.md`]. That file should be referenced whenever new content or branding rules are needed.

---

### 🤝 Contribution Notes
- This project is built incrementally. Each **component/page** is developed as a self-contained chunk.  
- **Codex is expected to**:  
  - Keep `README.md` in sync with new files, pages, and design principles  
  - Reference `business-info.md` when business context is needed   
- Commit messages should be **descriptive** (e.g., `feat: add testimonial card component` or `style: adjust button hover effect`).  
- Any new design tokens, layout rules, or reusable components must be documented in `README.md` under **Design Principles**.  

---

### 🗺 Roadmap (Working)
1) Polish About + Metrics on small screens (typographic scale + stack order)
2) Build Services and Portfolio pages (content from `business-info.md`)
3) Replace placeholder visuals with optimized images (`.webp`)
4) Add contact page form (front‑end only)

---

## Branding System (working notes; do not render on site)

- Palette
  - Base `#ffffff`, Page `#fcfcfc`, Ink `#111111`, Muted `#6b6b6b`, Border `#e6e6e6`
  - Accent red `#c44536` (hover `#a03025`), use sparingly (links/CTAs only)
- Typography
  - Family: Inter, system sans; 4px spacing baseline.
  - Scale: restrained (hero ~3rem max on desktop).
- Layout
  - Pages are essentially full‑width with minimal side padding (~8px).
  - Avoid decorative dividers; guide the eye with spacing and image blocks.
  - All images are neutral gray placeholders until real assets are approved.
- [ ] Final accessibility and performance check.
