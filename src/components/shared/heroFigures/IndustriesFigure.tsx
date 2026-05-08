import { Suspense, lazy } from "react";

const StackingCubeScene = lazy(
  () => import("@/sections/industries/_components/IndustryStackingCubeScene"),
);

/**
 * IndustriesFigure — isometric wireframe "stacking cube" loop. Three
 * cubes form an L-cluster; a fourth rises from below, lands on top,
 * holds, descends. Inspired by the Dribbble Isometric Shapes Showreel.
 */
export const IndustriesFigure = () => (
  <div className="absolute inset-0">
    <Suspense fallback={null}>
      <StackingCubeScene tiltX={0} tiltY={0} />
    </Suspense>
  </div>
);

export default IndustriesFigure;
