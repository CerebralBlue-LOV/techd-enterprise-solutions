import { Suspense, lazy } from "react";
import { useIsMobile } from "@hooks/use-mobile";
import HeroFigureFallback from "./HeroFigureFallback";

const WireframeScene = lazy(
  () => import("@/sections/solutions/_components/PracticeWireframeScene"),
);

/**
 * SolutionsFigure — wireframe icosahedron used on /solutions/* hero
 * backdrops. Mobile users get a static cyan glow.
 */
export const SolutionsFigure = () => {
  const isMobile = useIsMobile();
  return (
    <div className="absolute inset-0">
      {isMobile ? (
        <HeroFigureFallback />
      ) : (
        <Suspense fallback={<HeroFigureFallback />}>
          <WireframeScene tiltX={0} tiltY={0} />
        </Suspense>
      )}
    </div>
  );
};

export default SolutionsFigure;
