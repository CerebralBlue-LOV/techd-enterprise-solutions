import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { WireframePanel, PRIMARY, HIGHLIGHT } from "./solutions/_SharedWireframe";

/**
 * ChatFigure — extruded rounded-rectangle speech bubble with a small
 * triangular tail on the bottom-left. Rendered in the same wireframe
 * language as the solution figures (cyan edges + additive vertex points),
 * with a slow Y-axis sway.
 */

const BLUE_EDGE = "#1E5BFF";
const BLUE_POINT = "#5B8CFF";

const buildBubbleGeometry = () => {
  const w = 3.2;
  const h = 2.0;
  const r = 0.45;
  const shape = new THREE.Shape();

  // Rounded rect centered at origin
  const x = -w / 2;
  const y = -h / 2;
  shape.moveTo(x + r, y);
  shape.lineTo(x + w - r, y);
  shape.quadraticCurveTo(x + w, y, x + w, y + r);
  shape.lineTo(x + w, y + h - r);
  shape.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  shape.lineTo(x + r, y + h);
  shape.quadraticCurveTo(x, y + h, x, y + h - r);
  // Tail on bottom-left
  shape.lineTo(x, y + r + 0.55);
  shape.lineTo(x - 0.55, y - 0.05);
  shape.lineTo(x + 0.15, y + r + 0.05);
  shape.lineTo(x + r, y);

  const geom = new THREE.ExtrudeGeometry(shape, {
    depth: 0.4,
    bevelEnabled: true,
    bevelThickness: 0.06,
    bevelSize: 0.06,
    bevelSegments: 2,
    curveSegments: 14,
  });
  geom.center();
  return geom;
};

const Geometry = () => {
  const group = useRef<THREE.Group>(null);
  const edgeMat = useRef<THREE.LineBasicMaterial>(null);
  const haloMat = useRef<THREE.PointsMaterial>(null);

  const { edgeGeom, pointPositions } = useMemo(() => {
    const base = buildBubbleGeometry();
    const edges = new THREE.EdgesGeometry(base, 20);
    // Sample unique vertex positions for points
    const posAttr = base.getAttribute("position");
    const pts = new Float32Array(posAttr.count * 3);
    for (let i = 0; i < posAttr.count; i++) {
      pts[i * 3] = posAttr.getX(i);
      pts[i * 3 + 1] = posAttr.getY(i);
      pts[i * 3 + 2] = posAttr.getZ(i);
    }
    base.dispose();
    return { edgeGeom: edges, pointPositions: pts };
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = Math.sin(t * 0.35) * 0.35;
      group.current.rotation.x = Math.sin(t * 0.25) * 0.12;
    }
    if (edgeMat.current) {
      edgeMat.current.opacity = 0.7 + Math.sin(t * 0.9) * 0.08;
    }
    if (haloMat.current) {
      haloMat.current.opacity = 0.85 + Math.sin(t * 1.4) * 0.1;
    }
  });

  return (
    <group ref={group}>
      <lineSegments geometry={edgeGeom}>
        <lineBasicMaterial
          ref={edgeMat}
          color={BLUE_EDGE}
          transparent
          opacity={0.75}
          depthWrite={false}
        />
      </lineSegments>

      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[pointPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          ref={haloMat}
          color={BLUE_POINT}
          size={0.08}
          sizeAttenuation
          transparent
          opacity={0.9}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Three dots inside the bubble — "typing" indicator */}
      {[-0.7, 0, 0.7].map((dx) => (
        <mesh key={dx} position={[dx, 0, 0.3]}>
          <sphereGeometry args={[0.11, 16, 16]} />
          <meshBasicMaterial color={PRIMARY} transparent opacity={0.95} />
        </mesh>
      ))}
    </group>
  );
};

export const ChatFigure = () => (
  <WireframePanel cameraZ={5.5}>
    <Geometry />
  </WireframePanel>
);

export default ChatFigure;
