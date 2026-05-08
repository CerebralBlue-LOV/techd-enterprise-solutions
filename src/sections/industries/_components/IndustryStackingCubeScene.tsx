import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface SceneProps {
  tiltX?: number;
  tiltY?: number;
}

const PRIMARY = "#00B3E3";

// Stacking-cube loop, recreated from the Dribbble "Isometric Shapes
// Lottie Showreel" reference (top-left tile).
//
// Layout: three wireframe cubes form a flat L on the ground plane —
// one back, one front-left, one front-right. A fourth cube descends
// onto the back cube and the three bases slide inward to assemble.
// Then the bases slide outward and the top cube rises and fades out.
// The whole sequence loops.

const CUBE = 1.0;
const GAP = 0.02;
const STEP = CUBE + GAP;

// Three flat-L base cubes. The "back" cube is the one that gets stacked on.
type Vec3 = [number, number, number];
const BASE_HOME: Vec3[] = [
  [0, 0, 0],          // back  (stack target sits at y = STEP above this)
  [STEP, 0, 0],       // front-right
  [0, 0, STEP],       // front-left
];
// Outward offset (where each base slides to in the "exploded" pose).
// Direction = home position - cluster centroid, normalized then scaled.
const EXPLODE_DIST = 0.55;
const centroid: Vec3 = [
  (BASE_HOME[0][0] + BASE_HOME[1][0] + BASE_HOME[2][0]) / 3,
  0,
  (BASE_HOME[0][2] + BASE_HOME[1][2] + BASE_HOME[2][2]) / 3,
];
const BASE_OFFSETS: Vec3[] = BASE_HOME.map((p) => {
  const dx = p[0] - centroid[0];
  const dz = p[2] - centroid[2];
  const len = Math.hypot(dx, dz) || 1;
  return [(dx / len) * EXPLODE_DIST, 0, (dz / len) * EXPLODE_DIST];
});

// Top (stacked) cube: home is on top of the back cube.
const TOP_HOME: Vec3 = [BASE_HOME[0][0], STEP, BASE_HOME[0][2]];
const TOP_RISE_Y = STEP + 1.4; // where it rises to before fading out

// ---------- Loop timing (seconds) ----------
const ASSEMBLE = 0.85;  // bases slide inward + top descends (4-cube state)
const HOLD_4   = 0.35;  // pause assembled
const EXPLODE  = 0.85;  // bases slide outward + top rises & fades
const HOLD_3   = 0.35;  // pause exploded (only 3 bases visible)
const LOOP = ASSEMBLE + HOLD_4 + EXPLODE + HOLD_3;

// Easing — smooth in/out
const ease = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const StackingCube = ({ tiltX = 0, tiltY = 0 }: SceneProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const baseRefs = useRef<(THREE.Group | null)[]>([]);
  const topRef = useRef<THREE.Group>(null);
  const topMatRef = useRef<THREE.LineBasicMaterial>(null);

  const edges = useMemo(
    () => new THREE.EdgesGeometry(new THREE.BoxGeometry(CUBE, CUBE, CUBE)),
    [],
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      // Steady isometric framing; almost no rotation.
      groupRef.current.rotation.y = 0.6 + tiltX * 0.1;
      groupRef.current.rotation.x = -0.45 + tiltY * 0.06;
    }

    const local = t % LOOP;

    // Compute "spread" parameter (0 = assembled cluster, 1 = exploded outward)
    // and "topPresence" (0 = top cube hidden up high & faded, 1 = top cube seated).
    let spread: number;
    let topPresence: number;

    if (local < ASSEMBLE) {
      const p = ease(local / ASSEMBLE);
      spread = 1 - p;       // 1 → 0
      topPresence = p;      // 0 → 1
    } else if (local < ASSEMBLE + HOLD_4) {
      spread = 0;
      topPresence = 1;
    } else if (local < ASSEMBLE + HOLD_4 + EXPLODE) {
      const p = ease((local - ASSEMBLE - HOLD_4) / EXPLODE);
      spread = p;           // 0 → 1
      topPresence = 1 - p;  // 1 → 0
    } else {
      spread = 1;
      topPresence = 0;
    }

    // Apply to bases
    baseRefs.current.forEach((g, i) => {
      if (!g) return;
      const home = BASE_HOME[i];
      const off = BASE_OFFSETS[i];
      g.position.set(
        home[0] + off[0] * spread,
        home[1] + off[1] * spread,
        home[2] + off[2] * spread,
      );
    });

    // Apply to top cube
    if (topRef.current) {
      const y = lerp(TOP_RISE_Y, TOP_HOME[1], topPresence);
      topRef.current.position.set(TOP_HOME[0], y, TOP_HOME[2]);
    }
    if (topMatRef.current) {
      // Fade in/out near the extremes for a softer entrance/exit
      topMatRef.current.opacity = Math.min(1, topPresence * 1.4);
    }
  });

  return (
    <group ref={groupRef} rotation={[-0.45, 0.6, 0]} position={[-STEP / 2, -STEP / 2, -STEP / 2]}>
      {/* Three base cubes */}
      {BASE_HOME.map((pos, i) => (
        <group key={i} position={pos} ref={(g) => (baseRefs.current[i] = g)}>
          <lineSegments>
            <primitive object={edges} attach="geometry" />
            <lineBasicMaterial
              color={PRIMARY}
              transparent
              opacity={0.95}
              depthWrite={false}
            />
          </lineSegments>
        </group>
      ))}

      {/* Top stacked cube */}
      <group ref={topRef} position={TOP_HOME}>
        <lineSegments>
          <primitive object={edges} attach="geometry" />
          <lineBasicMaterial
            ref={topMatRef}
            color={PRIMARY}
            transparent
            opacity={1}
            depthWrite={false}
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
      camera={{ position: [4.5, 3.8, 5.5], fov: 34 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: "transparent" }}
      frameloop={reduced ? "demand" : "always"}
    >
      <StackingCube tiltX={tiltX} tiltY={tiltY} />
    </Canvas>
  );
};

export default IndustryStackingCubeScene;
