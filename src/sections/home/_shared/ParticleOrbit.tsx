import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * ParticleOrbit — decorative halo of particles forming an irregular ring.
 *
 * Visual reference: a dense ring of small dots with a clearly empty center,
 * particles scattering outward with a soft falloff, organic (non-perfect)
 * silhouette. Recolored to brand cyan. Fully transparent canvas.
 */

const RING_COUNT = 1800;   // dense particles ON the ring
const SCATTER_COUNT = 900; // looser particles drifting outside the ring
const HIGHLIGHT_COUNT = 70;
const RING_RADIUS = 1.6;

function hash(i: number) {
  const s = Math.sin(i * 12.9898) * 43758.5453;
  return s - Math.floor(s);
}

/**
 * Particles concentrated on a ring of radius RING_RADIUS with small radial
 * jitter so the ring has thickness but the center stays empty.
 */
function buildRing(count: number) {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;

    // Warp the radius a touch with low-frequency sines so the ring isn't
    // perfectly circular — gives it organic lobes.
    const warp =
      Math.sin(angle * 3 + hash(i) * 6.28) * 0.08 +
      Math.cos(angle * 2 + 0.4) * 0.06;

    // Tight Gaussian-ish jitter around the ring radius (use sum of two
    // randoms for a softer distribution than a flat random).
    const j = (Math.random() + Math.random() - 1) * 0.18;
    const r = RING_RADIUS + warp + j;

    positions[i * 3] = Math.cos(angle) * r;
    positions[i * 3 + 1] = Math.sin(angle) * r;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 0.12;
  }
  return positions;
}

/**
 * Loose scatter outside the ring — particles drift outward with falling
 * density, which makes the halo feel like it's dissolving into space.
 */
function buildScatter(count: number) {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    // Bias OUTWARD only — keep the center empty.
    // Math.pow skews most points just outside the ring, with a long tail.
    const offset = Math.pow(Math.random(), 1.6) * 0.9;
    const inwardBleed = (Math.random() - 0.5) * 0.15; // tiny inward dust
    const r = RING_RADIUS + offset + inwardBleed;

    positions[i * 3] = Math.cos(angle) * r;
    positions[i * 3 + 1] = Math.sin(angle) * r;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 0.25;
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

const Orbit = ({ animate }: { animate: boolean }) => {
  const ring = useMemo(() => buildRing(RING_COUNT), []);
  const scatter = useMemo(() => buildScatter(SCATTER_COUNT), []);
  const highlights = useMemo(
    () => pickHighlightPositions(ring, HIGHLIGHT_COUNT),
    [ring],
  );

  const groupRef = useRef<THREE.Group>(null);
  const highlightsRef = useRef<THREE.Points>(null);

  useFrame(({ clock }) => {
    if (!animate) return;
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      // Slow drift — primarily in-plane rotation, tiny out-of-plane tilt.
      groupRef.current.rotation.z = t * 0.05;
      groupRef.current.rotation.x = Math.sin(t * 0.15) * 0.06;
      groupRef.current.rotation.y = Math.cos(t * 0.12) * 0.06;
    }
    if (highlightsRef.current) {
      const mat = highlightsRef.current.material as THREE.PointsMaterial;
      mat.opacity = 0.55 + Math.sin(t * 1.1) * 0.35;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Dense ring — the primary halo */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[ring, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#00B3E3"
          size={0.025}
          sizeAttenuation
          transparent
          opacity={0.85}
          depthWrite={false}
        />
      </points>

      {/* Outward scatter — dust dissolving into space */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[scatter, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#00B3E3"
          size={0.022}
          sizeAttenuation
          transparent
          opacity={0.4}
          depthWrite={false}
        />
      </points>

      {/* Sparkle highlights — additive accent dots on the ring */}
      <points ref={highlightsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[highlights, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#7CE6FF"
          size={0.09}
          sizeAttenuation
          transparent
          opacity={0.85}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
};

export const ParticleOrbit = () => {
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0"
    >
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 4.2], fov: 45 }}
        frameloop={reduced ? "demand" : "always"}
        style={{ background: "transparent" }}
      >
        <Orbit animate={!reduced} />
      </Canvas>
    </div>
  );
};

export default ParticleOrbit;
