import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface SceneProps {
  tiltX?: number;
  tiltY?: number;
}

const PRIMARY = "#00B3E3";

// ServicesFigure — simple wireframe target seen in 3D.
// Many perfect concentric circles, all coplanar, tilted to read as a disc.
// Nothing extends past the outer circle. No spokes, no ticks, no extras.

const RING_COUNT = 14;
const R_OUTER = 2.4;
const R_INNER = 0.18;
const RING_SEG = 160;

function buildRing(radius: number): THREE.BufferGeometry {
  const pts: number[] = [];
  for (let i = 0; i < RING_SEG; i++) {
    const a0 = (i / RING_SEG) * Math.PI * 2;
    const a1 = ((i + 1) / RING_SEG) * Math.PI * 2;
    pts.push(Math.cos(a0) * radius, Math.sin(a0) * radius, 0);
    pts.push(Math.cos(a1) * radius, Math.sin(a1) * radius, 0);
  }
  const geom = new THREE.BufferGeometry();
  geom.setAttribute("position", new THREE.BufferAttribute(new Float32Array(pts), 3));
  return geom;
}

const Target = ({ tiltX = 0, tiltY = 0 }: SceneProps) => {
  const groupRef = useRef<THREE.Group>(null);

  const rings = useMemo(() => {
    const out: { r: number; opacity: number; geom: THREE.BufferGeometry }[] = [];
    for (let i = 0; i < RING_COUNT; i++) {
      const t = i / (RING_COUNT - 1); // 0 outer .. 1 inner
      const r = R_OUTER - (R_OUTER - R_INNER) * t;
      // Subtle hierarchy: inner rings slightly stronger
      const opacity = 0.55 + t * 0.4;
      out.push({ r, opacity, geom: buildRing(r) });
    }
    return out;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      // Locked 3D tilt + a very slow wobble; pointer adds gentle parallax
      groupRef.current.rotation.x = -0.6 + Math.sin(t * 0.18) * 0.05 + tiltY * 0.08;
      groupRef.current.rotation.y = Math.sin(t * 0.13) * 0.08 + tiltX * 0.15;
      groupRef.current.rotation.z = t * 0.04;
    }
  });

  return (
    <group ref={groupRef}>
      {rings.map((r, i) => (
        <lineSegments key={i}>
          <primitive object={r.geom} attach="geometry" />
          <lineBasicMaterial
            color={PRIMARY}
            transparent
            opacity={r.opacity}
            depthWrite={false}
          />
        </lineSegments>
      ))}
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
