import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import CardParticleCanvas from "./CardParticleCanvas";

const COLS = 30;
const ROWS = 16;
const COUNT = COLS * ROWS;

function build() {
  const positions = new Float32Array(COUNT * 3);
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const i = r * COLS + c;
      positions[i * 3] = (c / (COLS - 1) - 0.5) * 6;
      positions[i * 3 + 1] = (r / (ROWS - 1) - 0.5) * 3.2;
      positions[i * 3 + 2] = 0;
    }
  }
  return positions;
}

const Scene = ({ active }: { active: boolean }) => {
  const base = useMemo(build, []);
  const live = useMemo(() => new Float32Array(base), [base]);
  const ref = useRef<THREE.Points>(null);
  const group = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const amp = active ? 0.5 : 0.18;
    for (let i = 0; i < COUNT; i++) {
      const k = i * 3;
      const x = base[k];
      const y = base[k + 1];
      // diagonal traveling wave
      const z = Math.sin((x + y) * 1.2 - t * 1.6) * amp;
      live[k + 2] = z;
    }
    if (ref.current) {
      const attr = ref.current.geometry.attributes.position as THREE.BufferAttribute;
      attr.array = live;
      attr.needsUpdate = true;
      // brightness pulse via opacity
      const mat = ref.current.material as THREE.PointsMaterial;
      mat.opacity = 0.7 + Math.sin(t * 1.2) * 0.15;
    }
    if (group.current) {
      group.current.rotation.x = -0.55;
      group.current.rotation.z = Math.sin(t * 0.1) * 0.05;
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
    </group>
  );
};

export const DataGridScene = ({ active = false }: { active?: boolean }) => (
  <CardParticleCanvas cameraZ={3.6} fov={50}>
    <Scene active={active} />
  </CardParticleCanvas>
);

export default DataGridScene;
