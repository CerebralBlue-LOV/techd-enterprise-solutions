import { Suspense, lazy } from "react";

const IsoCubeScene = lazy(
  () => import("@/sections/services/_components/ServiceIsoCubeScene"),
);

/**
 * ServicesFigure — isometric wireframe cube viewed from the corner
 * (hexagonal silhouette with a Y inside). Three visible faces pulse
 * with a soft brand-cyan fill in sequence — the X/Y/Z axes highlight
 * from the Dribbble Isometric Shapes Showreel, minus the labels.
 */
export const ServicesFigure = () => (
  <div className="absolute inset-0">
    <Suspense fallback={null}>
      <IsoCubeScene tiltX={0} tiltY={0} />
    </Suspense>
  </div>
);

export default ServicesFigure;
