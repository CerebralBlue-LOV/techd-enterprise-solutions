## Goal
Show the affected client logos in `#clients` as white, transparent-background marks on the dark card surface instead of placing full-color logos on white rectangles.

## What I’ll change
1. Add a dark-surface logo field to the shared customer data so each client can have:
   - the current standard logo for light surfaces
   - an alternate white/transparent logo for dark surfaces
2. Update the industry client cards to use the dark-surface logo variant when available and remove the hard white logo plate treatment.
3. Create white transparent logo assets for the affected clients you called out first:
   - Harvard University
   - Penn State
   - National University of Singapore
   - and any other industry-card logos that clearly need the same treatment for consistency
4. Keep the home marquee/logo strip unchanged unless a logo also needs a dedicated dark-surface treatment there later.

## Why this approach
- CSS alone won’t reliably convert these logos, because many of the current `.svg` files are actually embedded raster artwork.
- A curated white-on-transparent asset per affected logo gives the cleanest result and keeps sizing/legibility under control.
- It preserves consistency across cards without forcing every logo onto a white slab.

## Technical details
- Files likely involved:
  - `src/content/site.ts`
  - `src/sections/industries/IndustryClientsSection.tsx`
  - `public/logos/*` for the new white transparent variants
- Data shape change:
  - add an optional field such as `logoOnDark` to `Customer`
- Rendering logic:
  - industry cards prefer `logoOnDark` on dark backgrounds
  - fall back to the existing logo when no alternate exists yet
- Validation:
  - review the higher-education `#clients` section first since those are the clearest problem cases
  - then spot-check the other industry pages for scale and contrast consistency