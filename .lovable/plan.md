
# Resources buildout — plan

Source of truth for content: `docs/revisions/resources/{case-studies,blog,webinars,events}.md`.
All new entries land as `draft: true` so nothing renders publicly until PM/legal flip the flag — matching `docs/rebuild/resources.md` policy.

## Goals

1. Make the four Resources sub-pages structurally complete (Case Studies, Blog, Webinars, Events) so flipping `draft: false` is the only step left.
2. Wire the content model in `src/content/resources.ts` to everything the revision docs require (vertical, products, format, location, etc.).
3. Replace the two placeholder pages (Webinars, Events) with real list + detail pages that match the Blog / Case Studies pattern.

## 1. Extend the `Resource` content model

Add optional fields used across the four types (kept optional so existing entries keep compiling):

- `vertical?: string` — TechD's six verticals (rename of existing `industry` for clarity, or keep `industry` as alias).
- `products?: string[]` — current IBM product names (used as eyebrow chips).
- `tags?: string[]` — blog/webinar topical tags.
- `format?: "virtual" | "in-person" | "conference" | "roundtable"` — events.
- `location?: string | null` — events.
- `registrationUrl?: string | null` — events / webinars.
- `publishedAt?: string` — ISO date for blog (kept alongside the human `date`).

No backend, no CMS — pure typed TS module. Marketing/PM edits the file.

## 2. Seed `src/content/resources.ts` with all draft content

From the revision docs, add these entries (all `draft: true`, except the one already-published retail case study):

**Case Studies (5 new placeholders)** — Pharma BI, Hospital DW, Cancer Center BI, University Cognos, Comms Planning Analytics. Anonymized client labels, current product names per §4 of `case-studies.md`.

**Blog (6 new draft topic anchors)** — the six rewrite angles from §5 of `blog.md` (DataStage→watsonx.data, Cognos 12 cutoff, FinOps Apptio+Turbonomic, watsonx Orchestrate + ERP, Planning Analytics 2.1, SPSS AutoML), plus keep the existing 3 drafts.

**Webinars (5 new draft topics)** — the five gap-fill webinars from §5 of `webinars.md` (NeuralSeek RAG, Turbonomic+Instana, PA 2.1 migration, Guardium DDR, Cognos 12 agents), plus keep existing 2.

**Events (2 new draft topics)** — Lunch & Learn (watsonx.ai), Workshop (Data Governance & AI Readiness), Roundtable (FinOps). Keep existing IBM Think 2026 + NYC Roundtable.

All entries carry `products[]` and `vertical` where the revision doc specifies them, so list pages can show eyebrow chips and filter later.

## 3. Pages

### CaseStudies.tsx (already real)
- Add `products[]` chip row to cards.
- No structural change.

### Blog.tsx (already real)
- Add `tags[]` chip row to cards.
- No structural change.

### Webinars.tsx — replace placeholder
Pattern: clone `Blog.tsx`. Card shows: products eyebrow → title → description → `date` (or "On-demand") + format. Empty state when no published items, identical voice to Blog empty state. Links to `/resources/webinars/:slug`.

### WebinarDetail.tsx — new
Pattern: clone `BlogDetail.tsx`. Hero shows date / format / products. Body paragraphs from `body[]`. Secondary CTA back to `/resources/webinars`. If `registrationUrl` is set, primary CTA becomes "Register" → external link; otherwise the standard `btn-glow` "Talk to an expert" → `/contact`.

### Events.tsx — replace placeholder
Pattern: clone `Blog.tsx`, but card shows `format` badge + `date` + `location`. Sort upcoming events first, then on-demand/TBD. Same empty state pattern. Links to `/resources/events/:slug`.

### EventDetail.tsx — new
Mirrors WebinarDetail with `format` + `location` line and a "Register" CTA when `registrationUrl` exists.

### Routes
Add to `src/app/routes.tsx`:
- `/resources/webinars/:slug` → `WebinarDetail`
- `/resources/events/:slug` → `EventDetail`

## 4. Optional Resources hub (`/resources`)

Currently `/resources` redirects to `/resources/case-studies`. Recommendation: keep the redirect for now (matches `docs/rebuild/resources.md` "clean slate" stance). A real hub page can come later once at least one published item exists per type. Not building this in this pass unless you say so.

## 5. Out of scope (per `docs/rebuild/resources.md` and `CLAUDE.md`)

- No CMS, no live calendar, no webinar platform integration.
- No invented metrics, client names, dates, or registration URLs.
- No new colors/fonts; reuse `btn-glow`, `card-hover`, `eyebrow` tokens.
- No edits to `src/components/ui/`.

## Technical notes

- Files added: `src/pages/resources/WebinarDetail.tsx`, `src/pages/resources/EventDetail.tsx`.
- Files modified: `src/content/resources.ts` (type + ~18 new entries), `src/pages/resources/Webinars.tsx`, `src/pages/resources/Events.tsx`, `src/pages/resources/Blog.tsx` (tag chips), `src/pages/resources/CaseStudies.tsx` (product chips), `src/app/routes.tsx`.
- TS strict; all new fields optional; existing entries keep working.
- All cards/details use `Reveal`, `PageHero`, `PageFinalCtaSection`, `SectionMarker` like the existing Blog/CaseStudies pages — no new shared components.

## Result after implementation

- 4 Resources sub-pages structurally complete with detail routes.
- ~18 new draft entries seeded from the revision docs, organized by practice + vertical.
- Zero new published content; PM flips `draft: false` per item as approvals land.
- Practice coverage gaps (Automation & FinOps, AI & Generative) are visible in the data file as ready-to-publish drafts.
