# New York Unique Contracting — Website Redesign (Swiss/Grid Inspired)

This repository contains the front‑end redesign of our small business website. More information about the business can be found in `business-info.md`.
The site follows a Swiss/grid‑inspired composition with restrained type, ample negative space, and a trustworthy, professional tone.

--

## Project Goals

-   Create a **5-page static site** to build credibility and generate leads:
    -   **Home / Landing** — Showcase core services (masonry, concrete, patios), feature project gallery, highlight key testimonials, and display reputation badges ("NYC DOB Certified," "Licensed & Insured") and social media (Angi's, Google, Yelp). 
    -   **About Us** — Introduce Mr. T and the family-run team, share the company's 20+ year story, and outline their values of professionalism, communication, and fair pricing.
    -   **Services & Portfolio** — A full menu of services and gallery of work, filterable by category: `Masonry & Brickwork`, `Patios & Walkways`, `Concrete`, `Roofing & Gutters`, and `Waterproofing`, and more (as noted in ['business-info.md']
    -   **FAQ** — An expandable Q&A section to address common client questions.
    -   **Contact** — A simple contact form (front-end only) with the business address, phone, and hours prominently displayed. We will replicate the contact form that is in ['assets/original.html']
-   Focus on **visual design and front-end interaction only**.
    - Composition, hierarchy, pacing
    - Placeholder images (grey blocks) and filler text
    - Color palette, hover states, microinteractions
    - Clear information architecture
-   Establish a clear and maintainable workflow using a modern, utility-first CSS framework.

---

## Design Principles

- Swiss/grid composition; eye guided by spacing, not rules.
- Clean sans‑serif typography with restrained sizes and tight tracking for headings.
- Neutral palette with a single red accent used sparingly.
- Accessibility: respect `prefers-reduced-motion` and maintain strong contrast.

---

## Tech Stack

- HTML5, CSS (vanilla)
- No build step required; serve statically.

---

## File Structure

- Root pages: `index.html`, `about.html`, `contact.html`, `faq.html`, `portfolio.html`
- Assets: `assets/` (images, styles). Inspiration references in `assets/inspo/` must not be embedded.
- Styles: `assets/styles/tokens.css`, `assets/styles/base.css`, `assets/styles/components.css`

---

## Codex Update Rules
Whenever Codex generates or modifies files, whenever a new componenet, page, or design rule is added, `README.md` must be updated accordingly in the same commit with descriptive messages.

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
1) Landing hero (replicate swiss/9.jpg composition; placeholders only)
2) Navigation and basic pages (full‑width, subtle padding)
3) Portfolio grid with neutral placeholders
4) Content pages (copy from `business-info.md`)

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
