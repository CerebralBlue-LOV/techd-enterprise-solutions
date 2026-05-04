import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const COLS = 56;
const ROWS = 36;
const SPACING = 0.42;
const HIGHLIGHT_COUNT = 14;

/** Builds a flat grid of points (later undulated in useFrame). */
function buildGrid() {
  const positions = new Float32Array(COLS * ROWS * 3);
  let i = 0;
  for (let z = 0; z < ROWS; z++) {
    for (let x = 0; x < COLS; x++) {
      positions[i++] = (x - COLS / 2) * SPACING;
      positions[i++] = 0;
      positions[i++] = (z - ROWS / 2) * SPACING;
    }
  }
  return positions;
}

/** Connect each grid node to its right + down neighbour → a wireframe net. */
function buildLineIndices() {
  const idx: number[] = [];
  for (let z = 0; z < ROWS; z++) {
    for (let x = 0; x < COLS; x++) {
      const i = z * COLS + x;
      if (x < COLS - 1) idx.push(i, i + 1);
      if (z < ROWS - 1) idx.push(i, i + COLS);
    }
  }
  return new Uint16Array(idx);
}

function pickHighlights() {
  const total = COLS * ROWS;
  const set = new Set<number>();
  while (set.size < HIGHLIGHT_COUNT) {
    set.add(Math.floor(Math.random() * total));
  }
  return Array.from(set);
}

const Field = ({ animate }: { animate: boolean }) => {
  const basePositions = useMemo(() => buildGrid(), []);
  const lineIndices = useMemo(() => buildLineIndices(), []);
  const highlightIdx = useMemo(() => pickHighlights(), []);

  const livePositions = useMemo(
    () => new Float32Array(basePositions),
    [basePositions],
  );

  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const highlightsRef = useRef<THREE.Points>(null);
  const groupRef = useRef<THREE.Group>(null);

  // Initial undulation so the static (reduced-motion) view is also alive.
  useMemo(() => {
    for (let i = 0; i < livePositions.length; i += 3) {
      const x = livePositions[i];
      const z = livePositions[i + 2];
      livePositions[i + 1] =
        Math.sin(x * 0.55) * 0.35 + Math.cos(z * 0.45) * 0.35;
    }
  }, [livePositions]);

  const highlightPositions = useMemo(
    () => new Float32Array(highlightIdx.length * 3),
    [highlightIdx],
  );

  // === Interactivity state ===
  // Pointer projected onto the field's local plane (X/Z), smoothed.
  const pointerWorld = useRef(new THREE.Vector3(999, 0, 999)); // off-field default
  const pointerSmoothed = useRef(new THREE.Vector3(999, 0, 999));
  const pointerActive = useRef(0); // 0..1 envelope for ripple amplitude
  const tiltTarget = useRef({ x: 0, y: 0 });
  const tiltCurrent = useRef({ x: 0, y: 0 });

  const { camera, gl } = useThree();
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  // The field's local plane is Y=0 in group space, but the group is rotated
  // and translated. We raycast against a world-space plane that approximates
  // the field surface (group sits at y = -1.2 + ~0). Good enough for ripple.
  const interactionPlane = useMemo(
    () => new THREE.Plane(new THREE.Vector3(0, 1, 0), 1.2),
    [],
  );

  useMemo(() => {
    const dom = gl.domElement;
    const onMove = (e: PointerEvent) => {
      const rect = dom.getBoundingClientRect();
      const ndc = new THREE.Vector2(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1,
      );
      raycaster.setFromCamera(ndc, camera);
      const hit = new THREE.Vector3();
      if (raycaster.ray.intersectPlane(interactionPlane, hit)) {
        // Convert world hit into the group's local space (group is at
        // position [0,-1.2,0] and rotated [-0.55, 0, 0]). We invert that.
        const local = hit.clone();
        local.y += 1.2;
        // Inverse rotation around X by -0.55:
        const a = 0.55;
        const cosA = Math.cos(a);
        const sinA = Math.sin(a);
        const ly = local.y;
        const lz = local.z;
        local.y = ly * cosA + lz * sinA;
        local.z = -ly * sinA + lz * cosA;
        pointerWorld.current.set(local.x, 0, local.z);
        pointerActive.current = 1;
      }
      // Tilt target from NDC, capped to small angle.
      tiltTarget.current.x = ndc.y * 0.08; // pitch
      tiltTarget.current.y = ndc.x * 0.18; // yaw
    };
    const onLeave = () => {
      pointerActive.current = 0;
      tiltTarget.current.x = 0;
      tiltTarget.current.y = 0;
    };
    dom.addEventListener("pointermove", onMove);
    dom.addEventListener("pointerleave", onLeave);
    return () => {
      dom.removeEventListener("pointermove", onMove);
      dom.removeEventListener("pointerleave", onLeave);
    };
  }, [camera, gl, interactionPlane, raycaster]);

  useFrame(({ clock }, delta) => {
    if (!animate) return;
    const t = clock.getElapsedTime();

    // Smooth pointer follow + active envelope decay.
    pointerSmoothed.current.lerp(pointerWorld.current, Math.min(1, delta * 6));
    pointerActive.current = THREE.MathUtils.lerp(
      pointerActive.current,
      pointerActive.current > 0.01 ? pointerActive.current : 0,
      0.05,
    );

    const px = pointerSmoothed.current.x;
    const pz = pointerSmoothed.current.z;
    const RIPPLE_RADIUS = 2.2;
    const RIPPLE_AMP = 0.55 * pointerActive.current;
    const r2 = RIPPLE_RADIUS * RIPPLE_RADIUS;

    for (let i = 0; i < livePositions.length; i += 3) {
      const x = basePositions[i];
      const z = basePositions[i + 2];
      let y =
        Math.sin(x * 0.55 + t * 0.45) * 0.35 +
        Math.cos(z * 0.45 + t * 0.35) * 0.35 +
        Math.sin((x + z) * 0.2 + t * 0.6) * 0.12;

      // Ripple bump (gaussian) under cursor.
      if (RIPPLE_AMP > 0.001) {
        const dx = x - px;
        const dz = z - pz;
        const d2 = dx * dx + dz * dz;
        if (d2 < r2 * 2) {
          const falloff = Math.exp(-d2 / (r2 * 0.5));
          const wave = Math.sin(Math.sqrt(d2) * 2.2 - t * 4);
          y += RIPPLE_AMP * falloff * (0.6 + 0.4 * wave);
        }
      }

      livePositions[i + 1] = y;
    }

    if (pointsRef.current) {
      const attr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
      attr.array = livePositions;
      attr.needsUpdate = true;
    }
    if (linesRef.current) {
      const attr = linesRef.current.geometry.attributes.position as THREE.BufferAttribute;
      attr.array = livePositions;
      attr.needsUpdate = true;
    }

    // Sync highlight node positions from livePositions.
    for (let h = 0; h < highlightIdx.length; h++) {
      const src = highlightIdx[h] * 3;
      highlightPositions[h * 3] = livePositions[src];
      highlightPositions[h * 3 + 1] = livePositions[src + 1] + 0.05;
      highlightPositions[h * 3 + 2] = livePositions[src + 2];
    }
    if (highlightsRef.current) {
      const attr = highlightsRef.current.geometry.attributes.position as THREE.BufferAttribute;
      attr.array = highlightPositions;
      attr.needsUpdate = true;
      const mat = highlightsRef.current.material as THREE.PointsMaterial;
      mat.opacity = 0.7 + Math.sin(t * 1.5) * 0.25;
    }

    // Parallax tilt: smooth follow toward cursor, plus base ambient sway.
    tiltCurrent.current.x = THREE.MathUtils.lerp(
      tiltCurrent.current.x,
      tiltTarget.current.x,
      Math.min(1, delta * 3),
    );
    tiltCurrent.current.y = THREE.MathUtils.lerp(
      tiltCurrent.current.y,
      tiltTarget.current.y,
      Math.min(1, delta * 3),
    );
    if (groupRef.current) {
      groupRef.current.rotation.x = -0.55 + tiltCurrent.current.x;
      groupRef.current.rotation.y =
        Math.sin(t * 0.08) * 0.15 + tiltCurrent.current.y;
    }
  });

  // Seed highlight buffer once for the static case.
  useMemo(() => {
    for (let h = 0; h < highlightIdx.length; h++) {
      const src = highlightIdx[h] * 3;
      highlightPositions[h * 3] = livePositions[src];
      highlightPositions[h * 3 + 1] = livePositions[src + 1] + 0.05;
      highlightPositions[h * 3 + 2] = livePositions[src + 2];
    }
  }, [highlightIdx, highlightPositions, livePositions]);

  return (
    <group ref={groupRef} rotation={[-0.55, 0, 0]} position={[0, -1.2, 0]}>
      {/* Wireframe net */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[livePositions, 3]}
          />
          <bufferAttribute attach="index" args={[lineIndices, 1]} />
        </bufferGeometry>
        <lineBasicMaterial
          color="#00B3E3"
          transparent
          opacity={0.18}
          depthWrite={false}
        />
      </lineSegments>

      {/* Particle nodes */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[livePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#00B3E3"
          size={0.05}
          sizeAttenuation
          transparent
          opacity={0.65}
          depthWrite={false}
        />
      </points>

      {/* Highlight glowing nodes */}
      <points ref={highlightsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[highlightPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#7CE6FF"
          size={0.18}
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

export const HeroParticleField = () => {
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <div
      aria-hidden="true"
      // Container catches pointer events so the canvas can react. Edge-fade
      // overlays below explicitly opt out so they don't block interaction.
      className="absolute inset-y-0 right-0 hidden md:block md:w-[62%] lg:w-[58%]"
    >
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 4.5, 8], fov: 42 }}
        frameloop={reduced ? "demand" : "always"}
      >
        <Field animate={!reduced} />
      </Canvas>
      {/*
        Interactivity is restricted to the four corners. We cover the center
        of the canvas with a transparent overlay that captures pointer events
        so they never reach the canvas — leaving an L-shaped corner band
        around it as the only interactive zone.
      */}
      <div className="absolute inset-y-[35%] inset-x-[35%] pointer-events-auto" />
      {/* Edge fades so the canvas dissolves into the page */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
};

export default HeroParticleField;
