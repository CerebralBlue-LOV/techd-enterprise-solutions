import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import CardParticleCanvas from "./CardParticleCanvas";

const COUNT = 600;
const HIGHLIGHTS = 18;

function build() {
  const positions = new Float32Array(COUNT * 3);
  const phase = new Float32Array(COUNT);
  for (let i = 0; i < COUNT; i++) {
    // soft 3D blob via gaussian-ish radial sampling
    const a = Math.random() * Math.PI * 2;
    const b = Math.acos(2 * Math.random() - 1);
    const r = 0.9 + Math.random() * 0.5;
    positions[i * 3] = Math.cos(a) * Math.sin(b) * r * 1.6;
    positions[i * 3 + 1] = Math.cos(b) * r * 0.9;
    positions[i * 3 + 2] = Math.sin(a) * Math.sin(b) * r;
    phase[i] = Math.random() * Math.PI * 2;
  }
  return { positions, phase };
}

const Scene = ({ active }: { active: boolean }) => {
  const { positions, phase } = useMemo(build, []);
  const live = useMemo(() => new Float32Array(positions), [positions]);
  const hi = useMemo(() => Array.from({ length: HIGHLIGHTS }, () => Math.floor(Math.random() * COUNT)), []);
  const hiPos = useMemo(() => new Float32Array(HIGHLIGHTS * 3), []);
  const ref = useRef<THREE.Points>(null);
  const hRef = useRef<THREE.Points>(null);
  const group = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const amp = active ? 0.12 : 0.05;
    for (let i = 0; i < COUNT; i++) {
      const k = i * 3;
      const breathe = 1 + Math.sin(t * 0.6 + phase[i]) * amp * 0.15;
      live[k] = positions[k] * breathe;
      live[k + 1] = positions[k + 1] * breathe;
      live[k + 2] = positions[k + 2] * breathe;
    }
    if (ref.current) {
      const attr = ref.current.geometry.attributes.position as THREE.BufferAttribute;
      attr.array = live;
      attr.needsUpdate = true;
    }
    for (let h = 0; h < HIGHLIGHTS; h++) {
      const src = hi[h] * 3;
      hiPos[h * 3] = live[src];
      hiPos[h * 3 + 1] = live[src + 1];
      hiPos[h * 3 + 2] = live[src + 2] + 0.01;
    }
    if (hRef.current) {
      const attr = hRef.current.geometry.attributes.position as THREE.BufferAttribute;
      attr.array = hiPos;
      attr.needsUpdate = true;
      const mat = hRef.current.material as THREE.PointsMaterial;
      mat.opacity = 0.7 + Math.sin(t * 1.6) * 0.25;
    }
    if (group.current) {
      group.current.rotation.y = t * 0.12;
      group.current.rotation.x = Math.sin(t * 0.2) * 0.15;
    }
  });

  return (
    <group ref={group}>
      <points ref={ref}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[live, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#00B3E3" size={0.04} sizeAttenuation transparent opacity={0.75} depthWrite={false} />
      </points>
      <points ref={hRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[hiPos, 3]} />
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

export const AINeuralScene = ({ active = false }: { active?: boolean }) => (
  <CardParticleCanvas cameraZ={4.4}>
    <Scene active={active} />
  </CardParticleCanvas>
);

export default AINeuralScene;
