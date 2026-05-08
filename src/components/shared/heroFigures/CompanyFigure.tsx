import { Suspense, lazy } from "react";

const DnaScene = lazy(
  () => import("@/sections/company/_components/CompanyDnaScene"),
);

/**
 * CompanyFigure — DNA double helix in wireframe lines (matches the rest
 * of the figure system: brand cyan, transparent background, slow
 * continuous motion). Two helical strands with rungs connecting them,
 * rotating around the vertical axis.
 */
export const CompanyFigure = () => (
  <div className="absolute inset-0">
    <Suspense fallback={null}>
      <DnaScene tiltX={0} tiltY={0} />
    </Suspense>
  </div>
);

export default CompanyFigure;
