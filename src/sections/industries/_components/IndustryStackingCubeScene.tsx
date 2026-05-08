import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface SceneProps {
  tiltX?: number;
  tiltY?: number;
}

const PRIMARY = "#00B3E3";

// IndustriesFigure — isometric wireframe cube containing a smaller
// cube. Outer cube holds a steady iso pose; inner cube counter-rotates
// gently. Monoline cyan, matching the figure system.

const OUTER = 2.4;
const INNER = 1.2;

const IsoCubes = ({ tiltX = 0, tiltY = 0 }: SceneProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Group>(null);

  const outerEdges = useMemo(
    () => new THREE.EdgesGeometry(new THREE.BoxGeometry(OUTER, OUTER, OUTER)),
    [],
  );
  const innerEdges = useMemo(
    () => new THREE.EdgesGeometry(new THREE.BoxGeometry(INNER, INNER, INNER)),
    [],
  );

  // Connector lines from each outer corner to the matching inner corner.
  const connectors = useMemo(() => {
    const ho = OUTER / 2;
    const hi = INNER / 2;
    const signs: Array<[number, number, number]> = [];
    for (const sx of [-1, 1])
      for (const sy of [-1, 1])
        for (const sz of [-1, 1]) signs.push([sx, sy, sz]);
    const pts: number[] = [];
    for (const [sx, sy, sz] of signs) {
      pts.push(sx * ho, sy * ho, sz * ho, sx * hi, sy * hi, sz * hi);
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(pts), 3),
    );
    return geom;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      // Classic isometric pose: tilt top toward camera, slow yaw drift.
      groupRef.current.rotation.x = -Math.atan(1 / Math.sqrt(2)) + tiltY * 0.06;
      groupRef.current.rotation.y = Math.PI / 4 + t * 0.15 + tiltX * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Outer cube */}
      <lineSegments>
        <primitive object={outerEdges} attach="geometry" />
        <lineBasicMaterial
          color={PRIMARY}
          transparent
          opacity={0.95}
          depthWrite={false}
        />
      </lineSegments>

      {/* Connectors corner-to-corner */}
      <lineSegments>
        <primitive object={connectors} attach="geometry" />
        <lineBasicMaterial
          color={PRIMARY}
          transparent
          opacity={0.45}
          depthWrite={false}
        />
      </lineSegments>

      {/* Inner cube — gently counter-rotates */}
      <group ref={innerRef}>
        <lineSegments>
          <primitive object={innerEdges} attach="geometry" />
          <lineBasicMaterial
            color={PRIMARY}
            transparent
            opacity={0.85}
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
      camera={{ position: [0, 0, 6.5], fov: 42 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: "transparent" }}
      frameloop={reduced ? "demand" : "always"}
    >
      <IsoCubes tiltX={tiltX} tiltY={tiltY} />
    </Canvas>
  );
};

export default IndustryStackingCubeScene;
