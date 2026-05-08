import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface SceneProps {
  tiltX?: number;
  tiltY?: number;
}

const PRIMARY = "#00B3E3";

// IndustriesFigure — wireframe square-based pyramid with subdivided
// triangular faces (each face split into N x N small triangles).
// Rendered in monoline cyan, viewed from an isometric angle.

const BASE = 3.2;        // base edge length
const HEIGHT = 2.6;      // apex height
const N = 4;             // subdivisions per face

type V = [number, number, number];

const lerp3 = (a: V, b: V, t: number): V => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
  a[2] + (b[2] - a[2]) * t,
];

// Build edge segments for a triangular face subdivided into N rows.
// Apex A, base corners B0, B1. At row k (0..N) we sample k+1 points
// along the line from A→base-edge at that height.
function faceEdges(A: V, B0: V, B1: V, n: number): V[] {
  const segs: V[] = [];
  const rows: V[][] = [];
  for (let k = 0; k <= n; k++) {
    const t = k / n;
    const left = lerp3(A, B0, t);
    const right = lerp3(A, B1, t);
    const row: V[] = [];
    const count = k + 1;
    for (let i = 0; i < count; i++) {
      const s = count === 1 ? 0 : i / (count - 1);
      row.push(lerp3(left, right, s));
    }
    rows.push(row);
  }
  // Horizontal segments along each row (skip apex row of 1 point)
  for (let k = 1; k <= n; k++) {
    for (let i = 0; i < rows[k].length - 1; i++) {
      segs.push(rows[k][i], rows[k][i + 1]);
    }
  }
  // Slant segments connecting row k to row k+1
  for (let k = 0; k < n; k++) {
    const upper = rows[k];
    const lower = rows[k + 1];
    for (let i = 0; i < upper.length; i++) {
      // left slant
      segs.push(upper[i], lower[i]);
      // right slant
      segs.push(upper[i], lower[i + 1]);
    }
  }
  return segs;
}

function makePyramidEdges(): THREE.BufferGeometry {
  const h = BASE / 2;
  // 4 base corners (y = 0, centered)
  const c0: V = [-h, 0, -h];
  const c1: V = [h, 0, -h];
  const c2: V = [h, 0, h];
  const c3: V = [-h, 0, h];
  const apex: V = [0, HEIGHT, 0];

  const all: V[] = [
    ...faceEdges(apex, c0, c1, N),
    ...faceEdges(apex, c1, c2, N),
    ...faceEdges(apex, c2, c3, N),
    ...faceEdges(apex, c3, c0, N),
    // base square
    c0, c1, c1, c2, c2, c3, c3, c0,
  ];

  const positions = new Float32Array(all.length * 3);
  for (let i = 0; i < all.length; i++) {
    positions[i * 3] = all[i][0];
    positions[i * 3 + 1] = all[i][1];
    positions[i * 3 + 2] = all[i][2];
  }
  const geom = new THREE.BufferGeometry();
  geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  return geom;
}

const Pyramid = ({ tiltX = 0, tiltY = 0 }: SceneProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const edges = useMemo(makePyramidEdges, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.25 + tiltX * 0.2;
      groupRef.current.rotation.x =
        -0.35 + Math.sin(t * 0.3) * 0.05 + tiltY * 0.08;
    }
  });

  return (
    <group ref={groupRef} position={[0, -HEIGHT * 0.35, 0]}>
      <lineSegments>
        <primitive object={edges} attach="geometry" />
        <lineBasicMaterial
          color={PRIMARY}
          transparent
          opacity={0.95}
          depthWrite={false}
        />
      </lineSegments>
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
      camera={{ position: [0, 0, 7], fov: 42 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: "transparent" }}
      frameloop={reduced ? "demand" : "always"}
    >
      <Pyramid tiltX={tiltX} tiltY={tiltY} />
    </Canvas>
  );
};

export default IndustryStackingCubeScene;
