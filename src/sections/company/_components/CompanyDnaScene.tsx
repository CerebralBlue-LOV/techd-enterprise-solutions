import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface SceneProps {
  tiltX?: number;
  tiltY?: number;
}

const PRIMARY = "#00B3E3";

// Company figure — DNA double helix, drawn in the same wireframe-line
// vocabulary as the rest of the figure system. Two helical strands with
// rungs (base pairs) connecting them; the whole helix rotates slowly
// around its vertical axis.

const HEIGHT = 9.0;          // vertical span of the helix (stretched)
const RADIUS = 1.15;         // helix radius (wider)
const TURNS = 2.6;           // full turns over HEIGHT — looser pitch
const STRAND_SEGMENTS = 320; // resolution per strand
const RUNG_COUNT = 22;       // base-pair rungs
const NODE_COUNT = 44;       // nodes along each strand
// Diagonal tilt of the whole helix (radians) — bottom-left to top-right
const DIAGONAL_TILT = -Math.PI / 5;

// Build a strand as a line of points along a helix.
function strandPoints(phaseOffset: number) {
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i <= STRAND_SEGMENTS; i++) {
    const t = i / STRAND_SEGMENTS;        // 0..1 vertically
    const y = -HEIGHT / 2 + t * HEIGHT;
    const angle = t * TURNS * Math.PI * 2 + phaseOffset;
    pts.push(new THREE.Vector3(
      Math.cos(angle) * RADIUS,
      y,
      Math.sin(angle) * RADIUS,
    ));
  }
  return pts;
}

// Sparse points along a strand for "node" dots.
function nodePoints(phaseOffset: number) {
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i < NODE_COUNT; i++) {
    const t = i / (NODE_COUNT - 1);
    const y = -HEIGHT / 2 + t * HEIGHT;
    const angle = t * TURNS * Math.PI * 2 + phaseOffset;
    pts.push(new THREE.Vector3(
      Math.cos(angle) * RADIUS,
      y,
      Math.sin(angle) * RADIUS,
    ));
  }
  return pts;
}

// Rungs connecting strand A (phase 0) to strand B (phase π) at evenly
// spaced heights — drawn as line segments.
function rungPositions() {
  const arr: number[] = [];
  for (let i = 0; i < RUNG_COUNT; i++) {
    // Skip a bit at the very top/bottom so rungs don't sit on the caps
    const t = (i + 0.5) / RUNG_COUNT;
    const y = -HEIGHT / 2 + t * HEIGHT;
    const angle = t * TURNS * Math.PI * 2;
    const ax = Math.cos(angle) * RADIUS;
    const az = Math.sin(angle) * RADIUS;
    const bx = Math.cos(angle + Math.PI) * RADIUS;
    const bz = Math.sin(angle + Math.PI) * RADIUS;
    arr.push(ax, y, az, bx, y, bz);
  }
  return new Float32Array(arr);
}

const Helix = ({ tiltX = 0, tiltY = 0 }: SceneProps) => {
  const groupRef = useRef<THREE.Group>(null);

  const strandA = useMemo(
    () => new THREE.BufferGeometry().setFromPoints(strandPoints(0)),
    [],
  );
  const strandB = useMemo(
    () => new THREE.BufferGeometry().setFromPoints(strandPoints(Math.PI)),
    [],
  );
  const nodesA = useMemo(
    () => new THREE.BufferGeometry().setFromPoints(nodePoints(0)),
    [],
  );
  const nodesB = useMemo(
    () => new THREE.BufferGeometry().setFromPoints(nodePoints(Math.PI)),
    [],
  );
  const rungs = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(rungPositions(), 3));
    return g;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      // Slow continuous rotation around the helix axis (Y)
      groupRef.current.rotation.y = t * 0.35 + tiltX * 0.2;
    }
  });

  return (
    // Outer wrapper applies the diagonal lean; inner group spins around the
    // helix's own (now-tilted) Y axis.
    <group rotation={[0, 0, DIAGONAL_TILT]}>
      <group ref={groupRef}>
      {/* Strand A */}
      <line>
        <primitive object={strandA} attach="geometry" />
        <lineBasicMaterial
          color={PRIMARY}
          transparent
          opacity={0.92}
          depthWrite={false}
        />
      </line>
      {/* Strand B */}
      <line>
        <primitive object={strandB} attach="geometry" />
        <lineBasicMaterial
          color={PRIMARY}
          transparent
          opacity={0.92}
          depthWrite={false}
        />
      </line>
      {/* Rungs */}
      <lineSegments>
        <primitive object={rungs} attach="geometry" />
        <lineBasicMaterial
          color={PRIMARY}
          transparent
          opacity={0.5}
          depthWrite={false}
        />
      </lineSegments>
      {/* Strand nodes */}
      <points>
        <primitive object={nodesA} attach="geometry" />
        <pointsMaterial
          color={PRIMARY}
          size={0.07}
          sizeAttenuation
          transparent
          opacity={0.95}
          depthWrite={false}
        />
      </points>
      <points>
        <primitive object={nodesB} attach="geometry" />
        <pointsMaterial
          color={PRIMARY}
          size={0.07}
          sizeAttenuation
          transparent
          opacity={0.95}
          depthWrite={false}
        />
      </points>
      </group>
    </group>
  );
};

export const CompanyDnaScene = ({ tiltX, tiltY }: SceneProps) => {
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.2, 9.5], fov: 44 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: "transparent" }}
      frameloop={reduced ? "demand" : "always"}
    >
      <Helix tiltX={tiltX} tiltY={tiltY} />
    </Canvas>
  );
};

export default CompanyDnaScene;
