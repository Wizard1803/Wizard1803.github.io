# PROJECT_BIBLE.md
### Portfolio Site — Master Architecture Document
Owner: Piyush (Wizard1803) | Purpose: Red team / offensive security internship portfolio

This is the top-level source of truth for structure and flow. For deep detail on visuals, see `DESIGN_SYSTEM.md`. For component behavior, see `COMPONENTS.md`. For file/folder layout, see `FRONTEND_STRUCTURE.md`. For real copy, see `CONTENT.md`. For hard build rules, see `AGENTS.md`.

---

## 1. Purpose & Audience

**Primary audience:** Red team recruiters, offensive security hiring managers, CTF-adjacent technical community.
**Secondary audience:** General dev hiring (fallback).

Every structural and visual decision filters through one question: *does this read as "offensive security specialist," not "generic dev portfolio"?*

---

## 2. Tech Stack (summary — full rules in `AGENTS.md`)

- Vanilla HTML / CSS / JS — no React, no framework, no build step
- GSAP + ScrollTrigger for all animation
- Hand-coded SVG for custom graphics (chevron dashboard, gauges)
- Native View Transitions API for cross-page navigation
- Deployed as a static site on GitHub Pages
- Stitch MCP used to accelerate layout generation for About / Projects / Labs / Contact
- Hero section (Home) is NOT Stitch-generated — see Section 5

---

## 3. Site Map — 5 Pages

| # | Page | File | Role |
|---|---|---|---|
| 1 | Home | `index.html` | First impression. Cockpit dashboard hero, stats snapshot, entry point |
| 2 | About | `about.html` | Bio, skills, certifications, education |
| 3 | Projects | `projects.html` | Project showcase grid |
| 4 | Labs | `labs.html` | HTB/THM activity, CTF stats, writeups (future) |
| 5 | Contact | `contact.html` | Channels to reach out — no form |

Single-level site. No sub-routes, no dynamic URL params. Every page is a real, separate `.html` file (required for GitHub Pages + View Transitions cross-document navigation to work without routing hacks).

---

## 4. Global Navigation

**Nav capsule:**
- Glassmorphism floating pill, fixed position, present identically on all 5 pages
- Tagged with `view-transition-name` so it never fades/flickers between page loads — reads as one continuous UI element, not five separate navbars
- No scroll-based condensing — stays constant
- Contains: logo/wordmark, links to all 5 pages, visible ⌘K command palette trigger (button, not just keyboard hint — must be tappable on mobile)

**Page transitions:**
- Content area: cross-fade + subtle vertical drift (~10-20px)
- Nav capsule: excluded from the transition entirely (see above)
- Fallback: browsers without View Transitions support get an instant, un-animated navigation — acceptable, not broken

**Command palette (⌘K):**
- Available globally, same behavior on every page
- Full spec in `COMPONENTS.md`

---

## 5. Page-by-Page Breakdown

### 5.1 Home (`index.html`)
**Background motif:** Speed lines + cockpit dashboard
**Hero:** Full-viewport twin-chevron dashboard composition — this is the site's signature moment. Full behavioral spec lives in `COMPONENTS.md`.

> **Note on Stitch/generated visuals for Hero:** The Lamborghini cockpit reference photo may be fed to Stitch or Antigravity as a **mood/visual reference only** — extract chevron geometry, spatial hierarchy (center = primary, flanking = contextual, corners = ambient, bottom = grounding), dark cinematic lighting. Do NOT extract literal automotive branding, badges, or vehicle photography. Any Stitch-generated output for this section is a **starting visual layout only** — the interaction/animation behavior defined in `COMPONENTS.md` is authoritative and must be layered on top regardless of what Stitch produces.

**Below the hero:**
- Stats counter strip (numbers count up on scroll into view)
- Brief intro / CTA into other pages

### 5.2 About (`about.html`)
**Background motif:** Blueprint/schematic grid (fine SVG linework, technical-drawing feel)
**Content:**
- Short bio (3–5 lines)
- Skills section — redline-style progress bars per skill category
- Certifications list
- Education (Parul University, CSE, final year)
**Build approach:** Stitch-generated base layout, then restyled with locked design system on top

### 5.3 Projects (`projects.html`)
**Background motif:** Workbench/garage grid lines (code-driven) + optional small generated texture accent behind section header only — never full-bleed
**Content:**
- Project grid, each card with hover-card preview (desktop) / tap-to-expand (touch)
- Real project list pending `CONTENT.md`
**Build approach:** Stitch-generated grid layout, then restyled

### 5.4 Labs (`labs.html`)
**Background motif:** CRT scanlines + vignette — leans more "terminal/hacker," least "automotive" of all pages
**Content:**
- HTB/THM stats and activity
- CTF writeups (placeholder until content exists)
**Build approach:** Stitch-generated layout, then restyled

### 5.5 Contact (`contact.html`)
**Background motif:** Faint speed lines only — quietest, calmest page on the site, intentionally
**Content:**
- Short, direct 2–3 line statement (not a form prompt)
- Linked channels styled as large clickable rows: GitHub, LinkedIn, Email (copy-to-clipboard + toast confirmation), Resume download
- Optional small pulsing "AVAILABLE FOR INTERNSHIPS" status badge
- **No contact form** — deliberate choice, avoids third-party form service dependency and reads as more confident
**Build approach:** Stitch-generated layout, then restyled

---

## 6. Cross-Page Consistency Rules

These are non-negotiable regardless of per-page motif differences:

1. Accent color (`#e8ff00`) and both typefaces (Bebas Neue, Share Tech Mono, plus Rajdhani for body) appear **identically** on every page
2. One fixed glass blur/opacity value used everywhere glassmorphism appears (nav, command palette, hover-cards) — no per-component drift
3. Cursor: dot + scan-bracket hover state on all pages **except** Home hero, where the skill-tag mousetrail replaces it
4. `prefers-reduced-motion` fallback required on every animated element, site-wide — not just the hero

---

## 7. What This Document Does NOT Cover

- Exact colors, fonts, spacing values → `DESIGN_SYSTEM.md`
- Component-level behavior, animation timing, states → `COMPONENTS.md`
- File/folder layout, naming conventions → `FRONTEND_STRUCTURE.md`
- Actual bio/project/cert copy → `CONTENT.md`
- Agent guardrails and hard constraints → `AGENTS.md`
