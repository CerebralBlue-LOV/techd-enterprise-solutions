import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { WireframePanel, PRIMARY, HIGHLIGHT } from "./_SharedWireframe";

const Geometry = () => {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = t * 0.18;
      group.current.rotation.x = Math.sin(t * 0.1) * 0.15;
    }
  });
  return (
    <group ref={group}>
      {/* Torus knot — the "pipeline / loop / flow" motif */}
      <lineSegments>
        <edgesGeometry args={[new THREE.TorusKnotGeometry(1.5, 0.25, 32, 4)]} />
        <lineBasicMaterial color={PRIMARY} transparent opacity={0.55} depthWrite={false} />
      </lineSegments>
      <points>
        <torusKnotGeometry args={[1.6, 0.35, 48, 6]} />
        <pointsMaterial
          color={HIGHLIGHT}
          size={0.06}
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

export const AutomationFinOpsFigure = () => (
  <WireframePanel>
    <Geometry />
  </WireframePanel>
);

export default AutomationFinOpsFigure;
