import { Suspense, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";

export const PRIMARY = "#00B3E3";
export const HIGHLIGHT = "#7CE6FF";

interface PanelProps {
  children: ReactNode;
  /** Camera Z distance — smaller geometries can pull the camera in. */
  cameraZ?: number;
}

/**
 * Shared <Canvas> wrapper for every per-practice solution figure.
 * Locks camera, DPR, alpha, and reduced-motion behavior so all 5 figures
 * share the same graphic line — only the geometry inside differs.
 */
export const WireframePanel = ({ children, cameraZ = 7 }: PanelProps) => {
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <div className="absolute inset-0">
      <Suspense fallback={null}>
        <Canvas
          dpr={[1, 1.75]}
          camera={{ position: [0, 0, cameraZ], fov: 50 }}
          gl={{ alpha: true, antialias: true }}
          style={{ background: "transparent" }}
          frameloop={reduced ? "demand" : "always"}
        >
          {children}
        </Canvas>
      </Suspense>
    </div>
  );
};

export default WireframePanel;
