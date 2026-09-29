# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server (astro dev) at http://localhost:4321
npm run build      # Type-check (astro check) + production build into dist/
npm run preview    # Serve the production build locally
npm run clean      # Remove dist/ and Astro caches
npm run deploy     # Build and push dist/ to the gh-pages branch manually
npm run format     # Prettier (with prettier-plugin-astro)
```

Node is pinned to the current LTS (`24`) via `.nvmrc`.

Environment variables go in `.env` (gitignored), read at build time only:
- `GA_TRACKING_ID` — Google Analytics / gtag ID (omitted → no GA script)
- `CLARITY_ID` — Microsoft Clarity project ID (omitted → no Clarity script)

## Deploy

`.github/workflows/node.js.yml` builds on every push to `master` (checks out the submodule with `secrets.PAT`) and publishes `dist/` to GitHub Pages via `peaceiris/actions-gh-pages` with CNAME `www.christianvari.dev`. The canonical host is `https://www.christianvari.dev` (`site` in `astro.config.mjs`).

## Architecture

**Astro (static output) + Tailwind CSS 4**, no UI framework. Interactivity is small vanilla TS in `<script>` tags / `src/scripts/`.

### Data

- `src/sharedData/` — **git submodule** (`git@github.com:Codezen-SRLS/audit-history.git`). `data/audit-history.json` is the single source for all audit content and numbers. When updating audit data, push to the submodule repo, then update the reference here.
- `src/lib/audits.ts` — typed access + derived values: `totalAudits`, `totalIssues`, `techCounts()` (Expertise bars), `featuredAudits` (home cards), `slug()`/`auditUrl()` (links to `codezen.tech/audits/<slug>/`), `displayTags()`, `filterKeys()`.
- `src/data/site.ts` — site metadata, nav, social links, marquee ecosystems, expertise chips, curated `homeFeatured` titles, audit filter pills and filter aliases.
- `src/data/*.json` — work (grouped by company with `roles[]`), education, achievements, certifications, patents.
- `src/lib/jsonld.ts` — schema.org JSON-LD (ProfilePage/Person on home, CollectionPage/ItemList on /audits).

### Pages

- `src/pages/index.astro` — Hero → Marquee → About → Work (+Education) → Patents → Expertise → Selected work → Achievements → Certifications → Contact.
- `src/pages/audits.astro` — all audits, server-rendered; filter pills + search hide rows client-side.
- `src/pages/og.png.ts` — build-time OG image (satori + resvg, static Geist woff).
- `src/pages/404.astro` — noindex.
- `/projects` redirects to `/audits/` (`redirects` in `astro.config.mjs`).

### Components & layout

`src/layouts/BaseLayout.astro` wraps every page: `Seo.astro` (title, description, canonical, OG/Twitter, JSON-LD), `Analytics.astro`, `Header.astro`, font preload, and the reveal script. The header shows the `christianvari.dev` wordmark; on the home page the nav collapses into a Menu/Close dropdown at ≤760px, while inner pages pass `compactNav` for a shorter, always-inline nav. Section components live in `src/components/` (one per home section, plus `SectionHeader`, `PillButton`, `Stat`, `LinkRows`).

### Styling

Design tokens (colors, fonts, keyframes) are in `@theme` in `src/styles/global.css`; use them as Tailwind utilities (`bg-bg`, `text-ink-2`, `text-muted`, `border-line`, `text-accent`, …). Custom utilities: `container-page`, `section-y`, `label-mono`, `h-section`. Fonts are Geist / Geist Mono, self-hosted via `@fontsource-variable/*`. Light theme only (dark Expertise band and blue Contact band are part of the design).

### Motion

- `[data-reveal]` → fade/slide in on scroll (`src/scripts/reveal.ts`, IntersectionObserver). Hidden state only applies when `<html>` has the `js` class and motion isn't reduced.
- `[data-count]` → count-up on reveal; `[data-bar]` with `--w` → bar width animation.
- `src/scripts/hero.ts` → cursor "lens" (pauses off-screen) and typer.
- Everything respects `prefers-reduced-motion`.

### Images

Use `astro:assets` (`<Image>` / `getImage`) for anything in `src/assets/`. Static files (favicons, CNAME, robots.txt, `.nojekyll`) live in `public/`.
