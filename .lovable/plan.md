## Goal

Extract the case-study card's decorative layers from `Index.tsx` into a single, well-named component so each visual layer is identifiable, reusable, and easy to tweak.

## New file

**`src/components/CaseStudyCardBackdrop.tsx`** — exports four pieces:

| Export | Role |
|---|---|
| `CardSurface` | Teal→navy vertical gradient base + top-right cyan spotlight |
| `CardStarfield` | Sparse static stars, masked to the upper third |
| `CardRimLight` | 1px cyan gradient line along the top edge |
| `CaseStudyCardBackdrop` (default) | Renders all three stacked, in correct back→front order |

All pieces are `pointer-events-none absolute inset-0` (or `inset-x-0 top-0` for the rim) so they sit behind content. Pure CSS, no new dependencies, no behavior changes — pixels stay identical.

## Edit to `src/pages/Index.tsx`

Replace the three inline decorative `<div>`s inside the case-study card (lines ~203–227) with a single `<CaseStudyCardBackdrop />`. Move the gradient base from the wrapper's inline `style` into `CardSurface`, leaving the wrapper as just:

```tsx
<div className="relative overflow-hidden rounded-2xl border border-border ring-1 ring-white/[0.06] text-white p-10 md:p-16">
  <CaseStudyCardBackdrop />
  <p className="relative ...">Featured Case · Published by IBM</p>
  ...
</div>
```

Add the import alongside the other component imports.

## Out of scope

- No visual changes — colors, positions, masks, sizes all preserved exactly.
- No changes to content, layout, or text classes.
- Not touching `SectionBackdrop`, `HeroBackdrop`, `ParticleGlobe`, or other sections.

## Result

`Index.tsx` case-study block drops from ~40 lines of decorative markup to 1 line + content. The named exports make it obvious which layer to edit when iterating ("change the spotlight" → `CardSurface`; "more/fewer stars" → `CardStarfield`).