import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface SceneProps {
  tiltX?: number;
  tiltY?: number;
}

const PRIMARY = "#00B3E3";

// IndustriesFigure — wireframe tetrahedron with subdivided faces.
// A large outer tetrahedron is rendered as edges, with an inner
// counter-rotating subdivided tetrahedron and a smaller pulsing core
// to add depth. All in monoline cyan, matching the rest of the site.

const SIZE = 2.6;

// Build a tetrahedron with subdivided faces so each face shows an
// internal triangle grid (more lines, denser look).
function makeSubdividedTetraEdges(radius: number, detail: number) {
  return new THREE.EdgesGeometry(
    new THREE.TetrahedronGeometry(radius, detail),
    1, // small angle so subdivision lines are kept
  );
}

const IndustriesTetra = ({ tiltX = 0, tiltY = 0 }: SceneProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Group>(null);
  const coreMatRef = useRef<THREE.LineBasicMaterial>(null);

  const outerEdges = useMemo(() => makeSubdividedTetraEdges(SIZE, 3), []);
  const innerEdges = useMemo(() => makeSubdividedTetraEdges(SIZE * 0.62, 2), []);
  const coreEdges = useMemo(() => makeSubdividedTetraEdges(SIZE * 0.3, 1), []);
  const vertexGeom = useMemo(
    () => new THREE.TetrahedronGeometry(SIZE, 3),
    [],
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.18 + tiltX * 0.2;
      groupRef.current.rotation.x =
        -0.15 + Math.sin(t * 0.22) * 0.18 + tiltY * 0.12;
      groupRef.current.rotation.z = Math.sin(t * 0.13) * 0.05;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.32;
      innerRef.current.rotation.x = t * 0.18;
    }
    if (coreRef.current) {
      const pulse = 0.85 + Math.sin(t * 1.6) * 0.15;
      coreRef.current.scale.setScalar(pulse);
    }
    if (coreMatRef.current) {
      coreMatRef.current.opacity = 0.55 + Math.sin(t * 1.6) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Outer subdivided tetrahedron — the hero shape */}
      <lineSegments>
        <primitive object={outerEdges} attach="geometry" />
        <lineBasicMaterial
          color={PRIMARY}
          transparent
          opacity={0.85}
          depthWrite={false}
        />
      </lineSegments>

      {/* Vertex dots on the outer surface */}
      <points>
        <primitive object={vertexGeom} attach="geometry" />
        <pointsMaterial
          color={PRIMARY}
          size={0.05}
          sizeAttenuation
          transparent
          opacity={0.9}
          depthWrite={false}
        />
      </points>

      {/* Inner counter-rotating tetrahedron — adds depth and motion */}
      <group ref={innerRef}>
        <lineSegments>
          <primitive object={innerEdges} attach="geometry" />
          <lineBasicMaterial
            color={PRIMARY}
            transparent
            opacity={0.45}
            depthWrite={false}
          />
        </lineSegments>
      </group>

      {/* Pulsing core */}
      <group ref={coreRef}>
        <lineSegments>
          <primitive object={coreEdges} attach="geometry" />
          <lineBasicMaterial
            ref={coreMatRef}
            color={PRIMARY}
            transparent
            opacity={0.6}
            depthWrite={false}
          />
        </lineSegments>
      </group>
    </group>
  );
};

export const IndustryStackingCubeScene = ({ tiltX, tiltY }: SceneProps) => {
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
      <IndustriesTetra tiltX={tiltX} tiltY={tiltY} />
    </Canvas>
  );
};

export default IndustryStackingCubeScene;
