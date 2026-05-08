import { Suspense, lazy } from "react";

const SpireScene = lazy(
  () => import("@/sections/industries/_components/IndustrySpireScene"),
);

/**
 * IndustriesFigure — a tapered wireframe spire of stacked octagonal rings
 * with vertical struts and node points. Represents the layered, regulated
 * structure of the industries TechD serves.
 */
export const IndustriesFigure = () => (
  <div className="absolute inset-0">
    <Suspense fallback={null}>
      <SpireScene tiltX={0} tiltY={0} />
    </Suspense>
  </div>
);

export default IndustriesFigure;
