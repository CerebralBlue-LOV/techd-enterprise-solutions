# TechD Website — Working Progress Log

**Started:** Day 1 (Monday, 2026-05-04)
**Repo:** github.com/CerebralBlue-LOV/techd-enterprise-solutions
**Staging URL:** cerebralblue-lov.github.io/techd-enterprise-solutions/
**Lovable project:** Connected, bidirectional sync with `main`

---

## How to use this doc

Update at end of each day (or when something blocks you). Keep it short. Product owner gets summarized updates at Day 3 EOD and Day 5.

---

## Status

🟡 Day 1 — repo set up, scaffold imported from Lovable, working on deploy pipeline + brand tokens

---

## Day 1 (Monday) — Foundation

### Tasks

- [x] Crawl current techd.com — full URL list (646 raw, 210 clean HTML pages)
- [x] Investigate spam injection — found theme-level PHP injection on `/` only
- [x] Create GitHub repo (using Lovable's auto-created `techd-enterprise-solutions`)
- [x] Spin up Lovable project with brand-driven prompt
- [x] Connect Lovable ↔ GitHub (bidirectional)
- [x] Clone locally, verify `npm run dev` works
- [x] Add `docs/` folder with progress log
- [ ] Set up Tailwind brand tokens (colors, Roboto Condensed)
- [x] Configure GitHub Actions: build + deploy to GitHub Pages
- [x] Fix BrowserRouter basename for GitHub Pages subpath routing
- [ ] Verify staging URL serves the Lovable scaffold
- [ ] Send Day 1 confirmation + scope to product owner

### Today's progress

- Site crawl complete: 210 unique HTML pages identified
- Spam analysis complete: theme-level PHP injection in WordPress `header.php` or `functions.php`, served conditionally to crawlers (cloaking). Only homepage `/` affected. No 410s needed — spam dies when WordPress dies. Recovery via Google Search Console post-launch.
- Lovable scaffold generated and synced to GitHub. Stack confirmed: Vite 5 + React 18 + TypeScript + Tailwind + shadcn/ui.
- GitHub Actions deploy pipeline configured and pushing to GitHub Pages.
- Fixed React Router `basename` — was causing 404 on all routes in production.

### Decisions made

- **Stack: Lovable → Vite/React/Tailwind/shadcn → GitHub Pages.** Locked. See `docs/DECISIONS.md`.
- **Repo: `techd-enterprise-solutions`** (Lovable's auto-created name).
- **Lovable + Claude Code workflow:** bidirectional. Lovable for visual/components, Claude Code for infra/build/Worker/SEO.
- **No 410 redirects needed.** Spam is theme-level, not URL-based.
- **404 handling for SPA on GitHub Pages:** `404.html` fallback + `BrowserRouter basename`.

### Blockers & open questions

- **Logo files** — typographic wordmark in scaffold for now. Need actual logo SVG (color + white) from product owner. Day 2 ask.
- **Mission statement** — blank in brand toolkit. Hero copy is placeholder until approved.
- **Custom staging domain** — `staging.techd.com` requires DNS. Using GitHub Pages URL for now.
- **WordPress server compromise** — must flag to product owner: server is fully compromised, not just the homepage. Forensic review or explicit decision to skip needed before decommission.

### Tomorrow's first move

Build the 5 page templates in Lovable: Homepage, Solution, Industry, Service, Resource. Lock visual polish before populating content Day 3.

---

## Day 2 (Tuesday) — Content audit + redirect map

### Tasks

- [x] Review crawl data (210 HTML pages from Day 1)
- [x] Define audit scope (4 key decisions — see below)
- [x] Classify all 210 URLs by category and redirect target
- [x] Produce `docs/CONTENT-AUDIT.md` — 210 rows, grouped by target route
- [x] Produce `docs/REDIRECT-MAP.md` — 208 redirect rules, all 301s
- [ ] Day 3 decision: build `/privacy-policy` page or 301 to `/contact`
- [ ] Lovable: visual templates for all 7 page types (parallel track)

### Decisions made

- **About pages** — `/about-us/`, `/our-story/`, `/depth-of-experience/` all fold into `/contact`. No `/about` route.
- **Detail pages** — Coarse 301: all 42 data-solution sub-pages → `/solutions`, all 15 services sub-pages → `/services`. Matches deferred-detail-pages decision.
- **Webinar + event pages (~86 URLs)** — Drop all → `/resources`. Resources hub starts clean; no historical archive.
- **Audit method** — URL-tag only. No content body extraction Day 2. Keeps the day focused.

### Redirect map stats

| Destination | Count |
|---|---:|
| `/` | 24 |
| `/contact` | 4 |
| `/solutions` | 51 |
| `/services` | 16 |
| `/resources` | 112 |
| `/privacy-policy` | 1 |
| **Total** | **208** |

### Blockers & open questions

- **301 enforcement** — GitHub Pages cannot serve 301s. Redirect map is ready but cannot ship until Cloudflare proxy or alternate host is in place. Day 4 Cloudflare Worker decision unlocks this.
- **`/privacy-policy/`** — Only legacy URL without a mapped P0 route. Needs Day 3 decision: minimal legal page or 301 to `/contact`.
- **Logo files** — Still needed from product owner. Typographic wordmark still placeholder.

### Tomorrow's first move

Day 3: Start populating `src/content/` with real copy sourced from the audit's "merge" rows. Priority order: homepage → solutions → services → contact (about content). Use `docs/CONTENT-AUDIT.md` Group 1–4 as the source-of-truth for what belongs on each page.

---

## Day 3 (Wednesday) — Build pages

_To be filled in._

---

## Day 4 (Thursday) — Contact form, SEO, polish

_To be filled in._

---

## Day 5 (Friday) — QA, redirect map, package up

_To be filled in._

---

## Spam analysis (Day 1 finding)

**What was found:** SEO cloaking via theme-level PHP injection. Hidden `<div style="overflow: hidden; height: 1px;">` on the homepage only, served conditionally to Googlebot and raw crawlers but invisible in browsers. Contains sports betting spam content.

**Where the injection lives:** WordPress theme PHP (`header.php` or `functions.php`), not in the database. WordPress admin can't see or remove it.

**Implications:**
1. The current host is compromised at the file-system level.
2. Other backdoors may exist beyond the visible spam.
3. **Clean break required.** Do not migrate any files, database content, or credentials to the new site.
4. Forensic review needed (or explicit decision to skip) before the WordPress server is decommissioned.

**Recovery plan post-launch:**
- Submit homepage to Google Search Console: URL Inspection → Request Indexing
- Use GSC Removals tool for fast (24hr) hiding of cached spam version
- Spot-check `site:techd.com` in Google before and after launch

---

## Redirect map (draft — built Day 2-3)

210 legacy URLs → new URLs. All 301s, no 410s.

| Legacy URL | New URL | Type | Notes |
|---|---|---|---|
| _TBD_ | | 301 | |

---

## Changelog

- **Day 1, AM** — Plan confirmed. Crawl + spam analysis complete.
- **Day 1, PM** — Repo set up via Lovable. Scaffold generated and synced. Deploy pipeline configured.
- **Day 1, PM** — Fixed BrowserRouter basename (was showing 404 on all GitHub Pages routes).
- **Day 3, AM** — Content freshness audit. Pulled live `/our-story`, `/about-us`, `/depth-of-experience`, and the IBM-published TechD + NeuralSeek case study. Identified what's still true (IBM Platinum since 2009, client list, Miami HQ, "gain truth from data" mission) vs. what's stale (CogSuite, "Watson Assistant", "Premier" tier, "25+ years" math, Wayne PA HQ).
- **Day 3, AM** — Created `docs/COPY-SOURCE.md` as homepage copy source-of-truth. Every line tagged verified / inferred / placeholder. No invented stats.
- **Day 3, AM** — Pharma "62% / $18M / 11wk" stat block flagged for removal (scaffold placeholder). Replacing with the real IBM-published Db2 + watsonx Assistant + NeuralSeek retail case.
- **Day 3, AM** — Industry list rebalanced: dropping unverified "Financial Services", adding "Media & Entertainment" (Sony Pictures + Sony Interactive + Comcast/Peacock).
- **Day 3, next** — Apply the rewrite to `Index.tsx`, `solutions.ts`, `industries.ts`.
