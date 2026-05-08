import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface SceneProps {
  tiltX?: number;
  tiltY?: number;
}

const PRIMARY = "#00B3E3";

// ServicesFigure — wireframe arched bridge, slowly rotating.
// Two parallel arches (front + back), cross-braced, with vertical
// suspension cables down to a deck. Monoline cyan.

const W = 4.4;            // bridge length (X)
const H = 1.4;            // arch peak height (Y)
const D = 0.9;            // bridge depth (Z, distance between front/back)
const N = 16;             // segments along the arch

function archPoint(i: number): [number, number] {
  // Parametric circular arc from (-W/2, 0) to (W/2, 0), peak (0, H).
  // Use a half-ellipse: x = (W/2) * cos(theta), y = H * sin(theta)
  const theta = Math.PI * (1 - i / N);
  return [(W / 2) * Math.cos(theta), H * Math.sin(theta)];
}

function buildBridgeEdges(): THREE.BufferGeometry {
  const pts: number[] = [];
  const halfD = D / 2;

  // Two arches (front z=+halfD, back z=-halfD) — polylines as segments.
  for (const z of [halfD, -halfD]) {
    for (let i = 0; i < N; i++) {
      const [x0, y0] = archPoint(i);
      const [x1, y1] = archPoint(i + 1);
      pts.push(x0, y0, z, x1, y1, z);
    }
  }

  // Cross-braces between front and back arches at every node + diagonals.
  for (let i = 0; i <= N; i++) {
    const [x, y] = archPoint(i);
    pts.push(x, y, halfD, x, y, -halfD);
  }
  // Diagonal cross-bracing (truss): each segment gets an X.
  for (let i = 0; i < N; i++) {
    const [xa, ya] = archPoint(i);
    const [xb, yb] = archPoint(i + 1);
    pts.push(xa, ya, halfD, xb, yb, -halfD);
    pts.push(xb, yb, halfD, xa, ya, -halfD);
  }

  // Suspension cables from arch nodes down to deck (y = 0).
  for (let i = 1; i < N; i++) {
    const [x, y] = archPoint(i);
    pts.push(x, y, halfD, x, 0, halfD);
    pts.push(x, y, -halfD, x, 0, -halfD);
  }

  // Deck — rectangle outline + a few longitudinal lines.
  const deckXs = [-W / 2, W / 2];
  const deckZs = [-halfD, halfD];
  // Long edges
  pts.push(deckXs[0], 0, deckZs[0], deckXs[1], 0, deckZs[0]);
  pts.push(deckXs[0], 0, deckZs[1], deckXs[1], 0, deckZs[1]);
  // Short edges
  pts.push(deckXs[0], 0, deckZs[0], deckXs[0], 0, deckZs[1]);
  pts.push(deckXs[1], 0, deckZs[0], deckXs[1], 0, deckZs[1]);
  // Cross ties along the deck at each arch node
  for (let i = 1; i < N; i++) {
    const [x] = archPoint(i);
    pts.push(x, 0, -halfD, x, 0, halfD);
  }

  const geom = new THREE.BufferGeometry();
  geom.setAttribute("position", new THREE.BufferAttribute(new Float32Array(pts), 3));
  return geom;
}

const Bridge = ({ tiltX = 0, tiltY = 0 }: SceneProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const edges = useMemo(buildBridgeEdges, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.15 + tiltX * 0.2;
      groupRef.current.rotation.x = -0.18 + Math.sin(t * 0.12) * 0.04 + tiltY * 0.08;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.3, 0]}>
      <lineSegments>
        <primitive object={edges} attach="geometry" />
        <lineBasicMaterial color={PRIMARY} transparent opacity={0.9} depthWrite={false} />
      </lineSegments>
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
      camera={{ position: [0, 0.4, 6.4], fov: 42 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: "transparent" }}
      frameloop={reduced ? "demand" : "always"}
    >
      <Bridge tiltX={tiltX} tiltY={tiltY} />
    </Canvas>
  );
};

export default ServiceIsoCubeScene;
