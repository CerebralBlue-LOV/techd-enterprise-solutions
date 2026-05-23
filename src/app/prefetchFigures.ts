/**
 * Warms the lazy-loaded three.js hero figure chunks after the first
 * paint, so subsequent route changes don't pay the chunk-download cost.
 * Runs once, idle-prioritized, desktop only, and respects Save-Data.
 *
 * This is the single biggest "figures appear suddenly / take a moment"
 * lever — the heavy `three` + `@react-three/fiber` vendor chunks plus
 * each per-page scene get fetched, parsed, and cached while the user
 * is reading the home hero.
 */
const warm = () => {
  // Mobile already skips three.js (HeroFigureFallback), don't waste data.
  if (typeof window === "undefined") return;
  if (window.matchMedia("(max-width: 767px)").matches) return;
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean } })
    .connection;
  if (conn?.saveData) return;

  // Fire-and-forget. Failures are swallowed — these are pure prefetches.
  const imports: Array<Promise<unknown>> = [
    // Section-hero figure wrappers (each lazy-loads its own three.js scene)
    import("@shared/heroFigures/CompanyFigure"),
    import("@shared/heroFigures/IndustriesFigure"),
    import("@shared/heroFigures/ServicesFigure"),
    import("@shared/heroFigures/ResourcesFigure"),
    import("@shared/heroFigures/SolutionsFigure"),
    import("@shared/heroFigures/solutions/AiGenerativeFigure"),
    import("@shared/heroFigures/solutions/DataAnalyticsFigure"),
    import("@shared/heroFigures/solutions/AutomationFinOpsFigure"),
    import("@shared/heroFigures/solutions/SecurityComplianceFigure"),
    // Home + Contact particle scenes
    import("@/sections/home/_components/HeroParticleField"),
    import("@/sections/home/_components/ParticleOrbit"),
    import("@/sections/home/_components/ParticleGlobe"),
  ];
  Promise.allSettled(imports).catch(() => {});
};

export const prefetchHeroFigures = () => {
  if (typeof window === "undefined") return;
  const ric =
    (window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
    }).requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1500));
  ric(warm, { timeout: 3000 });
};
