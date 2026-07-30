# DESIGN_SYSTEM.md
### Portfolio Site — Visual Rulebook
Single source of truth for every color, font, spacing, and motion value. `COMPONENTS.md` defines *behavior*; this document defines *appearance*. If the two ever conflict, this document wins on visual values, `COMPONENTS.md` wins on interaction/timing.

---

## 1. Concept Statement (read this before designing anything new)

The site runs on one deliberate duality: **automotive dashboard instrumentation ↔ offensive security tooling.** A car's cockpit and a pentester's terminal both share the same underlying feeling — precision, readiness, controlled intensity, information at a glance. Every visual decision should serve *that feeling*, not literal car imagery and not literal hacker clichés (no matrix rain, no green-on-black terminal cosplay, no chrome/rev-badges).

If a new design decision isn't covered explicitly in this doc, default to: **dark, precise, quiet until it needs to speak, never decorative for its own sake.**

---

## 2. Color System

| Token | Hex | Usage |
|---|---|---|
| `--bg` | `#080a0c` | Primary background, near-black, all pages |
| `--bg2` | `#0d1117` | Secondary background, panel/card fills |
| `--dim` | `#1a1f26` | Borders, dividers, inactive/track states |
| `--muted` | `#3a4250` | Secondary text, inactive labels, tick marks |
| `--text` | `#c8d0dc` | Body text |
| `--text-bright` | `#eef2f7` | Headings, primary text, high-emphasis content |
| `--accent` | `#e8ff00` | Primary accent — CTAs, active states, highlights, links |
| `--accent2` | `#ff4500` | Redline accent — warnings, max/critical states, gradient endpoints |

**Hard rules:**
- Never place `--accent` text directly on `--muted` background — contrast fails. Accent always sits on `--bg`, `--bg2`, or within glass panels.
- `--accent2` is used sparingly — redline/critical moments only (top of gauge fills, progress bar's far end, error states). It should never dominate a composition.
- Every page uses this exact palette. Per-page "motifs" (Section 6) change texture and structural elements, never the color tokens.

---

## 3. Typography

| Font | Role | Source |
|---|---|---|
| **Bebas Neue** | Display — hero name, page headings, large numerals | Google Fonts |
| **Share Tech Mono** | Labels, telemetry, tags, status lines, nav links, code-flavored text | Google Fonts |
| **Rajdhani** (weights 300/400/500/600) | Body copy, descriptions, paragraph text | Google Fonts |

**Rules:**
- Minimum font size anywhere on the site: **11px** (0.7rem at 16px base) — applies even to telemetry/tick-mark text
- Letterspacing: mono/label text uses wide tracking (0.15em–0.25em) for that "system readout" feel; body text uses normal tracking
- Headings (Bebas Neue) are always uppercase or naturally-caps by font design — don't mix in lowercase for headings
- Weight discipline: Rajdhani body text stays at 300–400 for most copy, 500–600 reserved for emphasis only

---

## 4. Glassmorphism — Single Fixed Spec

Used identically across nav capsule, command palette, hover-cards, recon panel, and any future glass element. No per-component variation.

```css
background: rgba(13, 17, 23, 0.55);   /* --bg2 at 55% */
border: 1px solid rgba(232, 255, 0, 0.15);  /* --accent at 15% */
backdrop-filter: blur(14px);
-webkit-backdrop-filter: blur(14px);
```

This reads as "smoked glass" / tinted visor rather than light frosted glass — intentional, matches the dark theme. Never lighten this for a "brighter" glass panel elsewhere; if a panel needs more visual weight, increase border opacity slightly, not background opacity.

---

## 5. Motion Principles

| Context | Easing | Feel |
|---|---|---|
| Chevron sweeps, gauge fills | `power3.out` (GSAP) | Mechanical, weighted, decelerating |
| Mousetrail, hover-card pop-in | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Springy, snappy, alive |
| Page content transitions | Simple ease, cross-fade + ~15px vertical drift | Calm, premium, restrained |
| Nav capsule | No motion — persists unchanged across navigation | Stable anchor point |

**Hard constraint — `prefers-reduced-motion`:**
When triggered, site-wide (not just hero):
- All entrance animations skip to final state instantly
- No glitch/decrypt text — text simply appears
- No mousetrail
- No auto-playing ambient motion (speed lines, recon panel scroll)
- Page transitions become instant cuts, no cross-fade/drift

This is a hard requirement, not optional polish. See `AGENTS.md`.

---

## 6. Per-Page Background Motifs (visual description only — behavior in `COMPONENTS.md`)

| Page | Motif | Visual description |
|---|---|---|
| Home | Speed lines + cockpit dashboard | Faint diagonal light streaks, intensifying with scroll velocity; full dashboard composition in hero (see `COMPONENTS.md`) |
| About | Blueprint/schematic | Fine SVG grid lines, faint dimension-style annotations, like a technical engineering drawing — desaturated, low contrast against `--bg` |
| Projects | Workbench/garage | Subtle grid or linear texture suggesting a workbench surface; optional small generated texture accent behind the section header only, never full-bleed |
| Labs | CRT terminal | Scanlines (thin repeating horizontal lines, low opacity), soft vignette darkening toward corners |
| Contact | Minimal | Faint speed lines only, lowest visual density of any page — intentional calm |

**Unifying rule:** regardless of motif, `--accent`, `--accent2`, and all three typefaces must render identically. The motif changes texture/structure, never the core visual language.

---

## 7. Reference Image — Lamborghini Cockpit Dashboard

A reference photo (twin chevron tachometers flanking a central digital readout, carbon-fiber trim, warm gradient dial fill) has been provided as the mood/structure reference for the Home hero.

**Extract from it:**
- Angular chevron gauge geometry (sharp, not rounded/circular)
- Spatial hierarchy: center = primary info, flanking = contextual data, corners = ambient telemetry, bottom = grounding frame
- Dark, cinematic, single-source lighting mood
- Warm-to-accent gradient fill logic on gauge arcs

**Do NOT extract:**
- Literal car branding, badges, logos
- Actual vehicle photography or 3D car renders
- Steering wheel, physical cockpit elements beyond the instrument cluster concept

If this photo is fed into Stitch for hero layout generation, treat any output as a **starting visual composition only** — final interaction/animation behavior is governed by `COMPONENTS.md`, not by whatever Stitch produces.

---

## 8. Accessibility Floors (see also `COMPONENTS.md` for per-component fallback behavior)

- Minimum contrast: body text and interactive labels must meet WCAG AA against their actual background (not assumed — check against `--bg`, `--bg2`, or glass-panel-over-background composite)
- Minimum touch target size: 44×44px for any tappable element on mobile
- Minimum font size: 11px, no exceptions
- `prefers-reduced-motion` respected site-wide (Section 5)
- All hover-dependent interactions have a stated non-hover (touch) equivalent — see `COMPONENTS.md`
