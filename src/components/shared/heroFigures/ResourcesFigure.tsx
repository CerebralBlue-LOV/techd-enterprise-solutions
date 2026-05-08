import { Suspense, lazy } from "react";

const TileStackScene = lazy(
  () => import("@/sections/resources/_components/ResourceTileStackScene"),
);

/**
 * ResourcesFigure — isometric stack of thin wireframe tiles (a deck of
 * documents / layered knowledge). Tiles lift sequentially in a slow
 * top-down wave: each rises, hovers, settles back. Continuous loop.
 */
export const ResourcesFigure = () => (
  <div className="absolute inset-0">
    <Suspense fallback={null}>
      <TileStackScene tiltX={0} tiltY={0} />
    </Suspense>
  </div>
);

export default ResourcesFigure;
