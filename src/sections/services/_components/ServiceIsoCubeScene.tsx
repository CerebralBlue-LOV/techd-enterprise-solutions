import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface SceneProps {
  tiltX?: number;
  tiltY?: number;
}

const PRIMARY = "#00B3E3";

// ServicesFigure — wireframe target / concentric rings.
// Three concentric rings + radial spokes + center bullseye.
// Tilted slightly so it reads as a 3D disc, with a slow rotation.

const RINGS = [2.2, 1.55, 0.9];
const SEG = 96;
const SPOKES = 12;

function ringPositions(radius: number, segments: number): number[] {
  const pts: number[] = [];
  for (let i = 0; i < segments; i++) {
    const a0 = (i / segments) * Math.PI * 2;
    const a1 = ((i + 1) / segments) * Math.PI * 2;
    pts.push(Math.cos(a0) * radius, Math.sin(a0) * radius, 0);
    pts.push(Math.cos(a1) * radius, Math.sin(a1) * radius, 0);
  }
  return pts;
}

function buildTargetEdges(): THREE.BufferGeometry {
  const pts: number[] = [];

  // Concentric rings
  for (const r of RINGS) {
    pts.push(...ringPositions(r, SEG));
  }

  // Radial spokes from inner ring out to outer ring
  const rInner = RINGS[RINGS.length - 1];
  const rOuter = RINGS[0];
  for (let i = 0; i < SPOKES; i++) {
    const a = (i / SPOKES) * Math.PI * 2;
    const cx = Math.cos(a);
    const cy = Math.sin(a);
    pts.push(cx * rInner, cy * rInner, 0, cx * rOuter, cy * rOuter, 0);
  }

  // Crosshair through the center, slightly past the inner ring
  const cross = rInner * 1.15;
  pts.push(-cross, 0, 0, cross, 0, 0);
  pts.push(0, -cross, 0, 0, cross, 0);

  const geom = new THREE.BufferGeometry();
  geom.setAttribute("position", new THREE.BufferAttribute(new Float32Array(pts), 3));
  return geom;
}

function buildBullseye(): THREE.BufferGeometry {
  // Tiny filled-look dot rendered as a small ring
  const pts: number[] = [];
  pts.push(...ringPositions(0.12, 32));
  const geom = new THREE.BufferGeometry();
  geom.setAttribute("position", new THREE.BufferAttribute(new Float32Array(pts), 3));
  return geom;
}

const Target = ({ tiltX = 0, tiltY = 0 }: SceneProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const outerRef = useRef<THREE.Group>(null);
  const edges = useMemo(buildTargetEdges, []);
  const bull = useMemo(buildBullseye, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      // Disc tilt + subtle wobble from pointer
      groupRef.current.rotation.x = -0.55 + tiltY * 0.1;
      groupRef.current.rotation.y = Math.sin(t * 0.18) * 0.08 + tiltX * 0.18;
    }
    if (outerRef.current) {
      // Slow in-plane rotation of the rings/spokes
      outerRef.current.rotation.z = t * 0.12;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <group ref={outerRef}>
        <lineSegments>
          <primitive object={edges} attach="geometry" />
          <lineBasicMaterial color={PRIMARY} transparent opacity={0.9} depthWrite={false} />
        </lineSegments>
      </group>
      <lineSegments>
        <primitive object={bull} attach="geometry" />
        <lineBasicMaterial color={PRIMARY} transparent opacity={1} depthWrite={false} />
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
      camera={{ position: [0, 0, 6.6], fov: 45 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: "transparent" }}
      frameloop={reduced ? "demand" : "always"}
    >
      <Target tiltX={tiltX} tiltY={tiltY} />
    </Canvas>
  );
};

export default ServiceIsoCubeScene;
