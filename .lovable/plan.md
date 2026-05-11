## Goal

Today, every page family (Solutions, Industries, Services, Resources, Company) ships its own near-duplicate hero, "Why TechD", approach, and final CTA. Heights, copy structure, visuals, and CTA treatments drifted. We'll consolidate to **one set of reusable section components**, lift Solutions' richer treatments to be the standard, and apply them everywhere.

## Current inconsistencies (audit)

| Section | Solutions | Industries | Services | Resources | Company/About |
|---|---|---|---|---|---|
| Hero min-height | `80vh` | `50vh` | (similar) | `40vh` | `50vh` |
| Hero backdrop | `PracticeHeroBackdrop` + per-practice figure | `IndustryHeroBackdrop` + figure | `ServiceHeroBackdrop` + figure | `ResourceHeroBackdrop` | `CompanyHeroBackdrop` |
| "Why TechD" | Bento grid, 4 variants (dark/light/accent/outline), 101 lines | Plain 4-col card grid, 42 lines | Plain card grid, 42 lines | — | — |
| Approach | Numbered cards w/ ghost numeral, sheen, connector (73 lines) | Plain card grid (46 lines) | Plain card grid (45 lines) | — | — |
| Final CTA | Animated dark gradient panel, conic shimmer, blobs (102 lines) | Plain card w/ button (39 lines) | Plain card w/ button (58 lines) | Inline plain card | — |
| Page-CTA button | `btn-glow` "Talk to an expert" → `/contact` ✅ | same ✅ | same ✅ | same ✅ | — |

The CTA button itself is already standardized (memory rule). What's not standardized is the **panel** around it and the surrounding sections.

## What we'll build

Create a new shared folder `src/components/shared/page/` with five reusable building blocks:

1. **`PageHero`** — replaces `PracticeHeroSection`, `IndustryHeroSection`, `ServiceHeroSection`, the inline About hero, and the inline Resources hero.
   - Props: `eyebrowParent` (e.g. "Solutions"), `eyebrowChild` (e.g. practice name), `headline`, `lede`, `meta?` (small uppercase line, used today by Industries for regulation), `anchors?` (on-page nav), `backdrop` (ReactNode slot), `cursor` state managed internally.
   - Locked layout: `min-h-[70vh]` (single height for all template hero pages — between current 80 and 50), shared paddings, breadcrumb pattern, anchor nav row.

2. **`PageWhySection`** — the **Solutions bento** treatment becomes the standard.
   - Props: `eyebrow`, `title`, `points: { title; body }[]`, `pageLabel` (for `SectionMarker`).
   - Same 4-variant LAYOUT array currently in `WhyPracticeSection`.

3. **`PageApproachSection`** — the **Solutions numbered-card** treatment becomes the standard.
   - Props: `eyebrow`, `title`, `steps: { step; detail }[]`, `pageLabel`.

4. **`PageFinalCtaSection`** — the **Solutions animated panel** becomes the standard.
   - Props: `eyebrow` (e.g. practice/industry/service name), `title?` (default "Ready when you are."), `lede?`, `primary` (label + to, defaults to "Talk to an expert" → `/contact` with `btn-glow`), `secondary?` (optional second link, e.g. "View our clients").
   - Always uses the `btn-glow` standard for the primary button (per memory rule).

5. **`PageHeroBackdrop`** — wrapper around the existing per-page backdrops so each domain just passes its figure component.
   - Props: `figure: ReactNode`, `cursor?`. Keeps the grid + gradient wash + vignette identical across families.
   - `PracticeHeroBackdrop`, `IndustryHeroBackdrop`, `ServiceHeroBackdrop` become thin wrappers (or are deleted in favor of inline usage with the right figure).

## Migration

| File | Action |
|---|---|
| `src/sections/solutions/PracticeHeroSection.tsx` | Rewrite to use `PageHero` + figure resolver from existing `PracticeHeroBackdrop` map. |
| `src/sections/solutions/WhyPracticeSection.tsx` | Replace body with `PageWhySection`. |
| `src/sections/solutions/ApproachSection.tsx` | Replace body with `PageApproachSection`. |
| `src/sections/solutions/PracticeCtaSection.tsx` | Replace body with `PageFinalCtaSection`. |
| `src/sections/industries/IndustryHeroSection.tsx` | Use `PageHero` with `meta={industry.regulation}`. |
| `src/sections/industries/WhyIndustrySection.tsx` | Use `PageWhySection`. |
| `src/sections/industries/IndustryApproachSection.tsx` | Use `PageApproachSection`. |
| `src/sections/industries/IndustryCtaSection.tsx` | Use `PageFinalCtaSection`. |
| `src/sections/services/ServiceHeroSection.tsx` | Use `PageHero`. |
| `src/sections/services/ServiceWhySection.tsx` | Use `PageWhySection`. |
| `src/sections/services/ServiceApproachSection.tsx` | Use `PageApproachSection`. |
| `src/sections/services/ServiceCtaSection.tsx` | Use `PageFinalCtaSection`. |
| `src/pages/resources/CaseStudies.tsx`, `Blog.tsx`, `Webinars.tsx`, `Events.tsx`, `BlogDetail.tsx`, `CaseStudyDetail.tsx` | Replace inline hero with `PageHero`; replace inline final CTA with `PageFinalCtaSection`. |
| `src/pages/company/About.tsx`, `Customers.tsx`, `IBMPartnership.tsx` | Replace inline hero with `PageHero`; add `PageFinalCtaSection` at the bottom (currently missing on About). |
| `src/pages/Contact.tsx` | Optional: same `PageHero` shell at the top. Out of scope unless you want it. |

## Content data — no schema changes

We won't touch `src/content/*` shapes. The wrappers in each domain read the same `industries-extras.ts` / `solutions-extras.ts` / `services-extras.ts` and feed normalized props into the shared components. Industries/Services don't have `whyPoints` or `approach` content as rich as Solutions today — if a domain has fewer points, the bento layout already handles it (or we cap at 4 per pre-existing LAYOUT array).

## What we are NOT doing in this pass

- Not redesigning the in-page sections that are unique per family (`ProductsGridSection`, `IndustryClientsSection`, `SolutionsForIndustrySection`, `ServiceOfferingsSection`, etc.) — only the four shared ones.
- Not changing copy / data files.
- Not changing the hero figures themselves (those already standardized last sprint).
- Not modifying brand tokens, fonts, or animations beyond what's already in the Solutions versions.
- No CMS, no routing changes.

## Acceptance criteria

- Every template-page hero has the same height, padding, breadcrumb pattern, and anchor row.
- "Why TechD", "Approach", and "Final CTA" look identical (modulo content) on Solutions, Industries, Services pages.
- Resources and Company landing pages use the same hero shell and final CTA.
- "Talk to an expert" CTA stays `btn-glow` → `/contact` across all pages (memory rule preserved).
- Net lines deleted ≥ lines added (consolidation, not new surface).

## Open questions

1. **Industries `regulation` line** ("HIPAA · HITECH" etc.) currently appears between the lede and the anchors. Keep as a `meta` slot on `PageHero` so other families can use it too (e.g. Services could show certifications)? **My recommendation: yes.**
2. **Final CTA secondary link.** Solutions shows "View our clients". Should Industries / Services / Resources also show it, or stay primary-only? **My recommendation: primary-only by default, opt-in per page.**
3. **Hero height.** Settle on `min-h-[70vh]` site-wide, or keep Solutions at `80vh` and align everything else up to that? **My recommendation: `70vh` everywhere — denser pages above the fold, more consistent feel.**
