# Repository Guidelines

## Project Structure & Module Organization
- Root pages: `index.html`, `about.html`, `contact.html`, `faq.html`, `portfolio.html` (add new pages at root).
- Content sources: `business-info.md`, `testimonials.md` (copy content into pages; do not import dynamically).
- Assets: `assets/` holds static files; `assets/inspo/` contains inspiration/reference imagery only—do not link to it from production pages.

## Build, Test, and Development Commands
- Serve locally (no build step): `python3 -m http.server 8080` from repo root, then visit `http://localhost:8080`.
- Quick preview (no server): open `index.html` directly in a browser (some features like relative links still work).
- Optional tools (if installed): `tidy -qe *.html` to validate HTML; image compression via `cwebp input.jpg -o output.webp`.

## Coding Style & Naming Conventions
- HTML5 semantic tags; ARIA where needed. Indentation: 2 spaces.
- File names: kebab-case (`new-section.html`), images lowercase kebab-case in `assets/`.
- Prefer modern, compressed images (`.webp` where possible). Always include descriptive `alt` text.
- Keep inline styles minimal; prefer `<style>` in-page or a small shared CSS file in `assets/` if needed.

## Testing Guidelines
- No automated tests. Perform manual QA before opening a PR:
  - Validate HTML (no errors/warnings), check all internal links, favicon, and 404 handling.
  - Test on at least Chrome + Safari; verify responsive layout at 320px, 768px, 1024px, 1440px.
  - Lighthouse pass: Performance/Accessibility/Best Practices ≥ 90 where feasible.

## Commit & Pull Request Guidelines
- Use Conventional Commits style: `feat: add testimonials section`, `fix: correct contact link`.
- Keep commits small and focused; include a one-line summary and brief body when helpful.
- PRs must include: purpose, screenshots/GIFs of changed pages, testing notes (browsers, resolutions), and any content sources used (`business-info.md`, `testimonials.md`).

## Security & Configuration Tips
- Use relative paths for assets; avoid mixed content. Do not embed secrets or third-party trackers.
- Optimize images before commit; keep repo size reasonable. Large files belong in `assets/` only.

## Agent-Specific Notes
- Do not remove or hotlink `assets/inspo/*`; it is reference-only.
- Maintain consistent navigation across all pages and update links when adding/removing pages.
 - Preserve the hero intro and the thin ticker banner in `index.html` exactly as implemented on 2025-09-06. Do not alter layout, copy, animation timing, or styling without explicit stakeholder approval.
