import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface SceneProps {
  tiltX?: number;
  tiltY?: number;
}

const PRIMARY = "#00B3E3";

// ServicesFigure — wireframe pipeline / flow.
// Horizontal sequence of 5 wireframe nodes (octahedra) connected by
// pipe segments. A small pulse travels left-to-right along the line.
// Reads as 'workflow / delivery / engagement journey'.

const NODE_COUNT = 5;
const SPAN = 4.6;
const NODE_R = 0.32;
const PIPE_R = 0.12;
const PIPE_SEG = 12;

function nodeX(i: number): number {
  const t = NODE_COUNT === 1 ? 0.5 : i / (NODE_COUNT - 1);
  return -SPAN / 2 + t * SPAN;
}

function buildNodeEdges(): THREE.BufferGeometry {
  // Octahedron wireframe (6 vertices, 12 edges)
  const geo = new THREE.OctahedronGeometry(NODE_R, 0);
  return new THREE.EdgesGeometry(geo);
}

function buildPipeEdges(): THREE.BufferGeometry {
  // A short cylinder segment along X, rendered as wireframe rings + rails.
  const pts: number[] = [];
  const segLen = (SPAN / (NODE_COUNT - 1)) - NODE_R * 2 - 0.05;

  for (let n = 0; n < NODE_COUNT - 1; n++) {
    const xStart = nodeX(n) + NODE_R + 0.025;
    const xEnd = xStart + segLen;

    // Two end rings + one mid ring
    for (const x of [xStart, (xStart + xEnd) / 2, xEnd]) {
      for (let i = 0; i < PIPE_SEG; i++) {
        const a0 = (i / PIPE_SEG) * Math.PI * 2;
        const a1 = ((i + 1) / PIPE_SEG) * Math.PI * 2;
        pts.push(
          x, Math.cos(a0) * PIPE_R, Math.sin(a0) * PIPE_R,
          x, Math.cos(a1) * PIPE_R, Math.sin(a1) * PIPE_R
        );
      }
    }

    // 4 longitudinal rails
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2;
      const cy = Math.cos(a) * PIPE_R;
      const cz = Math.sin(a) * PIPE_R;
      pts.push(xStart, cy, cz, xEnd, cy, cz);
    }
  }

  const geom = new THREE.BufferGeometry();
  geom.setAttribute("position", new THREE.BufferAttribute(new Float32Array(pts), 3));
  return geom;
}

function buildPulseEdges(): THREE.BufferGeometry {
  // Small ring (pulse marker) in YZ plane, will be moved along X.
  const pts: number[] = [];
  const r = PIPE_R * 1.55;
  const seg = 24;
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

const Pipeline = ({ tiltX = 0, tiltY = 0 }: SceneProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const pulseRef = useRef<THREE.Group>(null);
  const pulseMatRef = useRef<THREE.LineBasicMaterial>(null);
  const nodeRefs = useRef<THREE.Group[]>([]);

  const nodeGeom = useMemo(buildNodeEdges, []);
  const pipeGeom = useMemo(buildPipeEdges, []);
  const pulseGeom = useMemo(buildPulseEdges, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = -0.35 + Math.sin(t * 0.18) * 0.12 + tiltX * 0.18;
      groupRef.current.rotation.x = -0.18 + tiltY * 0.1;
    }
    // Spin nodes slowly so they catch the eye as discrete artefacts
    nodeRefs.current.forEach((g, i) => {
      if (!g) return;
      g.rotation.y = t * 0.4 + i * 0.6;
      g.rotation.x = t * 0.25;
    });
    // Pulse: travels left -> right, fades near the ends
    if (pulseRef.current) {
      const period = 3.2;
      const u = ((t % period) / period); // 0..1
      const x = -SPAN / 2 + u * SPAN;
      pulseRef.current.position.x = x;
      const fade = Math.sin(Math.PI * u); // 0 at ends, 1 in middle
      if (pulseMatRef.current) pulseMatRef.current.opacity = 0.15 + fade * 0.85;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Pipes */}
      <lineSegments>
        <primitive object={pipeGeom} attach="geometry" />
        <lineBasicMaterial color={PRIMARY} transparent opacity={0.55} depthWrite={false} />
      </lineSegments>

      {/* Nodes */}
      {Array.from({ length: NODE_COUNT }).map((_, i) => (
        <group
          key={i}
          position={[nodeX(i), 0, 0]}
          ref={(el) => {
            if (el) nodeRefs.current[i] = el;
          }}
        >
          <lineSegments>
            <primitive object={nodeGeom} attach="geometry" />
            <lineBasicMaterial color={PRIMARY} transparent opacity={0.95} depthWrite={false} />
          </lineSegments>
        </group>
      ))}

      {/* Travelling pulse */}
      <group ref={pulseRef}>
        <lineSegments>
          <primitive object={pulseGeom} attach="geometry" />
          <lineBasicMaterial
            ref={pulseMatRef}
            color={PRIMARY}
            transparent
            opacity={1}
            depthWrite={false}
          />
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
      camera={{ position: [0, 0.2, 6.4], fov: 44 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: "transparent" }}
      frameloop={reduced ? "demand" : "always"}
    >
      <Pipeline tiltX={tiltX} tiltY={tiltY} />
    </Canvas>
  );
};

export default ServiceIsoCubeScene;
