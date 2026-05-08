import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface SceneProps {
  tiltX?: number;
  tiltY?: number;
}

const PRIMARY = "#00B3E3";
const OPACITY = 0.55;

// Resources figure — a wireframe stack of bound pages that gently
// opens like a book and closes again, on a slow continuous loop.
// Top-down diagonal (isometric-ish) view.

const PAGE_W = 2.4;            // page width (along X, hinged at x=0)
const PAGE_D = 3.1;            // page depth (along Z, the spine direction)
const SUBDIV_W = 4;
const SUBDIV_D = 5;

const PAGE_COUNT = 7;          // number of pages in the stack
const PAGE_GAP = 0.018;        // vertical spacing between stacked pages
const OPEN_ANGLE = Math.PI * 0.92; // how far each side opens (~166°)

const CYCLE = 11;              // seconds per full open+close cycle
const HOLD = 0.18;             // fraction of cycle held fully open

// Build a subdivided rectangular page hinged at x=0.
// Spans x: 0..PAGE_W, z: -PAGE_D/2..PAGE_D/2.
function buildPageEdges(): THREE.BufferGeometry {
  const pts: number[] = [];
  const dx = PAGE_W / SUBDIV_W;
  const dz = PAGE_D / SUBDIV_D;
  const z0 = -PAGE_D / 2;

  for (let i = 0; i <= SUBDIV_W; i++) {
    const x = i * dx;
    pts.push(x, 0, z0, x, 0, z0 + PAGE_D);
  }
  for (let j = 0; j <= SUBDIV_D; j++) {
    const z = z0 + j * dz;
    pts.push(0, 0, z, PAGE_W, 0, z);
  }

  const geom = new THREE.BufferGeometry();
  geom.setAttribute(
    "position",
    new THREE.BufferAttribute(new Float32Array(pts), 3),
  );
  return geom;
}

// Smooth ease in/out for the open/close breathing motion.
const easeInOut = (t: number) => 0.5 - Math.cos(Math.PI * t) / 2;

// Returns 0..1..0 over the cycle with a hold near the peak.
function breathe(t: number): number {
  const local = (t % CYCLE) / CYCLE; // 0..1
  const rampLen = (1 - HOLD) / 2;
  if (local < rampLen) return easeInOut(local / rampLen);
  if (local < rampLen + HOLD) return 1;
  return easeInOut(1 - (local - rampLen - HOLD) / rampLen);
}

const Book = ({ tiltX = 0, tiltY = 0 }: SceneProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const rightRefs = useRef<(THREE.Group | null)[]>([]);
  const leftRefs = useRef<(THREE.Group | null)[]>([]);

  const pageGeom = useMemo(buildPageEdges, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      // Subtle drift around a fixed top-down diagonal pose.
      groupRef.current.rotation.x = -0.95 + Math.sin(t * 0.12) * 0.03 + tiltY * 0.06;
      groupRef.current.rotation.y = -0.55 + Math.sin(t * 0.15) * 0.05 + tiltX * 0.1;
      groupRef.current.rotation.z = 0;
    }

    const k = breathe(t);
    // Right side opens upward (negative z-rotation lifts +X side toward +Y),
    // left side mirrors it. Pages stagger slightly so the stack fans.
    for (let i = 0; i < PAGE_COUNT; i++) {
      const stagger = (i / Math.max(1, PAGE_COUNT - 1)) * 0.12; // tiny lag
      const a = OPEN_ANGLE * Math.max(0, Math.min(1, k - stagger * (1 - k)));

      const right = rightRefs.current[i];
      const left = leftRefs.current[i];
      if (right) right.rotation.z = -a;
      if (left) left.rotation.z = a;
    }
  });

  // Pages share the same hinged geometry. The "left" page is the same
  // sheet rotated 180° around z so it extends to -X from the spine.
  const pages = Array.from({ length: PAGE_COUNT });

  return (
    <group ref={groupRef} position={[0, 0.1, 0]}>
      {/* Spine — a single line along z at x=0 */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={2}
            array={new Float32Array([0, 0, -PAGE_D / 2, 0, 0, PAGE_D / 2])}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color={PRIMARY}
          transparent
          opacity={OPACITY}
          depthWrite={false}
        />
      </lineSegments>

      {/* Right-side pages, hinged at spine, opening upward */}
      {pages.map((_, i) => (
        <group
          key={`r-${i}`}
          ref={(el) => {
            rightRefs.current[i] = el;
          }}
          position={[0, i * PAGE_GAP, 0]}
        >
          <lineSegments>
            <primitive object={pageGeom} attach="geometry" />
            <lineBasicMaterial
              color={PRIMARY}
              transparent
              opacity={OPACITY}
              depthWrite={false}
            />
          </lineSegments>
        </group>
      ))}

      {/* Left-side pages — same geometry, flipped to -X */}
      {pages.map((_, i) => (
        <group
          key={`l-${i}`}
          ref={(el) => {
            leftRefs.current[i] = el;
          }}
          position={[0, i * PAGE_GAP, 0]}
        >
          <group rotation={[0, 0, Math.PI]}>
            <lineSegments>
              <primitive object={pageGeom} attach="geometry" />
              <lineBasicMaterial
                color={PRIMARY}
                transparent
                opacity={OPACITY}
                depthWrite={false}
              />
            </lineSegments>
          </group>
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
      camera={{ position: [0, 0, 6.4], fov: 42 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: "transparent" }}
      frameloop={reduced ? "demand" : "always"}
    >
      <Book tiltX={tiltX} tiltY={tiltY} />
    </Canvas>
  );
};

export default ResourceTileStackScene;
