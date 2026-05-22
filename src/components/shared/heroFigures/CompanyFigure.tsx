import { Suspense, lazy } from "react";
import { useIsMobile } from "@hooks/use-mobile";
import HeroFigureFallback from "./HeroFigureFallback";

const DnaScene = lazy(
  () => import("@/sections/company/_components/CompanyDnaScene"),
);

/**
 * CompanyFigure — DNA double helix in wireframe lines. Mobile users
 * get a static cyan glow instead of the three.js scene to keep LCP
 * fast and avoid shipping the `three` chunk to phones.
 */
export const CompanyFigure = () => {
  const isMobile = useIsMobile();
  return (
    <div className="absolute inset-0">
      {isMobile ? (
        <HeroFigureFallback />
      ) : (
        <Suspense fallback={<HeroFigureFallback />}>
          <DnaScene tiltX={0} tiltY={0} />
        </Suspense>
      )}
    </div>
  );
};

export default CompanyFigure;
