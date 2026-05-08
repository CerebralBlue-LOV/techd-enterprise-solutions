import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface SceneProps {
  tiltX?: number;
  tiltY?: number;
}

const TILE_WIDTH = 2.9;
const TILE_DEPTH = 3.6;
const TILE_COUNT = 6;
const TILE_DROP = 0.085;
const TILE_OFFSET_X = 0.14;
const TILE_OFFSET_Z = 0.18;
const LIFT_DURATION = 2.4;
const STAGGER = 0.6;
const HOLD = 1.6;
const LOOP = STAGGER * (TILE_COUNT - 1) + LIFT_DURATION + HOLD;
const SHAPE_OPACITY = 0.55;

function buildDocumentEdges(): THREE.BufferGeometry {
  const halfW = TILE_WIDTH / 2;
  const halfD = TILE_DEPTH / 2;
  const fold = 0.44;
  const pts = [
    -halfW, 0, -halfD, halfW, 0, -halfD,
    halfW, 0, -halfD, halfW, 0, halfD,
    halfW, 0, halfD, -halfW, 0, halfD,
    -halfW, 0, halfD, -halfW, 0, -halfD,
    halfW - fold, 0, halfD, halfW, 0, halfD - fold,
    halfW - fold, 0, halfD, halfW - fold, 0, halfD - fold,
    -halfW + 0.5, 0, -halfD + 0.38, -halfW + 0.5, 0, halfD - 0.5,
    -halfW + 0.18, 0, halfD - 0.72, halfW - 0.68, 0, halfD - 0.72,
    -halfW + 0.18, 0, halfD - 1.2, halfW - 0.5, 0, halfD - 1.2,
    -halfW + 0.18, 0, halfD - 1.68, halfW - 0.82, 0, halfD - 1.68,
  ];

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(pts), 3));
  return geometry;
}

const easeInOut = (t: number) => 0.5 - Math.cos(Math.PI * t) / 2;

function tileWave(local: number, index: number): number {
  const start = index * STAGGER;
  if (local < start || local > start + LIFT_DURATION) return 0;
  const progress = easeInOut((local - start) / LIFT_DURATION);
  return Math.sin(progress * Math.PI);
}

const usePrimaryColor = () =>
  useMemo(() => {
    if (typeof window === "undefined") return "hsl(193 100% 45%)";
    const primary = getComputedStyle(document.documentElement)
      .getPropertyValue("--primary")
      .trim();
    return primary ? `hsl(${primary})` : "hsl(193 100% 45%)";
  }, []);

const SceneCamera = () => {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(4.9, 5.4, 4.6);
    camera.lookAt(0, 0.2, 0);
    camera.updateProjectionMatrix();
  }, [camera]);

  return null;
};

const ResourceStack = ({ tiltX = 0, tiltY = 0 }: SceneProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const tileRefs = useRef<(THREE.Group | null)[]>([]);
  const tileGeometry = useMemo(buildDocumentEdges, []);
  const primaryColor = usePrimaryColor();

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();
    const local = elapsed % LOOP;

    if (groupRef.current) {
      groupRef.current.rotation.y = 0.4 + Math.sin(elapsed * 0.16) * 0.05 + tiltX * 0.14;
      groupRef.current.rotation.x = 0.06 + Math.sin(elapsed * 0.12) * 0.015 + tiltY * 0.05;
      groupRef.current.position.y = 0.12 + Math.sin(elapsed * 0.18) * 0.03;
    }

    for (let index = 0; index < TILE_COUNT; index += 1) {
      const tile = tileRefs.current[index];
      if (!tile) continue;

      const wave = tileWave(local, index);
      tile.position.x = -index * TILE_OFFSET_X + wave * 0.2;
      tile.position.y = -index * TILE_DROP + wave * 0.24;
      tile.position.z = index * TILE_OFFSET_Z - wave * 0.3;
      tile.rotation.y = wave * 0.14;
      tile.rotation.x = wave * 0.03;

      const scale = 1 + wave * 0.015;
      tile.scale.setScalar(scale);
    }
  });

  return (
    <group ref={groupRef} position={[0.28, 0, 0]} scale={1.14}>
      {Array.from({ length: TILE_COUNT }).map((_, index) => (
        <group
          key={index}
          ref={(element) => {
            tileRefs.current[index] = element;
          }}
          position={[-index * TILE_OFFSET_X, -index * TILE_DROP, index * TILE_OFFSET_Z]}
        >
          <lineSegments>
            <primitive object={tileGeometry} attach="geometry" />
            <lineBasicMaterial
              color={primaryColor}
              transparent
              opacity={SHAPE_OPACITY}
              depthWrite={false}
            />
          </lineSegments>
        </group>
      ))}
    </group>
  );
};

export const ResourceTileStackScene = ({ tiltX, tiltY }: SceneProps) => {
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [4.9, 5.4, 4.6], fov: 34 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: "transparent" }}
      frameloop={reduced ? "demand" : "always"}
    >
      <SceneCamera />
      <ResourceStack tiltX={tiltX} tiltY={tiltY} />
    </Canvas>
  );
};

export default ResourceTileStackScene;
