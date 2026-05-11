import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { WireframePanel, PRIMARY, HIGHLIGHT } from "./_SharedWireframe";

/**
 * Security & Compliance — three nested wireframe shells rotating at
 * different speeds and axes. Reads as "defense in depth / layered security".
 */
const Geometry = () => {
  const outer = useRef<THREE.Group>(null);
  const mid = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (outer.current) {
      outer.current.rotation.y = t * 0.12;
      outer.current.rotation.x = Math.sin(t * 0.1) * 0.12;
    }
    if (mid.current) {
      mid.current.rotation.y = -t * 0.22;
      mid.current.rotation.z = t * 0.08;
    }
    if (inner.current) {
      inner.current.rotation.x = t * 0.35;
      inner.current.rotation.y = -t * 0.28;
    }
  });

  return (
    <group>
      {/* Outer shell — perimeter */}
      <group ref={outer}>
        <lineSegments>
          <edgesGeometry args={[new THREE.IcosahedronGeometry(2.4, 1)]} />
          <lineBasicMaterial
            color={PRIMARY}
            transparent
            opacity={0.35}
            depthWrite={false}
          />
        </lineSegments>
        <points>
          <icosahedronGeometry args={[2.4, 1]} />
          <pointsMaterial
            color={HIGHLIGHT}
            size={0.06}
            sizeAttenuation
            transparent
            opacity={0.7}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>
      </group>

      {/* Mid shell — application / data layer */}
      <group ref={mid}>
        <lineSegments>
          <edgesGeometry args={[new THREE.OctahedronGeometry(1.55, 0)]} />
          <lineBasicMaterial
            color={PRIMARY}
            transparent
            opacity={0.55}
            depthWrite={false}
          />
        </lineSegments>
        <points>
          <octahedronGeometry args={[1.55, 0]} />
          <pointsMaterial
            color={HIGHLIGHT}
            size={0.08}
            sizeAttenuation
            transparent
            opacity={0.85}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>
      </group>

      {/* Inner core — the protected asset */}
      <group ref={inner}>
        <lineSegments>
          <edgesGeometry args={[new THREE.TetrahedronGeometry(0.75, 0)]} />
          <lineBasicMaterial
            color={HIGHLIGHT}
            transparent
            opacity={0.85}
            depthWrite={false}
          />
        </lineSegments>
        <points>
          <tetrahedronGeometry args={[0.75, 0]} />
          <pointsMaterial
            color={HIGHLIGHT}
            size={0.12}
            sizeAttenuation
            transparent
            opacity={1}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>
      </group>
    </group>
  );
};

export const SecurityComplianceFigure = () => (
  <WireframePanel>
    <Geometry />
  </WireframePanel>
);

export default SecurityComplianceFigure;
