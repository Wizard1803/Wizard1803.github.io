# FRONTEND_STRUCTURE.md
### Portfolio Site — File & Folder Layout
Defines *where code lives and how files reference each other*. `COMPONENTS.md` defines what each piece does; this document defines which file it belongs in. No bundler, no build step — every file listed here is served as-is.

---

## 1. Folder Tree

```
/
├── index.html
├── about.html
├── projects.html
├── labs.html
├── contact.html
│
├── /css
│   ├── variables.css       (color tokens, font vars, glass spec — maps directly to DESIGN_SYSTEM.md)
│   ├── base.css             (reset, base typography, layout primitives)
│   ├── components.css       (nav capsule, command palette, hover-cards, cursor, tag pills, cert badges)
│   ├── transitions.css      (view-transition-name assignments, cross-fade/drift keyframes)
│   ├── hero.css              (Home hero dashboard only — isolated, not loaded on other pages)
│   └── /pages
│       ├── about.css
│       ├── projects.css
│       ├── labs.css
│       └── contact.css
│
├── /js
│   ├── utils.js              (shared helpers: reduced-motion check, touch detection, throttle fn)
│   ├── content-loader.js      (fetches /data/content.json once, exposes it to every other script)
│   ├── cursor.js              (dot + scan-bracket system)
│   ├── nav.js                  (active-link state, mobile nav behavior if needed)
│   ├── command-palette.js
│   ├── hero.js                  (chevrons, glitch text, mousetrail, recon panel, scroll rev-down — Home only)
│   ├── stats-counter.js         (Home stats strip)
│   ├── skill-bars.js             (About redline bars)
│   ├── hover-cards.js            (Projects page)
│   └── contact.js                 (copy-to-clipboard + toast — Contact only)
│
├── /assets
│   ├── /images                (small accent textures per DESIGN_SYSTEM.md §6, if used — never full-bleed)
│   ├── resume.pdf
│   └── favicon.ico
│
├── /data
│   └── content.json          (live content — see Section 8. Edit this as you progress, not the HTML/JS)
│
└── README.md
```

**Note:** No `/fonts` folder — fonts load via Google Fonts CDN `<link>` tags per `DESIGN_SYSTEM.md` §3. Do not self-host fonts unless a future doc update says otherwise.

---

## 2. Per-Page Loading Strategy

| File | Loaded on |
|---|---|
| `css/variables.css` | All 5 pages |
| `css/base.css` | All 5 pages |
| `css/components.css` | All 5 pages |
| `css/transitions.css` | All 5 pages |
| `css/hero.css` | `index.html` only |
| `css/pages/about.css` | `about.html` only |
| `css/pages/projects.css` | `projects.html` only |
| `css/pages/labs.css` | `labs.html` only |
| `css/pages/contact.css` | `contact.html` only |
| GSAP + ScrollTrigger (CDN) | All 5 pages (used by hero, skill bars, stats counter, hover-cards, transitions) |
| `js/utils.js` | All 5 pages (loaded first, other scripts depend on it) |
| `js/content-loader.js` | All 5 pages (loaded second, right after `utils.js` — every content-displaying script depends on it) |
| `js/cursor.js` | All 5 pages |
| `js/nav.js` | All 5 pages |
| `js/command-palette.js` | All 5 pages |
| `js/hero.js` | `index.html` only |
| `js/stats-counter.js` | `index.html` only |
| `js/skill-bars.js` | `about.html` only |
| `js/hover-cards.js` | `projects.html` only |
| `js/contact.js` | `contact.html` only |

**Script order matters:** `utils.js` loads before any script that depends on its helpers (reduced-motion check, touch detection). Load shared scripts before page-specific ones.

---

## 3. Naming Conventions

**Files:** kebab-case throughout — `command-palette.js`, `skill-bars.js`, not `commandPalette.js` or `CommandPalette.js`.

**CSS classes:**
- Global/shared components (defined in `components.css`, used across pages): unprefixed, descriptive — `.nav-capsule`, `.command-palette`, `.tag-pill`, `.cert-badge`
- Page-specific elements (defined in a page's own CSS file): prefixed with the page name to avoid collisions — `.about-blueprint-grid`, `.labs-scanlines`, `.projects-workbench-grid`
- Light BEM-style nesting only where it actually clarifies structure — `.command-palette__result`, not deep multi-level chains

**IDs:** used only for JS hooks (`getElementById` targets) or unique single-instance elements (e.g. `#heroCenter`) — never for styling.

---

## 4. View Transitions Implementation Note

- `view-transition-name` assignments live in `transitions.css`, applied once, shared across all pages — this is what keeps the nav capsule visually continuous during navigation (see `COMPONENTS.md` §2 and §4).
- Cross-fade + vertical-drift keyframes for page content also live in `transitions.css`, targeting the `::view-transition-old()` / `::view-transition-new()` pseudo-elements.
- No JS transition library — this is CSS + the native browser API only. Any JS involvement (e.g. calling `document.startViewTransition()` if needed for finer control) belongs in `nav.js`, not a new file.

---

## 5. Stitch-Generated Code Integration

When Stitch generates a layout for About / Projects / Labs / Contact:
1. Extract the structural HTML into the appropriate page file
2. Do **not** keep Stitch's own inline styles or default class names as final — restyle using `variables.css` tokens and the naming convention in Section 3
3. Split any generated styling into the correct destination file (`components.css` if it's a reusable pattern, the page's own `pages/*.css` if it's page-specific)
4. Never leave a Stitch-exported CSS file sitting in the project unmodified/unintegrated

---

## 6. Deployment Notes (GitHub Pages)

- Site deploys from the repository root (or a designated branch, per your GitHub Pages settings) with **zero build step** — pushing these files as-is must work
- All internal links and asset references use **relative paths**
- File name casing must match exactly in every reference — GitHub Pages is case-sensitive even if a local dev environment isn't (see `AGENTS.md` §8)
- `resume.pdf` and `favicon.ico` paths should be verified working on the live deployed URL, not just locally, before considering the build complete

---

## 7. Content Loading Pattern (`data/content.json`)

All display content — bio, projects, certs, stats, skills, contact info, hero arc values — lives in `data/content.json`, not hardcoded into HTML or JS. This is deliberate: it's the one file meant to be edited routinely as new skills, projects, and stats come in, without touching any page markup or component logic.

**How it works:**
1. `content-loader.js` runs on every page, `fetch('data/content.json')`, parses it once, and exposes the result (e.g. via a shared `window.siteContent` object or a resolved promise other scripts can await)
2. Page-specific scripts (`hero.js`, `skill-bars.js`, `hover-cards.js`, `contact.js`, etc.) read from that shared object to populate their DOM, rather than containing any literal copy themselves
3. Show a brief loading state (already planned generally per `COMPONENTS.md`) for the moment between page load and the fetch resolving — this is normally near-instant for a small local JSON file, but should never show broken/empty markup while waiting

**Local testing note:** opening `index.html` directly as a `file://` URL will block the `fetch()` call in most browsers (CORS/local-file restrictions). Test with a simple local server instead — e.g. `python -m http.server` or the VS Code "Live Server" extension — rather than double-clicking the HTML file. This has no effect on the live GitHub Pages deployment, which serves everything over `https://` normally.

**What stays out of `content.json`:** structural/behavioral values that never change (colors, fonts, glass spec, animation timing) stay exactly where `DESIGN_SYSTEM.md` and `COMPONENTS.md` already put them. Only *facts about Piyush* — bio, stats, projects, links — go in this file.

---

## 8. README.md (repo root)

Brief file — not part of the live site — covering:
- What the project is, link to the live GitHub Pages URL
- Local development instructions (i.e., "just open `index.html`" — no install step)
- Credit/reference note for the Lamborghini cockpit design inspiration, if desired
