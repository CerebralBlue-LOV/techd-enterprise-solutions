import { Suspense, lazy } from "react";

const WireframeScene = lazy(
  () => import("@/sections/solutions/_components/PracticeWireframeScene"),
);

/**
 * SolutionsFigure — the wireframe globe with arc connections used on
 * /solutions/* hero backdrops. Self-contained, fills its parent.
 */
export const SolutionsFigure = () => (
  <div className="absolute inset-0">
    <Suspense fallback={null}>
      <WireframeScene tiltX={0} tiltY={0} />
    </Suspense>
  </div>
);

export default SolutionsFigure;
