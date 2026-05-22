/**
 * HeroFigureFallback — tiny presentational placeholder used as the
 * Suspense fallback for every 3D hero figure, and as the mobile
 * substitute when the three.js scene is skipped entirely.
 *
 * Purely CSS: a faint brand-cyan radial glow on a transparent base.
 * No JS, no animation, no layout shift — fills its parent.
 */
export const HeroFigureFallback = () => (
  <div
    aria-hidden="true"
    className="absolute inset-0"
    style={{
      background:
        "radial-gradient(ellipse 60% 55% at 50% 50%, hsl(var(--primary) / 0.10) 0%, hsl(var(--primary) / 0.04) 45%, transparent 75%)",
    }}
  />
);

export default HeroFigureFallback;
