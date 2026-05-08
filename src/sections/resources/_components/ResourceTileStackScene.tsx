import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface SceneProps {
  tiltX?: number;
  tiltY?: number;
}

const PRIMARY = "#00B3E3";

// Resources figure — open wireframe book with pages fanning from
// right to left, one at a time, then resetting. Monoline cyan.

const PAGE_W = 2.4;          // page width (along X, hinged at x=0)
const PAGE_D = 3.1;          // page depth (along Z, the spine direction)
const PAGE_SUBDIV_W = 4;
const PAGE_SUBDIV_D = 5;

const PAGE_COUNT = 6;
const FLIP_DUR = 4.0;        // seconds per page flip (slowed)
const STAGGER = 2.0;         // delay between successive flips (slowed)
const HOLD = 3.0;            // pause after all flipped (slowed)
const LOOP = STAGGER * (PAGE_COUNT - 1) + FLIP_DUR + HOLD;

// Build a subdivided rectangular page (hinged at x=0).
// Rectangle spans x: 0..PAGE_W, z: -PAGE_D/2..PAGE_D/2, y=0.
function buildPageEdges(): THREE.BufferGeometry {
  const pts: number[] = [];
  const dx = PAGE_W / PAGE_SUBDIV_W;
  const dz = PAGE_D / PAGE_SUBDIV_D;
  const z0 = -PAGE_D / 2;

  // vertical lines (constant x)
  for (let i = 0; i <= PAGE_SUBDIV_W; i++) {
    const x = i * dx;
    pts.push(x, 0, z0, x, 0, z0 + PAGE_D);
  }
  // horizontal lines (constant z)
  for (let j = 0; j <= PAGE_SUBDIV_D; j++) {
    const z = z0 + j * dz;
    pts.push(0, 0, z, PAGE_W, 0, z);
  }

  const geom = new THREE.BufferGeometry();
  geom.setAttribute("position", new THREE.BufferAttribute(new Float32Array(pts), 3));
  return geom;
}

const ease = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

// Returns the rotation around z-axis for page i at loop-local time `local`.
// Pages start lying flat on the right (rotation = 0) and flip to the left
// (rotation = +PI). After HOLD pause, the loop restarts.
function pageRotation(local: number, i: number): number {
  const start = i * STAGGER;
  if (local < start) return 0;
  if (local < start + FLIP_DUR) {
    const p = ease((local - start) / FLIP_DUR);
    return Math.PI * p;
  }
  return Math.PI;
}

const Book = ({ tiltX = 0, tiltY = 0 }: SceneProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const pageRefs = useRef<(THREE.Group | null)[]>([]);

  const pageGeom = useMemo(buildPageEdges, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      // Slight slow drift, matching solutions speed.
      groupRef.current.rotation.y = Math.sin(t * 0.15) * 0.08 + tiltX * 0.15;
      groupRef.current.rotation.x = -0.55 + Math.sin(t * 0.12) * 0.04 + tiltY * 0.08;
    }

    const local = t % LOOP;
    for (let i = 0; i < PAGE_COUNT; i++) {
      const ref = pageRefs.current[i];
      if (!ref) continue;
      // tiny per-page z-offset so stacked pages don't z-fight
      const flat = pageRotation(local, i);
      ref.rotation.z = flat;
      // small lift while mid-flip so it arcs slightly above the spine
      const mid = Math.sin((flat / Math.PI) * Math.PI); // 0..1..0
      ref.position.y = mid * 0.05;
    }
  });

  return (
    <group ref={groupRef} rotation={[-0.95, -0.6, 0]} position={[0, 0.6, 0]}>
      {/* Left cover/base — pages that have already been flipped land on
          this side. Rendered flat at rotation = PI (mirrored on -X). */}
      <group rotation={[0, 0, Math.PI]}>
        <lineSegments>
          <primitive object={pageGeom} attach="geometry" />
          <lineBasicMaterial color={PRIMARY} transparent opacity={0.55} depthWrite={false} />
        </lineSegments>
      </group>

      {/* Right base — base sheet on the right side. */}
      <lineSegments>
        <primitive object={pageGeom} attach="geometry" />
        <lineBasicMaterial color={PRIMARY} transparent opacity={0.55} depthWrite={false} />
      </lineSegments>

      {/* Spine — vertical line along z at x=0 */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={2}
            array={new Float32Array([0, 0, -PAGE_D / 2, 0, 0, PAGE_D / 2])}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color={PRIMARY} transparent opacity={0.55} depthWrite={false} />
      </lineSegments>

      {/* Flipping pages — hinged at x=0, rotated around z to swing left */}
      {Array.from({ length: PAGE_COUNT }).map((_, i) => (
        <group
          key={i}
          ref={(el) => {
            pageRefs.current[i] = el;
          }}
          position={[0, 0.001 + i * 0.002, 0]}
        >
          <lineSegments>
            <primitive object={pageGeom} attach="geometry" />
            <lineBasicMaterial color={PRIMARY} transparent opacity={0.55} depthWrite={false} />
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
