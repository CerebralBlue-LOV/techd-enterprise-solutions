# Plan — Add missing section IDs + prune the audit doc

Scope: only the §5 / §7 ID work from `docs/audit/site-link-and-section-audit.md`. PR-1 (link fixes) is already shipped and will be removed from the doc. No copy or visual changes — just adding `id="..."` (and a `scroll-mt-24` where the section is a sticky-anchor target) to root `<section>` elements per the §6 naming convention.

## Naming convention (locked from §6)

`hero`, `logos`, `why-techd | why-practice | why-industry | why-service`, `products`, `solutions`, `industries`, `approach | methodology`, `spotlight`, `clients | credentials`, `cross-links | related`, `offerings`, `capabilities`, `cta`, `contact-form | contact-info | map | locations`, `list`, `body`, `not-found`. Page-local unique, kebab-case.

## Step 1 — Heroes (4 files)

Add `id="hero"` to the root `<section>` of:
- `src/sections/solutions/PracticeHeroSection.tsx`
- `src/sections/services/ServiceHeroSection.tsx`
- `src/sections/industries/IndustryHeroSection.tsx`
- `src/sections/products/ProductHeroSection.tsx`

## Step 2 — Page-local final CTAs (3 files)

Add `id="cta"` + `scroll-mt-24` to:
- `src/sections/solutions/PracticeCtaSection.tsx`
- `src/sections/services/ServiceCtaSection.tsx`
- `src/sections/industries/IndustryCtaSection.tsx`

(Product CTA already inherits `cta` from `PageFinalCtaSection`.)

## Step 3 — Remaining body sections on solutions / services / industries

Solutions practice pages:
- `WhyPracticeSection` → `why-practice`
- `ProductsGridSection` → `products`
- `ApproachSection` → `approach`

Services pages:
- `ServiceWhySection` → `why-service`
- `ServiceSpotlightSection` → `spotlight`
- `ServiceMethodologySection` → `methodology`
- `ServiceCrossLinksSection` → `cross-links`

Industries pages:
- `WhyIndustrySection` → `why-industry`
- `IndustryApproachSection` → `approach`
- `IndustryCrossLinksSection` → `cross-links`

Product detail:
- `ProductRelatedSection` → `related`

## Step 4 — Home + Contact

Home:
- `src/sections/home/LogoStripSection.tsx` → `id="logos"`

Contact (`src/sections/contact/*`):
- `ContactHero` → `hero`
- `ContactForm` → `contact-form`
- `ContactInfo` → `contact-info`
- `ContactMap` → `map`
- `ContactLocationSection` → `locations`

## Step 5 — Company body sections + Resources + NotFound

Company:
- `About.tsx` inline sections → `hero`, `story`, `leadership` (keep existing `practices`; `methodology` and `cta` already set)
- `IBMPartnership.tsx` inline sections in render order → `hero`, `credentials`, `practices`, `quick-start` (`cta` already default)
- `DeliveryMethodology.tsx` → add `hero` (keep existing `stages`, `commitment`, default `cta`)

Resources list pages — add an id to the local list `<section>` on each:
- `CaseStudies.tsx` → `case-studies`
- `Blog.tsx` → `articles`
- `Webinars.tsx` → `webinars`
- `Events.tsx` → `events`

Resources detail pages (`CaseStudyDetail`, `BlogDetail`, `WebinarDetail`, `EventDetail`) — body `<section>` → `body`.

`NotFound.tsx` → `not-found`.

## Step 6 — Prune `docs/audit/site-link-and-section-audit.md`

After the code edits land, rewrite the doc so it only describes work still outstanding. Specifically:

- Delete §1 summary rows for "Broken internal links", "External `target="_blank"` missing `noopener`", and "Talk to an expert CTAs not following standard" (all 0 now). Update "Section components with explicit `id`" count to 42 and "missing" count to 0.
- Delete §4 entirely (all three link issues resolved).
- Delete §5 per-page rows where the action was completed (every row marked **add** becomes nothing — leave only the table header note saying coverage is complete, or drop the per-page tables in favor of one line: "All section components now carry a kebab-case `id` per §6.").
- Keep §2 (redirect map), §3 (route inventory), and §6 (naming convention — now the enforced rule).
- Delete §7 items 1–6 once each is done; the section becomes empty and can be removed.
- Update the top-of-file note: "Read-only audit" → "Audit + remediation log. All link issues and section-ID gaps from the original audit have been resolved. This file is now the canonical naming convention reference."

The rule per the user: do **not** mark items as "completed" — just remove them. The remaining doc should read as if those problems never existed, leaving only the convention and the still-valid route/redirect inventories.

## Out of scope

- No visual changes, no copy changes, no new components.
- No edits to `src/components/ui/`.
- No `scroll-mt-*` adjustments beyond what's needed to make a newly-anchored section land below the sticky header.
- No new routes, no nav changes.

## Verification

After edits:
1. Spot-check 3 routes in the preview by appending `#hero`, `#cta`, and one body anchor (e.g. `/services/advisory#methodology`, `/industries/healthcare#why-industry`, `/contact#contact-form`) — page should scroll to the correct band.
2. `rg "id=\"" src/sections src/pages` should show every section component with an explicit `id`.
3. Re-read the pruned audit doc top-to-bottom to confirm no completed item remains.

## Risks

- Two pages compose multiple inline `<section>` blocks (`About.tsx`, `IBMPartnership.tsx`). Adding ids requires reading the file and matching render order — low risk but needs care to avoid duplicate ids.
- A few sections wrap their root in a shared component (`DarkSection`, `PageFinalCtaSection`) that already accepts an `id` prop — use the prop, don't add a second wrapper `<div>`.
