import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface SceneProps {
  tiltX?: number;
  tiltY?: number;
}

const PRIMARY = "#00B3E3";

// Stacking-cube loop (recreated from the Dribbble "Isometric Shapes
// Lottie Showreel" — top-left tile).
//
// Three wireframe cubes form a triangular base on the ground plane.
// They never move. A middle cube descends from above and lands at the
// centroid; a top cube follows, landing on top of it — building a small
// 3-tier pyramid. The two upper cubes then rise back up and fade out,
// leaving the 3 bases. Loop.

const CUBE = 1.0;
const GAP = 0.02;
const STEP = CUBE + GAP;

type Vec3 = [number, number, number];

// Triangular base — back-left, back-right, front. (positions chosen so
// the centroid is a clean (cx, 0, cz) for the tower to stack onto.)
const BASE_HOME: Vec3[] = [
  [0, 0, 0],            // back-left
  [STEP, 0, 0],         // back-right
  [STEP / 2, 0, STEP],  // front-center
];

// Tower position (above the centroid of the base triangle).
const CX = (BASE_HOME[0][0] + BASE_HOME[1][0] + BASE_HOME[2][0]) / 3;
const CZ = (BASE_HOME[0][2] + BASE_HOME[1][2] + BASE_HOME[2][2]) / 3;

const MID_HOME: Vec3 = [CX, STEP, CZ];
const TOP_HOME: Vec3 = [CX, STEP * 2, CZ];

const RISE_Y = 3.6; // where the upper cubes wait when invisible

// ---------- Loop timing (seconds) ----------
// Phase A: mid descends → top descends (staggered) → hold full pyramid
// Phase B: top rises & fades → mid rises & fades (staggered) → hold bases
const MID_FALL_START = 0.0;
const MID_FALL_END   = 0.7;
const TOP_FALL_START = 0.45;
const TOP_FALL_END   = 1.15;
const HOLD_FULL_END  = 1.65;
const TOP_RISE_START = 1.65;
const TOP_RISE_END   = 2.25;
const MID_RISE_START = 1.95;
const MID_RISE_END   = 2.55;
const HOLD_BASE_END  = 3.05;
const LOOP = HOLD_BASE_END;

const ease = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp01 = (x: number) => Math.max(0, Math.min(1, x));

// Returns { y, opacity } for a stacker cube given its phase windows.
function cubePhase(
  local: number,
  fallStart: number,
  fallEnd: number,
  riseStart: number,
  riseEnd: number,
  homeY: number,
) {
  if (local < fallStart) {
    return { y: RISE_Y, opacity: 0 };
  }
  if (local < fallEnd) {
    const p = ease((local - fallStart) / (fallEnd - fallStart));
    return {
      y: lerp(RISE_Y, homeY, p),
      opacity: clamp01(p * 1.6),
    };
  }
  if (local < riseStart) {
    return { y: homeY, opacity: 1 };
  }
  if (local < riseEnd) {
    const p = ease((local - riseStart) / (riseEnd - riseStart));
    return {
      y: lerp(homeY, RISE_Y, p),
      opacity: clamp01((1 - p) * 1.6),
    };
  }
  return { y: RISE_Y, opacity: 0 };
}

const StackingCube = ({ tiltX = 0, tiltY = 0 }: SceneProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const midRef = useRef<THREE.Group>(null);
  const topRef = useRef<THREE.Group>(null);
  const midMatRef = useRef<THREE.LineBasicMaterial>(null);
  const topMatRef = useRef<THREE.LineBasicMaterial>(null);

  const edges = useMemo(
    () => new THREE.EdgesGeometry(new THREE.BoxGeometry(CUBE, CUBE, CUBE)),
    [],
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = 0.62 + tiltX * 0.1;
      groupRef.current.rotation.x = -0.5 + tiltY * 0.06;
    }

    const local = t % LOOP;

    const mid = cubePhase(
      local,
      MID_FALL_START,
      MID_FALL_END,
      MID_RISE_START,
      MID_RISE_END,
      MID_HOME[1],
    );
    const top = cubePhase(
      local,
      TOP_FALL_START,
      TOP_FALL_END,
      TOP_RISE_START,
      TOP_RISE_END,
      TOP_HOME[1],
    );

    if (midRef.current) midRef.current.position.set(MID_HOME[0], mid.y, MID_HOME[2]);
    if (midMatRef.current) midMatRef.current.opacity = mid.opacity;
    if (topRef.current) topRef.current.position.set(TOP_HOME[0], top.y, TOP_HOME[2]);
    if (topMatRef.current) topMatRef.current.opacity = top.opacity;
  });

  return (
    <group
      ref={groupRef}
      rotation={[-0.5, 0.62, 0]}
      position={[-(CX), -STEP * 0.6, -(CZ)]}
    >
      {/* Three static base cubes */}
      {BASE_HOME.map((pos, i) => (
        <group key={i} position={pos}>
          <lineSegments>
            <primitive object={edges} attach="geometry" />
            <lineBasicMaterial color={PRIMARY} transparent opacity={0.95} depthWrite={false} />
          </lineSegments>
        </group>
      ))}

      {/* Mid cube */}
      <group ref={midRef} position={MID_HOME}>
        <lineSegments>
          <primitive object={edges} attach="geometry" />
          <lineBasicMaterial ref={midMatRef} color={PRIMARY} transparent opacity={0} depthWrite={false} />
        </lineSegments>
      </group>

      {/* Top cube */}
      <group ref={topRef} position={TOP_HOME}>
        <lineSegments>
          <primitive object={edges} attach="geometry" />
          <lineBasicMaterial ref={topMatRef} color={PRIMARY} transparent opacity={0} depthWrite={false} />
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
      camera={{ position: [4.5, 4.0, 5.5], fov: 32 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: "transparent" }}
      frameloop={reduced ? "demand" : "always"}
    >
      <StackingCube tiltX={tiltX} tiltY={tiltY} />
    </Canvas>
  );
};

export default IndustryStackingCubeScene;
