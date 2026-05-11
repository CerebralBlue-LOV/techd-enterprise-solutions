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
      {/* Outer icosahedron — the "thinking model" shell */}
      <lineSegments>
        <edgesGeometry args={[new THREE.IcosahedronGeometry(2.6, 1)]} />
        <lineBasicMaterial color={PRIMARY} transparent opacity={0.55} depthWrite={false} />
      </lineSegments>
      <points>
        <icosahedronGeometry args={[2.6, 1]} />
        <pointsMaterial
          color={HIGHLIGHT}
          size={0.09}
          sizeAttenuation
          transparent
          opacity={0.95}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      {/* Inner offset shell — adds the generative/layered feel */}
      <lineSegments rotation={[0.6, 0.3, 0]}>
        <edgesGeometry args={[new THREE.IcosahedronGeometry(1.4, 0)]} />
        <lineBasicMaterial color={HIGHLIGHT} transparent opacity={0.35} depthWrite={false} />
      </lineSegments>
    </group>
  );
};

export const AiGenerativeFigure = () => (
  <WireframePanel>
    <Geometry />
  </WireframePanel>
);

export default AiGenerativeFigure;
