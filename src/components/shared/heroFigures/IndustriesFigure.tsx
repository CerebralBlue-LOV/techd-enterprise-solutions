import { Suspense, lazy } from "react";
import { useIsMobile } from "@hooks/use-mobile";
import HeroFigureFallback from "./HeroFigureFallback";

const StackingCubeScene = lazy(
  () => import("@/sections/industries/_components/IndustryStackingCubeScene"),
);

/**
 * IndustriesFigure — isometric wireframe nested cubes. Mobile users
 * get a static cyan glow instead of the three.js scene.
 */
export const IndustriesFigure = () => {
  const isMobile = useIsMobile();
  return (
    <div className="absolute inset-0">
      {isMobile ? (
        <HeroFigureFallback />
      ) : (
        <Suspense fallback={<HeroFigureFallback />}>
          <StackingCubeScene tiltX={0} tiltY={0} />
        </Suspense>
      )}
    </div>
  );
};

export default IndustriesFigure;
