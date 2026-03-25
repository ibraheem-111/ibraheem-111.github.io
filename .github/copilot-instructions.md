# AI Coding Agent Instructions

## Project Overview
A modern, responsive personal portfolio website for Muhammad Ibraheem featuring a robotics/AI focus. **Zero-build static site** (vanilla HTML/CSS/JS) deployed via GitHub Pages.

## Architecture & Key Patterns

### Single-Page Application with Anchor Navigation
- Sections are `<section id="about">`, `<section id="academic">`, `<section id="experience">`, `<section id="projects">`, `<section id="interests">`, `<section id="contact">`
- Sidebar navigation links scroll to sections using smooth scrolling
- Active link highlighting (`updateActiveLink()` function) tracks scroll position to update active nav state
- All routing is client-side hashtag-based

### Responsive Sidebar Navigation (Critical Pattern)
- **Desktop (>768px):** Fixed collapsible sidebar (280px expanded → 80px collapsed), state persisted to localStorage
- **Mobile (≤768px):** Hamburger menu, sidebar slides in with backdrop overlay
- Breakpoint is hardcoded at `768px` in both CSS (`@media (max-width: 768px)`) and JS (`window.innerWidth <= 768`)
- Uses a debounced resize handler (250ms) to manage state transitions between mobile/desktop views

### Event Handling Optimizations
- **Scroll listener:** Debounced with 100ms timeout to prevent performance degradation, calls `updateActiveLink()`
- **Resize listener:** Debounced with 250ms timeout to handle mobile/desktop transitions smoothly
- **IntersectionObserver API:** Used for fade-in animations on section views (instead of scroll listeners)

### CSS Architecture
- **CSS Variables (`:root`)** define theme colors (`--primary-color`, `--secondary-color`, etc.)
- **Glassmorphism design:** Sidebar uses `backdrop-filter: blur(20px)` with semi-transparent background
- **CSS Grid/Flexbox:** Grid for skills/projects cards, Flexbox for navigation and content layout
- **Color Scheme:** Primary `#2a2a72` (navy), Secondary `#009ffd` (cyan), accent backgrounds `#f8f9fa`
- **Transitions:** All use `cubic-bezier(0.4, 0, 0.2, 1)` for smooth animations

### JavaScript Organization
1. **Sidebar Management:** Toggle desktop/mobile states, persist collapsed state to localStorage
2. **Navigation:** Smooth scroll to anchors, update active link on scroll
3. **Mobile UX:** Close sidebar on link click, handle Escape key, manage body overflow
4. **Animations:** IntersectionObserver with opacity/translateY transforms for section fade-ins

## Development Workflows

### No Build Process Required
- Files are served as-is; changes are immediate (refresh browser to see)
- All dependencies are external CDNs (Font Awesome, CSS frameworks)
- Testing: Open `index.html` in browser or run a local server (`python -m http.server 8000`)

### File Structure
```
├── index.html          # Single HTML file with all sections, semantic markup
├── styles.css          # 1000+ lines; sidebar, layout, animations, responsive breakpoints
├── script.js           # 170 lines; sidebar toggles, scroll tracking, smooth navigation
├── README.md           # Project documentation
└── .github/copilot-instructions.md  # This file
```

## Project-Specific Conventions

### HTML Conventions
- Extensive use of semantic HTML (`<section>`, `<nav>`, `<main>`, `<footer>`)
- ARIA labels for accessibility (e.g., `aria-label`, `aria-expanded`, `aria-controls`)
- Multiple meta tags for SEO (Open Graph, Twitter Cards, canonical tags)
- Use class names that describe component state: `.sidebar`, `.sidebar.collapsed`, `.sidebar.active` (mobile)

### Selector Mutation Pattern
- JavaScript mutates DOM by adding/removing classes (`.collapsed`, `.active`) rather than inline styles
- CSS media queries and class toggles work together (e.g., `sidebar.collapsed .link-text { display: none; }`)
- This allows state to persist across resize and component interactions

### Responsive Design Approach
- **Mobile-first CSS:** Write base styles for mobile, then expand with `@media (min-width: 769px)` for desktop
- **Single breakpoint at 768px:** Used consistently across CSS and JS
- **Collapsible vs. Hidden:** Desktop hides full nav with collapse; mobile uses overlay backdrop

### Storage & State Management
- **localStorage key:** `'sidebarCollapsed'` stores boolean for desktop sidebar state
- Only desktop sidebar state is persisted (mobile sidebar doesn't persist across sessions)
- State initialized on page load via `initializeSidebar()`

## Integration Points & External Dependencies

### CDN Dependencies
- **Font Awesome 6.0.0** (`https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css`)
- **System Fonts:** 'Inter' (fallback to system fonts via `-apple-system, BlinkMacSystemFont`, etc.)

### GitHub Pages Deployment
- Repo is `ibraheem-111.github.io` (GitHub User Pages)
- Static files served directly; no build step required
- Resume PDF (`ibraheem_12142025_robotics_and_ai.pdf`) and profile image (`ibraheem.jpg`) should be in root

## Common Tasks & Code Patterns

### Adding a New Section
1. Create `<section id="new-section">` in HTML
2. Add sidebar link: `<a href="#new-section">` in `<nav class="sidebar-nav">`
3. Add CSS: style both `.new-section` and responsive behavior
4. No JavaScript changes needed (scroll tracking is generic)

### Modifying Sidebar Breakpoint
- Update mobile check: Line 11 in script.js (`window.innerWidth <= 768`)
- Update CSS media query: `@media (max-width: 768px)` in styles.css
- **Keep these in sync** or mobile/desktop transitions will break

### Performance Considerations
- **Debounce scroll/resize:** Don't trigger expensive calculations on every event (already implemented)
- **IntersectionObserver:** Preferred over scroll listeners for element visibility (used for fade-in animations)
- **localStorage:** Used only for sidebar state; minimal impact

## Accessibility Standards
- Semantic HTML structure with proper heading hierarchy
- ARIA labels on all interactive elements (buttons, navigation)
- Color contrast ratio follows modern standards (navy/cyan on white)
- Links are underlined and distinguishable
- Keyboard navigation: Tab through links, Escape closes mobile menu
