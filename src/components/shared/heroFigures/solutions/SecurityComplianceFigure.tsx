import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { WireframePanel, PRIMARY, HIGHLIGHT } from "./_SharedWireframe";

/**
 * Security & Compliance — three stacked hexagonal wireframe shield plates,
 * tilted and offset on the Y axis, rotating slightly out of phase.
 * Reads as "layered defense" without any spherical/circular forms.
 */
const HexPlate = ({
  radius,
  y,
  opacity,
  pointSize,
}: {
  radius: number;
  y: number;
  opacity: number;
  pointSize: number;
}) => {
  // Hexagon vertices (6 sides) in the XZ plane
  const { lineGeom, pointGeom } = useMemo(() => {
    const verts: number[] = [];
    const points: number[] = [];
    const sides = 6;
    for (let i = 0; i < sides; i++) {
      const a1 = (i / sides) * Math.PI * 2;
      const a2 = ((i + 1) / sides) * Math.PI * 2;
      const x1 = Math.cos(a1) * radius;
      const z1 = Math.sin(a1) * radius;
      const x2 = Math.cos(a2) * radius;
      const z2 = Math.sin(a2) * radius;
      // outer edge
      verts.push(x1, 0, z1, x2, 0, z2);
      // spoke to center
      verts.push(0, 0, 0, x1, 0, z1);
      points.push(x1, 0, z1);
    }
    const lg = new THREE.BufferGeometry();
    lg.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
    const pg = new THREE.BufferGeometry();
    pg.setAttribute("position", new THREE.Float32BufferAttribute(points, 3));
    return { lineGeom: lg, pointGeom: pg };
  }, [radius]);

  return (
    <group position={[0, y, 0]} rotation={[Math.PI * 0.18, 0, 0]}>
      <lineSegments geometry={lineGeom}>
        <lineBasicMaterial
          color={PRIMARY}
          transparent
          opacity={opacity}
          depthWrite={false}
        />
      </lineSegments>
      <points geometry={pointGeom}>
        <pointsMaterial
          color={HIGHLIGHT}
          size={pointSize}
          sizeAttenuation
          transparent
          opacity={Math.min(1, opacity + 0.25)}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
};

const Geometry = () => {
  const top = useRef<THREE.Group>(null);
  const middle = useRef<THREE.Group>(null);
  const bottom = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (top.current) top.current.rotation.y = t * 0.22;
    if (middle.current) middle.current.rotation.y = -t * 0.16;
    if (bottom.current) bottom.current.rotation.y = t * 0.1;
  });

  return (
    <group rotation={[0, 0, 0]}>
      <group ref={top}>
        <HexPlate radius={1.7} y={1.15} opacity={0.45} pointSize={0.08} />
      </group>
      <group ref={middle}>
        <HexPlate radius={2.0} y={0} opacity={0.65} pointSize={0.09} />
      </group>
      <group ref={bottom}>
        <HexPlate radius={1.7} y={-1.15} opacity={0.45} pointSize={0.08} />
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
