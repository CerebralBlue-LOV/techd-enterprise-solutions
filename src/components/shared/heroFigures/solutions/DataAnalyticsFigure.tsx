import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { WireframePanel, PRIMARY, HIGHLIGHT } from "./_SharedWireframe";

const COLS: { x: number; z: number; h: number }[] = [
  { x: -1.2, z: -1.2, h: 1.6 },
  { x: 0, z: -1.2, h: 2.4 },
  { x: 1.2, z: -1.2, h: 1.0 },
  { x: -1.2, z: 0, h: 2.0 },
  { x: 0, z: 0, h: 3.2 },
  { x: 1.2, z: 0, h: 1.4 },
  { x: -1.2, z: 1.2, h: 1.2 },
  { x: 0, z: 1.2, h: 2.0 },
  { x: 1.2, z: 1.2, h: 2.8 },
];

const Geometry = () => {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = t * 0.15;
      group.current.rotation.x = -0.5 + Math.sin(t * 0.1) * 0.05;
    }
  });

  const bars = useMemo(
    () =>
      COLS.map((c) => ({
        ...c,
        edges: new THREE.EdgesGeometry(new THREE.BoxGeometry(0.7, c.h, 0.7)),
      })),
    [],
  );

  return (
    <group ref={group}>
      {bars.map((b, i) => (
        <group key={i} position={[b.x, b.h / 2 - 1.4, b.z]}>
          <lineSegments>
            <primitive object={b.edges} attach="geometry" />
            <lineBasicMaterial color={PRIMARY} transparent opacity={0.55} depthWrite={false} />
          </lineSegments>
          {/* Top cap highlight */}
          <points position={[0, b.h / 2, 0]}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                args={[
                  new Float32Array([
                    -0.35, 0, -0.35, 0.35, 0, -0.35, 0.35, 0, 0.35, -0.35, 0, 0.35,
                  ]),
                  3,
                ]}
              />
            </bufferGeometry>
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
        </group>
      ))}
    </group>
  );
};

export const DataAnalyticsFigure = () => (
  <WireframePanel cameraZ={7.5}>
    <Geometry />
  </WireframePanel>
);

export default DataAnalyticsFigure;
