import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface SceneProps {
  tiltX?: number;
  tiltY?: number;
}

const PRIMARY = "#00B3E3";

// ServicesFigure — 3D wireframe target / gyro-reticle.
// A tilted flat target (rings + spokes + tick marks + reticle brackets)
// surrounded by two orbiting rings on offset axes, plus a tracker bead
// circling the outer ring. Reads as 'precision delivery, hitting the goal',
// with depth and motion that feels engineered rather than decorative.

const RINGS: Array<{ r: number; opacity: number }> = [
  { r: 2.4, opacity: 0.55 },
  { r: 2.0, opacity: 0.7 },
  { r: 1.55, opacity: 0.8 },
  { r: 1.1, opacity: 0.9 },
  { r: 0.65, opacity: 1 },
  { r: 0.28, opacity: 1 },
];
const RING_SEG = 128;
const SPOKES_MAJOR = 8;
const SPOKES_MINOR = 24;
const TICKS_OUTER = 72;
const ORBIT_R = 2.15;

function ringSegments(pts: number[], radius: number, segments: number) {
  for (let i = 0; i < segments; i++) {
    const a0 = (i / segments) * Math.PI * 2;
    const a1 = ((i + 1) / segments) * Math.PI * 2;
    pts.push(Math.cos(a0) * radius, Math.sin(a0) * radius, 0);
    pts.push(Math.cos(a1) * radius, Math.sin(a1) * radius, 0);
  }
}

// Build edges that DON'T need per-ring opacity (spokes, ticks, brackets).
function buildReticleEdges(): THREE.BufferGeometry {
  const pts: number[] = [];
  const rOuter = RINGS[0].r;
  const rInner = RINGS[RINGS.length - 1].r;

  // Major radial spokes
  for (let i = 0; i < SPOKES_MAJOR; i++) {
    const a = (i / SPOKES_MAJOR) * Math.PI * 2;
    const cx = Math.cos(a);
    const cy = Math.sin(a);
    pts.push(cx * rInner, cy * rInner, 0, cx * rOuter, cy * rOuter, 0);
  }

  // Minor radial ticks (between 2nd and outermost rings)
  const rB = RINGS[1].r;
  for (let i = 0; i < SPOKES_MINOR; i++) {
    if (i % (SPOKES_MINOR / SPOKES_MAJOR) === 0) continue;
    const a = (i / SPOKES_MINOR) * Math.PI * 2;
    const cx = Math.cos(a);
    const cy = Math.sin(a);
    pts.push(cx * rB, cy * rB, 0, cx * rOuter, cy * rOuter, 0);
  }

  // Outer-edge tick marks
  const tickInner = rOuter;
  const tickShort = rOuter + 0.08;
  const tickLong = rOuter + 0.2;
  for (let i = 0; i < TICKS_OUTER; i++) {
    const a = (i / TICKS_OUTER) * Math.PI * 2;
    const cx = Math.cos(a);
    const cy = Math.sin(a);
    const long = i % (TICKS_OUTER / SPOKES_MAJOR) === 0;
    const tEnd = long ? tickLong : tickShort;
    pts.push(cx * tickInner, cy * tickInner, 0, cx * tEnd, cy * tEnd, 0);
  }

  // Crosshair with center gap
  const gap = RINGS[RINGS.length - 1].r * 0.6;
  const crossEnd = rOuter * 1.12;
  pts.push(-crossEnd, 0, 0, -gap, 0, 0);
  pts.push(gap, 0, 0, crossEnd, 0, 0);
  pts.push(0, -crossEnd, 0, 0, -gap, 0);
  pts.push(0, gap, 0, 0, crossEnd, 0);

  // Reticle corner brackets at the diagonals
  const bracketR = rOuter * 0.92;
  const bracketLen = 0.24;
  for (let q = 0; q < 4; q++) {
    const a = Math.PI / 4 + (q * Math.PI) / 2;
    const cx = Math.cos(a);
    const cy = Math.sin(a);
    const px = cx * bracketR;
    const py = cy * bracketR;
    const tx = -cy;
    const ty = cx;
    pts.push(px, py, 0, px + tx * bracketLen, py + ty * bracketLen, 0);
    pts.push(px, py, 0, px - tx * bracketLen, py - ty * bracketLen, 0);
  }

  // Bullseye + tiny center cross
  ringSegments(pts, 0.1, 28);
  pts.push(-0.06, 0, 0, 0.06, 0, 0);
  pts.push(0, -0.06, 0, 0, 0.06, 0);

  const geom = new THREE.BufferGeometry();
  geom.setAttribute("position", new THREE.BufferAttribute(new Float32Array(pts), 3));
  return geom;
}

function buildSingleRing(radius: number, segments: number): THREE.BufferGeometry {
  const pts: number[] = [];
  ringSegments(pts, radius, segments);
  const geom = new THREE.BufferGeometry();
  geom.setAttribute("position", new THREE.BufferAttribute(new Float32Array(pts), 3));
  return geom;
}

function buildOrbitRing(radius: number): THREE.BufferGeometry {
  const pts: number[] = [];
  ringSegments(pts, radius, 96);
  // gauge ticks every 15°
  const seg = 24;
  for (let i = 0; i < seg; i++) {
    const a = (i / seg) * Math.PI * 2;
    const cx = Math.cos(a);
    const cy = Math.sin(a);
    const len = i % 4 === 0 ? 0.16 : 0.07;
    pts.push(cx * radius, cy * radius, 0, cx * (radius + len), cy * (radius + len), 0);
  }
  const geom = new THREE.BufferGeometry();
  geom.setAttribute("position", new THREE.BufferAttribute(new Float32Array(pts), 3));
  return geom;
}

function buildDiamondMarker(): THREE.BufferGeometry {
  // Small wireframe diamond (octahedron) used as the tracker bead.
  return new THREE.EdgesGeometry(new THREE.OctahedronGeometry(0.11, 0));
}

const Target = ({ tiltX = 0, tiltY = 0 }: SceneProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const ringsRef = useRef<THREE.Group>(null);
  const orbitARef = useRef<THREE.Group>(null);
  const orbitBRef = useRef<THREE.Group>(null);
  const trackerRef = useRef<THREE.Group>(null);

  const reticleGeom = useMemo(buildReticleEdges, []);
  const ringGeoms = useMemo(
    () => RINGS.map((r) => buildSingleRing(r.r, RING_SEG)),
    []
  );
  const orbitAGeom = useMemo(() => buildOrbitRing(ORBIT_R), []);
  const orbitBGeom = useMemo(() => buildOrbitRing(ORBIT_R * 0.78), []);
  const trackerGeom = useMemo(buildDiamondMarker, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.x = -0.5 + Math.sin(t * 0.12) * 0.04 + tiltY * 0.1;
      groupRef.current.rotation.y = Math.sin(t * 0.15) * 0.08 + tiltX * 0.18;
    }
    if (ringsRef.current) {
      ringsRef.current.rotation.z = t * 0.08;
    }
    if (orbitARef.current) {
      orbitARef.current.rotation.z = -t * 0.28;
      orbitARef.current.rotation.y = 0.7 + Math.sin(t * 0.2) * 0.12;
      orbitARef.current.rotation.x = 0.18;
    }
    if (orbitBRef.current) {
      orbitBRef.current.rotation.z = t * 0.42;
      orbitBRef.current.rotation.x = -0.65 + Math.sin(t * 0.17) * 0.1;
      orbitBRef.current.rotation.y = -0.25;
    }
    if (trackerRef.current) {
      // Tracker bead orbiting the outer ring in-plane
      const speed = 0.55;
      const a = t * speed;
      trackerRef.current.position.set(
        Math.cos(a) * RINGS[0].r,
        Math.sin(a) * RINGS[0].r,
        0
      );
      trackerRef.current.rotation.y = t * 0.6;
      trackerRef.current.rotation.x = t * 0.4;
    }
  });

  return (
    <group ref={groupRef}>
      <group ref={ringsRef}>
        {/* Per-ring opacity for depth hierarchy */}
        {RINGS.map((r, i) => (
          <lineSegments key={i}>
            <primitive object={ringGeoms[i]} attach="geometry" />
            <lineBasicMaterial color={PRIMARY} transparent opacity={r.opacity} depthWrite={false} />
          </lineSegments>
        ))}

        {/* Reticle: spokes, ticks, brackets, crosshair, bullseye */}
        <lineSegments>
          <primitive object={reticleGeom} attach="geometry" />
          <lineBasicMaterial color={PRIMARY} transparent opacity={0.85} depthWrite={false} />
        </lineSegments>

        {/* Tracker bead orbits in the same plane as the rings */}
        <group ref={trackerRef}>
          <lineSegments>
            <primitive object={trackerGeom} attach="geometry" />
            <lineBasicMaterial color={PRIMARY} transparent opacity={1} depthWrite={false} />
          </lineSegments>
        </group>
      </group>

      {/* Two orbiting tilted rings on offset axes — gyroscope feel */}
      <group ref={orbitARef}>
        <lineSegments>
          <primitive object={orbitAGeom} attach="geometry" />
          <lineBasicMaterial color={PRIMARY} transparent opacity={0.55} depthWrite={false} />
        </lineSegments>
      </group>
      <group ref={orbitBRef}>
        <lineSegments>
          <primitive object={orbitBGeom} attach="geometry" />
          <lineBasicMaterial color={PRIMARY} transparent opacity={0.45} depthWrite={false} />
        </lineSegments>
      </group>
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
