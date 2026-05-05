import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * ParticleOrbit — decorative organic cloud of particles loosely orbiting a center.
 *
 * Sits behind the centered IBM credential card on the Why TechD section.
 * Same R3F language as ParticleGlobe / HeroParticleField. Recolored to brand
 * cyan. Shape is intentionally irregular (multi-octave noise + warped radius)
 * so it never reads as a perfect ring. Background is fully transparent — no
 * radial gradient overlay — so the section background shows through cleanly.
 */

const POINT_COUNT = 2600;
const HIGHLIGHT_COUNT = 60;
const BASE_RADIUS = 1.55;

/** Pseudo-random but stable per-index — gives each point its own offset. */
function hash(i: number) {
  const s = Math.sin(i * 12.9898) * 43758.5453;
  return s - Math.floor(s);
}

/**
 * Distribute points in a warped, lobed cloud roughly around BASE_RADIUS.
 * We sum a few sine harmonics on the angle to break the circle into an
 * organic, slightly blobby halo with thicker and thinner regions.
 */
function buildCloud(count: number) {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;

    // Warp the radius with low-frequency sines so the silhouette has lobes,
    // not a clean circle. Multiple harmonics = irregular outline.
    const warp =
      Math.sin(angle * 3 + hash(i) * 6.28) * 0.18 +
      Math.sin(angle * 5 + 1.7) * 0.09 +
      Math.cos(angle * 2 + 0.3) * 0.12;

    // Wide radial jitter — some points sit deep inside, some drift far out,
    // so the edge dissolves naturally instead of forming a hard ring.
    const jitter = (Math.random() - 0.3) * 0.55;
    const r = BASE_RADIUS + warp + jitter;

    // Tilt out of the XY plane a bit so the cloud has volume.
    const zTilt = (Math.random() - 0.5) * 0.6 + Math.sin(angle * 2) * 0.15;

    positions[i * 3] = Math.cos(angle) * r;
    positions[i * 3 + 1] = Math.sin(angle) * r * (0.85 + Math.random() * 0.25);
    positions[i * 3 + 2] = zTilt;
  }
  return positions;
}

function pickHighlightPositions(source: Float32Array, count: number) {
  const arr = new Float32Array(count * 3);
  const total = source.length / 3;
  for (let i = 0; i < count; i++) {
    const idx = Math.floor(Math.random() * total) * 3;
    arr[i * 3] = source[idx] * 1.02;
    arr[i * 3 + 1] = source[idx + 1] * 1.02;
    arr[i * 3 + 2] = source[idx + 2];
  }
  return arr;
}

const Orbit = ({ animate }: { animate: boolean }) => {
  const positions = useMemo(() => buildCloud(POINT_COUNT), []);
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
      // Slow drift on all axes — never a clean spin.
      groupRef.current.rotation.z = t * 0.04;
      groupRef.current.rotation.x = Math.sin(t * 0.18) * 0.12;
      groupRef.current.rotation.y = Math.cos(t * 0.15) * 0.18;
    }
    if (highlightsRef.current) {
      const mat = highlightsRef.current.material as THREE.PointsMaterial;
      mat.opacity = 0.55 + Math.sin(t * 1.1) * 0.35;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main cloud — soft brand cyan haze */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#00B3E3"
          size={0.028}
          sizeAttenuation
          transparent
          opacity={0.55}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Sparkle highlights — glowing accent dots */}
      <points ref={highlightsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[highlights, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#7CE6FF"
          size={0.1}
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
