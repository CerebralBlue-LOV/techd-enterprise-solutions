import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface SceneProps {
  tiltX?: number;
  tiltY?: number;
}

const PRIMARY = "#00B3E3";

// ServicesFigure — wireframe branching flow.
// One inbound trunk on the left splits at a hub into three diverging
// branches on the right, each terminating in a wireframe node.
// Pulses travel from the trunk out along all branches in parallel.

const TRUNK_START_X = -2.6;
const HUB_X = -0.4;
const TIP_X = 2.4;
const BRANCH_YS = [1.1, 0, -1.1] as const;

const PIPE_R = 0.1;
const PIPE_RING_SEG = 12;
const NODE_R = 0.3;

type Vec3 = [number, number, number];

function addRing(pts: number[], center: Vec3, dir: Vec3, r: number, seg: number) {
  // Build a ring of radius r centered at `center`, perpendicular to `dir`.
  const d = new THREE.Vector3(...dir).normalize();
  // Pick an arbitrary up not parallel to d
  const up = Math.abs(d.y) < 0.9 ? new THREE.Vector3(0, 1, 0) : new THREE.Vector3(1, 0, 0);
  const u = new THREE.Vector3().crossVectors(up, d).normalize();
  const v = new THREE.Vector3().crossVectors(d, u).normalize();
  const c = new THREE.Vector3(...center);

  const ring: THREE.Vector3[] = [];
  for (let i = 0; i < seg; i++) {
    const a = (i / seg) * Math.PI * 2;
    ring.push(
      c.clone()
        .addScaledVector(u, Math.cos(a) * r)
        .addScaledVector(v, Math.sin(a) * r)
    );
  }
  for (let i = 0; i < seg; i++) {
    const p0 = ring[i];
    const p1 = ring[(i + 1) % seg];
    pts.push(p0.x, p0.y, p0.z, p1.x, p1.y, p1.z);
  }
  return ring;
}

function addPipe(pts: number[], a: Vec3, b: Vec3) {
  const dir: Vec3 = [b[0] - a[0], b[1] - a[1], b[2] - a[2]];
  const mid: Vec3 = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2];

  const r0 = addRing(pts, a, dir, PIPE_R, PIPE_RING_SEG);
  addRing(pts, mid, dir, PIPE_R, PIPE_RING_SEG);
  const r1 = addRing(pts, b, dir, PIPE_R, PIPE_RING_SEG);

  // 4 longitudinal rails connecting matching points on the end rings.
  for (let i = 0; i < PIPE_RING_SEG; i += PIPE_RING_SEG / 4) {
    const p0 = r0[i];
    const p1 = r1[i];
    pts.push(p0.x, p0.y, p0.z, p1.x, p1.y, p1.z);
  }
}

function buildPipes(): THREE.BufferGeometry {
  const pts: number[] = [];
  // Trunk
  addPipe(pts, [TRUNK_START_X, 0, 0], [HUB_X, 0, 0]);
  // Three branches from hub to each tip
  for (const y of BRANCH_YS) {
    addPipe(pts, [HUB_X, 0, 0], [TIP_X, y, 0]);
  }
  const geom = new THREE.BufferGeometry();
  geom.setAttribute("position", new THREE.BufferAttribute(new Float32Array(pts), 3));
  return geom;
}

function buildNodeEdges(): THREE.BufferGeometry {
  return new THREE.EdgesGeometry(new THREE.OctahedronGeometry(NODE_R, 0));
}

function buildHubEdges(): THREE.BufferGeometry {
  return new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(0.38, 0));
}

function buildPulseGeom(): THREE.BufferGeometry {
  // Small ring marker; will be re-oriented per branch via group rotation.
  const pts: number[] = [];
  const r = PIPE_R * 1.6;
  const seg = 20;
  for (let i = 0; i < seg; i++) {
    const a0 = (i / seg) * Math.PI * 2;
    const a1 = ((i + 1) / seg) * Math.PI * 2;
    pts.push(0, Math.cos(a0) * r, Math.sin(a0) * r);
    pts.push(0, Math.cos(a1) * r, Math.sin(a1) * r);
  }
  const geom = new THREE.BufferGeometry();
  geom.setAttribute("position", new THREE.BufferAttribute(new Float32Array(pts), 3));
  return geom;
}

interface Branch {
  start: Vec3;
  end: Vec3;
  yawZ: number; // rotation around Z to align ring (pipe along +X) with branch dir
}

const BRANCHES: Branch[] = [
  // Trunk treated as branch 0 (pulse enters here first)
  { start: [TRUNK_START_X, 0, 0], end: [HUB_X, 0, 0], yawZ: 0 },
  ...BRANCH_YS.map<Branch>((y) => {
    const dx = TIP_X - HUB_X;
    const dy = y;
    return {
      start: [HUB_X, 0, 0],
      end: [TIP_X, y, 0],
      yawZ: Math.atan2(dy, dx),
    };
  }),
];

const Pulse = ({
  branch,
  phase,
  geom,
}: {
  branch: Branch;
  phase: number;
  geom: THREE.BufferGeometry;
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const matRef = useRef<THREE.LineBasicMaterial>(null);
  const period = 3.6;

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const u = (((t + phase) % period) + period) % period;
    const k = u / period;
    const x = branch.start[0] + (branch.end[0] - branch.start[0]) * k;
    const y = branch.start[1] + (branch.end[1] - branch.start[1]) * k;
    if (groupRef.current) {
      groupRef.current.position.set(x, y, 0);
      groupRef.current.rotation.z = branch.yawZ;
    }
    if (matRef.current) {
      matRef.current.opacity = 0.15 + Math.sin(Math.PI * k) * 0.85;
    }
  });

  return (
    <group ref={groupRef}>
      <lineSegments>
        <primitive object={geom} attach="geometry" />
        <lineBasicMaterial ref={matRef} color={PRIMARY} transparent opacity={1} depthWrite={false} />
      </lineSegments>
    </group>
  );
};

const Flow = ({ tiltX = 0, tiltY = 0 }: SceneProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const hubRef = useRef<THREE.Group>(null);
  const tipRefs = useRef<THREE.Group[]>([]);

  const pipeGeom = useMemo(buildPipes, []);
  const nodeGeom = useMemo(buildNodeEdges, []);
  const hubGeom = useMemo(buildHubEdges, []);
  const pulseGeom = useMemo(buildPulseGeom, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = -0.3 + Math.sin(t * 0.18) * 0.1 + tiltX * 0.18;
      groupRef.current.rotation.x = -0.12 + tiltY * 0.1;
    }
    if (hubRef.current) {
      hubRef.current.rotation.y = t * 0.4;
      hubRef.current.rotation.x = t * 0.25;
    }
    tipRefs.current.forEach((g, i) => {
      if (!g) return;
      g.rotation.y = -t * 0.35 + i * 0.7;
      g.rotation.x = t * 0.22;
    });
  });

  return (
    <group ref={groupRef}>
      {/* Pipes */}
      <lineSegments>
        <primitive object={pipeGeom} attach="geometry" />
        <lineBasicMaterial color={PRIMARY} transparent opacity={0.55} depthWrite={false} />
      </lineSegments>

      {/* Hub */}
      <group ref={hubRef} position={[HUB_X, 0, 0]}>
        <lineSegments>
          <primitive object={hubGeom} attach="geometry" />
          <lineBasicMaterial color={PRIMARY} transparent opacity={0.95} depthWrite={false} />
        </lineSegments>
      </group>

      {/* Tip nodes */}
      {BRANCH_YS.map((y, i) => (
        <group
          key={i}
          position={[TIP_X, y, 0]}
          ref={(el) => {
            if (el) tipRefs.current[i] = el;
          }}
        >
          <lineSegments>
            <primitive object={nodeGeom} attach="geometry" />
            <lineBasicMaterial color={PRIMARY} transparent opacity={0.95} depthWrite={false} />
          </lineSegments>
        </group>
      ))}

      {/* Pulses — one on the trunk, one per branch (offset phases) */}
      <Pulse branch={BRANCHES[0]} phase={0} geom={pulseGeom} />
      <Pulse branch={BRANCHES[1]} phase={1.6} geom={pulseGeom} />
      <Pulse branch={BRANCHES[2]} phase={2.0} geom={pulseGeom} />
      <Pulse branch={BRANCHES[3]} phase={2.4} geom={pulseGeom} />
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
      camera={{ position: [0, 0.2, 6.6], fov: 44 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: "transparent" }}
      frameloop={reduced ? "demand" : "always"}
    >
      <Flow tiltX={tiltX} tiltY={tiltY} />
    </Canvas>
  );
};

export default ServiceIsoCubeScene;
