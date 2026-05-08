import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface SceneProps {
  tiltX?: number;
  tiltY?: number;
}

const PRIMARY = "#00B3E3";
const HIGHLIGHT = "#7CE6FF";

const RING_COUNT = 6;
const RING_GAP = 0.55;       // vertical distance between rings
const RING_SEGMENTS = 96;    // smoothness of each ring
const TUBE_RADIUS = 0.04;    // thickness of each ring

/** Radius profile — bell-shaped (smaller at top/bottom, widest in the middle) */
function ringRadius(i: number, total: number) {
  const t = i / (total - 1);             // 0..1
  const bell = Math.sin(t * Math.PI);    // 0..1..0
  return 1.1 + bell * 1.5;               // 1.1..2.6..1.1
}

const Tower = ({ tiltX = 0, tiltY = 0 }: SceneProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const ringRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.18 + tiltX * 0.2;
      groupRef.current.rotation.x = -0.12 + Math.sin(t * 0.1) * 0.06 + tiltY * 0.1;
    }
    // Each ring counter-rotates slightly so the tower feels alive.
    ringRefs.current.forEach((m, i) => {
      if (!m) return;
      m.rotation.z = t * (0.05 + i * 0.015) * (i % 2 === 0 ? 1 : -1);
    });
  });

  const rings = Array.from({ length: RING_COUNT });

  return (
    <group ref={groupRef}>
      {/* Stacked horizontal cyan rings */}
      {rings.map((_, i) => {
        const y = (i - (RING_COUNT - 1) / 2) * RING_GAP;
        const r = ringRadius(i, RING_COUNT);
        return (
          <mesh
            key={i}
            ref={(m) => (ringRefs.current[i] = m)}
            position={[0, y, 0]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <torusGeometry args={[r, TUBE_RADIUS, 8, RING_SEGMENTS]} />
            <meshBasicMaterial
              color={PRIMARY}
              transparent
              opacity={0.65}
              depthWrite={false}
            />
          </mesh>
        );
      })}

      {/* Vertex/anchor dots at the start of each ring — subtle highlight */}
      {rings.map((_, i) => {
        const y = (i - (RING_COUNT - 1) / 2) * RING_GAP;
        const r = ringRadius(i, RING_COUNT);
        return (
          <mesh key={`dot-${i}`} position={[r, y, 0]}>
            <sphereGeometry args={[0.06, 12, 12]} />
            <meshBasicMaterial
              color={HIGHLIGHT}
              transparent
              opacity={0.95}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        );
      })}

      {/* Soft inner glow column */}
      <mesh>
        <cylinderGeometry args={[0.18, 0.18, RING_COUNT * RING_GAP, 16, 1, true]} />
        <meshBasicMaterial
          color={HIGHLIGHT}
          transparent
          opacity={0.18}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};

export const IndustryRingsScene = ({ tiltX, tiltY }: SceneProps) => {
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.4, 7], fov: 50 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: "transparent" }}
      frameloop={reduced ? "demand" : "always"}
    >
      <Tower tiltX={tiltX} tiltY={tiltY} />
    </Canvas>
  );
};

export default IndustryRingsScene;
