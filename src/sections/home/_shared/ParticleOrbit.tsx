import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * ParticleOrbit — decorative ring of particles forming a slow-rotating orbit.
 *
 * Sits behind the centered IBM credential card on the Why TechD section.
 * Same visual language as ParticleGlobe / HeroParticleField (R3F, brand cyan,
 * additive-blended highlight nodes, prefers-reduced-motion aware).
 */

const POINT_COUNT = 2200;
const HIGHLIGHT_COUNT = 40;
const RADIUS = 1.6;
const RADIUS_JITTER = 0.22;
const Z_THICKNESS = 0.18;

/** Distribute points around a ring on the XY plane with radial + Z jitter. */
function buildRing(count: number) {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    // Bias toward the ring edge with a soft falloff so it reads as a halo.
    const r = RADIUS + (Math.random() - 0.5) * 2 * RADIUS_JITTER;
    positions[i * 3] = Math.cos(angle) * r;
    positions[i * 3 + 1] = Math.sin(angle) * r;
    positions[i * 3 + 2] = (Math.random() - 0.5) * Z_THICKNESS;
  }
  return positions;
}

function pickHighlightPositions(source: Float32Array, count: number) {
  const arr = new Float32Array(count * 3);
  const total = source.length / 3;
  for (let i = 0; i < count; i++) {
    const idx = Math.floor(Math.random() * total) * 3;
    arr[i * 3] = source[idx] * 1.01;
    arr[i * 3 + 1] = source[idx + 1] * 1.01;
    arr[i * 3 + 2] = source[idx + 2];
  }
  return arr;
}

const Orbit = ({ animate }: { animate: boolean }) => {
  const positions = useMemo(() => buildRing(POINT_COUNT), []);
  const highlights = useMemo(
    () => pickHighlightPositions(positions, HIGHLIGHT_COUNT),
    [positions],
  );

  const groupRef = useRef<THREE.Group>(null);
  const highlightsRef = useRef<THREE.Points>(null);

  useFrame(({ clock }) => {
    if (!animate) return;
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.z = t * 0.05;
      // Gentle wobble to give the ring depth.
      groupRef.current.rotation.x = Math.sin(t * 0.2) * 0.08;
      groupRef.current.rotation.y = Math.cos(t * 0.18) * 0.08;
    }
    if (highlightsRef.current) {
      const mat = highlightsRef.current.material as THREE.PointsMaterial;
      mat.opacity = 0.6 + Math.sin(t * 1.2) * 0.35;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main ring particles — soft brand cyan haze */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#00B3E3"
          size={0.03}
          sizeAttenuation
          transparent
          opacity={0.65}
          depthWrite={false}
        />
      </points>

      {/* Sparkle highlights — additive for the glowing dot accents */}
      <points ref={highlightsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[highlights, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#7CE6FF"
          size={0.11}
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
      >
        <Orbit animate={!reduced} />
      </Canvas>
      {/* Soft radial fade so the ring dissolves into the section background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, transparent 55%, hsl(var(--muted) / 0.4) 90%, hsl(var(--muted) / 0.6) 100%)",
        }}
      />
    </div>
  );
};

export default ParticleOrbit;
