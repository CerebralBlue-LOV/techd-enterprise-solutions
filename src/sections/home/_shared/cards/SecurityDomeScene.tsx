import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import CardParticleCanvas from "./CardParticleCanvas";

const COUNT = 600;
const RADIUS = 1.6;

function build() {
  const positions = new Float32Array(COUNT * 3);
  const r = new Float32Array(COUNT);
  const theta = new Float32Array(COUNT);
  for (let i = 0; i < COUNT; i++) {
    // half-sphere upper dome via fibonacci
    const yNorm = i / (COUNT - 1); // 0..1
    const y = yNorm; // 0..1 → bottom..top
    const rr = Math.sqrt(1 - y * y);
    const a = Math.PI * (3 - Math.sqrt(5)) * i;
    positions[i * 3] = Math.cos(a) * rr * RADIUS;
    positions[i * 3 + 1] = y * RADIUS - 0.3;
    positions[i * 3 + 2] = Math.sin(a) * rr * RADIUS;
    r[i] = rr;
    theta[i] = a;
  }
  return { positions, r, theta };
}

const Scene = ({ active }: { active: boolean }) => {
  const { positions } = useMemo(build, []);
  const live = useMemo(() => new Float32Array(positions), [positions]);
  const ref = useRef<THREE.Points>(null);
  const group = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const amp = active ? 0.12 : 0.04;
    for (let i = 0; i < COUNT; i++) {
      const k = i * 3;
      const x = positions[k];
      const y = positions[k + 1];
      const z = positions[k + 2];
      const dist = Math.sqrt(x * x + z * z);
      const ripple = Math.sin(dist * 4 - t * 2.4) * amp;
      const scale = 1 + ripple * 0.15;
      live[k] = x * scale;
      live[k + 1] = y + ripple * 0.05;
      live[k + 2] = z * scale;
    }
    if (ref.current) {
      const attr = ref.current.geometry.attributes.position as THREE.BufferAttribute;
      attr.array = live;
      attr.needsUpdate = true;
    }
    if (group.current) {
      group.current.rotation.y = t * 0.08;
    }
  });

  return (
    <group ref={group}>
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
      {/* center node */}
      <mesh position={[0, -0.3, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color="#7CE6FF" transparent opacity={0.9} />
      </mesh>
    </group>
  );
};

export const SecurityDomeScene = ({ active = false }: { active?: boolean }) => (
  <CardParticleCanvas cameraZ={3.6} fov={50}>
    <Scene active={active} />
  </CardParticleCanvas>
);

export default SecurityDomeScene;
