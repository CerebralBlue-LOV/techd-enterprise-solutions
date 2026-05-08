import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface SceneProps {
  tiltX?: number;
  tiltY?: number;
}

const PRIMARY = "#00B3E3";

// Resources figure — a stack of thin isometric wireframe tiles (a deck of
// documents / layered knowledge). They lift sequentially in a slow
// top-down wave: each card rises a beat, hovers, settles back. Same
// isometric vocabulary as the rest of the figure system.

const TILE_W = 1.6;       // tile X
const TILE_D = 1.6;       // tile Z
const TILE_H = 0.16;      // tile thickness (Y)
const TILE_GAP = 0.04;    // vertical gap between tiles when stacked
const TILE_COUNT = 5;
const STEP = TILE_H + TILE_GAP;

// Rest Y for each tile (bottom tile = 0, top tile = 4 * STEP)
const REST_Y = (i: number) => i * STEP;

const LIFT = 0.7;         // how high a tile rises during its beat
// ---------- Loop timing (seconds) ----------
const PER_TILE = 0.95;    // each tile gets this much of the cycle
const STAGGER = 0.55;     // delay between successive tiles (overlapping)
const LIFT_T = 0.35;      // rise duration
const HOLD_T = 0.25;      // hover duration at top
const FALL_T = 0.35;      // fall duration
const LOOP = STAGGER * TILE_COUNT + 1.0; // a clean pause at the end

const ease = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

// Lift offset for tile i at global time t.
function tileLift(t: number, i: number) {
  // Top tile lifts first (highest index → smallest delay).
  const order = TILE_COUNT - 1 - i;
  const local = (t % LOOP) - order * STAGGER;
  if (local < 0 || local > LIFT_T + HOLD_T + FALL_T) return 0;
  if (local < LIFT_T) return lerp(0, LIFT, ease(local / LIFT_T));
  if (local < LIFT_T + HOLD_T) return LIFT;
  const p = ease((local - LIFT_T - HOLD_T) / FALL_T);
  return lerp(LIFT, 0, p);
}

const Stack = ({ tiltX = 0, tiltY = 0 }: SceneProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const tileRefs = useRef<(THREE.Group | null)[]>([]);

  const edges = useMemo(
    () => new THREE.EdgesGeometry(new THREE.BoxGeometry(TILE_W, TILE_H, TILE_D)),
    [],
  );

  // Center the whole stack vertically
  const centerY = ((TILE_COUNT - 1) * STEP) / 2;

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      // Iconic isometric framing with a whisper of life
      groupRef.current.rotation.y = Math.PI / 4 + Math.sin(t * 0.18) * 0.05 + tiltX * 0.1;
      groupRef.current.rotation.x = -Math.atan(1 / Math.sqrt(2)) + tiltY * 0.06;
    }
    tileRefs.current.forEach((g, i) => {
      if (!g) return;
      g.position.y = REST_Y(i) - centerY + tileLift(t, i);
    });
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: TILE_COUNT }).map((_, i) => (
        <group
          key={i}
          position={[0, REST_Y(i) - centerY, 0]}
          ref={(g) => (tileRefs.current[i] = g)}
        >
          <lineSegments>
            <primitive object={edges} attach="geometry" />
            <lineBasicMaterial
              color={PRIMARY}
              transparent
              // Slight opacity falloff toward the bottom for depth
              opacity={0.55 + 0.4 * (i / (TILE_COUNT - 1))}
              depthWrite={false}
            />
          </lineSegments>
        </group>
      ))}
    </group>
  );
};

export const ResourceTileStackScene = ({ tiltX, tiltY }: SceneProps) => {
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [3.4, 3.0, 3.4], fov: 36 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: "transparent" }}
      frameloop={reduced ? "demand" : "always"}
    >
      <Stack tiltX={tiltX} tiltY={tiltY} />
    </Canvas>
  );
};

export default ResourceTileStackScene;
