import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { WireframePanel, PRIMARY, HIGHLIGHT } from "./_SharedWireframe";

/**
 * AI & Generative — fluid neural network lattice.
 * Layers undulate independently, nodes drift in 3D, and the edge graph is
 * rebuilt every frame from live node positions so the connections "breathe".
 * A traveling signal traces a random path through the layers to evoke
 * inference firing across the network.
 */
const LAYERS = [5, 7, 7, 4];
const LAYER_GAP = 1.55;
const LAYER_HEIGHT = 3.0;

interface BaseNode {
  layer: number;
  index: number;
  base: THREE.Vector3;
  /** per-node phase offset for drift */
  phase: number;
}

const Geometry = () => {
  const group = useRef<THREE.Group>(null);
  const edgeGeom = useRef<THREE.BufferGeometry>(null);
  const nodeGeom = useRef<THREE.BufferGeometry>(null);
  const signalGeom = useRef<THREE.BufferGeometry>(null);
  const edgeMat = useRef<THREE.LineBasicMaterial>(null);
  const signalMat = useRef<THREE.LineBasicMaterial>(null);
  const pulseMat = useRef<THREE.PointsMaterial>(null);

  const { nodes, layerCounts, edgePairs, totalEdges } = useMemo(() => {
    const ns: BaseNode[] = [];
    const layerCounts = LAYERS;
    const totalWidth = (LAYERS.length - 1) * LAYER_GAP;
    LAYERS.forEach((count, li) => {
      const x = -totalWidth / 2 + li * LAYER_GAP;
      for (let i = 0; i < count; i++) {
        const y = count === 1 ? 0 : -LAYER_HEIGHT / 2 + (i / (count - 1)) * LAYER_HEIGHT;
        ns.push({
          layer: li,
          index: i,
          base: new THREE.Vector3(x, y, 0),
          phase: (li * 1.7 + i * 0.9) % (Math.PI * 2),
        });
      }
    });
    // Edge pairs as indices into ns
    const edgePairs: [number, number][] = [];
    let cursor = 0;
    const layerStart: number[] = [];
    layerCounts.forEach((c) => {
      layerStart.push(cursor);
      cursor += c;
    });
    for (let li = 0; li < layerCounts.length - 1; li++) {
      const aStart = layerStart[li];
      const bStart = layerStart[li + 1];
      for (let a = 0; a < layerCounts[li]; a++) {
        for (let b = 0; b < layerCounts[li + 1]; b++) {
          edgePairs.push([aStart + a, bStart + b]);
        }
      }
    }
    return { nodes: ns, layerCounts, edgePairs, totalEdges: edgePairs.length };
  }, []);

  // Allocate buffers
  const nodePositions = useMemo(() => new Float32Array(nodes.length * 3), [nodes.length]);
  const edgePositions = useMemo(() => new Float32Array(totalEdges * 2 * 3), [totalEdges]);
  // signal: a single polyline through one node per layer = (layers - 1) segments
  const signalSegCount = LAYERS.length - 1;
  const signalPositions = useMemo(() => new Float32Array(signalSegCount * 2 * 3), [signalSegCount]);

  // Live node world positions for use by edge/signal updates
  const live = useMemo(() => nodes.map(() => new THREE.Vector3()), [nodes]);

  // Signal path state — re-rolled periodically
  const signalState = useRef<{
    path: number[]; // node index per layer
    rolledAt: number;
    fadeStart: number;
  }>({ path: [], rolledAt: -1, fadeStart: 0 });

  const rollSignalPath = (t: number) => {
    let cursor = 0;
    const path: number[] = [];
    for (let li = 0; li < LAYERS.length; li++) {
      const pick = Math.floor(Math.random() * LAYERS[li]);
      path.push(cursor + pick);
      cursor += LAYERS[li];
    }
    signalState.current.path = path;
    signalState.current.rolledAt = t;
    signalState.current.fadeStart = t;
  };

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // 1) Update node live positions: each layer undulates around X axis with
    //    its own phase; each node drifts a little on Z and Y.
    let cursor = 0;
    for (let li = 0; li < LAYERS.length; li++) {
      const count = LAYERS[li];
      // layer-level twist: rotate the layer's column around the X axis
      const twist = Math.sin(t * 0.6 + li * 0.7) * 0.25;
      const cosT = Math.cos(twist);
      const sinT = Math.sin(twist);
      for (let i = 0; i < count; i++) {
        const n = nodes[cursor + i];
        const driftY = Math.sin(t * 0.9 + n.phase) * 0.08;
        const driftZ = Math.cos(t * 0.7 + n.phase * 1.3) * 0.18;
        const y0 = n.base.y + driftY;
        const z0 = n.base.z + driftZ;
        // apply twist around X (rotate y,z plane)
        const y = y0 * cosT - z0 * sinT;
        const z = y0 * sinT + z0 * cosT;
        live[cursor + i].set(n.base.x, y, z);
      }
      cursor += count;
    }

    // 2) Push node positions into the points buffer
    for (let i = 0; i < live.length; i++) {
      nodePositions[i * 3] = live[i].x;
      nodePositions[i * 3 + 1] = live[i].y;
      nodePositions[i * 3 + 2] = live[i].z;
    }
    if (nodeGeom.current) {
      const attr = nodeGeom.current.getAttribute("position") as THREE.BufferAttribute;
      attr.needsUpdate = true;
    }

    // 3) Rebuild edges from live node positions
    for (let e = 0; e < edgePairs.length; e++) {
      const [a, b] = edgePairs[e];
      const i = e * 6;
      edgePositions[i] = live[a].x;
      edgePositions[i + 1] = live[a].y;
      edgePositions[i + 2] = live[a].z;
      edgePositions[i + 3] = live[b].x;
      edgePositions[i + 4] = live[b].y;
      edgePositions[i + 5] = live[b].z;
    }
    if (edgeGeom.current) {
      const attr = edgeGeom.current.getAttribute("position") as THREE.BufferAttribute;
      attr.needsUpdate = true;
    }

    // 4) Edge breathing pulse
    if (edgeMat.current) {
      edgeMat.current.opacity = 0.22 + Math.sin(t * 1.1) * 0.1;
    }

    // 5) Node highlight breathing
    if (pulseMat.current) {
      pulseMat.current.opacity = 0.85 + Math.sin(t * 1.4) * 0.1;
      pulseMat.current.size = 0.18 + Math.sin(t * 1.4) * 0.02;
    }

    // 6) Signal path: roll a new path every ~1.6s, fade out across the window
    if (t - signalState.current.rolledAt > 1.6 || signalState.current.path.length === 0) {
      rollSignalPath(t);
    }
    const path = signalState.current.path;
    for (let s = 0; s < signalSegCount; s++) {
      const a = path[s];
      const b = path[s + 1];
      const i = s * 6;
      signalPositions[i] = live[a].x;
      signalPositions[i + 1] = live[a].y;
      signalPositions[i + 2] = live[a].z;
      signalPositions[i + 3] = live[b].x;
      signalPositions[i + 4] = live[b].y;
      signalPositions[i + 5] = live[b].z;
    }
    if (signalGeom.current) {
      const attr = signalGeom.current.getAttribute("position") as THREE.BufferAttribute;
      attr.needsUpdate = true;
    }
    if (signalMat.current) {
      const age = t - signalState.current.fadeStart;
      // bright burst 0..0.4s, decay until next roll
      const burst = Math.max(0, 1 - age / 1.4);
      signalMat.current.opacity = 0.15 + burst * 0.75;
    }

    // 7) Whole-group slow sway — keeps overall composition lively
    if (group.current) {
      group.current.rotation.y = Math.sin(t * 0.18) * 0.28;
      group.current.rotation.x = Math.sin(t * 0.13) * 0.08;
    }
  });

  return (
    <group ref={group}>
      {/* Fully-connected edges */}
      <lineSegments>
        <bufferGeometry ref={edgeGeom}>
          <bufferAttribute attach="attributes-position" args={[edgePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          ref={edgeMat}
          color={PRIMARY}
          transparent
          opacity={0.28}
          depthWrite={false}
        />
      </lineSegments>

      {/* Traveling signal path */}
      <lineSegments>
        <bufferGeometry ref={signalGeom}>
          <bufferAttribute attach="attributes-position" args={[signalPositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          ref={signalMat}
          color={HIGHLIGHT}
          transparent
          opacity={0.0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Bright additive node halos */}
      <points>
        <bufferGeometry ref={nodeGeom}>
          <bufferAttribute attach="attributes-position" args={[nodePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          ref={pulseMat}
          color={HIGHLIGHT}
          size={0.18}
          sizeAttenuation
          transparent
          opacity={0.95}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Solid primary node cores */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nodePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color={PRIMARY}
          size={0.09}
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
