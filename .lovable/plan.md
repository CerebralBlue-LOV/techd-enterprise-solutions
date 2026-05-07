# IA Restructure — Routing & Page Scaffolds

Scope: information architecture, routing, navigation config, and empty page scaffolds only. No copy, no design work. Each new page gets a future per-page plan.

## New URL structure (nested, parent removed)

Top-level nav labels (`Solutions`, `Services`, `Industries`, `Resources`) become **dropdown triggers only** — they no longer route anywhere. `Company` stays as-is for now (separate decision pending in `ABOUT-AUDIT.md`).

```text
Solutions/  (no /solutions page)
  /solutions/ai-generative
  /solutions/data-analytics
  /solutions/automation-finops
  /solutions/security-compliance
  /solutions/hybrid-cloud
  /solutions/:practice/:product   (existing product detail — kept)

Services/  (no /services page)
  /services/advisory
  /services/implementation
  /services/managed-services
  /services/training

Industries/  (no /industries page)
  /industries/healthcare
  /industries/media-entertainment
  /industries/insurance
  /industries/energy-utilities
  /industries/higher-education
  /industries/public-sector

Resources/  (no /resources page)
  /resources/case-studies
  /resources/blog
  /resources/webinars
  /resources/events
```

Practice slugs change from `/solutions/ai` to `/solutions/ai-generative` etc. — more descriptive, SEO-friendly. Existing `ProductDetail` route updates to `/solutions/:practice/:product` with new practice slugs.

## Work breakdown

1. **Update `src/content/site.ts` NAV**
   - Remove `href` from top-level Solutions/Services/Industries/Resources (or set to `#` and treat as non-navigable trigger).
   - Update child `href`s to new nested paths above.

2. **Update `src/layout/Header.tsx`**
   - Make top-level dropdown triggers non-clickable (open menu only, no navigation).
   - Mobile nav: top-level becomes accordion header, not link.

3. **Update `src/app/routes.tsx`**
   - Remove `/solutions`, `/services`, `/industries`, `/resources` routes.
   - Add 5 solution practice routes, 4 services, 6 industries, 4 resources.
   - Keep `/solutions/:practice/:product` (update slug values where needed).

4. **Create page scaffolds** (one file each, identical minimal structure: `Layout` + `SEO` + placeholder `<section>` with H1 and "Coming soon" body):
   - `src/pages/solutions/AIGenerative.tsx`, `DataAnalytics.tsx`, `AutomationFinOps.tsx`, `SecurityCompliance.tsx`, `HybridCloud.tsx`
   - `src/pages/services/Advisory.tsx`, `Implementation.tsx`, `ManagedServices.tsx`, `Training.tsx`
   - `src/pages/industries/Healthcare.tsx`, `MediaEntertainment.tsx`, `Insurance.tsx`, `EnergyUtilities.tsx`, `HigherEducation.tsx`, `PublicSector.tsx`
   - `src/pages/resources/CaseStudies.tsx`, `Blog.tsx`, `Webinars.tsx`, `Events.tsx`

5. **Delete old parent pages**
   - `src/pages/Solutions.tsx`, `Services.tsx`, `Industries.tsx`, `Resources.tsx`
   - Their `src/sections/<page>/` section files stay temporarily — many will be reused inside new child pages (per-page plans will harvest them).

6. **Redirect map** — append to `docs/REDIRECT-MAP.md`:
   - `/solutions` → `/solutions/ai-generative`
   - `/services` → `/services/advisory`
   - `/industries` → `/industries/healthcare`
   - `/resources` → `/resources/case-studies`
   - Old `/solutions/ai/*` product URLs → new `/solutions/ai-generative/*` (and same pattern for any other renamed practice slugs).
   - Implemented as React Router `<Navigate>` entries in `routes.tsx`.

7. **Update `docs/audit/` and `.lovable/plan.md`** with the new IA decision so it's captured for the next session.

## Out of scope (follow-up plans)

- Page content, copy, hero design, sections for any of the 19 new pages.
- Company/About decision (handled separately per `ABOUT-AUDIT.md`).
- Actual case study / blog / webinar / event content.

## Recommendations

- **Hide Blog and Webinars from nav for now** — scaffolds exist at the URLs (so we can link to them later), but nav only shows Case Studies and Events until there's content. Avoids "Coming soon" looking bad in the dropdown. *(Confirm or override.)*
- **Use a shared `PlaceholderPage` component** for all 19 scaffolds to keep them one-line each and easy to replace.
- **Keep practice slugs descriptive** (`ai-generative` not `ai`) so URLs stand alone in search results.


---

## Status — 2026-05-07

IA restructure implemented. Top-level Solutions/Services/Industries/Resources are dropdown triggers only; each child has its own route + scaffold (`src/pages/{section}/*.tsx` using `_PlaceholderPage`). Practice slugs renamed (`ai-generative`, `automation-finops`, `security-compliance`); industry slugs renamed (`media-entertainment`, `energy-utilities`, `higher-education`, `public-sector`). Legacy paths redirect via `<Navigate>` in `routes.tsx`. Blog and Webinars routes exist but hidden from nav. Per-page content plans pending.
