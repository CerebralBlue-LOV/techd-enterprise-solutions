import { Suspense, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { useInView } from "@hooks/useInView";
import HeroFigureFallback from "@shared/heroFigures/HeroFigureFallback";

export const PRIMARY = "#00B3E3";
export const HIGHLIGHT = "#7CE6FF";

interface PanelProps {
  children: ReactNode;
  /** Camera Z distance — smaller geometries can pull the camera in. */
  cameraZ?: number;
}

/**
 * Shared <Canvas> wrapper for every per-practice solution figure.
 * Locks camera, DPR, alpha, and reduced-motion behavior so all figures
 * share the same graphic line — only the geometry inside differs.
 *
 * Pauses the render loop when the figure scrolls out of view via
 * IntersectionObserver, and respects `prefers-reduced-motion`.
 */
export const WireframePanel = ({ children, cameraZ = 7 }: PanelProps) => {
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const { ref, inView } = useInView<HTMLDivElement>("200px");
  const animate = inView && !reduced;

  return (
    <div ref={ref} className="absolute inset-0">
      <Suspense fallback={<HeroFigureFallback />}>
        <Canvas
          dpr={[1, 1.75]}
          camera={{ position: [0, 0, cameraZ], fov: 50 }}
          gl={{ alpha: true, antialias: true }}
          style={{ background: "transparent" }}
          frameloop={animate ? "always" : "demand"}
        >
          {children}
        </Canvas>
      </Suspense>
    </div>
  );
};

export default WireframePanel;
