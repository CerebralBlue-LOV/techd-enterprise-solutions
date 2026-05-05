import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const POINT_COUNT = 1500;
const HIGHLIGHT_COUNT = 22;
const RADIUS = 1.6;

/** Fibonacci sphere — even point distribution. */
function buildSphere(count: number, radius: number) {
  const positions = new Float32Array(count * 3);
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2; // -1..1
    const r = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;
    positions[i * 3] = Math.cos(theta) * r * radius;
    positions[i * 3 + 1] = y * radius;
    positions[i * 3 + 2] = Math.sin(theta) * r * radius;
  }
  return positions;
}

function pickHighlightIndices() {
  const set = new Set<number>();
  while (set.size < HIGHLIGHT_COUNT) {
    set.add(Math.floor(Math.random() * POINT_COUNT));
  }
  return Array.from(set);
}

const Globe = ({ animate }: { animate: boolean }) => {
  const positions = useMemo(() => buildSphere(POINT_COUNT, RADIUS), []);
  const highlightIdx = useMemo(() => pickHighlightIndices(), []);
  const highlightPositions = useMemo(() => {
    const arr = new Float32Array(highlightIdx.length * 3);
    for (let i = 0; i < highlightIdx.length; i++) {
      const src = highlightIdx[i] * 3;
      arr[i * 3] = positions[src] * 1.02;
      arr[i * 3 + 1] = positions[src + 1] * 1.02;
      arr[i * 3 + 2] = positions[src + 2] * 1.02;
    }
    return arr;
  }, [highlightIdx, positions]);

  const groupRef = useRef<THREE.Group>(null);
  const highlightsRef = useRef<THREE.Points>(null);

  useFrame(({ clock }) => {
    if (!animate) return;
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.08;
      groupRef.current.rotation.x = Math.sin(t * 0.15) * 0.12;
    }
    if (highlightsRef.current) {
      const mat = highlightsRef.current.material as THREE.PointsMaterial;
      mat.opacity = 0.65 + Math.sin(t * 1.4) * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Faint wireframe shell */}
      <lineSegments>
        <wireframeGeometry args={[new THREE.IcosahedronGeometry(RADIUS, 3)]} />
        <lineBasicMaterial
          color="#00B3E3"
          transparent
          opacity={0.12}
          depthWrite={false}
        />
      </lineSegments>

      {/* Main point cloud */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#00B3E3"
          size={0.035}
          sizeAttenuation
          transparent
          opacity={0.7}
          depthWrite={false}
        />
      </points>

      {/* Glowing highlight nodes */}
      <points ref={highlightsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[highlightPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#7CE6FF"
          size={0.14}
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

export const ParticleGlobe = () => {
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/3 hidden md:block w-[760px] h-[760px] lg:w-[920px] lg:h-[920px] opacity-100 z-0"
    >
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 5], fov: 45 }}
        frameloop={reduced ? "demand" : "always"}
      >
        <Globe animate={!reduced} />
      </Canvas>
      {/* Right-edge fade so it dissolves into the grid before reaching cards */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 70% at 30% 50%, transparent 0%, transparent 40%, hsl(var(--background) / 0.7) 80%, hsl(var(--background)) 100%)",
        }}
      />
    </div>
  );
};

export default ParticleGlobe;
