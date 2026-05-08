import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface SceneProps {
  tiltX?: number;
  tiltY?: number;
}

const PRIMARY = "#00B3E3";

// ServicesFigure — proper target/bullseye in 3D.
// Alternating filled and empty concentric bands (like a real target),
// each band outlined for crispness. Tilted as a disc; nothing extends
// outside the outer ring.

const R_OUTER = 1.95;
const BAND_COUNT = 6; // outer..inner
const RING_SEG = 160;

// Compute band radii (outer edge of each band, then inner edge of innermost = 0)
const RADII: number[] = (() => {
  const out: number[] = [];
  for (let i = 0; i <= BAND_COUNT; i++) {
    out.push(R_OUTER * (1 - i / BAND_COUNT));
  }
  return out; // length BAND_COUNT+1, RADII[0] = R_OUTER, last = 0
})();

function ringOutlineGeom(radius: number): THREE.BufferGeometry {
  const pts: number[] = [];
  for (let i = 0; i < RING_SEG; i++) {
    const a0 = (i / RING_SEG) * Math.PI * 2;
    const a1 = ((i + 1) / RING_SEG) * Math.PI * 2;
    pts.push(Math.cos(a0) * radius, Math.sin(a0) * radius, 0);
    pts.push(Math.cos(a1) * radius, Math.sin(a1) * radius, 0);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(pts), 3));
  return g;
}

const Target = ({ tiltX = 0, tiltY = 0 }: SceneProps) => {
  const groupRef = useRef<THREE.Group>(null);

  const bands = useMemo(() => {
    // Build filled bands — alternate filled/empty starting with filled outer band
    const out: { inner: number; outer: number; opacity: number }[] = [];
    for (let i = 0; i < BAND_COUNT; i++) {
      const outer = RADII[i];
      const inner = RADII[i + 1];
      const isFilled = i % 2 === 0; // alternate
      if (!isFilled) continue;
      // Inner filled bands slightly stronger
      const t = i / (BAND_COUNT - 1);
      const opacity = 0.18 + t * 0.35;
      out.push({ inner, outer, opacity });
    }
    return out;
  }, []);

  const outlineGeoms = useMemo(
    () => RADII.filter((r) => r > 0).map(ringOutlineGeom),
    []
  );

  // Bullseye dot (small filled circle at center)
  const bullGeom = useMemo(() => new THREE.CircleGeometry(0.12, 48), []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.x = -0.65 + Math.sin(t * 0.18) * 0.04 + tiltY * 0.08;
      groupRef.current.rotation.y = Math.sin(t * 0.13) * 0.07 + tiltX * 0.15;
      groupRef.current.rotation.z = t * 0.04;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Filled alternating bands */}
      {bands.map((b, i) => (
        <mesh key={`band-${i}`}>
          <ringGeometry args={[b.inner, b.outer, RING_SEG]} />
          <meshBasicMaterial
            color={PRIMARY}
            transparent
            opacity={b.opacity}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      ))}

      {/* Crisp outline circles between every band */}
      {outlineGeoms.map((g, i) => (
        <lineSegments key={`ring-${i}`}>
          <primitive object={g} attach="geometry" />
          <lineBasicMaterial color={PRIMARY} transparent opacity={0.95} depthWrite={false} />
        </lineSegments>
      ))}

      {/* Bullseye */}
      <mesh>
        <primitive object={bullGeom} attach="geometry" />
        <meshBasicMaterial color={PRIMARY} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
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
