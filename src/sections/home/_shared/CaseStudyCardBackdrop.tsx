/**
 * Decorative backdrop layers for the Featured Case Study card.
 *
 * Composition (back → front):
 *   1. <CardSurface>    — brand secondary (dark gray) base + primary cyan spotlight glows
 *   2. <CardStarfield>  — sparse stars masked to the upper third
 *   3. <CardRimLight>   — 1px cyan gradient line along the top edge
 *
 * Use <CaseStudyCardBackdrop /> to render all three at once inside a
 * `relative overflow-hidden` container. Content should sit above with
 * `relative` (or any positioned class) to layer on top.
 */

/** Brand secondary (dark gray) base with a soft primary cyan spotlight in the top-right. */
export const CardSurface = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 bg-secondary"
    style={{
      backgroundImage: `
        radial-gradient(55% 50% at 95% 5%, hsl(var(--primary) / 0.25) 0%, transparent 70%),
        radial-gradient(60% 40% at 10% 90%, hsl(var(--primary) / 0.08) 0%, transparent 70%)
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
