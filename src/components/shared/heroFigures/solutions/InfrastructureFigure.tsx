import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { WireframePanel, PRIMARY, HIGHLIGHT } from "./_SharedWireframe";

/**
 * Infrastructure — stacked rack-appliance lattice.
 * Three horizontal wireframe slabs evoking a hyperconverged hardware
 * appliance (IBM Storage Fusion HCI). A subtle data point travels up
 * the vertical bus to suggest workloads moving through the stack.
 */
const SLABS = [-1.2, 0, 1.2];
const SLAB_W = 3;
const SLAB_D = 2;
const SLAB_H = 0.5;

const Geometry = () => {
  const group = useRef<THREE.Group>(null);
  const travelerRef = useRef<THREE.Points>(null);
  const travelerPos = useMemo(() => new Float32Array(3), []);

  const slabEdges = useMemo(
    () => new THREE.EdgesGeometry(new THREE.BoxGeometry(SLAB_W, SLAB_H, SLAB_D)),
    [],
  );

  const busPositions = useMemo(() => {
    // Vertical bus line connecting all slabs through the front-right corner
    const x = SLAB_W / 2 - 0.15;
    const z = SLAB_D / 2 - 0.15;
    return new Float32Array([x, SLABS[0] - 0.3, z, x, SLABS[2] + 0.3, z]);
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = t * 0.18;
      group.current.rotation.x = -0.35 + Math.sin(t * 0.12) * 0.06;
    }
    // Traveler glides up the bus, loops back
    const u = (t * 0.18) % 1;
    const y = SLABS[0] - 0.3 + u * (SLABS[2] + 0.3 - (SLABS[0] - 0.3));
    travelerPos[0] = SLAB_W / 2 - 0.15;
    travelerPos[1] = y;
    travelerPos[2] = SLAB_D / 2 - 0.15;
    if (travelerRef.current) {
      const attr = travelerRef.current.geometry.getAttribute("position") as THREE.BufferAttribute;
      attr.needsUpdate = true;
    }
  });

  return (
    <group ref={group}>
      {SLABS.map((y, i) => (
        <group key={i} position={[0, y, 0]}>
          <lineSegments>
            <primitive object={slabEdges} attach="geometry" />
            <lineBasicMaterial color={PRIMARY} transparent opacity={0.6} depthWrite={false} />
          </lineSegments>
        </group>
      ))}

      {/* Vertical bus */}
      <line>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[busPositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={HIGHLIGHT} transparent opacity={0.5} depthWrite={false} />
      </line>

      {/* Traveler glow */}
      <points ref={travelerRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[travelerPos, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color={HIGHLIGHT}
          size={0.22}
          sizeAttenuation
          transparent
          opacity={1}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
};

export const InfrastructureFigure = () => (
  <WireframePanel cameraZ={7.5}>
    <Geometry />
  </WireframePanel>
);

export default InfrastructureFigure;
