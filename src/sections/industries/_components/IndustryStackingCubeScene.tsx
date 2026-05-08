import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface SceneProps {
  tiltX?: number;
  tiltY?: number;
}

const PRIMARY = "#00B3E3";

// Stacking-cube loop — three wireframe cubes form an L-cluster on the
// "ground"; a fourth cube rises from inside, lands on top, holds, then
// descends back down. Inspired by the Dribbble "Isometric Shapes
// Lottie Showreel" reference (top-left tile).

const CUBE = 1.0;
const GAP = 0.02;
const STEP = CUBE + GAP;

// Three static base cubes — L-shape on the ground plane, plus one
// stacked on the back-left to give the silhouette its character.
const BASE_POSITIONS: [number, number, number][] = [
  [0, 0, 0],          // back-left, ground
  [STEP, 0, 0],       // front-right, ground (in our rotated camera, looks like front)
  [0, STEP, 0],       // back-left, stacked
];
// Where the animated 4th cube lands.
const TARGET: [number, number, number] = [STEP, STEP, 0];

// Loop timing (in seconds)
const RISE = 0.9;     // travel up
const HOLD_TOP = 0.7; // pause at top
const FALL = 0.9;     // travel down
const HOLD_BOTTOM = 0.7;
const LOOP = RISE + HOLD_TOP + FALL + HOLD_BOTTOM;

const RISE_FROM_Y = -1.6;     // starts below the cluster
const RISE_TO_Y = TARGET[1];  // lands on top

// Ease in-out cubic
const ease = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const StackingCube = ({ tiltX = 0, tiltY = 0 }: SceneProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const moverRef = useRef<THREE.Group>(null);
  const moverMatRef = useRef<THREE.LineBasicMaterial>(null);

  const edges = useMemo(
    () => new THREE.EdgesGeometry(new THREE.BoxGeometry(CUBE, CUBE, CUBE)),
    [],
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (groupRef.current) {
      // Hold the isometric vibe; only a whisper of motion.
      groupRef.current.rotation.y = 0.6 + Math.sin(t * 0.18) * 0.05 + tiltX * 0.15;
      groupRef.current.rotation.x = -0.45 + tiltY * 0.06;
    }

    // Phase the loop
    const local = t % LOOP;
    let y = RISE_FROM_Y;
    let opacity = 1;

    if (local < RISE) {
      const p = ease(local / RISE);
      y = RISE_FROM_Y + (RISE_TO_Y - RISE_FROM_Y) * p;
      opacity = Math.min(1, p * 2 + 0.15);
    } else if (local < RISE + HOLD_TOP) {
      y = RISE_TO_Y;
      opacity = 1;
    } else if (local < RISE + HOLD_TOP + FALL) {
      const p = ease((local - RISE - HOLD_TOP) / FALL);
      y = RISE_TO_Y + (RISE_FROM_Y - RISE_TO_Y) * p;
      opacity = Math.max(0.15, 1 - p * 0.85);
    } else {
      y = RISE_FROM_Y;
      opacity = 0.15;
    }

    if (moverRef.current) {
      moverRef.current.position.set(TARGET[0], y, TARGET[2]);
    }
    if (moverMatRef.current) {
      moverMatRef.current.opacity = opacity;
    }
  });

  return (
    <group ref={groupRef} rotation={[-0.45, 0.6, 0]}>
      {/* Static base cluster */}
      {BASE_POSITIONS.map((pos, i) => (
        <group key={i} position={pos}>
          <lineSegments>
            <primitive object={edges} attach="geometry" />
            <lineBasicMaterial
              color={PRIMARY}
              transparent
              opacity={0.92}
              depthWrite={false}
              linewidth={1}
            />
          </lineSegments>
        </group>
      ))}

      {/* Animated 4th cube */}
      <group ref={moverRef} position={TARGET}>
        <lineSegments>
          <primitive object={edges} attach="geometry" />
          <lineBasicMaterial
            ref={moverMatRef}
            color={PRIMARY}
            transparent
            opacity={1}
            depthWrite={false}
            linewidth={1}
          />
        </lineSegments>
      </group>
    </group>
  );
};

export const IndustryStackingCubeScene = ({ tiltX, tiltY }: SceneProps) => {
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [4.5, 3.8, 5.5], fov: 36 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: "transparent" }}
      frameloop={reduced ? "demand" : "always"}
    >
      <StackingCube tiltX={tiltX} tiltY={tiltY} />
    </Canvas>
  );
};

export default IndustryStackingCubeScene;
