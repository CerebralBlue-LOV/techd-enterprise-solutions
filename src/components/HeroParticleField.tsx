import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const COLS = 56;
const ROWS = 36;
const SPACING = 0.42;
const HIGHLIGHT_COUNT = 14;

/** Builds a flat grid of points (later undulated in useFrame). */
function buildGrid() {
  const positions = new Float32Array(COLS * ROWS * 3);
  let i = 0;
  for (let z = 0; z < ROWS; z++) {
    for (let x = 0; x < COLS; x++) {
      positions[i++] = (x - COLS / 2) * SPACING;
      positions[i++] = 0;
      positions[i++] = (z - ROWS / 2) * SPACING;
    }
  }
  return positions;
}

/** Connect each grid node to its right + down neighbour → a wireframe net. */
function buildLineIndices() {
  const idx: number[] = [];
  for (let z = 0; z < ROWS; z++) {
    for (let x = 0; x < COLS; x++) {
      const i = z * COLS + x;
      if (x < COLS - 1) idx.push(i, i + 1);
      if (z < ROWS - 1) idx.push(i, i + COLS);
    }
  }
  return new Uint16Array(idx);
}

function pickHighlights() {
  const total = COLS * ROWS;
  const set = new Set<number>();
  while (set.size < HIGHLIGHT_COUNT) {
    set.add(Math.floor(Math.random() * total));
  }
  return Array.from(set);
}

const Field = ({ animate }: { animate: boolean }) => {
  const basePositions = useMemo(() => buildGrid(), []);
  const lineIndices = useMemo(() => buildLineIndices(), []);
  const highlightIdx = useMemo(() => pickHighlights(), []);

  const livePositions = useMemo(
    () => new Float32Array(basePositions),
    [basePositions],
  );

  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const highlightsRef = useRef<THREE.Points>(null);
  const groupRef = useRef<THREE.Group>(null);

  // Initial undulation so the static (reduced-motion) view is also alive.
  useMemo(() => {
    for (let i = 0; i < livePositions.length; i += 3) {
      const x = livePositions[i];
      const z = livePositions[i + 2];
      livePositions[i + 1] =
        Math.sin(x * 0.55) * 0.35 + Math.cos(z * 0.45) * 0.35;
    }
  }, [livePositions]);

  const highlightPositions = useMemo(
    () => new Float32Array(highlightIdx.length * 3),
    [highlightIdx],
  );

  useFrame(({ clock }) => {
    if (!animate) return;
    const t = clock.getElapsedTime();
    for (let i = 0; i < livePositions.length; i += 3) {
      const x = basePositions[i];
      const z = basePositions[i + 2];
      livePositions[i + 1] =
        Math.sin(x * 0.55 + t * 0.45) * 0.35 +
        Math.cos(z * 0.45 + t * 0.35) * 0.35 +
        Math.sin((x + z) * 0.2 + t * 0.6) * 0.12;
    }

    if (pointsRef.current) {
      const attr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
      attr.array = livePositions;
      attr.needsUpdate = true;
    }
    if (linesRef.current) {
      const attr = linesRef.current.geometry.attributes.position as THREE.BufferAttribute;
      attr.array = livePositions;
      attr.needsUpdate = true;
    }

    // Sync highlight node positions from livePositions.
    for (let h = 0; h < highlightIdx.length; h++) {
      const src = highlightIdx[h] * 3;
      highlightPositions[h * 3] = livePositions[src];
      highlightPositions[h * 3 + 1] = livePositions[src + 1] + 0.05;
      highlightPositions[h * 3 + 2] = livePositions[src + 2];
    }
    if (highlightsRef.current) {
      const attr = highlightsRef.current.geometry.attributes.position as THREE.BufferAttribute;
      attr.array = highlightPositions;
      attr.needsUpdate = true;
      const mat = highlightsRef.current.material as THREE.PointsMaterial;
      mat.opacity = 0.7 + Math.sin(t * 1.5) * 0.25;
    }

    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.08) * 0.15;
    }
  });

  // Seed highlight buffer once for the static case.
  useMemo(() => {
    for (let h = 0; h < highlightIdx.length; h++) {
      const src = highlightIdx[h] * 3;
      highlightPositions[h * 3] = livePositions[src];
      highlightPositions[h * 3 + 1] = livePositions[src + 1] + 0.05;
      highlightPositions[h * 3 + 2] = livePositions[src + 2];
    }
  }, [highlightIdx, highlightPositions, livePositions]);

  return (
    <group ref={groupRef} rotation={[-0.55, 0, 0]} position={[0, -1.2, 0]}>
      {/* Wireframe net */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[livePositions, 3]}
          />
          <bufferAttribute attach="index" args={[lineIndices, 1]} />
        </bufferGeometry>
        <lineBasicMaterial
          color="#00B3E3"
          transparent
          opacity={0.18}
          depthWrite={false}
        />
      </lineSegments>

      {/* Particle nodes */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[livePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#00B3E3"
          size={0.05}
          sizeAttenuation
          transparent
          opacity={0.65}
          depthWrite={false}
        />
      </points>

      {/* Highlight glowing nodes */}
      <points ref={highlightsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[highlightPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#7CE6FF"
          size={0.18}
          sizeAttenuation
          transparent
          opacity={0.9}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
};

export const HeroParticleField = () => {
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 right-0 hidden md:block md:w-[62%] lg:w-[58%]"
    >
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 4.5, 8], fov: 42 }}
        frameloop={reduced ? "demand" : "always"}
      >
        <Field animate={!reduced} />
      </Canvas>
      {/* Edge fades so the canvas dissolves into the page */}
      <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-background to-transparent" />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
};

export default HeroParticleField;
