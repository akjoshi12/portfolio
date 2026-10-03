# Design System — Atri Joshi Portfolio v2

Generated with ui-ux-pro-max (`--design-system "developer portfolio AI engineer data engineer technical credible minimal dark"` + style/typography/color/landing/ux/web domain queries), then refined to the brief. Tokens: `tokens.css`.

## Direction
**"Lab notebook / instrument panel."** Precise, engineered, calm. Clean break from v1 (bone + Fraunces + grain).

| Decision | Skill output | Final | Why |
|---|---|---|---|
| Style | Generator: "Vibrant & Block-based" (startups/gaming) | **Minimalism & Swiss** (skill style #1 for "technical developer": WCAG AAA, ⚡ perf, grid-based, single accent) | Generator pick contradicts brief ("calm"). Rejected HUD/Cyberpunk (poor a11y). |
| Palette | Developer Tool/IDE: slate dark + "run green" #22C55E | Neutral graphite (not blue-slate) + green accent, tuned for AA in both themes | Green = "tests pass", fits the measure-it story. |
| Type | Generator: Archivo + Space Grotesk; typography search: "Developer Mono" (JetBrains Mono + IBM Plex Sans) | **Geist + Geist Mono** | Same Mono+Sans pattern as skill's dev pick; one family = cohesion; self-hostable. No serif. |
| Layout | Portfolio Grid (masonry, hover-overlay) | Strong 12-col grid, 2×2 featured cards, table for Earlier Work | Content is text/diagram-led, not visual-gallery; hover-overlay hides info from touch + 30s scanners. No bento. |

## Color (contrast measured vs bg / surface)
| Token | Dark | Light | Use |
|---|---|---|---|
| text | #E7EAEC 16.1:1 | #0E1214 17.5:1 | body, headings |
| muted | #9AA3AB 7.6:1 | #4A545C 7.2:1 | secondary copy |
| faint | #7C858D 5.2:1 | #5F6971 5.2:1 | mono labels, meta (still AA) |
| accent | #4ADE80 11.2:1 | #15803D 4.7:1 | links, active nav, focus ring, key metric, Shipped badge |
| progress | #E5A54B 9.1:1 | #975A00 5.2:1 | **"In progress" badge only** |

Rules: one accent; never color-only status (badge always has text + icon). Accent coverage < 5% of any viewport.

## Typography
- Headings: Geist 600, tracking -0.025em, lh 1.15. Display `clamp(2.25rem, 5.5vw, 3.75rem)`.
- Body: Geist 400, 16px min (mobile), lh 1.6, max 68ch.
- Mono (Geist Mono 400/500): metrics, section labels (`01 / SELECTED WORK`, uppercase, +0.06em), tags, dates, status badges. Numbers use `font-variant-numeric: tabular-nums`.
- Self-hosted woff2, `font-display: swap`, preload the 2 above-the-fold weights only.

## Layout
- Container 1140px, gutter 16px (mobile) → 32px (≥768). Section spacing 96px desktop / 64px mobile.
- Hairline borders (1px `--border`), radius 8px cards / 4px tags. No shadows except a subtle one on hover-lift.
- Faint background grid (`--grid-line`) in hero only — the one "instrument" texture.
- Breakpoints verified: 375 / 768 / 1024 / 1440.

## Components
- **Status badge**: mono, uppercase, dot + text. Shipped = accent, In progress = progress, Exploration = muted outline.
- **Metric chip**: mono value + label, e.g. `WER 0.0746`. Only rendered from `metrics[]`; absent → no chip.
- **Project card**: index (`01`), title, one-liner, 2–3 metric/fact chips, stack tags, status, link row (hidden fields don't render).
- **Earlier Work**: semantic `<table>` (stacks to rows at <768).
- **Timeline**: mono date column + role; "alongside" rows at muted color, smaller.
- **Toast**: copy-email confirmation, `role="status"`, 2s.
- Icons: Lucide (inline SVG, 24 viewBox, 16/20px). No emoji.

## Motion
- Enter: fade + translateY(8px), 200–300ms ease-out, once, via IntersectionObserver; 1–2 animated elements per view max.
- Hover: border-color + translateY(-2px) on cards (≤4px), 200ms. No scale.
- Diagrams: dashed-stroke flow (`stroke-dashoffset`) on edges only.
- `prefers-reduced-motion`: all durations 0, diagram flow paused.
- Banned: scroll-jacking, parallax, custom cursor (v0 had one), scroll-snap.

## Accessibility
Skip link, landmarks, `:focus-visible` 2px accent ring offset 2px, 44px touch targets, theme toggle is a `<button aria-pressed>` with label, alt text on all images, SVG diagrams get `<title>` + text fallback list.

## Anti-patterns (from skill + brief)
Emoji icons · placeholder/TODO in output · fabricated metrics · glow/neon · glassmorphism · hover-only info · gray-400 body text in light mode.
