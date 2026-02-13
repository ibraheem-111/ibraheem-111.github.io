# Agent Guide (Repository Map)

This repo is a **single-page GitHub Pages** portfolio site deployed at:

- https://ibraheem-111.github.io

There is **no build step** (plain HTML/CSS/JS). Changes merged to the default branch are served by GitHub Pages.

---

## Directory layout

Top-level files (everything lives at the repo root):

- `index.html` — the entire site markup (single-page, section-based)
- `styles.css` — all styling (CSS variables + responsive rules)
- `script.js` — small UI behaviors (sidebar, scrolling, section reveal)
- `README.md` — short human-facing overview
- `ibraheem.jpg` — profile image referenced by `index.html` and social meta tags
- `ibraheem_12142025_robotics_and_ai.pdf` — resume download target
- `favicon.svg` — favicon
- `.git/` — git metadata

---

## How the site is structured

### It’s a single-page app (but not a framework)
The site is one HTML document with multiple `<section>` blocks. Navigation uses anchor links (e.g. `#about`).

**Important invariant:** every sidebar link `href="#..."` must match a `<section id="...">`.

### Sections (by id)
Current main sections in `index.html`:

- `about`
- `academic`
- `experience`
- `projects`
- `interests`
- `contact`

The sidebar navigation is in the `<aside id="sidebar">` block and links to these section IDs.

---

## Key files (what to edit)

### `index.html`
Contains:

- SEO and social meta tags (Open Graph + Twitter)
- Sidebar navigation markup
- The main content sections
- Footer
- Includes:
  - `styles.css`
  - Font Awesome CSS from a CDN
  - `script.js`

Assets referenced from HTML:

- Profile image: `ibraheem.jpg`
- Resume: `ibraheem_12142025_robotics_and_ai.pdf`
- OpenGraph image: points to `https://ibraheem-111.github.io/ibraheem.jpg`

If you rename assets, you must update all references in `index.html`.

### `styles.css`
A single stylesheet with:

- CSS variables in `:root` (primary/secondary/text/background)
- Layout for:
  - sidebar (collapsed vs expanded)
  - main content margin shifts based on sidebar state
  - section layouts (grid/flex)
- Responsive rules (mobile sidebar toggle / overlay)

If you change sidebar widths, also verify:

- `.main-content { margin-left: ... }`
- `.sidebar-toggle-desktop { left: ... }`
- `.sidebar.collapsed ~ .main-content` and related sibling selectors

### `script.js`
Behavior is intentionally lightweight:

- Desktop sidebar collapse toggle
  - Persists to `localStorage` under key: `sidebarCollapsed`
- Mobile sidebar open/close
  - Uses overlay, locks body scrolling while open
  - Escape key closes menu
- Smooth scrolling for `a[href^="#"]`
- Active sidebar link updates on scroll
- Section reveal animation using `IntersectionObserver`

If you add/remove sections, ensure `updateActiveLink()` continues to reflect the section IDs.

---

## Local development / preview

No dependencies required.

Option A (simplest):
- Open `index.html` directly in your browser.

Option B (recommended to mimic GitHub Pages paths/caching):
- Run a local static server from the repo root, e.g.:
  - `python3 -m http.server 8000`
  - then open `http://localhost:8000`

Quick manual checks after edits:

- Sidebar anchors scroll to the right section
- Mobile menu opens/closes and overlay works
- No console errors
- Resume download link works
- Image and favicon load

---

## Deployment model (GitHub Pages)

This repository is designed to be hosted directly by GitHub Pages.

Operational assumptions:

- `index.html` lives at the repo root
- asset files are referenced by relative paths (or absolute site URLs in meta tags)

After changes land on the publishing branch, GitHub Pages serves the updated static content.

---

## Common edit tasks

### Update resume PDF
1. Replace the PDF file (keeping the same name), OR
2. Upload a new PDF and update the `href` in the resume download link in `index.html`.

### Update profile image
1. Replace `ibraheem.jpg` (same name), OR
2. Upload a new image and update:
   - the `<img src="...">` in the About section
   - `og:image` and `twitter:image` meta tags (if they should change)

### Add a new section
1. Add a `<section id="new-section"> ... </section>` in `index.html`
2. Add a matching sidebar link: `<a href="#new-section" class="sidebar-link">...` 
3. Add styling in `styles.css` only if necessary
4. Verify `updateActiveLink()` highlights the new link while scrolling

---

## Guardrails (avoid breaking UX)

- Keep section IDs stable (anchors + active-link logic depend on them).
- Don’t remove elements referenced by JS IDs:
  - `sidebar`, `sidebarToggle`, `sidebarToggleMobile`, `sidebarOverlay`, `mainContent`
- If you change class names used by JS (e.g. `sidebar-link`), update selectors in `script.js`.
- Prefer minimal JS; this repo is intentionally framework-free.

---

## Notes for AI agents

When making changes:

- Make small, reviewable edits.
- Avoid unrelated reformatting of `index.html` (large diffs are hard to review).
- Validate on both desktop and mobile viewport widths (≤768 triggers mobile behavior).
