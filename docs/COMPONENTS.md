# COMPONENTS.md
### Portfolio Site — Component Behavior Spec
Defines *how every custom component behaves*: states, animation timing, touch fallback, reduced-motion fallback. Visual values (colors/fonts/glass) come from `DESIGN_SYSTEM.md` — this doc never redefines them, only references them.

**On data:** wherever this document says a value "comes from `CONTENT.md`," read that as *sourced at runtime from `data/content.json`* — `CONTENT.md` documents the reasoning and decisions behind those values, but the live values themselves are fetched from the JSON file per `FRONTEND_STRUCTURE.md` §7. No component should have real content hardcoded into its markup or script.

---

## 1. Cursor System

**Default (all pages except Home hero):**
- Small dot follows cursor (6-8px, `--accent` fill)
- On hovering any clickable element (links, buttons, cards, nav items): thin corner brackets snap in around the element's bounding box — target-lock/scanner feel
- Brackets use `--accent`, thin stroke, quick snap transition (~150-200ms)

**Home hero exception:**
- Cursor system is replaced entirely by the skill-tag mousetrail (Section 5.4). No scan-brackets in the hero viewport.
- Once the visitor scrolls past the hero (past `100vh` / hero element's bottom edge), the standard dot + scan-bracket cursor takes over for the rest of that page's scroll.

**Touch fallback:** Omitted entirely — no cursor effect on touch devices. Do not attempt a touch equivalent; touch has no hover state to replace.

**Reduced motion:** Dot remains (static, no lag/easing), scan-bracket snap becomes instant (no transition).

---

## 2. Nav Capsule

**Structure:** Floating glass pill (see `DESIGN_SYSTEM.md` §4 for exact glass values), fixed position, present on all 5 pages, identical on every page.

**Behavior:**
- Contains: wordmark/logo, links to all 5 pages, visible ⌘K trigger button
- No scroll-based condensing or size change — stays constant
- Tagged with a CSS `view-transition-name` so the browser treats it as one continuous element across page navigations — it must never fade, flicker, or flash during navigation
- Active page link gets a subtle visual state (underline or accent color) — not a redesign, just enough to orient the visitor

**Touch:** Fully functional identically — this is not a hover-dependent component.

**Reduced motion:** No change needed — nav capsule has no motion by design.

---

## 3. Command Palette (⌘K)

**Trigger:**
- `Cmd+K` / `Ctrl+K` keyboard shortcut
- Visible button in nav capsule (required — mobile has no keyboard)

**Structure:**
- Glass modal overlay (same glass spec as nav capsule)
- Search input at top, live-filters as user types
- Grouped results:
  - **Navigate** — Home / About / Projects / Labs / Contact
  - **Projects** — jump directly to a specific project card
  - **Actions** — Open GitHub, Download Résumé, Copy Email
- Empty state: "No results found," muted color, mono font

**Keyboard nav:** ↑/↓ to move selection, Enter to select, Esc to close.

**Touch:** Opens via the visible trigger button; results list is tap-to-select; no keyboard nav needed since there's no physical arrow-key input, but on-screen focus/highlight should still be visible per tap.

**Reduced motion:** Modal appears/disappears with an instant show/hide instead of fade/scale transition.

---

## 4. Page Transitions

**Mechanism:** Native View Transitions API (cross-document).

**Content area:** Cross-fade + ~15px vertical drift (content eases upward while fading in).

**Nav capsule:** Excluded from the transition — persists via `view-transition-name` tagging (see Section 2).

**Fallback (non-supporting browsers):** Instant navigation, no animation. This is acceptable — do not attempt a JS-based transition polyfill.

**Reduced motion:** Transitions become instant cuts, no fade/drift.

---

## 5. Home Hero — Cockpit Dashboard

The site's signature composition. Full-viewport, appears only on `index.html`.

### 5.1 Twin Chevron Arcs

- Two angular (not circular) SVG gauge arcs flanking the center content — sharp chevron/wing geometry, not rounded dials
- **Left arc:** visible label `RPM`. On hover (or tap on touch), label cross-fades to reveal a real stat pulled from `CONTENT.md` (e.g. HTB/THM completion percentage) — never a fabricated number
- **Right arc:** visible label `KMH`. Same hover-reveal behavior, different real stat from `CONTENT.md` (e.g. projects shipped)
- Tick marks along the outer edge of each arc; the topmost tick (max value) is rendered in `--accent2` (redline), all others in `--muted`
- Fill gradient along the arc: gold → `--accent` → `--accent2`, sweeping from bottom to top
- Fill level reflects the real stat percentage from `CONTENT.md` — do not hardcode an arbitrary "looks good" number once real content exists

**Touch:** Tap toggles the label reveal (hover doesn't fire reliably on touch) — implement as an explicit tap handler, not reliance on `:hover`.

### 5.2 Center Content

- **Name:** large display text (Bebas Neue), reveals via glitch/decrypt effect — random characters cycle and resolve into the final text left-to-right
- **Title:** role/title text below the name (mono font)
- **Status line:** small status indicator below title, styled like a drive-mode readout (e.g. "MODE: RECON"), includes a small pulsing dot

### 5.3 Telemetry Corners

- Top-left: live local time, updates every second
- Top-right: short static line (focus area / current status)
- No entrance animation — present from load at a fixed low opacity (ambient, not a sequenced "beat")

### 5.4 Skill-Tag Mousetrail

- As the visitor moves their cursor within the hero, small glass pill tags (skill names, pulled from `CONTENT.md`) appear briefly at the cursor position and fade out after ~800-900ms
- Pooled/reused DOM elements (do not create a new element per mouse event — reuse a small pool, ~6-8 elements)
- Throttled — do not spawn a new tag on every pixel of movement; space spawns by a minimum time interval (~90-100ms)
- **Deactivates once the visitor scrolls past the hero** — stop spawning new tags past that point
- **Touch fallback:** replace entirely with a static row of the same tags, no animation, always visible, positioned unobtrusively in the hero

**Reduced motion:** Mousetrail is disabled entirely (not shown even as static row) — motion is the entire point of this component, so it's simply omitted per the reduced-motion contract in `DESIGN_SYSTEM.md`.

### 5.5 Recon-Output Panel

- Small glass panel, ambient/secondary — never the focal point
- Displays looping, fake-but-plausible recon-tool-style output lines (benign flavor text — no real target, no real technique detail, purely aesthetic)
- New line appears periodically (~1.2-1.5s interval), oldest line removed once the panel reaches its max visible line count (~6 lines)
- Begins only after the main entrance sequence completes (see Section 5.6) — this is intentionally the last thing to activate, staying quiet in the background

**Reduced motion:** Panel shows a static set of lines, no auto-scrolling/appending.

### 5.6 Entrance Animation Sequence (strict — do not run simultaneously)

| Time | Event |
|---|---|
| 0.0 – 1.2s | Chevron arcs sweep from empty to their target fill |
| 0.8 – 1.6s | Name glitch/decrypts into final text (slight overlap with arc sweep finishing) |
| 1.6 – 2.0s | Title and status line fade/tick in |
| 2.0s+ | Recon panel begins its ambient line-scroll |
| Immediate | Telemetry corners fade to ambient low opacity over ~1.4s, independent of the beat sequence above — no sharp entrance |
| Interaction-only | Mousetrail is exempt from the timeline — it only activates on cursor movement, whenever that occurs |

Do not compress this into a single simultaneous animation — the sequencing itself is part of the design intent (a "system boot" feel), and collapsing it removes the effect.

### 5.7 Scroll Behavior (rev-down)

- As the visitor scrolls from the hero into the next content, tie the following to scroll progress through the hero's height (scrubbed, not a one-shot trigger):
  - Chevron arcs empty back out proportionally to scroll progress
  - Center content (name/title/status) fades and drifts upward slightly
  - Telemetry corners fade out
  - Recon panel fades out
- Scrolling back up should reverse this smoothly (re-fill, re-appear) since it's scroll-progress-driven, not a played-once animation

**Reduced motion:** Skip this entirely — chevrons and content stay at their resting state regardless of scroll position.

---

## 6. Stats Counter Strip (Home, below hero)

- Row of stat blocks, each with a large number and small label underneath
- Numbers count up from 0 to their target value when the strip scrolls into view (not on page load)
- Real numbers come from `CONTENT.md` — do not fabricate

**Reduced motion:** Numbers appear at final value immediately, no count-up.

---

## 7. Redline Skill Bars (About page)

- Horizontal progress bar per skill, gradient fill matching the chevron gradient logic (gold → accent → redline)
- A small vertical marker line near the high end of the track (visual nod to a redline zone), independent of the actual fill percentage
- Fill animates from 0 to target width when scrolled into view

**Reduced motion:** Bars appear at final width immediately.

---

## 8. Stack / Tag Pills & Cert Badges

- Small pill-shaped elements, mono font, thin border, transparent/dark fill
- Used for: skill tags (About), tech stack labels (Projects), certification badges (About)
- Hover state (desktop only): border brightens to full `--accent`
- No animation beyond the hover border-brighten — these are static, low-key elements by design

---

## 9. Project Hover-Card Previews (Projects page)

- On desktop hover over a project card, after a short delay (~300ms), a glass panel expands/appears showing extended detail (key metric, extra description) beyond what's on the base card
- Uses the same glass spec as the nav capsule (Section 2) / `DESIGN_SYSTEM.md` §4
- **Touch fallback:** tap-to-expand instead of hover-delay — first tap reveals the extended detail, does not immediately navigate away

**Reduced motion:** Reveal is instant (no delay, no transition) rather than eased-in.

---

## 10. Scroll Progress / Redline Bar

- Thin bar, fixed at the bottom of the viewport (or bottom of the hero's bottom strip on Home specifically)
- Width reflects overall page scroll progress (0–100%)
- Color follows the same gold → accent → redline gradient logic as the chevrons and skill bars, reinforcing the "redline" visual language across the whole site, not just the hero

**Reduced motion:** No special handling needed — this is a direct value-reflects-scroll-position bar, not an animated flourish; it can update without transition easing under reduced motion.

---

## 11. Ambient Background Motion (per-page)

| Element | Page(s) | Behavior |
|---|---|---|
| Speed lines | Home, Contact | Faint diagonal streaks; on Home, intensity/opacity responds to scroll velocity; on Contact, static and very faint, no scroll response |
| Blueprint grid | About | Static, no motion |
| Workbench grid | Projects | Static, no motion |
| CRT scanlines + vignette | Labs | Static texture; optional very subtle flicker opacity animation, must respect reduced-motion (flicker disabled if so) |

**Reduced motion:** Any element with scroll-response or flicker motion falls back to a fully static version.

---

## 12. Contact Page Channel Rows

- Each channel (GitHub, LinkedIn, Email, Resume) is a large, clearly clickable row — not small footer-style links
- Email row: click copies the address to clipboard and shows a brief toast confirmation ("Email copied") rather than opening a mail client
- Hover state uses the standard scan-bracket cursor lock (Section 1) — no unique hover treatment needed beyond the global cursor system
- Optional pulsing "AVAILABLE FOR INTERNSHIPS" badge at the top of the page — small dot + text, same pulse animation as the hero's status dot (Section 5.2)

**Touch:** Tap performs the same action (copy-to-clipboard + toast) since there's no separate hover state to translate.

**Reduced motion:** Toast appears/disappears without fade animation; status badge dot does not pulse (static, full opacity).
