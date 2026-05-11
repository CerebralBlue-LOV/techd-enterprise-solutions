import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { WireframePanel, PRIMARY, HIGHLIGHT } from "./_SharedWireframe";

/**
 * AI & Generative — neural network lattice.
 * 4 layers of nodes laid along the X axis, fully connected with cyan wireframe
 * edges between adjacent layers. Nodes are additive cyan points; edges pulse
 * slowly via material opacity.
 */
const LAYERS = [5, 7, 7, 3];
const LAYER_GAP = 1.6;
const LAYER_HEIGHT = 3.0;

type Node = { x: number; y: number; z: number };

const Geometry = () => {
  const group = useRef<THREE.Group>(null);
  const edgeMat = useRef<THREE.LineBasicMaterial>(null);

  // Build nodes + edges once
  const { nodePositions, edgePositions } = useMemo(() => {
    const nodes: Node[][] = [];
    const totalWidth = (LAYERS.length - 1) * LAYER_GAP;
    LAYERS.forEach((count, li) => {
      const x = -totalWidth / 2 + li * LAYER_GAP;
      const col: Node[] = [];
      for (let i = 0; i < count; i++) {
        const y = count === 1 ? 0 : -LAYER_HEIGHT / 2 + (i / (count - 1)) * LAYER_HEIGHT;
        // small per-node z offset for depth, sinusoidal per layer
        const z = Math.sin((i / count) * Math.PI) * 0.15 * (li % 2 === 0 ? 1 : -1);
        col.push({ x, y, z });
      }
      nodes.push(col);
    });

    const nodePositions = new Float32Array(nodes.flat().flatMap((n) => [n.x, n.y, n.z]));

    const edges: number[] = [];
    for (let li = 0; li < nodes.length - 1; li++) {
      for (const a of nodes[li]) {
        for (const b of nodes[li + 1]) {
          edges.push(a.x, a.y, a.z, b.x, b.y, b.z);
        }
      }
    }
    const edgePositions = new Float32Array(edges);
    return { nodePositions, edgePositions };
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = Math.sin(t * 0.2) * 0.35;
      group.current.rotation.x = Math.sin(t * 0.15) * 0.1;
    }
    if (edgeMat.current) {
      // Slow pulse along the lines so the network feels "alive"
      edgeMat.current.opacity = 0.28 + Math.sin(t * 1.2) * 0.12;
    }
  });

  return (
    <group ref={group}>
      {/* Edges — fully connected wireframe between adjacent layers */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[edgePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          ref={edgeMat}
          color={PRIMARY}
          transparent
          opacity={0.35}
          depthWrite={false}
        />
      </lineSegments>

      {/* Outer node points — bright additive highlight */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[nodePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color={HIGHLIGHT}
          size={0.18}
          sizeAttenuation
          transparent
          opacity={0.95}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Inner solid core for each node — small primary dot */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[nodePositions, 3]}
          />
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
