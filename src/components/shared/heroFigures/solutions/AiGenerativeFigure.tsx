import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { WireframePanel, PRIMARY, HIGHLIGHT } from "./_SharedWireframe";

/**
 * AI & Generative — spherical neural mesh.
 * Nodes are evenly distributed on a sphere via the Fibonacci lattice, each
 * connected to its k-nearest neighbors so edges form a globe-like neural
 * mesh. The whole sphere rotates slowly; a signal periodically traces a
 * short path across the mesh.
 */

const NODE_COUNT = 56;
const NEIGHBORS = 3;
const RADIUS = 2.2;

const Geometry = () => {
  const group = useRef<THREE.Group>(null);
  const edgeMat = useRef<THREE.LineBasicMaterial>(null);
  const signalGeom = useRef<THREE.BufferGeometry>(null);
  const signalMat = useRef<THREE.LineBasicMaterial>(null);
  const haloMat = useRef<THREE.PointsMaterial>(null);

  const { nodePositions, edgePositions, adjacency } = useMemo(() => {
    // Fibonacci sphere distribution
    const pts: THREE.Vector3[] = [];
    const phi = Math.PI * (Math.sqrt(5) - 1);
    for (let i = 0; i < NODE_COUNT; i++) {
      const y = 1 - (i / (NODE_COUNT - 1)) * 2; // 1..-1
      const r = Math.sqrt(1 - y * y);
      const theta = phi * i;
      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;
      pts.push(new THREE.Vector3(x, y, z).multiplyScalar(RADIUS));
    }

    // Nearest-k adjacency (undirected, deduped)
    const adjacency: number[][] = pts.map(() => []);
    const edgeSet = new Set<string>();
    const edges: [number, number][] = [];
    pts.forEach((p, i) => {
      const dists = pts
        .map((q, j) => ({ j, d: p.distanceTo(q) }))
        .filter((e) => e.j !== i)
        .sort((a, b) => a.d - b.d)
        .slice(0, NEIGHBORS);
      dists.forEach(({ j }) => {
        const key = i < j ? `${i}-${j}` : `${j}-${i}`;
        if (!edgeSet.has(key)) {
          edgeSet.add(key);
          edges.push([i, j]);
          adjacency[i].push(j);
          adjacency[j].push(i);
        }
      });
    });

    const nodePositions = new Float32Array(pts.length * 3);
    pts.forEach((p, i) => {
      nodePositions[i * 3] = p.x;
      nodePositions[i * 3 + 1] = p.y;
      nodePositions[i * 3 + 2] = p.z;
    });

    const edgePositions = new Float32Array(edges.length * 2 * 3);
    edges.forEach(([a, b], i) => {
      const o = i * 6;
      edgePositions[o] = pts[a].x;
      edgePositions[o + 1] = pts[a].y;
      edgePositions[o + 2] = pts[a].z;
      edgePositions[o + 3] = pts[b].x;
      edgePositions[o + 4] = pts[b].y;
      edgePositions[o + 5] = pts[b].z;
    });

    return { nodePositions, edgePositions, adjacency };
  }, []);

  // Signal path through adjacent nodes — 5 hops
  const SIGNAL_HOPS = 5;
  const signalPositions = useMemo(
    () => new Float32Array(SIGNAL_HOPS * 2 * 3),
    [],
  );
  const signalState = useRef<{ path: number[]; rolledAt: number }>({
    path: [],
    rolledAt: -1,
  });

  const rollSignal = (t: number) => {
    const path: number[] = [Math.floor(Math.random() * NODE_COUNT)];
    for (let h = 0; h < SIGNAL_HOPS; h++) {
      const last = path[path.length - 1];
      const neighbors = adjacency[last].filter((n) => !path.includes(n));
      if (neighbors.length === 0) break;
      path.push(neighbors[Math.floor(Math.random() * neighbors.length)]);
    }
    signalState.current.path = path;
    signalState.current.rolledAt = t;
  };

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (group.current) {
      group.current.rotation.y = t * 0.18;
      group.current.rotation.x = Math.sin(t * 0.12) * 0.18;
    }
    if (edgeMat.current) {
      edgeMat.current.opacity = 0.32 + Math.sin(t * 0.9) * 0.08;
    }
    if (haloMat.current) {
      haloMat.current.opacity = 0.9 + Math.sin(t * 1.3) * 0.08;
    }

    // Signal: refresh every ~1.4s
    if (t - signalState.current.rolledAt > 1.4 || signalState.current.path.length < 2) {
      rollSignal(t);
    }
    const path = signalState.current.path;
    for (let s = 0; s < SIGNAL_HOPS; s++) {
      const a = path[Math.min(s, path.length - 1)];
      const b = path[Math.min(s + 1, path.length - 1)];
      const o = s * 6;
      signalPositions[o] = nodePositions[a * 3];
      signalPositions[o + 1] = nodePositions[a * 3 + 1];
      signalPositions[o + 2] = nodePositions[a * 3 + 2];
      signalPositions[o + 3] = nodePositions[b * 3];
      signalPositions[o + 4] = nodePositions[b * 3 + 1];
      signalPositions[o + 5] = nodePositions[b * 3 + 2];
    }
    if (signalGeom.current) {
      const attr = signalGeom.current.getAttribute("position") as THREE.BufferAttribute;
      attr.needsUpdate = true;
    }
    if (signalMat.current) {
      const age = t - signalState.current.rolledAt;
      const burst = Math.max(0, 1 - age / 1.2);
      signalMat.current.opacity = 0.1 + burst * 0.8;
    }
  });

  return (
    <group ref={group}>
      {/* Mesh edges */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[edgePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          ref={edgeMat}
          color={PRIMARY}
          transparent
          opacity={0.4}
          depthWrite={false}
        />
      </lineSegments>

      {/* Traveling signal */}
      <lineSegments>
        <bufferGeometry ref={signalGeom}>
          <bufferAttribute attach="attributes-position" args={[signalPositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          ref={signalMat}
          color={HIGHLIGHT}
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Bright additive node halos */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nodePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          ref={haloMat}
          color={HIGHLIGHT}
          size={0.13}
          sizeAttenuation
          transparent
          opacity={0.9}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Solid primary cores */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nodePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color={PRIMARY}
          size={0.06}
          sizeAttenuation
          transparent
          opacity={1}
          depthWrite={false}
        />
      </points>
    </group>
  );
};

export const AiGenerativeFigure = () => (
  <WireframePanel cameraZ={6.5}>
    <Geometry />
  </WireframePanel>
);

export default AiGenerativeFigure;
