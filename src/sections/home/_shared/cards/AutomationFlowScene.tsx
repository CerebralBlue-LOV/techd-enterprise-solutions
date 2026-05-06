import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import CardParticleCanvas from "./CardParticleCanvas";

const COUNT = 500;
const PACKETS = 8;

function build() {
  const positions = new Float32Array(COUNT * 3);
  const offset = new Float32Array(COUNT);
  const yJitter = new Float32Array(COUNT);
  const speed = new Float32Array(COUNT);
  for (let i = 0; i < COUNT; i++) {
    offset[i] = Math.random();
    yJitter[i] = (Math.random() - 0.5) * 0.4;
    speed[i] = 0.3 + Math.random() * 0.5;
    positions[i * 3] = 0;
    positions[i * 3 + 1] = 0;
    positions[i * 3 + 2] = 0;
  }
  return { positions, offset, yJitter, speed };
}

const Scene = ({ active }: { active: boolean }) => {
  const { positions, offset, yJitter, speed } = useMemo(build, []);
  const live = useMemo(() => new Float32Array(positions), [positions]);
  const ref = useRef<THREE.Points>(null);
  const packetPos = useMemo(() => new Float32Array(PACKETS * 3), []);
  const pRef = useRef<THREE.Points>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const flow = active ? 0.45 : 0.18;
    for (let i = 0; i < COUNT; i++) {
      const k = i * 3;
      const u = (offset[i] + t * speed[i] * flow * 0.4) % 1;
      const x = (u - 0.5) * 6;
      const y = Math.sin(u * Math.PI * 2 + t * 0.4) * 0.6 + yJitter[i];
      live[k] = x;
      live[k + 1] = y;
      live[k + 2] = 0;
    }
    if (ref.current) {
      const attr = ref.current.geometry.attributes.position as THREE.BufferAttribute;
      attr.array = live;
      attr.needsUpdate = true;
    }
    for (let p = 0; p < PACKETS; p++) {
      const u = ((p / PACKETS) + t * 0.25) % 1;
      const x = (u - 0.5) * 6;
      const y = Math.sin(u * Math.PI * 2 + t * 0.4) * 0.6;
      packetPos[p * 3] = x;
      packetPos[p * 3 + 1] = y;
      packetPos[p * 3 + 2] = 0.05;
    }
    if (pRef.current) {
      const attr = pRef.current.geometry.attributes.position as THREE.BufferAttribute;
      attr.array = packetPos;
      attr.needsUpdate = true;
    }
  });

  return (
    <group>
      <points ref={ref}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[live, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#00B3E3" size={0.04} sizeAttenuation transparent opacity={0.7} depthWrite={false} />
      </points>
      <points ref={pRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[packetPos, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#7CE6FF"
          size={0.18}
          sizeAttenuation
          transparent
          opacity={1}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
};

export const AutomationFlowScene = ({ active = false }: { active?: boolean }) => (
  <CardParticleCanvas cameraZ={3.8} fov={50}>
    <Scene active={active} />
  </CardParticleCanvas>
);

export default AutomationFlowScene;
