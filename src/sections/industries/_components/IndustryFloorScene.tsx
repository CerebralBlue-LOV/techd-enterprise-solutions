import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Grid } from "@react-three/drei";
import * as THREE from "three";

interface Props {
  tiltX: number; // -1..1
  tiltY: number; // -1..1
}

const TILT_AMOUNT = 0.08;

const FloorRig = ({ tiltX, tiltY }: Props) => {
  const group = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    // Smoothly drift the floor toward the cursor target.
    const targetY = tiltX * TILT_AMOUNT;
    const targetX = -0.85 + tiltY * TILT_AMOUNT;
    g.rotation.y += (targetY - g.rotation.y) * Math.min(1, delta * 3);
    g.rotation.x += (targetX - g.rotation.x) * Math.min(1, delta * 3);
  });

  return (
    <group ref={group} rotation={[-0.85, 0, 0]} position={[0, -0.6, 0]}>
      <Grid
        args={[120, 120]}
        cellSize={0.5}
        cellThickness={0.6}
        cellColor="#A7A5A8"
        sectionSize={2.5}
        sectionThickness={1}
        sectionColor="#00B3E3"
        fadeDistance={28}
        fadeStrength={1.2}
        infiniteGrid
        followCamera={false}
      />
    </group>
  );
};

/**
 * Three.js / r3f scene for the Industries hero backdrop.
 * A perspective grid floor, tilted to recede into the horizon.
 * Brand colours only.
 */
export const IndustryFloorScene = ({ tiltX, tiltY }: Props) => (
  <Canvas
    dpr={[1, 1.5]}
    gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
    camera={{ position: [0, 1.6, 4.5], fov: 55 }}
    style={{ background: "transparent" }}
  >
    <FloorRig tiltX={tiltX} tiltY={tiltY} />
  </Canvas>
);

export default IndustryFloorScene;
