import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Grid } from "@react-three/drei";
import * as THREE from "three";

interface Props {
  tiltX: number; // -1..1
  tiltY: number; // -1..1
}

const TILT_AMOUNT = 0.12;

const FloorRig = ({ tiltX, tiltY }: Props) => {
  const group = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    const targetY = tiltX * TILT_AMOUNT;
    const targetX = tiltY * TILT_AMOUNT;
    g.rotation.y += (targetY - g.rotation.y) * Math.min(1, delta * 3);
    g.rotation.x += (targetX - g.rotation.x) * Math.min(1, delta * 3);
  });

  return (
    <group ref={group}>
      {/* Grid lies on XZ plane by default; camera tilt creates the perspective. */}
      <Grid
        args={[200, 200]}
        position={[0, 0, 0]}
        cellSize={0.6}
        cellThickness={1}
        cellColor="#56565A"
        sectionSize={3}
        sectionThickness={1.5}
        sectionColor="#56565A"
        fadeDistance={45}
        fadeStrength={1.5}
        fadeFrom={0}
        infiniteGrid
        followCamera={false}
      />
    </group>
  );
};

/**
 * Three.js / r3f scene for the Industries hero backdrop.
 * A perspective grid floor receding into the horizon. Brand colours only.
 */
export const IndustryFloorScene = ({ tiltX, tiltY }: Props) => (
  <Canvas
    dpr={[1, 1.5]}
    gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
    camera={{ position: [0, 2.2, 6], fov: 60 }}
    onCreated={({ camera }) => camera.lookAt(0, 0, -8)}
    style={{ background: "transparent", width: "100%", height: "100%" }}
  >
    <FloorRig tiltX={tiltX} tiltY={tiltY} />
  </Canvas>
);

export default IndustryFloorScene;
