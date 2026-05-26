# SEO Review & Implementation Plan

Target domain: **https://techd.com** (apex). All canonicals, sitemap entries, OG URLs, and JSON-LD will use this base.

Work is split into 4 phases. Each phase is independently shippable.

---

## Phase 1 — Technical foundation

Goal: every page is crawlable, indexable, has unique meta, and shows correct social previews.

1. **Add `react-helmet-async`** and wrap `<App />` in `<HelmetProvider>` in `src/main.tsx`.
2. **Refactor `src/components/shared/SEO.tsx`** to use `<Helmet>` instead of `useEffect`. Add props: `title`, `description`, `canonical` (path), `ogImage`, `ogType`, `jsonLd`. Auto-prefix canonical with `https://techd.com`.
3. **Update `index.html`** sitewide head:
   - Brand title + description
   - Sitewide OG fallback (for LinkedIn/Slack — they don't run JS)
   - Organization JSON-LD (name, url, logo, sameAs, founder, foundingDate, areaServed)
   - Remove `<link rel="canonical">` (Helmet owns it per route)
4. **Audit and fill `<SEO>` on every route** — 30+ pages across solutions, services, industries, resources, company, contact. Each gets a unique keyword-driven title (<60 chars) and description (<160 chars).
5. **Generate `public/sitemap.xml`** via `scripts/generate-sitemap.ts`, wired to `predev` + `prebuild`. Reads from `src/app/routes.tsx`, excludes redirects, `*`, `/admin-lab`, `/*-lab` internal routes. Includes dynamic resource detail routes from `src/content/resources.ts`.
6. **Update `public/robots.txt`** — add `Sitemap: https://techd.com/sitemap.xml`. Disallow `/admin-lab`, `/logo-lab`, `/figure-lab`, `/section-lab`, `/intro-lab`, `/techd-brand-lab`, `/contact-lab`.
7. **Add per-page JSON-LD** where it helps: `BreadcrumbList` on every nested page, `Service` schema on services pages, `FAQPage` on Contact (using the existing chatbot FAQ data).

## Phase 2 — Keyword & competitor research (Semrush)

Goal: ground every meta and H1 in real search behavior.

1. `domain_analysis` on techd.com — current rankings baseline.
2. `competitive_analysis` to surface IBM-partner / enterprise-AI competitors (Mainline, Sirius/CDW, Presidio, Ensono, Kyndryl, etc.).
3. `keyword_research` on the core terms per practice:
   - "watsonx implementation partner", "ibm gold partner", "ibm cognos implementation", "ibm guardium consulting", "ibm cloud paks", "ibm planning analytics", "ibm maximo partner", etc.
4. `serp_analysis` on top 5 commercial-intent terms to gauge difficulty.
5. Deliver a keyword-to-page mapping table (which keyword each page should own) as `docs/SEO-KEYWORD-MAP.md`.

## Phase 3 — Per-page copy rewrites for SEO

Goal: H1, intro paragraph, and meta align with the keyword map without breaking the established voice rules in `CLAUDE.md`.

Touches **only**:
- Each page's hero `<h1>` / lede (in the section component)
- `<SEO title=… description=…>` props
- Where natural, the first body paragraph

Scope (one PR per group):
1. 5 solutions pages
2. 4 services pages
3. 7 industries pages
4. Company + Contact + Home

Voice rules from `CLAUDE.md` are non-negotiable — no superlatives, practitioner-to-practitioner, specific claims only.

## Phase 4 — OG images + Analytics + Search Console

1. **OG images (1200×630)** via `imagegen`:
   - 1 default sitewide (`public/og/default.jpg`) — TechD wordmark + IBM Gold lockup
   - 1 per top-level section (solutions, services, industries, resources, company, contact) — 7 total
   - Each page's `<SEO ogImage="…">` points at the right one
2. **GA4** — add `gtag.js` snippet in `index.html` behind a `VITE_GA_MEASUREMENT_ID` env var (left empty for now; PM provides the ID at cutover).
3. **Google Search Console** — use the GSC connector to:
   - Request a META verification token for `https://techd.com/`
   - Add the meta tag to `index.html`
   - (After domain cutover) call verify, then PUT the site into GSC, then submit `/sitemap.xml`.

---

## Technical details

**Files created**
- `scripts/generate-sitemap.ts`
- `docs/SEO-KEYWORD-MAP.md`
- `public/og/default.jpg` + 7 section variants

**Files modified**
- `src/main.tsx` — add `<HelmetProvider>`
- `src/components/shared/SEO.tsx` — rewrite on top of `react-helmet-async`
- `index.html` — sitewide head, Organization JSON-LD, GA4 snippet, GSC meta
- `public/robots.txt` — sitemap line + lab disallows
- `package.json` — add `react-helmet-async`, add `predev`/`prebuild` hooks
- ~30 page components — `<SEO>` props + hero copy where Phase 3 covers them

**Out of scope (per `CLAUDE.md` deferred list)**
- CMS, real CRM form, multi-language, full WCAG audit, third-party pen test

**Verification at the end**
- Build site, view-source on every route to confirm unique title/description/canonical/OG
- Run the in-product SEO scanner (`seo_chat`) and resolve findings
- Validate sitemap.xml with `xmllint`
- Test OG previews via opengraph.xyz once deployed

---

## Suggested execution order

Phase 1 first (unblocks everything else and is safe to ship before domain cutover since canonicals will already point at techd.com — search engines just won't see them until DNS flips). Phase 2 in parallel. Phase 3 after the keyword map is approved. Phase 4 right before / at cutover.

Want me to start with Phase 1 end-to-end, or do Phase 1 + Phase 2 research in one pass so you can review the keyword map before any copy moves?
