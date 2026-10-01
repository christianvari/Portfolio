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

Environment variables go in `.env` (gitignored), read at build time only (`src/lib/analytics.ts`):
- `GA_TRACKING_ID` — Google Analytics **GA4** measurement ID (`G-…`). Old Universal Analytics IDs (`UA-…`) are rejected with a build warning, since UA no longer collects data.
- `CLARITY_ID` — Microsoft Clarity project ID.

Analytics are strictly opt-in: `src/components/CookieBanner.astro` + `src/scripts/consent.ts` inject gtag/Clarity only after "Accept" (choice stored in `localStorage` as `cv-consent`, re-asked after 6 months). Any element with `data-cookie-settings` reopens the banner. `/privacy` is the cookie policy; keep its cookie table in sync if analytics change. With neither ID set, no banner is rendered.

## Deploy

`.github/workflows/node.js.yml` builds on every push to `master` (checks out the submodule with `secrets.PAT`) and publishes `dist/` to GitHub Pages via `peaceiris/actions-gh-pages` with CNAME `www.christianvari.dev`. The canonical host is `https://www.christianvari.dev` (`site` in `astro.config.mjs`).

## Architecture

**Astro (static output) + Tailwind CSS 4**, no UI framework. Interactivity is small vanilla TS in `<script>` tags / `src/scripts/`.

### Data

- `src/sharedData/` — **git submodule** (`git@github.com:Codezen-SRLS/audit-history.git`). `data/audit-history.json` is the single source for all audit content and numbers. When updating audit data, push to the submodule repo, then update the reference here.
- `src/lib/audits.ts` — typed access + derived values: `totalAudits`, `totalIssues`, `techCounts()` (Expertise bars), `featuredAudits` (home cards), `auditUrl()` (links to `codezen.tech/audits/<slug>/`, using each entry's permanent `slug` from the JSON), `displayTags()`, `filterKeys()`.
- `src/data/site.ts` — site metadata, bio copy, nav, social links, marquee ecosystems, expertise chips, curated `homeFeatured` audit slugs, audit filter pills and filter aliases.
- `src/data/*.json` — work (grouped by company with `roles[]`), education, achievements, certifications, patents.
- `src/lib/jsonld.ts` — schema.org JSON-LD (ProfilePage/Person on home, CollectionPage/ItemList on /audits).

### Pages

- `src/pages/index.astro` — Hero → Marquee → About → Work (+Education) → Patents → Expertise → Selected work → Achievements → Certifications → Contact.
- `src/pages/audits.astro` — all audits, server-rendered; filter pills + search hide rows client-side.
- `src/pages/og/[card].png.ts` — build-time social cards (`/og/home.png`, `/og/audits.png`; satori + resvg, static Geist woff). Pages pick one via the `image` prop.
- `src/pages/patents/[slug].astro` — one page per patent in `src/data/patents.json` (summary, problem, pipeline, architecture, benefits), with its own markdown (`/patents/<slug>.md`), social card (`/og/patent-<slug>.png`) and JSON-LD (WebPage + BreadcrumbList + the patent node). The home Patents row links here; Espacenet is linked from the page.
- `src/pages/privacy.astro` — privacy & cookie policy.
- Agent/scraper endpoints, generated from the same data by `src/lib/markdown.ts`: `/llms.txt` (llmstxt.org index), `/llms-full.txt`, `/index.md`, `/audits.md`, `/audits.json`. Pages advertise their markdown version via `<link rel="alternate" type="text/markdown">` (the `markdown` prop). When adding a section to the HTML, add it to the markdown too.
- `src/pages/404.astro` — noindex.
- `/projects` redirects to `/audits/` (`redirects` in `astro.config.mjs`).

### Components & layout

`src/layouts/BaseLayout.astro` wraps every page: `Seo.astro` (title, description, canonical, OG/Twitter, JSON-LD), `Analytics.astro`, `Header.astro`, font preload, and the reveal script. The header shows the animated "cv." mark (`LogoMark.astro`, also used for the favicons) next to the name; on the home page the nav collapses into a Menu/Close dropdown at ≤760px, while inner pages pass `compactNav` for a shorter, always-inline nav. Section components live in `src/components/` (one per home section, plus `SectionHeader`, `PillButton`, `Stat`, `LinkRows`).

### Styling

Design tokens (colors, fonts, keyframes) are in `@theme` in `src/styles/global.css`; use them as Tailwind utilities (`bg-bg`, `text-ink-2`, `text-muted`, `border-line`, `text-accent`, …). Custom utilities: `container-page`, `section-y`, `label-mono`, `h-section`. Fonts are Geist / Geist Mono, self-hosted via `@fontsource-variable/*`. Light theme only (dark Expertise band and blue Contact band are part of the design).

### Motion

- `[data-reveal]` → fade/slide in on scroll (`src/scripts/reveal.ts`, IntersectionObserver). Hidden state only applies when `<html>` has the `js` class and motion isn't reduced.
- `[data-count]` → count-up on reveal; `[data-bar]` with `--w` → bar width animation.
- `src/scripts/hero.ts` → cursor "lens" (pauses off-screen) and typer. The decorative hero code is rendered inside a `<template>` (so scrapers don't read it as page text) and copied into both lens layers at runtime.
- Everything respects `prefers-reduced-motion`.

### Images

Use `astro:assets` (`<Image>` / `getImage`) for anything in `src/assets/`. Static files (favicons, CNAME, robots.txt, `.nojekyll`) live in `public/`.
