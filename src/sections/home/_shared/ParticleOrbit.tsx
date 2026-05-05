import { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";

/**
 * ParticleOrbit — static decorative halo of particles forming an irregular
 * ring with an empty center, scattering outward.
 *
 * Reference: dense ring + outward dust, organic silhouette, hollow core.
 * Static (no rotation, no animation) — purely a visual halo.
 */

const RING_COUNT = 1600;
const SCATTER_COUNT = 1400;
const HIGHLIGHT_COUNT = 90;

// Empty center is enforced by RING_RADIUS — particles never come closer
// than RING_RADIUS minus a small jitter.
const RING_RADIUS = 1.95;

function hash(i: number) {
  const s = Math.sin(i * 12.9898) * 43758.5453;
  return s - Math.floor(s);
}

/** Dense ring with organic warp; tight band, hollow center. */
function buildRing(count: number) {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;

    // Low-frequency warp so the ring isn't a perfect circle.
    const warp =
      Math.sin(angle * 3 + hash(i) * 6.28) * 0.1 +
      Math.cos(angle * 2 + 0.4) * 0.08;

    // Tight jitter around the ring radius — bias OUTWARD to keep center clear.
    const j = (Math.random() + Math.random() - 1) * 0.18;
    const outward = Math.pow(Math.random(), 2) * 0.25; // mostly tiny, sometimes larger
    const r = RING_RADIUS + warp + j + outward;

    positions[i * 3] = Math.cos(angle) * r;
    positions[i * 3 + 1] = Math.sin(angle) * r;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 0.1;
  }
  return positions;
}

/** Outward scatter — falling density into space. Never goes inward. */
function buildScatter(count: number) {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    // Pure outward bias with long tail; keeps the core completely empty.
    const offset = Math.pow(Math.random(), 1.8) * 1.4;
    const r = RING_RADIUS + offset;

    positions[i * 3] = Math.cos(angle) * r;
    positions[i * 3 + 1] = Math.sin(angle) * r;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 0.2;
  }
  return positions;
}

function pickHighlightPositions(source: Float32Array, count: number) {
  const arr = new Float32Array(count * 3);
  const total = source.length / 3;
  for (let i = 0; i < count; i++) {
    const idx = Math.floor(Math.random() * total) * 3;
    arr[i * 3] = source[idx];
    arr[i * 3 + 1] = source[idx + 1];
    arr[i * 3 + 2] = source[idx + 2] + 0.01;
  }
  return arr;
}

const Orbit = () => {
  const ring = useMemo(() => buildRing(RING_COUNT), []);
  const scatter = useMemo(() => buildScatter(SCATTER_COUNT), []);
  const highlights = useMemo(
    () => pickHighlightPositions(ring, HIGHLIGHT_COUNT),
    [ring],
  );

  return (
    <group>
      {/* Dense ring */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[ring, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#00B3E3"
          size={0.06}
          sizeAttenuation
          transparent
          opacity={0.95}
          depthWrite={false}
        />
      </points>

      {/* Outward scatter */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[scatter, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#00B3E3"
          size={0.05}
          sizeAttenuation
          transparent
          opacity={0.55}
          depthWrite={false}
        />
      </points>

      {/* Sparkle highlights */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[highlights, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#7CE6FF"
          size={0.13}
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

export const ParticleOrbit = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 z-0"
  >
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 4.2], fov: 45 }}
      frameloop="demand"
      style={{ background: "transparent" }}
    >
      <Orbit />
    </Canvas>
  </div>
);

export default ParticleOrbit;
