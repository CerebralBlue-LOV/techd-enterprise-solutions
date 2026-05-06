import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import CardParticleCanvas from "./CardParticleCanvas";

const COUNT = 600;
const RING = 1.4;

function gauss() {
  let u = 0;
  let v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

function build() {
  const positions = new Float32Array(COUNT * 3);
  const angles = new Float32Array(COUNT);
  const baseR = new Float32Array(COUNT);
  const amp = new Float32Array(COUNT);
  const phase = new Float32Array(COUNT);
  for (let i = 0; i < COUNT; i++) {
    const a = ((i + Math.random()) / COUNT) * Math.PI * 2;
    const r = RING + gauss() * 0.18;
    angles[i] = a;
    baseR[i] = r;
    amp[i] = 0.05 + Math.random() * 0.18;
    phase[i] = Math.random() * Math.PI * 2;
    positions[i * 3] = Math.cos(a) * r;
    positions[i * 3 + 1] = Math.sin(a) * r * 0.45;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 0.08;
  }
  return { positions, angles, baseR, amp, phase };
}

const Scene = ({ active }: { active: boolean }) => {
  const { positions, angles, baseR, amp, phase } = useMemo(build, []);
  const live = useMemo(() => new Float32Array(positions), [positions]);
  const ref = useRef<THREE.Points>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const k = active ? 1 : 0.4;
    for (let i = 0; i < COUNT; i++) {
      const drift = Math.sin(t * 0.5 + phase[i]) * amp[i] * k;
      const r = baseR[i] + drift;
      live[i * 3] = Math.cos(angles[i]) * r;
      live[i * 3 + 1] = Math.sin(angles[i]) * r * 0.45;
    }
    if (ref.current) {
      const attr = ref.current.geometry.attributes.position as THREE.BufferAttribute;
      attr.array = live;
      attr.needsUpdate = true;
    }
  });

  return (
    <group>
      <points ref={ref}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[live, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#00B3E3"
          size={0.05}
          sizeAttenuation
          transparent
          opacity={0.8}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
};

export const CloudOrbitScene = ({ active = false }: { active?: boolean }) => (
  <CardParticleCanvas cameraZ={3.4}>
    <Scene active={active} />
  </CardParticleCanvas>
);

export default CloudOrbitScene;
