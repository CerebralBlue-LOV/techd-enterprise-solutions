import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface SceneProps {
  tiltX?: number;
  tiltY?: number;
}

const PRIMARY = "#00B3E3";
const HIGHLIGHT = "#7CE6FF";

const Wireframe = ({ tiltX = 0, tiltY = 0 }: SceneProps) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.15 + tiltX * 0.2;
      groupRef.current.rotation.x = Math.sin(t * 0.1) * 0.15 + tiltY * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Outer wireframe icosahedron — the hero shape */}
      <lineSegments>
        <edgesGeometry args={[new THREE.IcosahedronGeometry(2.6, 1)]} />
        <lineBasicMaterial
          color={PRIMARY}
          transparent
          opacity={0.55}
          depthWrite={false}
        />
      </lineSegments>

      {/* Vertex points — small additive cyan dots at each corner */}
      <points>
        <icosahedronGeometry args={[2.6, 1]} />
        <pointsMaterial
          color={HIGHLIGHT}
          size={0.09}
          sizeAttenuation
          transparent
          opacity={0.95}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
};

export const PracticeWireframeScene = ({ tiltX, tiltY }: SceneProps) => {
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 7], fov: 50 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: "transparent" }}
      frameloop={reduced ? "demand" : "always"}
    >
      <Wireframe tiltX={tiltX} tiltY={tiltY} />
    </Canvas>
  );
};

export default PracticeWireframeScene;
