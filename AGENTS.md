# AGENTS.md
### Agent Guardrails — Portfolio Site Build
These are hard constraints, not suggestions. If a task seems to require breaking one of these rules, STOP and flag it in `CONTEXT.md` rather than proceeding. Do not silently override anything in this file.

---

## 1. Required Reading Order

Before writing any code, read in this order:
1. `PROJECT_BIBLE.md` — architecture and page structure
2. `DESIGN_SYSTEM.md` — visual rules
3. `COMPONENTS.md` — component behavior
4. `FRONTEND_STRUCTURE.md` — file/folder layout
5. `CONTENT.md` — real copy and reasoning
6. `data/content.json` — the actual live values `CONTENT.md` describes

If any two documents appear to conflict, **stop and log the conflict in `CONTEXT.md`** — do not silently pick one and proceed.

---

## 2. Stack Lock — Do Not Deviate

- **Vanilla HTML / CSS / JS only.** No React, Vue, Svelte, or any framework.
- **No build step, no bundler, no npm package.json** unless explicitly approved in a future doc update.
- **GSAP + ScrollTrigger** (already CDN-loaded) is the only animation library in use.
- **Real, separate `.html` files per page** — `index.html`, `about.html`, `projects.html`, `labs.html`, `contact.html`. No client-side routing, no SPA behavior, no hash-routing.
- **Native View Transitions API** for cross-page navigation. No polyfill libraries, no third-party transition framework.
- Fonts loaded via Google Fonts CDN `<link>` tags, as specified in `DESIGN_SYSTEM.md` — do not self-host or substitute fonts without approval.

---

## 3. Scope Lock

- Do **not** invent new pages or sections beyond the 5 defined in `PROJECT_BIBLE.md`.
- Do **not** add components, effects, or features not defined in `COMPONENTS.md`. If something would clearly improve the site but isn't spec'd, propose it in `CONTEXT.md` — do not build it unprompted.
- Do **not** alter color tokens, fonts, spacing, or glass values from `DESIGN_SYSTEM.md`.
- Do **not** restructure the file/folder layout from `FRONTEND_STRUCTURE.md` without flagging the change first.
- Ambiguity is not license to improvise a permanent decision — log it and use the most conservative interpretation until clarified.

---

## 4. Stitch MCP Usage Rules

- Stitch **may** be used to generate base layouts for: `about.html`, `projects.html`, `labs.html`, `contact.html`.
- Stitch **must not** be used to generate the Home hero. The hero is built directly from the detailed spec in `COMPONENTS.md`. The Lamborghini reference photo (see `DESIGN_SYSTEM.md` §7) may be shown to Stitch or used for visual inspiration only — any Stitch output for the hero is a discardable starting point, not a target to replicate.
- **All Stitch output must be restyled against `DESIGN_SYSTEM.md` tokens before being treated as final.** Never ship raw Stitch default styling (its own color/font/spacing choices) as-is.

---

## 5. Non-Negotiable Requirements

These apply site-wide, not just to the hero or to "showcase" pages:

- `prefers-reduced-motion` must be fully implemented per `DESIGN_SYSTEM.md` §5 on every page, not only Home.
- Every hover-dependent component (mousetrail, hover-cards, scan-bracket cursor, chevron hover-reveal) must have a working touch/mobile equivalent per `COMPONENTS.md`.
- Contrast and font-size floors from `DESIGN_SYSTEM.md` §8 are mandatory, not aspirational.
- Minimum touch target size: 44×44px on any tappable mobile element.
- Command palette must be reachable via a visible on-screen trigger, not keyboard shortcut alone (mobile has no keyboard).

---

## 6. Content Rules

- Do not fabricate stats, project details, certifications, or claims not present in `CONTENT.md` / `data/content.json`.
- If real content for a section isn't yet available, use clearly-marked placeholder text (e.g. `[PENDING: project description]`) rather than inventing plausible-sounding filler — placeholders must be easy to grep for later.
- Numbers used in the hero's RPM/KMH hover-reveal (or any other "real stat" display) must come from `data/content.json`. Never invent a percentage or count.
- **All display content must be sourced at runtime from `data/content.json`, never hardcoded directly into HTML or JS.** This is a hard architectural rule, not a style preference — the person updates this file routinely as they learn new skills, ship projects, and progress on certifications, and hardcoded content defeats that entirely. See `FRONTEND_STRUCTURE.md` §7 for the loading pattern.
- `CONTENT.md` remains the record of *reasoning and decisions* (why a tool is excluded, why a stat is framed a certain way) — `data/content.json` is the *live values* file. If a real decision changes (not just a data update), update `CONTENT.md` too, not only the JSON.

---

## 7. Process Rules

- Maintain `CONTEXT.md` continuously: what's been built, what's pending, any decisions made mid-build that weren't explicitly in the source docs.
- Do not reverse or "simplify away" previously-completed, correctly-built work based on a new, ambiguous instruction without confirming first — a vague request is not authorization to undo locked decisions.
- Work page-by-page or component-by-component in a logical order rather than partially touching everything at once, so `CONTEXT.md` stays meaningful as a progress log.
- **Any implementation plan, task breakdown, or architecture decision you produce must be written to `IMPLEMENTATION_PLAN.md` and `CONTEXT.md` as real files in the repo — never held only in your own session or UI state. Any tool picking this project up later, with zero memory of this session, must be able to reconstruct current status by reading these files alone.**

---

## 8. Deployment Constraints

- Site must remain deployable on GitHub Pages with **zero build step** — pushing raw files must be sufficient.
- No server-side code, no runtime environment variables, no API keys embedded in client-side code.
- All internal links and asset paths must be relative and **case-sensitive-safe** (GitHub Pages is case-sensitive even when local dev environments are not) — verify actual file names match link casing exactly.

---

## 9. Definition of Done (per page)

A page is not complete until:
- [ ] Matches its section in `PROJECT_BIBLE.md`
- [ ] Uses only tokens/values from `DESIGN_SYSTEM.md`
- [ ] All components on the page match their spec in `COMPONENTS.md`, including touch fallback and reduced-motion behavior
- [ ] File paths match `FRONTEND_STRUCTURE.md`
- [ ] No fabricated content — real copy or clearly-marked placeholder only
- [ ] All text/stats/links on the page are read from `data/content.json` at runtime — nothing hardcoded
- [ ] Works with zero build step from a plain file open / GitHub Pages serve
