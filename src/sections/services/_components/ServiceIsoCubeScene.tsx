import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface SceneProps {
  tiltX?: number;
  tiltY?: number;
}

const PRIMARY = "#00B3E3";

// ServicesFigure — wireframe target / reticle.
// Dense concentric rings, radial spokes, tick marks, crosshair, and an
// orbiting tilted ring. Reads as 'precision delivery, hitting the goal'.

const RINGS = [2.4, 2.0, 1.55, 1.1, 0.65, 0.28];
const RING_SEG = 128;
const SPOKES_MAJOR = 8;   // long spokes from center to outermost ring
const SPOKES_MINOR = 24;  // short ticks on outermost ring
const TICKS_OUTER = 72;   // tiny tick marks on outermost ring
const ORBIT_R = 2.1;      // tilted orbiting ring radius

function ringSegments(pts: number[], radius: number, segments: number) {
  for (let i = 0; i < segments; i++) {
    const a0 = (i / segments) * Math.PI * 2;
    const a1 = ((i + 1) / segments) * Math.PI * 2;
    pts.push(Math.cos(a0) * radius, Math.sin(a0) * radius, 0);
    pts.push(Math.cos(a1) * radius, Math.sin(a1) * radius, 0);
  }
}

function buildTargetEdges(): THREE.BufferGeometry {
  const pts: number[] = [];

  // Concentric rings
  for (const r of RINGS) ringSegments(pts, r, RING_SEG);

  const rOuter = RINGS[0];
  const rInner = RINGS[RINGS.length - 1];

  // Major radial spokes (full radius, every 45°)
  for (let i = 0; i < SPOKES_MAJOR; i++) {
    const a = (i / SPOKES_MAJOR) * Math.PI * 2;
    const cx = Math.cos(a);
    const cy = Math.sin(a);
    pts.push(cx * rInner, cy * rInner, 0, cx * rOuter, cy * rOuter, 0);
  }

  // Minor radial ticks (between 2nd and outermost rings)
  const rB = RINGS[1];
  for (let i = 0; i < SPOKES_MINOR; i++) {
    if (i % (SPOKES_MINOR / SPOKES_MAJOR) === 0) continue; // skip where major spokes sit
    const a = (i / SPOKES_MINOR) * Math.PI * 2;
    const cx = Math.cos(a);
    const cy = Math.sin(a);
    pts.push(cx * rB, cy * rB, 0, cx * rOuter, cy * rOuter, 0);
  }

  // Outer-edge tick marks (small protruding ticks just outside outer ring)
  const tickInner = rOuter;
  const tickShort = rOuter + 0.08;
  const tickLong = rOuter + 0.18;
  for (let i = 0; i < TICKS_OUTER; i++) {
    const a = (i / TICKS_OUTER) * Math.PI * 2;
    const cx = Math.cos(a);
    const cy = Math.sin(a);
    const long = i % (TICKS_OUTER / SPOKES_MAJOR) === 0;
    const tEnd = long ? tickLong : tickShort;
    pts.push(cx * tickInner, cy * tickInner, 0, cx * tEnd, cy * tEnd, 0);
  }

  // Crosshair: 4 segments with a small gap at center
  const gap = RINGS[RINGS.length - 1] * 0.6;
  const crossEnd = rOuter * 1.1;
  pts.push(-crossEnd, 0, 0, -gap, 0, 0);
  pts.push(gap, 0, 0, crossEnd, 0, 0);
  pts.push(0, -crossEnd, 0, 0, -gap, 0);
  pts.push(0, gap, 0, 0, crossEnd, 0);

  // Reticle corner brackets at the diagonals (4 short L-marks at outermost ring)
  const bracketR = rOuter * 0.92;
  const bracketLen = 0.22;
  for (let q = 0; q < 4; q++) {
    const a = Math.PI / 4 + (q * Math.PI) / 2;
    const cx = Math.cos(a);
    const cy = Math.sin(a);
    const px = cx * bracketR;
    const py = cy * bracketR;
    // tangent direction
    const tx = -cy;
    const ty = cx;
    // radial direction
    const rx = cx;
    const ry = cy;
    pts.push(px, py, 0, px + tx * bracketLen, py + ty * bracketLen, 0);
    pts.push(px, py, 0, px + rx * bracketLen, py + ry * bracketLen, 0);
  }

  const geom = new THREE.BufferGeometry();
  geom.setAttribute("position", new THREE.BufferAttribute(new Float32Array(pts), 3));
  return geom;
}

function buildOrbitRing(): THREE.BufferGeometry {
  const pts: number[] = [];
  ringSegments(pts, ORBIT_R, 96);
  // Add small tick marks every 30° for a 'gauge' feel
  const seg = 24;
  for (let i = 0; i < seg; i++) {
    const a = (i / seg) * Math.PI * 2;
    const cx = Math.cos(a);
    const cy = Math.sin(a);
    const len = i % 4 === 0 ? 0.16 : 0.08;
    pts.push(cx * ORBIT_R, cy * ORBIT_R, 0, cx * (ORBIT_R + len), cy * (ORBIT_R + len), 0);
  }
  const geom = new THREE.BufferGeometry();
  geom.setAttribute("position", new THREE.BufferAttribute(new Float32Array(pts), 3));
  return geom;
}

function buildBullseye(): THREE.BufferGeometry {
  const pts: number[] = [];
  ringSegments(pts, 0.1, 28);
  // tiny inner cross
  pts.push(-0.06, 0, 0, 0.06, 0, 0);
  pts.push(0, -0.06, 0, 0, 0.06, 0);
  const geom = new THREE.BufferGeometry();
  geom.setAttribute("position", new THREE.BufferAttribute(new Float32Array(pts), 3));
  return geom;
}

const Target = ({ tiltX = 0, tiltY = 0 }: SceneProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const ringsRef = useRef<THREE.Group>(null);
  const orbitRef = useRef<THREE.Group>(null);

  const targetGeom = useMemo(buildTargetEdges, []);
  const orbitGeom = useMemo(buildOrbitRing, []);
  const bullGeom = useMemo(buildBullseye, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.x = -0.5 + Math.sin(t * 0.12) * 0.04 + tiltY * 0.1;
      groupRef.current.rotation.y = Math.sin(t * 0.15) * 0.08 + tiltX * 0.18;
    }
    if (ringsRef.current) {
      ringsRef.current.rotation.z = t * 0.08;
    }
    if (orbitRef.current) {
      // Tilted ring spinning around its own axis, also slowly precessing
      orbitRef.current.rotation.z = -t * 0.25;
      orbitRef.current.rotation.y = 0.65 + Math.sin(t * 0.2) * 0.1;
      orbitRef.current.rotation.x = 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      <group ref={ringsRef}>
        <lineSegments>
          <primitive object={targetGeom} attach="geometry" />
          <lineBasicMaterial color={PRIMARY} transparent opacity={0.85} depthWrite={false} />
        </lineSegments>
      </group>

      {/* Tilted orbiting ring for added depth and motion */}
      <group ref={orbitRef}>
        <lineSegments>
          <primitive object={orbitGeom} attach="geometry" />
          <lineBasicMaterial color={PRIMARY} transparent opacity={0.6} depthWrite={false} />
        </lineSegments>
      </group>

      {/* Center bullseye, never rotates */}
      <lineSegments>
        <primitive object={bullGeom} attach="geometry" />
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
      camera={{ position: [0, 0, 7], fov: 44 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: "transparent" }}
      frameloop={reduced ? "demand" : "always"}
    >
      <Target tiltX={tiltX} tiltY={tiltY} />
    </Canvas>
  );
};

export default ServiceIsoCubeScene;
