import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface SceneProps {
  tiltX?: number;
  tiltY?: number;
}

const PRIMARY = "#00B3E3";

// Isometric cube viewed from the corner — reads as a hexagon with a "Y"
// inside (three rhombus faces meeting at center). The three visible faces
// (top, right, front) pulse with a soft fill in sequence — same idea as
// the reference's X/Y/Z axis highlight, minus the labels.
//
// Inspired by the Dribbble Isometric Shapes Showreel (top-right tile).

const SIZE = 1.6;       // cube edge length
const HALF = SIZE / 2;

// ---------- Loop timing (seconds) ----------
const FACE_HOLD = 1.2;        // how long each face holds at peak fill
const FACE_FADE = 0.45;       // fade up & down at each end
const FACE_CYCLE = FACE_HOLD + FACE_FADE * 2;
const LOOP = FACE_CYCLE * 3;

// Per-face fill alpha given global time.
function faceAlpha(t: number, slot: 0 | 1 | 2) {
  const local = ((t % LOOP) - slot * FACE_CYCLE + LOOP) % LOOP;
  if (local < FACE_FADE) return local / FACE_FADE * 0.18;
  if (local < FACE_FADE + FACE_HOLD) return 0.18;
  if (local < FACE_FADE * 2 + FACE_HOLD)
    return (1 - (local - FACE_FADE - FACE_HOLD) / FACE_FADE) * 0.18;
  return 0;
}

const IsoCube = ({ tiltX = 0, tiltY = 0 }: SceneProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const topMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const rightMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const frontMatRef = useRef<THREE.MeshBasicMaterial>(null);

  const edges = useMemo(
    () => new THREE.EdgesGeometry(new THREE.BoxGeometry(SIZE, SIZE, SIZE)),
    [],
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      // Hold the iconic isometric framing; whisper of life only.
      groupRef.current.rotation.y = Math.PI / 4 + Math.sin(t * 0.18) * 0.04 + tiltX * 0.1;
      groupRef.current.rotation.x = -Math.atan(1 / Math.sqrt(2)) + tiltY * 0.06;
    }

    if (topMatRef.current) topMatRef.current.opacity = faceAlpha(t, 0);
    if (rightMatRef.current) rightMatRef.current.opacity = faceAlpha(t, 1);
    if (frontMatRef.current) frontMatRef.current.opacity = faceAlpha(t, 2);
  });

  return (
    <group ref={groupRef}>
      {/* Wireframe cube */}
      <lineSegments>
        <primitive object={edges} attach="geometry" />
        <lineBasicMaterial color={PRIMARY} transparent opacity={0.95} depthWrite={false} />
      </lineSegments>

      {/* Three pulsing face fills (top / right / front of the cube) */}
      <mesh position={[0, HALF, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[SIZE, SIZE]} />
        <meshBasicMaterial
          ref={topMatRef}
          color={PRIMARY}
          transparent
          opacity={0}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={[HALF, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[SIZE, SIZE]} />
        <meshBasicMaterial
          ref={rightMatRef}
          color={PRIMARY}
          transparent
          opacity={0}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={[0, 0, HALF]}>
        <planeGeometry args={[SIZE, SIZE]} />
        <meshBasicMaterial
          ref={frontMatRef}
          color={PRIMARY}
          transparent
          opacity={0}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
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
      camera={{ position: [3.2, 3.2, 3.2], fov: 36 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: "transparent" }}
      frameloop={reduced ? "demand" : "always"}
    >
      <IsoCube tiltX={tiltX} tiltY={tiltY} />
    </Canvas>
  );
};

export default ServiceIsoCubeScene;
