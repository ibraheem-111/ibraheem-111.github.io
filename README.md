# Muhammad Ibraheem's Portfolio

A modern, responsive portfolio website showcasing my academic background in Robotics and Autonomous Systems, featuring detailed project case studies, SEO optimization, and accessibility best practices.

## 🎯 Overview

**Zero-build static site** deployed via GitHub Pages. Stack: HTML5, CSS3, JavaScript (vanilla) — no frameworks, no build step required.

## 📁 Site Structure

```
├── index.html                          # Homepage landing page
├── bio.html                            # Dedicated bio page
├── experience.html                     # Dedicated experience page
├── contact.html                        # Dedicated contact page
├── styles.css                          # Shared minimalist styling for all pages
├── robots.txt                          # SEO: crawler instructions
├── sitemap.xml                         # SEO: site structure for search engines
├── .nojekyll                           # Tells GitHub Pages to skip Jekyll processing
│
└── projects/                           # Project case studies and documentation
    ├── index.html                      # Project listing page with all projects
    ├── nonlinear-peer-aware-cost-estimation.html  # Case study 1: Mobile robotics research
    ├── nl-pick-and-place.html          # Case study 2: NLP-controlled robot arm
    └── quadruped-rl-2dof-spine.html    # Case study 3: one-month RL challenge
```

## ✨ Key Features

### 1. **Multi-Page Architecture**
- Clear multi-page structure with dedicated pages for Bio, Experience, Projects, and Contact
- Dedicated `/projects/` section with detailed case studies for showcase projects
- Cross-page navigation with consistent sidebar and styling

### 2. **SEO & Social Sharing**
- Comprehensive meta tags (Open Graph, Twitter Cards)
- JSON-LD structured data (Person schema)
- Sitemap and robots.txt for search engine indexing
- Root-relative URLs for reliable GitHub Pages deployment

### 3. **Responsive Design**
- Mobile-first CSS with single breakpoint at `768px`
- Sidebar collapsible on desktop (persistent state), hamburger menu on mobile
- All pages tested on mobile (375px) and desktop (1200px+)

### 4. **Accessibility**
- Skip-to-content link for keyboard navigation
- Focus-visible styles on all interactive elements
- `aria-current="page"` on active navigation links
- Prefers-reduced-motion support: animations disabled for users who prefer it
- Semantic HTML with proper heading hierarchy
- Meaningful image alt text

### 5. **Case Study Pages**
Each project case study includes:
- **What I Built**: Feature breakdown
- **System Architecture**: Diagrams and component descriptions
- **Key Engineering Decisions**: Rationale for technical choices
- **Results & Validation**: Quantitative metrics or TODO placeholders
- **Links Section**: Code, demo, write-up (with TODO comments for unknown URLs)

## 🚀 Local Development

### Prerequisites
- Python 3.6+ (or any local web server)

### Running Locally
```bash
cd /path/to/ibraheem-111.github.io

# Option 1: Python HTTP server
python3 -m http.server 8000

# Option 2: Use any other local server
# (Live Server VS Code extension, Node http-server, etc.)
```

Then open `http://localhost:8000` in your browser.

### File Changes
- Edit `index.html` for homepage content
- Edit `styles.css` for styling (no CSS preprocessor needed)
- Edit `projects/index.html` and project case study files for project section
- Update `sitemap.xml` when adding/removing pages or projects

## 📊 Deployment on GitHub Pages

Since this is a static site with no build step:

1. Make changes locally
2. Commit: `git add . && git commit -m "message"`
3. Push to main: `git push origin main`
4. GitHub Pages automatically deploys from `main` branch

**Important**: Repo is `ibraheem-111.github.io` (GitHub User Pages), so it deploys to `https://ibraheem-111.github.io` automatically.

### Troubleshooting GitHub Pages
- If styles/JS don't load on deployed site, check if `href="/styles.css"` uses root-relative paths (using `/` not `./`)
- Clear browser cache or do a hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
- GitHub Pages deployment can take 1–2 minutes; refresh after a few seconds

## 🔄 Adding New Projects

1. **Add case study file**: Create `projects/new-project-slug.html` (copy structure from existing case study files)
2. **Add to projects listing**: Update `/projects/index.html` with new project card
3. **Link from homepage**: (Optional) Add "Case Study" link in project card on `index.html`
4. **Update sitemap**: Add new URL to `sitemap.xml`
5. **Commit and push**: Changes deploy automatically

## ♿ Accessibility & SEO Checklist

- [x] Semantic HTML structure
- [x] Skip-to-content link
- [x] Focus-visible styles (outline on keyboard navigation)
- [x] aria-current="page" on nav items
- [x] alt text on all images
- [x] Prefers-reduced-motion support
- [x] JSON-LD structured data
- [x] Open Graph + Twitter Card meta tags
- [x] robots.txt and sitemap.xml
- [x] Root-relative URLs (important for GitHub Pages sub-pages)

## 📝 Content Alignment Notes

### Experience Section
- Keep the Experience page aligned with your latest role/project updates.

### Project Links & Placeholders
- Case study pages include placeholder TODO comments for external links (code repos, demo videos)
- Links with `aria-disabled="true"` indicate they're not active yet
- To add a real link: replace `href="#"` with actual URL and remove `aria-disabled="true"`

## 🎨 Design System

### Color Palette
- **Primary**: `#2a2a72` (Navy)
- **Secondary**: `#009ffd` (Cyan)
- **Text**: `#333`
- **Light Text**: `#666`
- **Background**: `#ffffff`
- **Section Background**: `#f8f9fa` (Light gray)

### Typography
- **Font**: Inter (system fallback: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto)
- **Line Height**: 1.6
- **Headings**: Bold, gradient on primary/secondary

### Spacing & Layout
- **Container Max Width**: 1200px
- **Section Padding**: 5rem vertical, 2rem horizontal (responsive on mobile)
- **Gap/Margin**: 1rem to 3rem (depends on context)
- **Border Radius**: 10px for cards, 30px for buttons

### Animations
- **Transition**: `cubic-bezier(0.4, 0, 0.2, 1)` (Material Design easing)
- **Duration**: 0.3s to 0.6s
- **Reduced Motion**: Disabled when `prefers-reduced-motion: reduce`

## 🔧 Technologies & Tools

- **HTML5**: Semantic markup
- **CSS3**: Variables, Grid, Flexbox, Glassmorphism (backdrop filter)
- **JavaScript (Vanilla)**: No dependencies, ~175 lines
- **CDN**: Font Awesome 6.0.0 for icons
- **Deployment**: GitHub Pages
- **Version Control**: Git

## 📞 Contact & Links

- **Email**: mibrahe5@asu.edu
- **GitHub**: https://github.com/ibraheem-111
- **LinkedIn**: https://www.linkedin.com/in/muhammad-ibraheem-robotics/
- **Location**: Tempe, Arizona, USA

## 📄 License

MIT License — Feel free to use this portfolio as a template or reference!

---

**Last Updated**: February 11, 2025

_For questions or suggestions, feel free to reach out or open an issue on GitHub._
