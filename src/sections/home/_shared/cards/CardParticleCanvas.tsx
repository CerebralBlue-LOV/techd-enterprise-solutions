import { Canvas } from "@react-three/fiber";
import { type ReactNode } from "react";

interface Props {
  children: ReactNode;
  cameraZ?: number;
  fov?: number;
}

/**
 * Shared <Canvas> wrapper for solution-card particle scenes.
 * Transparent background, capped DPR, frameloop="always" — caller scenes
 * gate their own animation amplitude with the `active` prop.
 */
export const CardParticleCanvas = ({ children, cameraZ = 5, fov = 45 }: Props) => (
  <div aria-hidden="true" className="absolute inset-0">
    <Canvas
      dpr={[1, 1.25]}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      camera={{ position: [0, 0, cameraZ], fov }}
      style={{ background: "transparent" }}
    >
      {children}
    </Canvas>
  </div>
);

export default CardParticleCanvas;
