import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface SceneProps {
  tiltX?: number;
  tiltY?: number;
}

const PRIMARY = "#00B3E3";

const PILLAR_COUNT = 6;
const PILLAR_WIDTH = 0.32;
const PILLAR_GAP = 0.62;
// Heights for each pillar (one per industry) — varied silhouette
const HEIGHTS = [2.4, 3.6, 2.8, 4.0, 3.2, 2.6];

const Pillars = ({ tiltX = 0, tiltY = 0 }: SceneProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const pillarRefs = useRef<(THREE.Group | null)[]>([]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      // Continuous slow Y rotation (like the solutions wireframe)
      groupRef.current.rotation.y = t * 0.15 + tiltX * 0.2;
      groupRef.current.rotation.x = -0.05 + Math.sin(t * 0.1) * 0.06 + tiltY * 0.08;
      // Slow vertical float — top↔bottom drift
      groupRef.current.position.y = Math.sin(t * 0.35) * 0.25;
    }
    pillarRefs.current.forEach((group, i) => {
      if (!group) return;
      group.position.y = Math.sin(t * 0.55 + i * 0.45) * 0.18;
    });
  });

  return (
    <group ref={groupRef}>
      {HEIGHTS.map((h, i) => {
        const x = (i - (PILLAR_COUNT - 1) / 2) * PILLAR_GAP;
        return (
          <group key={i} position={[x, 0, 0]} ref={(group) => (pillarRefs.current[i] = group)}>
            <lineSegments>
              <edgesGeometry args={[new THREE.BoxGeometry(PILLAR_WIDTH, h, PILLAR_WIDTH)]} />
              <lineBasicMaterial
                color={PRIMARY}
                transparent
                opacity={0.82}
                depthWrite={false}
              />
            </lineSegments>
          </group>
        );
      })}
    </group>
  );
};

export const IndustryPillarsScene = ({ tiltX, tiltY }: SceneProps) => {
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.5, 7.5], fov: 50 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: "transparent" }}
      frameloop={reduced ? "demand" : "always"}
    >
      <Pillars tiltX={tiltX} tiltY={tiltY} />
    </Canvas>
  );
};

export default IndustryPillarsScene;
