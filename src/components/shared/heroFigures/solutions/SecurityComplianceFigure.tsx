import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { WireframePanel, PRIMARY, HIGHLIGHT } from "./_SharedWireframe";

/**
 * Security & Compliance — interlocking tetrahedra (stella octangula).
 * Two wireframe tetrahedra interpenetrate and counter-rotate, forming
 * an eight-pointed star silhouette. Reads as "sealed / locked together".
 */
const Tetra = ({
  radius,
  invert,
  opacity,
  highlight,
}: {
  radius: number;
  invert?: boolean;
  opacity: number;
  highlight?: boolean;
}) => (
  <group rotation={invert ? [Math.PI, 0, 0] : [0, 0, 0]}>
    <lineSegments>
      <edgesGeometry args={[new THREE.TetrahedronGeometry(radius, 0)]} />
      <lineBasicMaterial
        color={highlight ? HIGHLIGHT : PRIMARY}
        transparent
        opacity={opacity}
        depthWrite={false}
      />
    </lineSegments>
    <points>
      <tetrahedronGeometry args={[radius, 0]} />
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
  </group>
);

const Geometry = () => {
  const a = useRef<THREE.Group>(null);
  const b = useRef<THREE.Group>(null);
  const whole = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (a.current) {
      a.current.rotation.y = t * 0.22;
      a.current.rotation.x = Math.sin(t * 0.18) * 0.1;
    }
    if (b.current) {
      b.current.rotation.y = -t * 0.22;
      b.current.rotation.x = Math.sin(t * 0.18) * 0.1;
    }
    if (whole.current) {
      whole.current.rotation.y = t * 0.05;
    }
  });

  return (
    <group ref={whole}>
      <group ref={a}>
        <Tetra radius={2.5} opacity={0.7} />
      </group>
      <group ref={b}>
        <Tetra radius={2.5} invert opacity={0.7} />
      </group>
    </group>
  );
};

export const SecurityComplianceFigure = () => (
  <WireframePanel cameraZ={6.5}>
    <Geometry />
  </WireframePanel>
);

export default SecurityComplianceFigure;
