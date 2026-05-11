import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { WireframePanel, PRIMARY, HIGHLIGHT } from "./_SharedWireframe";

const Geometry = () => {
  const group = useRef<THREE.Group>(null);
  const ring = useRef<THREE.LineSegments>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = t * 0.15;
      group.current.rotation.x = Math.sin(t * 0.1) * 0.12;
    }
    if (ring.current) {
      ring.current.rotation.z = -t * 0.25;
    }
  });
  return (
    <group ref={group}>
      {/* Central octahedron — shield / lock */}
      <lineSegments>
        <edgesGeometry args={[new THREE.OctahedronGeometry(2.0, 0)]} />
        <lineBasicMaterial color={PRIMARY} transparent opacity={0.6} depthWrite={false} />
      </lineSegments>
      <points>
        <octahedronGeometry args={[2.0, 0]} />
        <pointsMaterial
          color={HIGHLIGHT}
          size={0.1}
          sizeAttenuation
          transparent
          opacity={0.95}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      {/* Orbiting perimeter ring — perimeter / audit */}
      <lineSegments ref={ring} rotation={[Math.PI / 2, 0, 0]}>
        <edgesGeometry args={[new THREE.TorusGeometry(2.8, 0.02, 8, 96)]} />
        <lineBasicMaterial color={HIGHLIGHT} transparent opacity={0.5} depthWrite={false} />
      </lineSegments>
    </group>
  );
};

export const SecurityComplianceFigure = () => (
  <WireframePanel>
    <Geometry />
  </WireframePanel>
);

export default SecurityComplianceFigure;
