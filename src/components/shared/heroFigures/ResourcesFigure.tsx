import { Suspense, lazy } from "react";
import { useIsMobile } from "@hooks/use-mobile";
import HeroFigureFallback from "./HeroFigureFallback";

const TileStackScene = lazy(
  () => import("@/sections/resources/_components/ResourceTileStackScene"),
);

/**
 * ResourcesFigure — wireframe book with flipping pages. Mobile users
 * get a static cyan glow instead of the three.js scene.
 */
export const ResourcesFigure = () => {
  const isMobile = useIsMobile();
  return (
    <div className="absolute inset-0">
      {isMobile ? (
        <HeroFigureFallback />
      ) : (
        <Suspense fallback={<HeroFigureFallback />}>
          <TileStackScene tiltX={0} tiltY={0} />
        </Suspense>
      )}
    </div>
  );
};

export default ResourcesFigure;
