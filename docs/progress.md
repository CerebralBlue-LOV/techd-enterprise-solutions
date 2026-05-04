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

## Day 2 (Tuesday) — Templates + content audit

_To be filled in._

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
