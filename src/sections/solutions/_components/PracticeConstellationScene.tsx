import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface SceneProps {
  /** Cursor in -1..1, parallax tilt */
  tiltX: number;
  tiltY: number;
}

const NODE_COUNT = 90;
const RADIUS = 4.5;
const LINK_DIST = 1.55;
const HIGHLIGHT_COUNT = 10;
const PRIMARY = new THREE.Color("#00B3E3");
const HIGHLIGHT = new THREE.Color("#7CE6FF");

/** Random points inside a flattened sphere — gives a network-graph feel */
function generateNodes(count: number, radius: number) {
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i < count; i++) {
    // uniform-ish in a flattened ellipsoid
    const u = Math.random();
    const v = Math.random();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);
    const r = radius * Math.cbrt(Math.random());
    pts.push(
      new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta) * 0.55, // flatten Y
        r * Math.cos(phi)
      )
    );
  }
  return pts;
}

const Constellation = ({ tiltX, tiltY }: SceneProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const { nodes, basePositions, lineGeometry } = useMemo(() => {
    const nodes = generateNodes(NODE_COUNT, RADIUS);
    const basePositions = new Float32Array(nodes.length * 3);
    nodes.forEach((p, i) => {
      basePositions[i * 3] = p.x;
      basePositions[i * 3 + 1] = p.y;
      basePositions[i * 3 + 2] = p.z;
    });

    // Pre-compute line pairs within LINK_DIST
    const linePositions: number[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].distanceTo(nodes[j]) < LINK_DIST) {
          linePositions.push(
            nodes[i].x, nodes[i].y, nodes[i].z,
            nodes[j].x, nodes[j].y, nodes[j].z
          );
        }
      }
    }
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(linePositions), 3)
    );
    return { nodes, basePositions, lineGeometry };
  }, []);

  // Drift each node subtly
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const points = pointsRef.current;
    const lines = linesRef.current;
    if (!points || !lines) return;

    const posAttr = points.geometry.attributes.position as THREE.BufferAttribute;
    const linePosAttr = lines.geometry.attributes.position as THREE.BufferAttribute;

    // Update node positions with subtle wobble
    const updated: THREE.Vector3[] = [];
    for (let i = 0; i < nodes.length; i++) {
      const bx = basePositions[i * 3];
      const by = basePositions[i * 3 + 1];
      const bz = basePositions[i * 3 + 2];
      const wobble = 0.08;
      const x = bx + Math.sin(t * 0.4 + i * 0.7) * wobble;
      const y = by + Math.cos(t * 0.35 + i * 1.1) * wobble;
      const z = bz + Math.sin(t * 0.3 + i * 0.5) * wobble;
      posAttr.setXYZ(i, x, y, z);
      updated.push(new THREE.Vector3(x, y, z));
    }
    posAttr.needsUpdate = true;

    // Rebuild line positions from updated nodes (same indices)
    let li = 0;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].distanceTo(nodes[j]) < LINK_DIST) {
          linePosAttr.setXYZ(li, updated[i].x, updated[i].y, updated[i].z);
          linePosAttr.setXYZ(li + 1, updated[j].x, updated[j].y, updated[j].z);
          li += 2;
        }
      }
    }
    linePosAttr.needsUpdate = true;

    // Slow rotation + parallax tilt
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.05 + tiltX * 0.25;
      groupRef.current.rotation.x = tiltY * 0.15;
    }
  });

  const pointGeometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(basePositions.slice(), 3));
    return g;
  }, [basePositions]);

  // Pick a stable subset of nodes for highlight glow
  const highlightGeometry = useMemo(() => {
    const idx = new Set<number>();
    while (idx.size < HIGHLIGHT_COUNT) idx.add(Math.floor(Math.random() * NODE_COUNT));
    const arr = Array.from(idx);
    const pos = new Float32Array(arr.length * 3);
    arr.forEach((i, k) => {
      pos[k * 3] = basePositions[i * 3];
      pos[k * 3 + 1] = basePositions[i * 3 + 1];
      pos[k * 3 + 2] = basePositions[i * 3 + 2];
    });
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  }, [basePositions]);

  return (
    <group ref={groupRef}>
      {/* Wireframe links — cyan, very faint, matches field style */}
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial
          color={PRIMARY}
          transparent
          opacity={0.18}
          depthWrite={false}
        />
      </lineSegments>

      {/* Particle nodes — cyan, small, semi-transparent */}
      <points ref={pointsRef} geometry={pointGeometry}>
        <pointsMaterial
          size={0.05}
          color={PRIMARY}
          transparent
          opacity={0.65}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      {/* Highlight glowing nodes — additive blend, like the field */}
      <points geometry={highlightGeometry}>
        <pointsMaterial
          size={0.18}
          color={HIGHLIGHT}
          transparent
          opacity={0.9}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
};

export const PracticeConstellationScene = ({ tiltX, tiltY }: SceneProps) => {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 9], fov: 55 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: "transparent" }}
    >
      <Constellation tiltX={tiltX} tiltY={tiltY} />
    </Canvas>
  );
};

export default PracticeConstellationScene;
