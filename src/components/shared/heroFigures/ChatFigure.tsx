import { useMemo } from "react";
import * as THREE from "three";
import { WireframePanel, PRIMARY, HIGHLIGHT } from "./solutions/_SharedWireframe";

/**
 * ChatFigure — static rounded speech-bubble wireframe.
 * Same graphic language as the other solution figures: cyan edges +
 * additive vertex halos. No rotation, no inner decoration.
 */

const buildBubbleGeometry = () => {
  const w = 3.2;
  const h = 2.0;
  const r = 0.45;
  const shape = new THREE.Shape();

  const x = -w / 2;
  const y = -h / 2;
  shape.moveTo(x + r, y);
  shape.lineTo(x + w - r, y);
  shape.quadraticCurveTo(x + w, y, x + w, y + r);
  shape.lineTo(x + w, y + h - r);
  shape.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  shape.lineTo(x + r, y + h);
  shape.quadraticCurveTo(x, y + h, x, y + h - r);
  shape.lineTo(x, y + r + 0.55);
  shape.lineTo(x - 0.55, y - 0.05);
  shape.lineTo(x + 0.15, y + r + 0.05);
  shape.lineTo(x + r, y);

  const geom = new THREE.ExtrudeGeometry(shape, {
    depth: 0.5,
    bevelEnabled: false,
    curveSegments: 16,
  });
  geom.center();
  return geom;
};

const Geometry = () => {
  const { edgeGeom, pointPositions } = useMemo(() => {
    const base = buildBubbleGeometry();
    const edges = new THREE.EdgesGeometry(base, 20);
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

  return (
    <group rotation={[0.2, -0.45, 0]}>
      <lineSegments geometry={edgeGeom}>
        <lineBasicMaterial
          color={PRIMARY}
          transparent
          opacity={0.7}
          depthWrite={false}
        />
      </lineSegments>

      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[pointPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color={HIGHLIGHT}
          size={0.1}
          sizeAttenuation
          transparent
          opacity={0.9}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
};

export const ChatFigure = () => (
  <WireframePanel cameraZ={5.5}>
    <Geometry />
  </WireframePanel>
);

export default ChatFigure;
