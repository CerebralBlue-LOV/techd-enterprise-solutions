## Goal

Every top-level section's hero should show the **engineered grid background + its assigned wireframe figure on the right**, with the existing soft cyan washes/vignettes preserved. Same pattern Solutions already uses, applied uniformly across all five areas.

## Current state

| Section | Hero backdrop | Grid? | Figure on right? |
|---|---|---|---|
| Solutions (`/solutions/*`) | `PracticeHeroBackdrop` | ✅ | ✅ icosahedron |
| Industries (`/industries/*`) | `IndustryHeroBackdrop` | needs verify | needs verify |
| Services (`/services/*`) | `ServiceHeroBackdrop` | needs verify | needs verify |
| Resources (`/resources/*`) | `HoneycombHeroBackdrop` (shared honeycomb) | ✅ honeycomb, no grid | ❌ no figure |
| Company (`/company/*` — About, Customers, IBMPartnership) | `RingsHeroBackdrop` (shared rings) | ✅ rings, no grid | ❌ no figure |

The figures themselves already exist in `src/components/shared/heroFigures/` and render correctly in `/figure-lab`. This work is purely about **wiring them into the real hero backdrops** so each page matches the Solutions pattern.

## Plan

### 1. Audit Industries + Services backdrops
Open `IndustryHeroBackdrop` and `ServiceHeroBackdrop`. If they already follow the Solutions pattern (grid + figure-on-right + washes), no change. If not, refactor them to match.

### 2. Create dedicated backdrops for Resources and Company
Resources and Company currently use the generic `HoneycombHeroBackdrop` and `RingsHeroBackdrop`, which don't include the grid or our figures.

- New `src/sections/resources/_components/ResourceHeroBackdrop.tsx` — same structure as `PracticeHeroBackdrop`, but lazy-loads `ResourcesFigure` (book/fanning pages).
- New `src/sections/company/_components/CompanyHeroBackdrop.tsx` — same structure, lazy-loads `CompanyFigure` (DNA helix).

### 3. Swap the backdrops on the real pages

- Resources pages (`Blog.tsx`, `CaseStudies.tsx`, plus the placeholder Webinars/Events if they're upgraded to real heroes): replace `HoneycombHeroBackdrop` import + usage with `ResourceHeroBackdrop`.
- Company pages (`About.tsx`, `Customers.tsx`, `IBMPartnership.tsx`): replace `RingsHeroBackdrop` import + usage with `CompanyHeroBackdrop`.

### 4. Verify
Walk through one page per section (`/solutions/ai-generative`, `/industries/healthcare`, `/services/advisory`, `/resources/case-studies`, `/company/about`) and confirm each hero shows: engineered grid + its figure on the right + the existing cyan washes.

## What stays the same

- The five figure components (`SolutionsFigure`, `IndustriesFigure`, `ServicesFigure`, `ResourcesFigure`, `CompanyFigure`) are unchanged.
- All hero copy, anchors, and section ordering.
- The soft cyan blur washes and edge vignettes already in each backdrop.
- `HoneycombHeroBackdrop` and `RingsHeroBackdrop` remain in the shared folder in case other pages still use them — only the resources/company pages are switched off them.

## Out of scope

- No changes to figure shapes, speeds, or the figure-lab page.
- No restyling of other sections inside each page.
- No changes to navigation, routing, or content data.
