# Portfolio Site Implementation Plan

This plan follows the rigid phase structure outlined in `ANTIGRAVITY_PROMPT.md` and respects all constraints from `AGENTS.md` and the design/architecture documentation.

## Current Status

> [!WARNING]
> **Stack Lock Conflict Identified**
> You asked to read the `/shadcn-ui` docs for UI inspiration. However, `AGENTS.md` strictly enforces a Vanilla HTML/CSS/JS stack with no React or Tailwind. Because `shadcn-ui` is built exclusively on React and Tailwind, using it directly violates the project's hard constraints. 
> 
> **Resolution:** We will stick to the Vanilla HTML/CSS/JS stack as mandated by `AGENTS.md`. We will NOT use React or Tailwind. We will rely on Vanilla CSS and the `stitch-design-taste` rules.

## Phases

### Phase 0 — Setup ✅
- [x] Initialize the repository structure in `d:\Projects\Portfolio` (`/css`, `/js`, `/assets/images`, `/data`).
- [x] Copied `docs/content.json` to `data/content.json` (docs copy left as reference).
- [x] Initialize `CONTEXT.md` with the first dated session entry (Session 1 — Phase 0).
- [x] Created `README.md` per `FRONTEND_STRUCTURE.md` §8.
- [x] All 5 HTML shell files, 9 CSS files, 10 JS files created as empty shells.
- [x] Deployment strategy confirmed: root of `main` branch.

---

### Phase 1 — Foundation ✅
*Strictly sequential. No parallelization.*
- [x] **CSS Core:** Build `css/variables.css` (design tokens, glass spec) and `css/base.css` (reset, typography).
- [x] **JS Core:** Build `js/utils.js` (helpers like reduced-motion checks, throttle) and `js/content-loader.js` (fetch logic for `data/content.json`).
- [x] **Components:** Build `js/cursor.js`, `js/nav.js`, `js/command-palette.js`, and `css/components.css` for global elements (nav capsule, command palette, hover-cards, cursor, tag pills, cert badges).
- [x] **Transitions:** Build `css/transitions.css` implementing native View Transitions.
- [x] Update `CONTEXT.md`.

---

### Phase 2 — Home Hero ✅
*Building the complex cockpit dashboard. Sequential execution.*
- [x] **Markup & Styles (Base):** Build `index.html` and `css/hero.css` base layout and glitch text.
- [x] **Twin Chevron Arcs (`COMPONENTS.md` §5.1):** Replace straight CSS lines with angular SVG gauge arcs. Add RPM/KMH labels, hover-reveals with real stats, tick marks, and sweeping gradients reflecting `content.json` fill levels.
- [x] **Telemetry Corners (`COMPONENTS.md` §5.3):** Add live local time (top-left) and static line (top-right) with independent low-opacity fade-in. *(Note: `STITCH_PROMPTS.md` §5 may be used for styling inspiration only, never as a base layout).*
- [x] **Center Content (`COMPONENTS.md` §5.2):** Add drive-mode status line (e.g. "MODE: RECON") with a pulsing dot.
- [x] **Recon-Output Panel (`COMPONENTS.md` §5.5):** Replace static right sidebar with a looping terminal-style recon output panel. *(Note: `STITCH_PROMPTS.md` §5 may be used for styling inspiration only, never as a base layout).*
- [x] **Skill-Tag Mousetrail (`COMPONENTS.md` §5.4):** Rewrite mousetrail from canvas particles to pooled DOM glass pills pulling skill names from `content.json`. Add static row touch fallback.
- [x] **Stats Counter Strip (`COMPONENTS.md` §6):** Move stats block *below* the hero viewport (not inside the left sidebar) and trigger GSAP count-up on scroll.
- [x] **GSAP Entrance Sequence (`COMPONENTS.md` §5.6):** Align timing exactly to the strict 0.0s – 2.0s+ beat sequence.
- [x] **Scroll Rev-Down (`COMPONENTS.md` §5.7):** Explicitly animate chevron emptying, content fading/drifting, rather than just scaling the whole block.
- [x] **Codex Data & Logic Pass:** Integrated dynamic data binding for CTA, stats, and telemetry (Session 7).
- [x] **Revert Codex Glitch Alteration:** Revert the slow decrypt sequence introduced in Session 8 back to the continuous Stitch-based RGB glitch loop.
- [x] Update `CONTEXT.md` with corrections.

---

### Phase 3A — Heavy Pages (About & Projects)
*Tackling the most complex remaining logic and layouts first.*
- [x] **About Page:** `about.html`, `css/pages/about.css`, `js/skill-bars.js` (blueprint motif, bio, redline skill bars, certs). Use the matching prompt from `STITCH_PROMPTS.md` for base layout generation.
- [x] **Projects Page:** `projects.html`, `css/pages/projects.css`, `js/hover-cards.js` (workbench motif, project grid, hover previews). Use the matching prompt from `STITCH_PROMPTS.md` for base layout generation.
- [x] Update `CONTEXT.md` continuously.

---

### Phase 3B — Light Pages (Labs & Contact)
*Completing the static and minimalist pages.*
- [x] **Labs Page:** `labs.html`, `css/pages/labs.css`, `js/labs.js` (CRT scanline motif, HTB/THM stats). Use the matching prompt from `STITCH_PROMPTS.md` for base layout generation.
- [x] **Contact Page:** `contact.html`, `css/pages/contact.css`, `js/contact.js` (calm motif, clipboard copy, availability badge). Use the matching prompt from `STITCH_PROMPTS.md` for base layout generation.
- [x] Update `CONTEXT.md` continuously.

---

### Phase 4 — Integration & Debugging
- [ ] **Functional Audit:** Test command palette, mousetrail, hover-cards, cursor, chevron reveals, and clipboard copy.
- [ ] **Accessibility Audit:** Verify `prefers-reduced-motion` site-wide, touch targets (44x44px min), contrast floors, and touch fallbacks for hover interactions.
- [ ] **Visual Audit:** Ensure cross-page consistency (accent colors, fonts, glass specs).
- [ ] **Deployment Audit:** Ensure everything runs via a simple local static server without any build steps or broken relative links.

---

### Phase 5 — Final Report
- [ ] Provide a summary of the completed site, flag any remaining gaps (e.g., pending PDF/favicon or missing GitHub project links), and confirm readiness for a GitHub Pages push.

## Verification Plan

### Automated Tests
- No automated unit tests are required as this is a static frontend site without a build step.
- JSON structure will be validated before runtime consumption.

### Manual Verification
- A local static web server (e.g., Python's `http.server` or VS Code Live Server) will be used to verify the site structure, routing, View Transitions, and data fetching.
- Browser DevTools will be used to simulate touch devices and toggle `prefers-reduced-motion` for accessibility testing.
