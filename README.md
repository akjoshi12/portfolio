# atrijoshi.vercel.app

Personal portfolio of Atri Joshi, Data & AI Engineer in Toronto. A static Astro site with no runtime framework, about 1 KB of page JS and self-hosted fonts.

Live: https://atrijoshi.vercel.app

## Run it

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # static output in dist/
npm run preview   # serve the production build
```

Requires Node 22.12+ (Astro 7).

## Where things live

| Path | What |
|---|---|
| `src/content/site.ts` | **All copy and data**: hero, projects, case studies, hero readout, stack, experience, contact |
| `src/pages/index.astro` | Home page |
| `src/pages/work/[slug].astro` | Case-study pages, one per featured project |
| `src/components/` | `HeroConsole` (live pipeline + readout), `CardViz` (per-project micro-visuals), `Diagram` (self-drawing architecture SVG), `Icon` (inline Lucide), `StatusBadge` |
| `src/layouts/Base.astro` | `<head>`/SEO/JSON-LD, header, footer, theme toggle, scroll and motion script |
| `src/styles/global.css` | All styles; the motion system is at the bottom |
| `design-system/` | `MASTER.md` (design rules and motion spec) and `tokens.css` (colors, type, spacing) |
| `public/` | `resume.pdf`, `og.png`, `favicon.svg`, `robots.txt` |

## Editing content

Everything is in `src/content/site.ts`, and it's typed, so a missing field fails the build instead of rendering a blank.

- **Optional fields hide their UI when absent.** Leave out `repoUrl`, `demoUrl`, `facts`, `measured`, `didntWork` or `next` and the button or section doesn't render. Never fill them with `#` or "TODO".
- **Adding a featured project** means adding it to `featured` and a matching entry in `caseStudies` (same `slug`). The build throws if the case study is missing. The sitemap picks it up automatically.
- **Updating the résumé** means replacing `public/resume.pdf`. The URL stays `/resume.pdf`.

### The numbers rule

Every number on the site must be a real, measured figure. The approved list is:

- **MinuteMinders:** WER 0.0746 · CER 0.2932 · FRE 50.53 vs 63.55 baseline · 8-person team · ~15.4k LOC
- **AURA:** 8 strategies · 4 source datasets · 10 topic categories · ≤15% topic cap · 300-turn gold set · 500k-turn source corpus
- **Redline:** 23 passing tests (Phase 1) · 53× discrepancy caught

Add a number here first, then use it in `site.ts`. If a project has no metric, show what was built and tested instead.

## Design and motion

See `design-system/MASTER.md` for the full spec. In short:

- **Look:** graphite base with one green accent; amber is used only for "In progress". Type is Geist and Geist Mono. Dark by default, light available, and the choice persists.
- **Motion rule:** every animation depicts something real (packets through the pipeline, metrics counting up, diagrams drawing themselves, the test gate filling).
- **Reduced motion:** the default CSS is the final state. Animations exist only under `prefers-reduced-motion: no-preference`.
- **CSS gotcha:** the minifier drops an `animation` shorthand that has no name. Use longhands when the name is set elsewhere.

## Quality bar

Check these before merging to `main`:

- Lighthouse (mobile) ≥ 95 in all four categories. Currently 100 on `/` and the case-study pages.
- WCAG AA contrast in both themes, including SVG text and mid-animation colours, which axe can't see.
- No horizontal scroll at 375, 768, 1024 or 1440.
- No `TODO`, `lorem`, placeholder or `href="#"` in `dist/`:

  ```sh
  npm run build && grep -rniE 'todo|lorem|placeholder|href="#"' dist --include=*.html
  ```

## Deploy

Vercel builds this as an Astro site (see `vercel.json`).

- Pushing a branch creates a preview deploy.
- Pushing to `main` deploys to production.
- Work happens on a branch, and it's merged to `main` after the preview is approved.
