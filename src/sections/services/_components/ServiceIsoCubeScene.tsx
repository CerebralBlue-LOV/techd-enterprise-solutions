import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface SceneProps {
  tiltX?: number;
  tiltY?: number;
}

const PRIMARY = "#00B3E3";

// ServicesFigure — three interlocking wireframe rings (Borromean-style).
// Each torus is wireframe, rendered with both edge-lines and longitudinal
// "rails" so it reads as a real 3D ring rather than a flat circle.
// Group rotates slowly; rings sit at 120deg around the common axis.

const RING_R = 1.25;       // radius of each ring (center to tube center)
const TUBE_R = 0.13;       // tube radius (slimmer = less visual weight)
const RADIAL_SEG = 96;     // around the ring
const TUBE_SEG = 8;        // around the tube (fewer = fewer wireframe lines)
const TILT = Math.PI / 3;  // tilt of each ring out of the XY plane

function buildRingEdges(): THREE.BufferGeometry {
  // Use TorusGeometry then EdgesGeometry for clean wireframe lines.
  const torus = new THREE.TorusGeometry(RING_R, TUBE_R, TUBE_SEG, RADIAL_SEG);
  return new THREE.EdgesGeometry(torus, 18); // angle threshold to keep useful lines
}

interface RingDef {
  rotZ: number; // around Z (group axis)
  rotX: number; // tilt out of XY plane
}

const RINGS: RingDef[] = [
  { rotZ: 0,                rotX: TILT },
  { rotZ: (2 * Math.PI) / 3, rotX: TILT },
  { rotZ: (4 * Math.PI) / 3, rotX: TILT },
];

const Borromean = ({ tiltX = 0, tiltY = 0 }: SceneProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const ringEdges = useMemo(buildRingEdges, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.18 + tiltX * 0.2;
      groupRef.current.rotation.x = -0.25 + Math.sin(t * 0.15) * 0.06 + tiltY * 0.1;
      groupRef.current.rotation.z = Math.sin(t * 0.1) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {RINGS.map((r, i) => (
        <group key={i} rotation={[0, 0, r.rotZ]}>
          <group rotation={[r.rotX, 0, 0]}>
            <lineSegments>
              <primitive object={ringEdges} attach="geometry" />
              <lineBasicMaterial
                color={PRIMARY}
                transparent
                opacity={0.55}
                depthWrite={false}
              />
            </lineSegments>
          </group>
        </group>
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
      camera={{ position: [0, 0, 6.4], fov: 44 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: "transparent" }}
      frameloop={reduced ? "demand" : "always"}
    >
      <Borromean tiltX={tiltX} tiltY={tiltY} />
    </Canvas>
  );
};

export default ServiceIsoCubeScene;
