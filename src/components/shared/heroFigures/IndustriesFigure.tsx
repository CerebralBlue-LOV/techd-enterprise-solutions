import { Suspense, lazy } from "react";

const PillarsScene = lazy(
  () => import("@/sections/industries/_components/IndustryPillarsScene"),
);

/**
 * IndustriesFigure — the vertical pillars motif used on /industries/* hero
 * backdrops. Self-contained, fills its parent.
 */
export const IndustriesFigure = () => (
  <div className="absolute inset-0">
    <Suspense fallback={null}>
      <PillarsScene tiltX={0} tiltY={0} />
    </Suspense>
  </div>
);

export default IndustriesFigure;
