import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { WireframePanel, PRIMARY, HIGHLIGHT } from "./_SharedWireframe";

const Geometry = () => {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = t * 0.15;
      group.current.rotation.x = Math.sin(t * 0.1) * 0.15;
    }
  });
  return (
    <group ref={group}>
      {/* Ring A */}
      <lineSegments rotation={[0, 0, 0]}>
        <edgesGeometry args={[new THREE.TorusGeometry(1.8, 0.18, 12, 64)]} />
        <lineBasicMaterial color={PRIMARY} transparent opacity={0.6} depthWrite={false} />
      </lineSegments>
      <points rotation={[0, 0, 0]}>
        <torusGeometry args={[1.8, 0.18, 12, 64]} />
        <pointsMaterial
          color={HIGHLIGHT}
          size={0.05}
          sizeAttenuation
          transparent
          opacity={0.85}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      {/* Ring B — orthogonal, linked */}
      <lineSegments rotation={[Math.PI / 2, 0, Math.PI / 4]}>
        <edgesGeometry args={[new THREE.TorusGeometry(1.8, 0.18, 12, 64)]} />
        <lineBasicMaterial color={PRIMARY} transparent opacity={0.6} depthWrite={false} />
      </lineSegments>
      <points rotation={[Math.PI / 2, 0, Math.PI / 4]}>
        <torusGeometry args={[1.8, 0.18, 12, 64]} />
        <pointsMaterial
          color={HIGHLIGHT}
          size={0.05}
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

export const HybridCloudFigure = () => (
  <WireframePanel>
    <Geometry />
  </WireframePanel>
);

export default HybridCloudFigure;
