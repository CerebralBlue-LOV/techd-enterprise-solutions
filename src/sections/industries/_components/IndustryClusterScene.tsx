import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface SceneProps {
  tiltX?: number;
  tiltY?: number;
}

const PRIMARY = "#00B3E3";

// Isometric wireframe cube cluster: 7 cubes arranged as a 3D plus-sign
// (one center cube + 6 axis-neighbours). Each cube floats on its own
// phase; the whole cluster rotates slowly. Inspired by the Dribbble
// "Isometric Shapes" reference.

const CUBE = 1.0;       // cube edge length
const GAP = 0.04;       // gap between cubes
const STEP = CUBE + GAP;

// Center + 6 axis neighbours
const POSITIONS: [number, number, number][] = [
  [0, 0, 0],
  [STEP, 0, 0],
  [-STEP, 0, 0],
  [0, STEP, 0],
  [0, -STEP, 0],
  [0, 0, STEP],
  [0, 0, -STEP],
];

const Cluster = ({ tiltX = 0, tiltY = 0 }: SceneProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const cubeRefs = useRef<(THREE.Group | null)[]>([]);

  // Shared edges geometry — built once
  const edges = useMemo(
    () => new THREE.EdgesGeometry(new THREE.BoxGeometry(CUBE, CUBE, CUBE)),
    [],
  );

  // Tiny corner-node geometry (8 vertices of the cube)
  const corners = useMemo(() => {
    const h = CUBE / 2;
    const pts: THREE.Vector3[] = [];
    for (const x of [-h, h])
      for (const y of [-h, h])
        for (const z of [-h, h]) pts.push(new THREE.Vector3(x, y, z));
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      // Slow isometric-style rotation
      groupRef.current.rotation.y = t * 0.18 + tiltX * 0.2;
      groupRef.current.rotation.x =
        -0.35 + Math.sin(t * 0.12) * 0.04 + tiltY * 0.08;
      groupRef.current.position.y = Math.sin(t * 0.32) * 0.18;
    }
    cubeRefs.current.forEach((g, i) => {
      if (!g) return;
      const base = POSITIONS[i];
      // Each satellite drifts gently outward/inward along its own axis;
      // center cube counter-rotates in place.
      if (i === 0) {
        g.rotation.y = -t * 0.35;
        g.rotation.x = t * 0.25;
      } else {
        const phase = t * 0.6 + i * 0.9;
        const offset = Math.sin(phase) * 0.08;
        const dir = base.map((v) => (v === 0 ? 0 : Math.sign(v))) as [
          number,
          number,
          number,
        ];
        g.position.set(
          base[0] + dir[0] * offset,
          base[1] + dir[1] * offset,
          base[2] + dir[2] * offset,
        );
      }
    });
  });

  return (
    <group ref={groupRef} rotation={[-0.35, 0.6, 0]}>
      {POSITIONS.map((pos, i) => (
        <group
          key={i}
          position={pos}
          ref={(g) => (cubeRefs.current[i] = g)}
        >
          <lineSegments>
            <primitive object={edges} attach="geometry" />
            <lineBasicMaterial
              color={PRIMARY}
              transparent
              opacity={i === 0 ? 0.95 : 0.78}
              depthWrite={false}
            />
          </lineSegments>
          <points>
            <primitive object={corners} attach="geometry" />
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
      ))}
    </group>
  );
};

export const IndustryClusterScene = ({ tiltX, tiltY }: SceneProps) => {
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [4.5, 3.5, 5.5], fov: 38 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: "transparent" }}
      frameloop={reduced ? "demand" : "always"}
    >
      <Cluster tiltX={tiltX} tiltY={tiltY} />
    </Canvas>
  );
};

export default IndustryClusterScene;
