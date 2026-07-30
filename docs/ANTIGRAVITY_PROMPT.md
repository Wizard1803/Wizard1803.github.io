# Antigravity Build Prompt — Portfolio Site

## Context

You are building a personal portfolio site for a final-year CS student targeting red team / offensive security internships. Everything you need to know is in the project folder:

- `PROJECT_BIBLE.md` — architecture, 5-page site map, navigation rules
- `DESIGN_SYSTEM.md` — colors, typography, glass spec, motion principles, accessibility floors, Lamborghini reference photo annotation
- `COMPONENTS.md` — full behavior spec for every custom component (touch fallback + reduced-motion fallback included)
- `FRONTEND_STRUCTURE.md` — file/folder layout, naming conventions, loading strategy, `data/content.json` pattern
- `AGENTS.md` — your hard guardrails for this build. **Read this first and follow it for the entire session, including across any subagents you dispatch.**
- `CONTEXT.md` — living build log template. Maintain this continuously.
- `CONTENT.md` — reasoning/decisions behind the real content
- `data/content.json` — the actual live content values to build from
- A reference photo (Lamborghini cockpit dashboard) — mood/geometry reference for the hero only, per `DESIGN_SYSTEM.md` §7

**Before writing any code:** read all seven documents in the order specified in `AGENTS.md` §1, then read `data/content.json`. Do not proceed until you've done this.

---

## Your Task

Plan and build this site in the phases below. Produce your own detailed task breakdown within each phase, but do not deviate from the phase structure or ordering itself — it's deliberate, based on real dependency constraints (shared foundation files must exist before anything else can safely be built in parallel).

---

## Phase 0 — Setup

- Initialize the repository structure exactly per `FRONTEND_STRUCTURE.md` §1 (empty shell files are fine at this stage)
- Confirm GitHub Pages deployment approach (root of `main`, or a dedicated branch) — if this isn't already decided, ask me directly rather than assuming
- Initialize `CONTEXT.md` with a new dated session entry
- Confirm you can read `data/content.json` and all six markdown docs correctly before proceeding

---

## Phase 1 — Foundation (single agent, sequential — do not parallelize this phase)

Build, in order:
1. `css/variables.css`, `css/base.css` — direct implementation of `DESIGN_SYSTEM.md` tokens
2. `js/utils.js`, `js/content-loader.js` — shared helpers and the content-fetch pattern from `FRONTEND_STRUCTURE.md` §7
3. `js/cursor.js`, `js/nav.js`, `js/command-palette.js`, `css/components.css` — nav capsule, command palette, hover-cards, cursor, tag pills, cert badges per `COMPONENTS.md` §1–3, 8–9
4. `css/transitions.css` — view-transition-name assignments and cross-fade/drift keyframes per `COMPONENTS.md` §4 and `FRONTEND_STRUCTURE.md` §4

**This phase must be functionally complete and self-verified before Phase 2 begins.** Every other phase depends on these files. Do not start Phase 2 or dispatch any subagents until Phase 1 is done.

---

## Phase 2 — Home Hero (single agent, sequential — the hardest, highest-risk part, being proven out before anything is parallelized)

Build `index.html`, `css/hero.css`, `js/hero.js` — the full cockpit dashboard exactly per `COMPONENTS.md` §5:
- Twin chevron arcs with tick marks, gradient fill, hover-reveal (real values from `data/content.json` → `heroArcs`)
- Center content: glitch/decrypt name reveal, title, status line
- Telemetry corners (live time + static focus line)
- Skill-tag mousetrail (pool from `data/content.json` → `skills`), with touch fallback and full deactivation on reduced-motion
- Recon-output ambient panel
- The strict entrance animation sequence in `COMPONENTS.md` §5.6 — do not compress or parallelize these beats
- Scroll rev-down behavior per §5.7

Use the Lamborghini reference photo for geometry/mood only, per `DESIGN_SYSTEM.md` §7 — extract chevron shape and spatial hierarchy, not literal car branding. If you use Stitch for anything here, treat its output as a discardable starting sketch only — **do not use Stitch as the source of truth for the hero**, per `AGENTS.md` §4.

If your environment supports browsing/screenshotting your own work, use that capability now to visually self-check the hero against `DESIGN_SYSTEM.md`'s described mood and `COMPONENTS.md`'s animation sequence before calling this phase done.

**Checkpoint: stop here and report back to me before proceeding to Phase 3.** Show me the hero, summarize what you built, and flag anything ambiguous you had to make a judgment call on. Wait for my go-ahead.

---

## Phase 3 — Remaining Pages (parallelize this phase — dispatch one subagent per page)

Once I've approved Phase 2, dispatch four subagents in parallel, one per page. Each subagent works only within its own page's files and must **not** modify anything in Phase 1's foundation files or `index.html`/`hero.*`. Each should:
- Use Stitch MCP to generate a base layout, then restyle it against `DESIGN_SYSTEM.md` tokens per `FRONTEND_STRUCTURE.md` §5 — never ship raw Stitch styling
- Pull all real content from `data/content.json`, never hardcode
- Log its own progress into `CONTEXT.md` under its own dated subsection — do not overwrite other subagents' entries (append-only)

**Subagent A — About:** `about.html`, `css/pages/about.css`, `js/skill-bars.js`. Blueprint/schematic motif, bio, redline skill bars, certifications, education. Per `PROJECT_BIBLE.md` §5.2, `COMPONENTS.md` §7.

**Subagent B — Projects:** `projects.html`, `css/pages/projects.css`, `js/hover-cards.js`. Workbench motif, project grid with hover-card previews, WIP status labels on every project (per `CONTENT.md` §5 — none of these are finished case studies, label them honestly). Per `PROJECT_BIBLE.md` §5.3, `COMPONENTS.md` §9.

**Subagent C — Labs:** `labs.html`, `css/pages/labs.css`. CRT scanline motif, TryHackMe stats (`data/content.json` → `labs.thm`), HTB framed as active learning not a scored metric (`labs.htb`). Per `PROJECT_BIBLE.md` §5.4.

**Subagent D — Contact:** `contact.html`, `css/pages/contact.css`, `js/contact.js`. Minimal/calm motif, statement + channel rows, copy-to-clipboard email with toast, availability badge. No form — per `PROJECT_BIBLE.md` §5.5, `COMPONENTS.md` §12.

---

## Phase 4 — Integration & Debugging (single agent, sequential, after all Phase 3 work merges)

Run a full checklist pass, not spot-fixes:

**Functional:** every interactive component works — command palette (open/search/keyboard nav/mobile trigger), mousetrail, hover-cards (desktop + tap-to-expand), scan-bracket cursor, chevron hover-reveal, contact copy-to-clipboard + toast.

**Accessibility:** `prefers-reduced-motion` fallback verified on every animated element site-wide (not just hero) per `DESIGN_SYSTEM.md` §5. Touch/mobile fallback verified for every hover-dependent component per `COMPONENTS.md`. Contrast rules and 11px font-size floor from `DESIGN_SYSTEM.md` §8. Minimum 44×44px touch targets.

**Cross-page consistency:** accent color and all three typefaces identical across every page. Glass spec identical across nav/command-palette/hover-cards. Nav capsule doesn't flicker or reset during page transitions.

**Cross-browser:** primary target Chrome/Chromium (View Transitions support). Verify graceful, non-broken fallback on Firefox/Safari (instant navigation, no layout breakage, no console errors from the unsupported API).

**Definition of Done:** run the full checklist from `AGENTS.md` §9 against every page individually.

**Deployment:** verify zero build step is actually sufficient — open the site via a local static server (not a bundler) and confirm everything works. Check relative path casing matches exactly (GitHub Pages is case-sensitive).

Log every bug found and fixed in `CONTEXT.md`.

---

## Phase 5 — Final Report

Summarize: what was built, current state of each page, any deviations from the docs (and why), remaining known gaps (e.g. project GitHub links still `[PENDING]` in `data/content.json`, resume/favicon placement), and confirm the site is ready for a GitHub Pages push.

---

## Standing Rules (apply to every phase and every subagent)

- `AGENTS.md` governs all behavior at all times, including inside subagents — its rules don't relax just because a task is delegated
- If any two source documents conflict, stop and log it in `CONTEXT.md` — don't silently pick one
- Never fabricate content, stats, or claims — everything real comes from `data/content.json`; anything missing gets a clearly-marked `[PENDING]` placeholder
- Use whichever tools, skills, plugins, or MCPs are actually available and best-suited to each task (Stitch for non-hero layouts, your own browser/verification capability for visual self-checks, subagent dispatch for Phase 3) — don't limit yourself only to what's explicitly named here if something better-suited is available in your environment
