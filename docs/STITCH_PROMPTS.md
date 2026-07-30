# STITCH_PROMPTS.md
### Ready-to-Use Stitch Generation Prompts
Each prompt below generates a **base layout only** — Antigravity must restyle every output against `DESIGN_SYSTEM.md` tokens before it's final, per `FRONTEND_STRUCTURE.md` §5. Never ship raw Stitch styling as-is.

**Exception:** the Hero prompt at the end is reference/inspiration only. Do not use it as a base layout. See its note before use.

---

## 1. About Page

**Purpose:** bio, skills, certifications, education. Blueprint/schematic motif — should feel like a technical engineering drawing, not a typical "about me" card layout.

**Prompt:**
```
Design a dark-themed "About" page for a cybersecurity portfolio site.
Background is near-black with a very faint technical blueprint/schematic
grid — thin white linework, dimension-style annotation marks, like an
engineering drawing. Overall mood: precise, quiet, technical.

Layout, top to bottom:
1. A short bio paragraph section — generous line height, readable width
   (not full-bleed text), positioned left or center
2. A "skills" section showing 4-6 horizontal progress bars, each with a
   label on the left and percentage on the right, bar fill using a
   gradient that shifts color across its length (warm gold to a sharp
   yellow-green to a small red zone at the very end, like a redline
   tachometer zone)
3. A certifications section — small badge/pill elements in a wrapped row,
   each showing a certification name
4. An education block — degree, institution, and years, simple and compact

Typography: bold condensed all-caps for section headers, a monospace
font for labels/tags/small text, a clean sans-serif for body paragraph
text. Primary accent color is a sharp yellow-green (like a highlighter,
not neon green). Everything else stays desaturated dark grey/near-black.

Avoid: rounded soft corporate cards, drop shadows, bright multi-color
palettes, stock photography, circular profile photo placeholder, generic
"meet the team" style layout.
```

---

## 2. Projects Page

**Purpose:** project showcase grid. Workbench/garage motif. Every project card must visually support an "in-progress" status label — these are honest work-in-progress builds, not polished case studies.

**Prompt:**
```
Design a dark-themed "Projects" page for a cybersecurity portfolio site.
Background is near-black with a very faint grid or linear texture
suggesting a workbench/garage surface — subtle, not decorative-heavy.

Layout:
1. A section header at the top ("Projects" or similar), bold condensed
   all-caps display type, with a thin horizontal rule extending beside it
2. A grid of 3 project cards (responsive: 3 across desktop, stacking on
   mobile), each card containing:
   - A large faint background number (01, 02, 03) behind the content
   - Project name, bold
   - A short 2-3 line description
   - A row of small tech-stack pills/tags
   - A visible "IN PROGRESS" style status label — small, clearly a status
     indicator, not hidden
   - A text link at the bottom ("View on GitHub" style)
3. Cards should feel like dark glass panels — subtle border, no drop
   shadow, flat and precise rather than soft/elevated

Typography: bold condensed all-caps for headers, monospace for tags and
status labels, clean sans-serif for descriptions. Accent color is a
sharp yellow-green used sparingly — for the status label, tag borders,
or hover states.

Avoid: e-commerce-style product cards, material-design elevation shadows,
bright colors, rounded pill-heavy "friendly SaaS" aesthetic, stock photos
or icons that look like generic startup illustrations.
```

---

## 3. Labs Page

**Purpose:** HTB/TryHackMe activity, CTF writeups (placeholder for now). CRT/terminal motif — the most "hacker," least "automotive" page on the site.

**Prompt:**
```
Design a dark-themed "Labs" page for a cybersecurity portfolio site,
styled like a terminal/CRT monitor aesthetic. Background is near-black
with very subtle horizontal scanlines and a soft vignette darkening
toward the corners — restrained, not a loud "matrix" effect.

Layout:
1. A prominent stat line near the top — three short stats displayed
   side by side or stacked (e.g. a rank/percentile, a streak count, a
   completed-rooms count), each with a large number/value and a small
   label beneath it
2. Two platform sections below (HackTheBox and TryHackMe), each with a
   short status line and a link out to the public profile
3. A "writeups" section styled as a placeholder/coming-soon area —
   should look intentional, not broken or empty, like a terminal
   waiting for input

Typography: monospace-heavy throughout, more so than other pages — this
page should feel the most like an actual terminal. Bold condensed
display type only for the page's own header. Accent color is a sharp
yellow-green, used for the stat numbers and any active/live indicators.

Avoid: gamer/RGB rainbow aesthetics, cartoonish achievement badges,
colorful bar/pie charts, anything that looks like a game score screen
rather than a security professional's activity log.
```

---

## 4. Contact Page

**Purpose:** calm, minimal, no form. Large clickable channel rows instead of a typical contact form.

**Prompt:**
```
Design a dark-themed "Contact" page for a cybersecurity portfolio site.
This should be the calmest, most minimal page on the entire site —
background is near-black with only the faintest hint of texture, almost
none. Generous whitespace (dark-space).

Layout:
1. A small pulsing status badge near the top — a small dot plus a short
   line of status text, like an availability indicator
2. A short 2-3 line personal statement, medium-large text, centered or
   left-aligned, generous line height
3. Below that, 3-4 large clickable rows (not small footer links) — each
   a full-width or wide row with an icon/label on one side (GitHub,
   LinkedIn, Email, Resume), styled like a deliberate selectable option,
   not a tiny inline link

Typography: bold condensed display type for the statement, monospace
for the channel row labels. Accent color (sharp yellow-green) used only
for the status badge dot and hover states on the channel rows — this
page should feel the quietest, so keep accent use minimal.

Explicitly do NOT include: any form fields, text inputs, a "message"
textarea, or a submit button. This page has no contact form by design —
only the statement and the linked channels.
```

---

## 5. Hero — Reference / Inspiration Only

**⚠️ Do not use this as a base layout. Do not let Antigravity treat this output as a starting point to restyle.** The hero's chevron gauges, exact geometry, and animation sequencing are fully specified in `COMPONENTS.md` §5 and must be hand-built from that spec plus the Lamborghini reference photo. This prompt exists only to generate mood inspiration and rough styling ideas for the hero's **smaller conventional sub-elements** — the telemetry glass panel and the recon-log panel — not the overall composition.

**Prompt (reference only):**
```
Generate a dark cockpit-inspired dashboard mood board for a cybersecurity
portfolio hero section. Near-black background, single sharp yellow-green
accent light source, moody and cinematic. Include a couple of small
glass/translucent panel elements — one showing a monospace terminal-style
log output, another showing a couple of small live data readouts (like a
time or status field) — styled as if they were floating instrument panel
overlays. Dark smoked-glass aesthetic, thin bright-accent borders,
backdrop blur feel.

This is for mood/texture reference only, not a layout to be implemented
directly — treat it as inspiration for panel styling, not composition.
```

**Use alongside:** the Lamborghini cockpit reference photo already in the project folder (see `DESIGN_SYSTEM.md` §7 for what to extract vs. avoid from it).
