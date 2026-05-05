/**
 * Decorative backdrop layers for the Featured Case Study card.
 *
 * Composition (back → front):
 *   1. <CardSurface>    — teal→navy vertical gradient + top-right cyan spotlight
 *   2. <CardStarfield>  — sparse stars masked to the upper third
 *   3. <CardRimLight>   — 1px cyan gradient line along the top edge
 *
 * Use <CaseStudyCardBackdrop /> to render all three at once inside a
 * `relative overflow-hidden` container. Content should sit above with
 * `relative` (or any positioned class) to layer on top.
 */

/** Teal-to-navy gradient base with a soft cyan spotlight in the top-right. */
export const CardSurface = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0"
    style={{
      backgroundImage: `
        radial-gradient(55% 50% at 95% 5%, hsl(185 90% 55% / 0.45) 0%, transparent 70%),
        linear-gradient(180deg,
          hsl(190 65% 25%) 0%,
          hsl(205 55% 15%) 35%,
          hsl(220 50% 7%)  100%)
      `,
    }}
  />
);

/** Sparse static starfield, masked so stars only appear in the upper third. */
export const CardStarfield = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0"
    style={{
      backgroundImage: `
        radial-gradient(1px 1px at 20% 30%, hsl(0 0% 100% / 0.8), transparent 50%),
        radial-gradient(1px 1px at 70% 15%, hsl(195 100% 85% / 0.6), transparent 50%),
        radial-gradient(1.5px 1.5px at 45% 55%, hsl(0 0% 100% / 0.45), transparent 50%),
        radial-gradient(1px 1px at 85% 40%, hsl(0 0% 100% / 0.5), transparent 50%),
        radial-gradient(1px 1px at 10% 70%, hsl(195 100% 85% / 0.35), transparent 50%),
        radial-gradient(1.5px 1.5px at 60% 25%, hsl(0 0% 100% / 0.6), transparent 50%)
      `,
      backgroundSize:
        "240px 240px, 200px 200px, 320px 320px, 180px 180px, 280px 280px, 220px 220px",
      WebkitMaskImage:
        "linear-gradient(180deg, black 0%, black 30%, transparent 60%)",
      maskImage:
        "linear-gradient(180deg, black 0%, black 30%, transparent 60%)",
    }}
  />
);

/** 1px cyan gradient line along the top edge — mimics a rim light. */
export const CardRimLight = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent"
  />
);

/** All three layers stacked. Drop into a `relative overflow-hidden` container. */
export const CaseStudyCardBackdrop = () => (
  <>
    <CardSurface />
    <CardStarfield />
    <CardRimLight />
  </>
);

export default CaseStudyCardBackdrop;
