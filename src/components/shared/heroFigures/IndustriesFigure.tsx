import { Suspense, lazy } from "react";

const ClusterScene = lazy(
  () => import("@/sections/industries/_components/IndustryClusterScene"),
);

/**
 * IndustriesFigure — isometric wireframe cube cluster (3D plus-sign of
 * 7 cubes). Center cube counter-rotates; the 6 axis neighbours drift
 * gently outward — one per industry vertical TechD serves.
 */
export const IndustriesFigure = () => (
  <div className="absolute inset-0">
    <Suspense fallback={null}>
      <ClusterScene tiltX={0} tiltY={0} />
    </Suspense>
  </div>
);

export default IndustriesFigure;
