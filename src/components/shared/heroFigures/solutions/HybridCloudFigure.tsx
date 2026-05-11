import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { WireframePanel, PRIMARY, HIGHLIGHT } from "./_SharedWireframe";

/**
 * Hybrid Cloud — two wireframe cubes (on-prem + cloud) offset in depth,
 * connected by animated traveling particles that flow back and forth.
 * Reads as "two environments, bridged".
 */

const TRAVELERS = 14;
const BRIDGE_LENGTH = 3.2; // distance between cube centers along X

const Cube = ({
  position,
  size,
  rotationSpeed,
}: {
  position: [number, number, number];
  size: number;
  rotationSpeed: number;
}) => {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.y = t * rotationSpeed;
      ref.current.rotation.x = Math.sin(t * rotationSpeed * 0.6) * 0.15;
    }
  });
  return (
    <group ref={ref} position={position}>
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(size, size, size)]} />
        <lineBasicMaterial
          color={PRIMARY}
          transparent
          opacity={0.7}
          depthWrite={false}
        />
      </lineSegments>
      <points>
        <boxGeometry args={[size, size, size]} />
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
};

const Bridge = () => {
  const lineRef = useRef<THREE.Line>(null);
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, basePositions } = useMemo(() => {
    const arr = new Float32Array(TRAVELERS * 3);
    return { positions: arr, basePositions: arr.slice() };
  }, []);

  // Static bridge guideline (faint)
  const bridgeGeom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const half = BRIDGE_LENGTH / 2;
    g.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(
        [-half, 0, 0, half, 0, 0],
        3
      )
    );
    return g;
  }, []);

  const travelersGeom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, [positions]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const half = BRIDGE_LENGTH / 2;
    const attr = travelersGeom.getAttribute("position") as THREE.BufferAttribute;
    for (let i = 0; i < TRAVELERS; i++) {
      const phase = i / TRAVELERS;
      // Alternate direction every other traveler
      const dir = i % 2 === 0 ? 1 : -1;
      const u = ((t * 0.35 * dir + phase) % 1 + 1) % 1;
      const x = -half + u * BRIDGE_LENGTH;
      // Subtle vertical wave so it doesn't look like a strict line
      const y = Math.sin(u * Math.PI) * 0.08 * (i % 3 === 0 ? -1 : 1);
      attr.setXYZ(i, x, y, 0);
    }
    attr.needsUpdate = true;
    void basePositions;
  });

  return (
    <group>
      <lineSegments geometry={bridgeGeom}>
        <lineBasicMaterial
          color={PRIMARY}
          transparent
          opacity={0.18}
          depthWrite={false}
        />
      </lineSegments>
      <points ref={pointsRef} geometry={travelersGeom}>
        <pointsMaterial
          color={HIGHLIGHT}
          size={0.14}
          sizeAttenuation
          transparent
          opacity={0.95}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
};

const Geometry = () => {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = Math.sin(t * 0.15) * 0.15;
    }
  });

  return (
    <group ref={group}>
      <Cube position={[-1.6, 0, 0]} size={1.6} rotationSpeed={0.18} />
      <Cube position={[1.6, 0, 0]} size={1.9} rotationSpeed={-0.14} />
      <Bridge />
    </group>
  );
};

export const HybridCloudFigure = () => (
  <WireframePanel cameraZ={7}>
    <Geometry />
  </WireframePanel>
);

export default HybridCloudFigure;
