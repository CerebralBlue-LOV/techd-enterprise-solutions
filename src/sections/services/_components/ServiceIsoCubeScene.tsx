import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface SceneProps {
  tiltX?: number;
  tiltY?: number;
}

const PRIMARY = "#00B3E3";

// ServicesFigure — subdivided wireframe octahedron with vertex dots,
// slowly rotating. Same monoline-cyan family as the other figures.

const SIZE = 2.2;

const Octahedron = ({ tiltX = 0, tiltY = 0 }: SceneProps) => {
  const groupRef = useRef<THREE.Group>(null);

  const edges = useMemo(
    () =>
      new THREE.EdgesGeometry(
        new THREE.OctahedronGeometry(SIZE, 2),
        1,
      ),
    [],
  );
  const points = useMemo(() => new THREE.OctahedronGeometry(SIZE, 2), []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.15 + tiltX * 0.2;
      groupRef.current.rotation.x =
        Math.sin(t * 0.12) * 0.12 + tiltY * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <lineSegments>
        <primitive object={edges} attach="geometry" />
        <lineBasicMaterial
          color={PRIMARY}
          transparent
          opacity={0.9}
          depthWrite={false}
        />
      </lineSegments>
      <points>
        <primitive object={points} attach="geometry" />
        <pointsMaterial
          color={PRIMARY}
          size={0.06}
          sizeAttenuation
          transparent
          opacity={0.9}
          depthWrite={false}
        />
      </points>
    </group>
  );
};

export const ServiceIsoCubeScene = ({ tiltX, tiltY }: SceneProps) => {
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 7], fov: 45 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: "transparent" }}
      frameloop={reduced ? "demand" : "always"}
    >
      <Octahedron tiltX={tiltX} tiltY={tiltY} />
    </Canvas>
  );
};

export default ServiceIsoCubeScene;
