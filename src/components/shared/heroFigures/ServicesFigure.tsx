import { Suspense, lazy } from "react";
import { useIsMobile } from "@hooks/use-mobile";
import HeroFigureFallback from "./HeroFigureFallback";

const IsoCubeScene = lazy(
  () => import("@/sections/services/_components/ServiceIsoCubeScene"),
);

/**
 * ServicesFigure — interlocking wireframe rings. Mobile users get a
 * static cyan glow instead of the three.js scene.
 */
export const ServicesFigure = () => {
  const isMobile = useIsMobile();
  return (
    <div className="absolute inset-0">
      {isMobile ? (
        <HeroFigureFallback />
      ) : (
        <Suspense fallback={<HeroFigureFallback />}>
          <IsoCubeScene tiltX={0} tiltY={0} />
        </Suspense>
      )}
    </div>
  );
};

export default ServicesFigure;
