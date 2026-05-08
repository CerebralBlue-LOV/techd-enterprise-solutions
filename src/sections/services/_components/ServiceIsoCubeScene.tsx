import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface SceneProps {
  tiltX?: number;
  tiltY?: number;
}

const PRIMARY = "#00B3E3";

// ServicesFigure — two interlocking wireframe gears rotating in
// opposite directions at the correct gear ratio. Monoline cyan.

interface GearSpec {
  teeth: number;
  outerR: number;
  rootR: number;
  hubR: number;
  depth: number;
}

function buildGearEdges(spec: GearSpec): THREE.BufferGeometry {
  const { teeth, outerR, rootR, hubR, depth } = spec;
  const shape = new THREE.Shape();
  const step = (Math.PI * 2) / teeth;

  for (let i = 0; i < teeth; i++) {
    const base = i * step;
    const a1 = base - step * 0.22;
    const a2 = base - step * 0.12;
    const a3 = base + step * 0.12;
    const a4 = base + step * 0.22;
    const p1 = [Math.cos(a1) * rootR, Math.sin(a1) * rootR];
    const p2 = [Math.cos(a2) * outerR, Math.sin(a2) * outerR];
    const p3 = [Math.cos(a3) * outerR, Math.sin(a3) * outerR];
    const p4 = [Math.cos(a4) * rootR, Math.sin(a4) * rootR];
    if (i === 0) shape.moveTo(p1[0], p1[1]);
    else shape.lineTo(p1[0], p1[1]);
    shape.lineTo(p2[0], p2[1]);
    shape.lineTo(p3[0], p3[1]);
    shape.lineTo(p4[0], p4[1]);
  }
  shape.closePath();

  const hole = new THREE.Path();
  hole.absarc(0, 0, hubR, 0, Math.PI * 2, false);
  shape.holes.push(hole);

  const geom = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: false,
    curveSegments: 24,
    steps: 1,
  });
  geom.translate(0, 0, -depth / 2);
  return new THREE.EdgesGeometry(geom, 20);
}

function buildSpokes(rOuter: number, rInner: number, count: number): THREE.BufferGeometry {
  const pts: number[] = [];
  for (let i = 0; i < count; i++) {
    const a = (i / count) * Math.PI * 2;
    const c = Math.cos(a);
    const s = Math.sin(a);
    pts.push(c * rInner, s * rInner, 0, c * rOuter, s * rOuter, 0);
  }
  const ringSegs = 64;
  for (let i = 0; i < ringSegs; i++) {
    const a0 = (i / ringSegs) * Math.PI * 2;
    const a1 = ((i + 1) / ringSegs) * Math.PI * 2;
    pts.push(
      Math.cos(a0) * rInner, Math.sin(a0) * rInner, 0,
      Math.cos(a1) * rInner, Math.sin(a1) * rInner, 0,
    );
  }
  const geom = new THREE.BufferGeometry();
  geom.setAttribute("position", new THREE.BufferAttribute(new Float32Array(pts), 3));
  return geom;
}

const Gears = ({ tiltX = 0, tiltY = 0 }: SceneProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const g1Ref = useRef<THREE.Group>(null);
  const g2Ref = useRef<THREE.Group>(null);

  const A: GearSpec = { teeth: 18, outerR: 1.55, rootR: 1.30, hubR: 0.32, depth: 0.18 };
  const B: GearSpec = { teeth: 12, outerR: 1.08, rootR: 0.87, hubR: 0.22, depth: 0.18 };

  const gearAEdges = useMemo(() => buildGearEdges(A), []);
  const gearBEdges = useMemo(() => buildGearEdges(B), []);
  const spokesA = useMemo(() => buildSpokes(A.rootR * 0.85, A.hubR + 0.08, 6), []);
  const spokesB = useMemo(() => buildSpokes(B.rootR * 0.82, B.hubR + 0.06, 5), []);

  const D = A.rootR + B.rootR - 0.04;
  const phaseB = Math.PI / B.teeth;

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.x = -0.32 + tiltY * 0.08;
      groupRef.current.rotation.y = -0.18 + tiltX * 0.1;
    }
    const omega = 0.15;
    if (g1Ref.current) g1Ref.current.rotation.z = t * omega;
    if (g2Ref.current)
      g2Ref.current.rotation.z = -t * omega * (A.teeth / B.teeth) + phaseB;
  });

  return (
    <group ref={groupRef}>
      <group ref={g1Ref} position={[-D / 2, 0, 0]}>
        <lineSegments>
          <primitive object={gearAEdges} attach="geometry" />
          <lineBasicMaterial color={PRIMARY} transparent opacity={0.95} depthWrite={false} />
        </lineSegments>
        <lineSegments>
          <primitive object={spokesA} attach="geometry" />
          <lineBasicMaterial color={PRIMARY} transparent opacity={0.55} depthWrite={false} />
        </lineSegments>
      </group>
      <group ref={g2Ref} position={[D / 2, 0, 0]}>
        <lineSegments>
          <primitive object={gearBEdges} attach="geometry" />
          <lineBasicMaterial color={PRIMARY} transparent opacity={0.95} depthWrite={false} />
        </lineSegments>
        <lineSegments>
          <primitive object={spokesB} attach="geometry" />
          <lineBasicMaterial color={PRIMARY} transparent opacity={0.55} depthWrite={false} />
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
      camera={{ position: [0, 0, 6.2], fov: 42 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: "transparent" }}
      frameloop={reduced ? "demand" : "always"}
    >
      <Gears tiltX={tiltX} tiltY={tiltY} />
    </Canvas>
  );
};

export default ServiceIsoCubeScene;
