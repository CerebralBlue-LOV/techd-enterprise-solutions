import { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";

/**
 * ParticleOrbit — soft, cloud-like halo of square pixel particles forming a
 * diffuse ring with a hollow center. Inspired by Stripe's "agentic graphic"
 * background canvas: even angular distribution, gaussian thickness across
 * the ring radius, no directional clumping, no rotation.
 */

const PARTICLE_COUNT = 4200;
const HIGHLIGHT_COUNT = 60;
const RING_RADIUS = 1.85;

/** Box-Muller — true gaussian, gives the soft falloff on both sides. */
function gauss() {
  let u = 0;
  let v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

/**
 * Even angular coverage (no clumping at corners) with gaussian thickness
 * so the cloud has soft inner + outer edges and a hollow center.
 */
function buildCloud(count: number) {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    // Stratified angle: each particle gets its own slice + jitter, so the
    // ring is uniformly covered (no random clustering at the corners).
    const angle = ((i + Math.random()) / count) * Math.PI * 2;

    // Tight gaussian thickness — keeps the ring shape with a clean hollow
    // center. Clamp inward bleed so particles never cross into the core.
    const thickness = gauss() * 0.22;
    const inner = RING_RADIUS - 0.45;
    const outer = RING_RADIUS + 0.9;
    let r = RING_RADIUS + thickness + Math.max(0, gauss()) * 0.18;
    if (r < inner) r = inner + Math.random() * 0.05;
    if (r > outer) r = outer - Math.random() * 0.05;

    positions[i * 3] = Math.cos(angle) * r;
    positions[i * 3 + 1] = Math.sin(angle) * r;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 0.08;
  }
  return positions;
}

function pickHighlights(source: Float32Array, count: number) {
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
  const cloud = useMemo(() => buildCloud(PARTICLE_COUNT), []);
  const highlights = useMemo(
    () => pickHighlights(cloud, HIGHLIGHT_COUNT),
    [cloud],
  );

  return (
    <group>
      {/* Main soft cloud — square pixel particles (default PointsMaterial). */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[cloud, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#00B3E3"
          size={0.045}
          sizeAttenuation
          transparent
          opacity={0.85}
          depthWrite={false}
        />
      </points>

      {/* Sparse brighter accents */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[highlights, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#7CE6FF"
          size={0.09}
          sizeAttenuation
          transparent
          opacity={0.95}
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
