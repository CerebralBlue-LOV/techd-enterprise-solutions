import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * ParticleOrbit — soft, cloud-like halo of particles forming a diffuse ring
 * with a hollow center. Particles "breathe" radially: each one drifts
 * outward and back along its own angle with a unique phase, giving the ring
 * a slow inhale/exhale pulse. No rotation.
 */

const PARTICLE_COUNT = 1800;
const HIGHLIGHT_COUNT = 38;
const RING_RADIUS = 1.2;

function gauss() {
  let u = 0;
  let v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

type CloudData = {
  positions: Float32Array;
  angles: Float32Array;
  baseR: Float32Array;
  amp: Float32Array;
  phase: Float32Array;
  speed: Float32Array;
  z: Float32Array;
};

function buildCloud(count: number): CloudData {
  const positions = new Float32Array(count * 3);
  const angles = new Float32Array(count);
  const baseR = new Float32Array(count);
  const amp = new Float32Array(count);
  const phase = new Float32Array(count);
  const speed = new Float32Array(count);
  const z = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    const angle = ((i + Math.random()) / count) * Math.PI * 2;

    const thickness = gauss() * 0.22;
    const inner = RING_RADIUS - 0.45;
    const outer = RING_RADIUS + 0.9;
    let r = RING_RADIUS + thickness + Math.max(0, gauss()) * 0.18;
    if (r < inner) r = inner + Math.random() * 0.05;
    if (r > outer) r = outer - Math.random() * 0.05;

    angles[i] = angle;
    baseR[i] = r;
    // Outer particles drift more than inner ones — gives the "exhale" look.
    const outwardness = Math.max(0, (r - RING_RADIUS) / 0.9);
    amp[i] = 0.08 + outwardness * 0.55 + Math.random() * 0.15;
    phase[i] = Math.random() * Math.PI * 2;
    speed[i] = 0.35 + Math.random() * 0.35;
    z[i] = (Math.random() - 0.5) * 0.08;

    positions[i * 3] = Math.cos(angle) * r;
    positions[i * 3 + 1] = Math.sin(angle) * r;
    positions[i * 3 + 2] = z[i];
  }
  return { positions, angles, baseR, amp, phase, speed, z };
}

function pickHighlightIndices(total: number, count: number) {
  const set = new Set<number>();
  while (set.size < count) set.add(Math.floor(Math.random() * total));
  return Array.from(set);
}

const Orbit = ({ animate }: { animate: boolean }) => {
  const cloud = useMemo(() => buildCloud(PARTICLE_COUNT), []);
  const highlightIdx = useMemo(() => pickHighlightIndices(PARTICLE_COUNT, HIGHLIGHT_COUNT), []);

  const livePositions = useMemo(() => new Float32Array(cloud.positions), [cloud]);
  const highlightPositions = useMemo(() => new Float32Array(HIGHLIGHT_COUNT * 3), []);

  // Seed highlight buffer for the static (reduced-motion) case.
  useMemo(() => {
    for (let h = 0; h < highlightIdx.length; h++) {
      const src = highlightIdx[h] * 3;
      highlightPositions[h * 3] = livePositions[src];
      highlightPositions[h * 3 + 1] = livePositions[src + 1];
      highlightPositions[h * 3 + 2] = livePositions[src + 2] + 0.01;
    }
  }, [highlightIdx, highlightPositions, livePositions]);

  const pointsRef = useRef<THREE.Points>(null);
  const highlightsRef = useRef<THREE.Points>(null);

  // Cursor interactivity — pointer projected onto the ring's z=0 plane.
  const { camera, gl } = useThree();
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), []);
  const pointer = useRef(new THREE.Vector3(999, 999, 0));
  const pointerSmooth = useRef(new THREE.Vector3(999, 999, 0));
  const pointerActive = useRef(0);
  const pointerActiveTarget = useRef(0);

  useMemo(() => {
    const dom = gl.domElement;
    const onMove = (e: PointerEvent) => {
      const rect = dom.getBoundingClientRect();
      const ndc = new THREE.Vector2(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1,
      );
      raycaster.setFromCamera(ndc, camera);
      const hit = new THREE.Vector3();
      if (raycaster.ray.intersectPlane(plane, hit)) {
        pointer.current.copy(hit);
        pointerActiveTarget.current = 1;
      }
    };
    const onLeave = () => {
      pointerActiveTarget.current = 0;
    };
    dom.addEventListener("pointermove", onMove);
    dom.addEventListener("pointerleave", onLeave);
    return () => {
      dom.removeEventListener("pointermove", onMove);
      dom.removeEventListener("pointerleave", onLeave);
    };
  }, [camera, gl, plane, raycaster]);

  useFrame(({ clock }, delta) => {
    if (!animate) return;
    const t = clock.getElapsedTime();

    pointerSmooth.current.lerp(pointer.current, Math.min(1, delta * 4));
    pointerActive.current = THREE.MathUtils.lerp(
      pointerActive.current,
      pointerActiveTarget.current,
      Math.min(1, delta * 3),
    );
    const px = pointerSmooth.current.x;
    const py = pointerSmooth.current.y;
    const PUSH_RADIUS = 0.7;
    const PUSH_R2 = PUSH_RADIUS * PUSH_RADIUS;
    const PUSH_AMP = 0.45 * pointerActive.current;

    const { angles, baseR, amp, phase, speed, z } = cloud;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const drift = Math.sin(t * speed[i] + phase[i]) * amp[i];
      const r = baseR[i] + drift;
      const a = angles[i];
      let x = Math.cos(a) * r;
      let y = Math.sin(a) * r;

      if (PUSH_AMP > 0.001) {
        const dx = x - px;
        const dy = y - py;
        const d2 = dx * dx + dy * dy;
        if (d2 < PUSH_R2 * 4) {
          const falloff = Math.exp(-d2 / (PUSH_R2 * 0.5));
          const dist = Math.sqrt(d2) || 0.0001;
          const push = PUSH_AMP * falloff;
          x += (dx / dist) * push;
          y += (dy / dist) * push;
        }
      }

      livePositions[i * 3] = x;
      livePositions[i * 3 + 1] = y;
      livePositions[i * 3 + 2] = z[i];
    }

    if (pointsRef.current) {
      const attr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
      attr.array = livePositions;
      attr.needsUpdate = true;
    }

    for (let h = 0; h < highlightIdx.length; h++) {
      const src = highlightIdx[h] * 3;
      highlightPositions[h * 3] = livePositions[src];
      highlightPositions[h * 3 + 1] = livePositions[src + 1];
      highlightPositions[h * 3 + 2] = livePositions[src + 2] + 0.01;
    }
    if (highlightsRef.current) {
      const attr = highlightsRef.current.geometry.attributes.position as THREE.BufferAttribute;
      attr.array = highlightPositions;
      attr.needsUpdate = true;
      const mat = highlightsRef.current.material as THREE.PointsMaterial;
      mat.opacity = 0.75 + Math.sin(t * 1.2) * 0.2;
    }
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[livePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#00B3E3" size={0.06} sizeAttenuation transparent opacity={0.85} depthWrite={false} />
      </points>

      <points ref={highlightsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[highlightPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#7CE6FF"
          size={0.11}
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

export const ParticleOrbit = () => {
  const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Canvas extends 40% beyond the container on all sides so particles can drift
  // outward without being clipped. Camera is pulled back by the same factor
  // (5.4 * 1.4 ≈ 7.56) so the ring renders at the same on-screen size.
  return (
    <div aria-hidden="true" className="absolute -inset-[40%] z-0">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 7.56], fov: 45 }}
        frameloop={reduced ? "demand" : "always"}
        style={{ background: "transparent" }}
      >
        <Orbit animate={!reduced} />
      </Canvas>
    </div>
  );
};

export default ParticleOrbit;
