## Goal

Two parallel sweeps, reported as findings only (no code changes in this pass):

1. **Link & redirect audit** — verify every route resolves, every internal link points somewhere real, every redirect lands on the intended target.
2. **Section ID coverage** — every `<section>` across every page gets a stable, kebab-case `id` (like `id="hero"` on the home hero), so sections are addressable for deep-links, analytics, anchor nav, and QA.

Output is a single report (Markdown) saved to `docs/audit/site-link-and-section-audit.md`. No source files in `src/` are modified.

---

## Scope

**Pages in scope** (from `src/app/routes.tsx`):

- `/` Home
- `/solutions/*` — ai-generative, data-analytics, automation-finops, security-compliance (+ legacy redirects + `/solutions/:practice/:product`)
- `/services/*` — advisory, implementation, managed-services, training
- `/industries/*` — healthcare, media-entertainment, energy-utilities, higher-education, public-sector, financial-services, manufacturing (+ insurance → financial-services redirect)
- `/resources/*` — case-studies, blog, webinars, events (+ `:slug` detail pages)
- `/company/*` — about, ibm-partnership, delivery-methodology
- `/contact`
- `*` NotFound

**Out of scope:** lab pages (`/admin-lab`, `/logo-lab`, `/figure-lab`, `/section-lab`, `/intro-lab`).

---

## Part 1 — Link & redirect audit

### What gets checked

For each route above:

1. **Route resolves** — the path defined in `routes.tsx` mounts the expected component, no console errors.
2. **Redirects land correctly** — every `<Navigate>` in `routes.tsx` (parent → first child, legacy slug → current slug, removed product → parent practice) ends at a real, rendering page.
3. **Internal links on the page** — every `<Link to=…>`, `<NavLink>`, and `href` to an internal path resolves to a route in `routes.tsx`. Flag any link to a removed/renamed path.
4. **CTAs** — every "Talk to an expert" button points to `/contact` and uses the `btn-glow` standard. Flag deviations.
5. **Nav + footer** — `site.ts` nav items and footer links match the actual route table.
6. **External links** — `target="_blank"` links have `rel="noopener noreferrer"`. Flag missing.
7. **Anchors** — any `#section` link points to an id that exists on the target page (becomes much more meaningful after Part 2).

### Method

- Static pass: `rg` across `src/` for `to="`, `href="`, `Navigate to`, then cross-reference against `routes.tsx`.
- Render pass: for each route, mount in the dev preview, watch console, click each visible internal link, confirm landing route.
- Redirect pass: hit every legacy path listed in `routes.tsx` directly, confirm final URL + rendered page.

### Deliverable per route

A row in the report:

```text
Route                          Status   Issues
/solutions/ai-generative       OK       —
/solutions/ai                  REDIR    → /solutions/ai-generative ✓
/industries/insurance          REDIR    → /industries/financial-services ✓
/resources/blog/some-slug      BROKEN   Link in BlogSection points to /blog/foo (404)
```

---

## Part 2 — Section IDs on every page

### Standard

- Every `<section>` element rendered on a page gets `id="<kebab-case-name>"`.
- IDs are **page-local unique** and **semantic** (describe what the section is, not its position): `hero`, `why-techd`, `solutions-grid`, `industries-served`, `methodology`, `cta`, `cross-links`, etc.
- Reuse existing names where they already exist (27 of 42 section files already have ids — keep those, normalize anything inconsistent).
- IDs are stable contracts — once shipped, do not rename without a redirect plan for any anchor links.

### What gets audited

For each page, list its sections in render order with their current id (or `MISSING`) and the proposed id. Example:

```text
Page: /services/advisory
  ServiceHeroSection                MISSING            → hero
  ServiceWhySection                 why-advisory       ✓ keep
  ServiceOfferingsSection           offerings          ✓ keep
  ServiceMethodologySection         methodology        ✓ keep
  ServiceProductCoverageSection     product-coverage   ✓ keep
  ServiceSpotlightSection           spotlight          ✓ keep
  ServiceCrossLinksSection          cross-links        ✓ keep
  ServiceCtaSection                 MISSING            → cta
```

### Coverage gap (already known from a quick scan)

- 42 section components total, 27 currently have an `id`. ~15 sections are missing one and will be flagged with a proposed id.
- Notable misses include `ServiceHeroSection`, `ServiceCtaSection`, `PracticeHeroSection`, `PracticeCtaSection`, `ApproachSection`, several industry sections, contact sections — confirmed in the final report.

### Naming convention (proposed, for review)

| Section kind | Proposed id |
|---|---|
| Page hero | `hero` |
| Trust strip / logos | `logos` |
| Why TechD / Why <X> | `why-techd`, `why-<practice>`, `why-<industry>` |
| Capabilities / offerings | `offerings`, `capabilities` |
| Products / solutions grid | `products`, `solutions-grid` |
| Industries served | `industries-served` |
| Methodology / approach | `methodology`, `approach` |
| Case study spotlight | `spotlight` |
| Cross-links / related | `cross-links` |
| Final CTA band | `cta` |
| Contact form | `contact-form` |
| Contact info | `contact-info` |

---

## Deliverable

A single Markdown report at `docs/audit/site-link-and-section-audit.md` with:

1. **Summary table** — pages audited, link issues found, sections missing ids.
2. **Link audit** — one section per route, listing broken links, wrong redirects, missing `rel="noopener"`, non-standard CTAs.
3. **Redirect map check** — table of every `<Navigate>` in `routes.tsx`, source → target → ✓/✗.
4. **Section ID inventory** — one table per page, render-order list of sections with current id, proposed id, and action (`keep` / `add` / `rename`).
5. **Recommended follow-up PRs** — grouped fixes (e.g. "add hero+cta ids to all service pages", "fix 3 broken blog links"), each small enough to land independently.

No source files changed in this pass. Once you approve the report, the follow-up implementation PRs become the next plan(s).

---

## Out of scope (for this plan)

- Editing components to add the ids (that's the follow-up PR).
- External-link reachability checks (HTTP HEAD on third-party URLs) — only formatting + `rel` checks.
- SEO/meta audit, accessibility audit, performance — separate workstreams.
- Lab pages.
