import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface SceneProps {
  tiltX?: number;
  tiltY?: number;
}

const PRIMARY = "#00B3E3";

// A vertical wireframe spire: stacked rotating polygonal rings of varying
// radius, forming a tapered tower. Each ring is a different industry "layer".
// Subtle node points sit at every vertex. Slow rotation + gentle float.

const LAYERS = 14;          // number of stacked rings
const HEIGHT = 5.2;         // total tower height
const SEGMENTS = 8;         // polygon sides per ring (octagon)
const BASE_R = 1.55;        // base radius
const TOP_R = 0.35;         // top radius

const layerData = Array.from({ length: LAYERS }, (_, i) => {
  const t = i / (LAYERS - 1);
  // Slight non-linear taper for an obelisk silhouette
  const taper = Math.pow(1 - t, 1.35);
  const radius = TOP_R + (BASE_R - TOP_R) * taper;
  const y = -HEIGHT / 2 + t * HEIGHT;
  // Alternate phase per layer so rings appear to spin in opposing directions
  const phaseDir = i % 2 === 0 ? 1 : -1;
  return { radius, y, phaseDir, t };
});

function ringPoints(radius: number, segments: number) {
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i <= segments; i++) {
    const a = (i / segments) * Math.PI * 2;
    pts.push(new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius));
  }
  return pts;
}

const Spire = ({ tiltX = 0, tiltY = 0 }: SceneProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const ringRefs = useRef<(THREE.Group | null)[]>([]);

  // Pre-build geometries once
  const rings = useMemo(
    () =>
      layerData.map((l) => {
        const geom = new THREE.BufferGeometry().setFromPoints(
          ringPoints(l.radius, SEGMENTS),
        );
        const nodeGeom = new THREE.BufferGeometry().setFromPoints(
          ringPoints(l.radius, SEGMENTS).slice(0, SEGMENTS),
        );
        return { geom, nodeGeom, ...l };
      }),
    [],
  );

  // Vertical struts connecting alternating ring vertices for a "scaffold" feel
  const struts = useMemo(() => {
    const positions: number[] = [];
    for (let i = 0; i < LAYERS - 1; i++) {
      const a = layerData[i];
      const b = layerData[i + 1];
      // 4 struts per gap (every other vertex)
      for (let s = 0; s < SEGMENTS; s += 2) {
        const ang = (s / SEGMENTS) * Math.PI * 2;
        positions.push(
          Math.cos(ang) * a.radius, a.y, Math.sin(ang) * a.radius,
          Math.cos(ang) * b.radius, b.y, Math.sin(ang) * b.radius,
        );
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return g;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.18 + tiltX * 0.2;
      groupRef.current.rotation.x = -0.06 + Math.sin(t * 0.12) * 0.05 + tiltY * 0.08;
      groupRef.current.position.y = Math.sin(t * 0.32) * 0.22;
    }
    ringRefs.current.forEach((g, i) => {
      if (!g) return;
      const l = layerData[i];
      // Counter-rotate each ring slightly for shimmer
      g.rotation.y = t * 0.35 * l.phaseDir + i * 0.18;
    });
  });

  return (
    <group ref={groupRef}>
      {/* Vertical struts */}
      <lineSegments>
        <primitive object={struts} attach="geometry" />
        <lineBasicMaterial
          color={PRIMARY}
          transparent
          opacity={0.28}
          depthWrite={false}
        />
      </lineSegments>

      {/* Stacked rings + nodes */}
      {rings.map((r, i) => (
        <group
          key={i}
          position={[0, r.y, 0]}
          ref={(g) => (ringRefs.current[i] = g)}
        >
          <line>
            <primitive object={r.geom} attach="geometry" />
            <lineBasicMaterial
              color={PRIMARY}
              transparent
              opacity={0.55 + 0.35 * (1 - r.t)}
              depthWrite={false}
            />
          </line>
          <points>
            <primitive object={r.nodeGeom} attach="geometry" />
            <pointsMaterial
              color={PRIMARY}
              size={0.07}
              sizeAttenuation
              transparent
              opacity={0.95}
              depthWrite={false}
            />
          </points>
        </group>
      ))}
    </group>
  );
};

export const IndustrySpireScene = ({ tiltX, tiltY }: SceneProps) => {
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.4, 7.2], fov: 50 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: "transparent" }}
      frameloop={reduced ? "demand" : "always"}
    >
      <Spire tiltX={tiltX} tiltY={tiltY} />
    </Canvas>
  );
};

export default IndustrySpireScene;
