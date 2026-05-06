import Layout from "@layout/Layout";
import { Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

/**
 * /icon-lab — temporary internal page exploring icon styles for the 5 practices.
 * Each row shows one stylistic approach across all five practice concepts so we
 * can pick a coherent system before applying icons to the solution cards.
 *
 * Practices: AI · Data · Automation · Security · Hybrid Cloud
 */

const PRACTICES = ["AI & Generative", "Data & Analytics", "Automation", "Security", "Hybrid Cloud"] as const;

// ---------- Style 1: Editorial line ----------
// Thin 1.5px strokes, generous padding, no fill. Calm, Stripe-like.
const Style1 = ({ practice }: { practice: string }) => {
  const stroke = "hsl(var(--secondary))";
  const sw = 1.5;
  return (
    <svg viewBox="0 0 64 64" className="h-14 w-14" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
      {practice === "AI & Generative" && (
        <>
          <circle cx="32" cy="32" r="6" />
          <path d="M32 12v8M32 44v8M12 32h8M44 32h8M18 18l5.5 5.5M40.5 40.5L46 46M46 18l-5.5 5.5M23.5 40.5L18 46" />
        </>
      )}
      {practice === "Data & Analytics" && (
        <>
          <ellipse cx="32" cy="18" rx="16" ry="5" />
          <path d="M16 18v12c0 2.8 7.2 5 16 5s16-2.2 16-5V18M16 32v12c0 2.8 7.2 5 16 5s16-2.2 16-5V32" />
        </>
      )}
      {practice === "Automation" && (
        <>
          <circle cx="32" cy="32" r="12" />
          <path d="M32 14v6M32 44v6M50 32h-6M20 32h-6M44.7 19.3l-4.2 4.2M23.5 40.5l-4.2 4.2M44.7 44.7l-4.2-4.2M23.5 23.5l-4.2-4.2" />
        </>
      )}
      {practice === "Security" && (
        <>
          <path d="M32 10l18 6v12c0 12-8 20-18 26-10-6-18-14-18-26V16z" />
          <path d="M25 32l5 5 9-10" />
        </>
      )}
      {practice === "Hybrid Cloud" && (
        <>
          <path d="M20 40a8 8 0 010-16 12 12 0 0123 3 8 8 0 011 15z" />
          <path d="M14 50h36" strokeDasharray="2 3" />
        </>
      )}
    </svg>
  );
};

// ---------- Style 2: Duotone cyan-fill ----------
// Soft cyan rounded background block + crisp cyan glyph. Editorial but warmer.
const Style2 = ({ practice }: { practice: string }) => {
  const stroke = "hsl(var(--primary))";
  return (
    <div className="relative grid h-14 w-14 place-items-center rounded-[14px] bg-primary/10">
      <svg viewBox="0 0 32 32" className="h-7 w-7" fill="none" stroke={stroke} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        {practice === "AI & Generative" && (
          <>
            <circle cx="16" cy="16" r="3" fill={stroke} />
            <path d="M16 4v6M16 22v6M4 16h6M22 16h6M7 7l4 4M21 21l4 4M25 7l-4 4M11 21l-4 4" />
          </>
        )}
        {practice === "Data & Analytics" && (
          <>
            <ellipse cx="16" cy="9" rx="9" ry="3" />
            <path d="M7 9v8c0 1.7 4 3 9 3s9-1.3 9-3V9M7 17v6c0 1.7 4 3 9 3s9-1.3 9-3v-6" />
          </>
        )}
        {practice === "Automation" && (
          <>
            <path d="M16 4l3 4 5-1 1 5 4 3-4 3-1 5-5-1-3 4-3-4-5 1-1-5-4-3 4-3 1-5 5 1z" />
            <circle cx="16" cy="16" r="3" fill={stroke} />
          </>
        )}
        {practice === "Security" && (
          <>
            <path d="M16 4l10 3v7c0 6-4 11-10 14-6-3-10-8-10-14V7z" />
            <circle cx="16" cy="15" r="2.5" fill={stroke} />
            <path d="M16 17.5V22" />
          </>
        )}
        {practice === "Hybrid Cloud" && (
          <>
            <path d="M9 21a4 4 0 010-8 7 7 0 0113 1.5A4.5 4.5 0 0123 22z" />
            <path d="M16 26v3M11 27.5l-2 1.5M21 27.5l2 1.5" />
          </>
        )}
      </svg>
    </div>
  );
};

// ---------- Style 3: Dashed / drawn (animated on hover) ----------
const Style3 = ({ practice }: { practice: string }) => {
  const stroke = "hsl(var(--primary))";
  return (
    <svg viewBox="0 0 64 64" className="iconlab-draw h-14 w-14" fill="none" stroke={stroke} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      {practice === "AI & Generative" && (
        <>
          <circle cx="32" cy="32" r="8" pathLength={1} />
          <circle cx="14" cy="14" r="3" pathLength={1} />
          <circle cx="50" cy="14" r="3" pathLength={1} />
          <circle cx="14" cy="50" r="3" pathLength={1} />
          <circle cx="50" cy="50" r="3" pathLength={1} />
          <path d="M16 16l10 10M48 16L38 26M16 48l10-10M48 48L38 38" pathLength={1} />
        </>
      )}
      {practice === "Data & Analytics" && (
        <>
          <path d="M12 50V34M24 50V24M36 50V14M48 50V28" pathLength={1} />
          <path d="M12 50h36" pathLength={1} />
        </>
      )}
      {practice === "Automation" && (
        <>
          <path d="M14 32a18 18 0 0136 0" pathLength={1} />
          <path d="M50 32a18 18 0 01-36 0" pathLength={1} strokeDasharray="2 3" />
          <path d="M44 22l6-2 2 6M20 42l-6 2-2-6" pathLength={1} />
        </>
      )}
      {practice === "Security" && (
        <>
          <path d="M32 10l18 6v12c0 12-8 20-18 26-10-6-18-14-18-26V16z" pathLength={1} />
          <circle cx="32" cy="30" r="4" pathLength={1} />
          <path d="M32 34v8" pathLength={1} />
        </>
      )}
      {practice === "Hybrid Cloud" && (
        <>
          <path d="M20 40a8 8 0 010-16 12 12 0 0123 3 8 8 0 011 15z" pathLength={1} />
          <path d="M16 48h32" strokeDasharray="2 4" pathLength={1} />
          <circle cx="22" cy="48" r="1.5" fill={stroke} />
          <circle cx="42" cy="48" r="1.5" fill={stroke} />
        </>
      )}
    </svg>
  );
};

// ---------- Style 4: Geometric mark (badge) ----------
// Solid cyan square, white glyph inside. Bold. Reads like a logo lockup.
const Style4 = ({ practice }: { practice: string }) => {
  return (
    <div className="grid h-14 w-14 place-items-center rounded-[14px] bg-primary text-background shadow-[0_8px_24px_-12px_hsl(var(--primary)/0.6)]">
      <svg viewBox="0 0 32 32" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        {practice === "AI & Generative" && (
          <>
            <circle cx="16" cy="16" r="3" fill="currentColor" />
            <path d="M16 5v5M16 22v5M5 16h5M22 16h5M8 8l3 3M21 21l3 3M24 8l-3 3M11 21l-3 3" />
          </>
        )}
        {practice === "Data & Analytics" && (
          <>
            <ellipse cx="16" cy="9" rx="9" ry="3" />
            <path d="M7 9v14c0 1.7 4 3 9 3s9-1.3 9-3V9" />
            <path d="M7 16c0 1.7 4 3 9 3s9-1.3 9-3" />
          </>
        )}
        {practice === "Automation" && (
          <>
            <circle cx="16" cy="16" r="6" />
            <path d="M16 5v3M16 24v3M5 16h3M24 16h3M9 9l2 2M21 21l2 2M23 9l-2 2M11 21l-2 2" />
          </>
        )}
        {practice === "Security" && (
          <>
            <path d="M16 4l10 3v8c0 6-4 11-10 13-6-2-10-7-10-13V7z" />
            <path d="M12 15l3 3 5-6" />
          </>
        )}
        {practice === "Hybrid Cloud" && (
          <>
            <path d="M9 21a4 4 0 010-8 7 7 0 0113 1.5A4.5 4.5 0 0123 22z" />
            <path d="M13 26h6M11 29h10" />
          </>
        )}
      </svg>
    </div>
  );
};

// ---------- Style 5: Particle composition ----------
// Icon shape rendered with brand-cyan dots. Echoes the hero particle system.
const Style5 = ({ practice }: { practice: string }) => {
  const fill = "hsl(var(--primary))";
  // Each shape = array of [x, y, r]
  const SHAPES: Record<string, [number, number, number][]> = {
    "AI & Generative": [
      [32, 32, 3],
      [16, 16, 1.5], [48, 16, 1.5], [16, 48, 1.5], [48, 48, 1.5],
      [32, 12, 1.2], [32, 52, 1.2], [12, 32, 1.2], [52, 32, 1.2],
      [22, 22, 1], [42, 22, 1], [22, 42, 1], [42, 42, 1],
    ],
    "Data & Analytics": [
      [14, 50, 1.4], [22, 50, 1.4], [30, 50, 1.4], [38, 50, 1.4], [46, 50, 1.4],
      [14, 42, 1.4], [22, 36, 1.4], [30, 28, 1.4], [38, 22, 1.4], [46, 16, 1.4],
      [14, 34, 1], [22, 28, 1], [30, 22, 1], [38, 16, 1],
    ],
    "Automation": [
      [32, 14, 1.4], [40, 16, 1.4], [46, 22, 1.4], [50, 30, 1.4], [50, 38, 1.4],
      [46, 44, 1.4], [40, 48, 1.4], [32, 50, 1.4], [24, 48, 1.4], [18, 44, 1.4],
      [14, 38, 1.4], [14, 30, 1.4], [18, 22, 1.4], [24, 16, 1.4],
      [32, 32, 3],
    ],
    "Security": [
      [32, 10, 1.4], [22, 14, 1.4], [42, 14, 1.4], [16, 22, 1.4], [48, 22, 1.4],
      [16, 32, 1.4], [48, 32, 1.4], [18, 40, 1.4], [46, 40, 1.4],
      [24, 48, 1.4], [40, 48, 1.4], [32, 54, 1.4],
      [32, 30, 2], [32, 36, 1.2],
    ],
    "Hybrid Cloud": [
      [22, 24, 1.4], [30, 20, 1.4], [38, 20, 1.4], [46, 24, 1.4], [50, 32, 1.4],
      [46, 38, 1.4], [38, 40, 1.4], [22, 40, 1.4], [16, 36, 1.4], [14, 28, 1.4], [18, 22, 1.4],
      [16, 50, 1], [24, 50, 1], [32, 50, 1], [40, 50, 1], [48, 50, 1],
    ],
  };
  return (
    <svg viewBox="0 0 64 64" className="h-14 w-14">
      {SHAPES[practice].map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill={fill} />
      ))}
    </svg>
  );
};

// ---------- Style 6: 3D isometric wireframe (Three.js) ----------
// Inspired by Supabase-style 3D mark — wireframe primitives floating with
// soft cyan accent points. Each practice gets a distinct primitive.
const Mesh3D = ({ practice }: { practice: string }) => {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.4;
  });
  const cyan = "#00B3E3";
  const wire = "#56565A";

  return (
    <group ref={ref}>
      {practice === "AI & Generative" && (
        <>
          {/* icosahedron neural core */}
          <mesh>
            <icosahedronGeometry args={[0.9, 1]} />
            <meshBasicMaterial wireframe color={wire} />
          </mesh>
          <mesh scale={0.18}>
            <icosahedronGeometry args={[1, 0]} />
            <meshBasicMaterial color={cyan} />
          </mesh>
        </>
      )}
      {practice === "Data & Analytics" && (
        <>
          {/* stacked cylinders */}
          {[-0.55, 0, 0.55].map((y, i) => (
            <mesh key={i} position={[0, y, 0]}>
              <cylinderGeometry args={[0.7, 0.7, 0.35, 24, 1, true]} />
              <meshBasicMaterial wireframe color={wire} />
            </mesh>
          ))}
          <mesh position={[0.85, 0.55, 0]} scale={0.12}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshBasicMaterial color={cyan} />
          </mesh>
        </>
      )}
      {practice === "Automation" && (
        <>
          {/* torus + orbiting dot */}
          <mesh rotation={[Math.PI / 2.5, 0, 0]}>
            <torusGeometry args={[0.85, 0.06, 16, 64]} />
            <meshBasicMaterial color={cyan} />
          </mesh>
          <mesh>
            <octahedronGeometry args={[0.5, 0]} />
            <meshBasicMaterial wireframe color={wire} />
          </mesh>
        </>
      )}
      {practice === "Security" && (
        <>
          {/* shield-like prism */}
          <mesh rotation={[0, 0, 0]}>
            <coneGeometry args={[0.85, 1.5, 4]} />
            <meshBasicMaterial wireframe color={wire} />
          </mesh>
          <mesh position={[0, 0, 0.3]} scale={0.18}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshBasicMaterial color={cyan} />
          </mesh>
        </>
      )}
      {practice === "Hybrid Cloud" && (
        <>
          {/* two intersecting boxes — hybrid */}
          <mesh rotation={[0.4, 0.6, 0]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial wireframe color={wire} />
          </mesh>
          <mesh position={[0.35, 0.2, 0.2]} scale={0.55} rotation={[0.7, 0.2, 0.4]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial wireframe color={cyan} />
          </mesh>
        </>
      )}
    </group>
  );
};

// Floating cyan particles around 3D meshes (echoes the hero particle field)
const FloatingDots = () => {
  const positions = useMemo(() => {
    const arr: [number, number, number][] = [];
    for (let i = 0; i < 14; i++) {
      const a = (i / 14) * Math.PI * 2;
      const r = 1.4 + Math.random() * 0.5;
      arr.push([Math.cos(a) * r, (Math.random() - 0.5) * 1.4, Math.sin(a) * r]);
    }
    return arr;
  }, []);
  return (
    <>
      {positions.map((p, i) => (
        <mesh key={i} position={p} scale={0.04 + Math.random() * 0.03}>
          <sphereGeometry args={[1, 8, 8]} />
          <meshBasicMaterial color="#00B3E3" />
        </mesh>
      ))}
    </>
  );
};

const Style6 = ({ practice }: { practice: string }) => (
  <div className="h-24 w-24">
    <Canvas camera={{ position: [0, 0, 3.4], fov: 40 }} dpr={[1, 2]}>
      <Suspense fallback={null}>
        <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.6}>
          <Mesh3D practice={practice} />
        </Float>
        <FloatingDots />
      </Suspense>
    </Canvas>
  </div>
);

// ---------- Style 7: 3D solid (matte material) ----------
// Soft-shaded solid forms with rim light — premium, product-marketing feel.
const Mesh3DSolid = ({ practice }: { practice: string }) => {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.35;
  });
  return (
    <group ref={ref}>
      {practice === "AI & Generative" && (
        <mesh>
          <icosahedronGeometry args={[0.9, 0]} />
          <MeshDistortMaterial color="#00B3E3" distort={0.25} speed={1.5} roughness={0.4} metalness={0.2} />
        </mesh>
      )}
      {practice === "Data & Analytics" && (
        <group>
          {[-0.55, 0, 0.55].map((y, i) => (
            <mesh key={i} position={[0, y, 0]}>
              <cylinderGeometry args={[0.7 - i * 0.05, 0.7 - i * 0.05, 0.32, 32]} />
              <meshStandardMaterial color={i === 1 ? "#00B3E3" : "#A7A5A8"} roughness={0.5} metalness={0.1} />
            </mesh>
          ))}
        </group>
      )}
      {practice === "Automation" && (
        <mesh rotation={[Math.PI / 2.5, 0, 0]}>
          <torusKnotGeometry args={[0.6, 0.18, 80, 16]} />
          <meshStandardMaterial color="#00B3E3" roughness={0.35} metalness={0.4} />
        </mesh>
      )}
      {practice === "Security" && (
        <mesh>
          <octahedronGeometry args={[0.95, 0]} />
          <meshStandardMaterial color="#56565A" roughness={0.4} metalness={0.3} flatShading />
        </mesh>
      )}
      {practice === "Hybrid Cloud" && (
        <group>
          <mesh position={[-0.3, 0, 0]}>
            <sphereGeometry args={[0.5, 32, 32]} />
            <meshStandardMaterial color="#A7A5A8" roughness={0.5} />
          </mesh>
          <mesh position={[0.3, 0, 0]}>
            <sphereGeometry args={[0.5, 32, 32]} />
            <meshStandardMaterial color="#00B3E3" roughness={0.4} />
          </mesh>
        </group>
      )}
    </group>
  );
};

const Style7 = ({ practice }: { practice: string }) => (
  <div className="h-24 w-24">
    <Canvas camera={{ position: [0, 0, 3.2], fov: 40 }} dpr={[1, 2]}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 4, 2]} intensity={1.1} />
      <directionalLight position={[-3, -2, -1]} intensity={0.4} color="#00B3E3" />
      <Suspense fallback={null}>
        <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.5}>
          <Mesh3DSolid practice={practice} />
        </Float>
      </Suspense>
    </Canvas>
  </div>
);

// ---------- Style 8: Vector glass / glassmorphism on dark tile ----------
// Dark slate tile with light-stroke vector + soft cyan glow. Reads premium and
// matches the reference image (Supabase "Vector" card).
const Style8 = ({ practice }: { practice: string }) => {
  const stroke = "#00B3E3";
  return (
    <div className="relative grid h-20 w-20 place-items-center overflow-hidden rounded-2xl bg-[#0F1115] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,179,227,0.25),transparent_60%)]" />
      <svg viewBox="0 0 64 64" className="relative h-12 w-12" fill="none" stroke={stroke} strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
        {practice === "AI & Generative" && (
          <>
            <path d="M32 12L50 22v20L32 52 14 42V22z" />
            <path d="M32 12v40M14 22l36 20M50 22L14 42" opacity={0.6} />
            <circle cx="32" cy="32" r="2.5" fill={stroke} />
          </>
        )}
        {practice === "Data & Analytics" && (
          <>
            <path d="M32 8L52 18v28L32 56 12 46V18z" />
            <path d="M12 18l20 10 20-10M32 28v28" opacity={0.5} />
          </>
        )}
        {practice === "Automation" && (
          <>
            <circle cx="32" cy="32" r="14" />
            <circle cx="32" cy="32" r="6" />
            <path d="M32 8v10M32 46v10M8 32h10M46 32h10" opacity={0.6} />
          </>
        )}
        {practice === "Security" && (
          <>
            <path d="M32 8l18 6v14c0 12-8 20-18 26-10-6-18-14-18-26V14z" />
            <path d="M24 32l6 6 10-12" />
          </>
        )}
        {practice === "Hybrid Cloud" && (
          <>
            <path d="M32 12l16 9v18l-16 9-16-9V21z" />
            <path d="M16 21l16 9 16-9M32 30v18" opacity={0.5} />
          </>
        )}
      </svg>
      {/* corner accent dots */}
      <span className="absolute right-3 top-3 h-1 w-1 rounded-full bg-primary" />
      <span className="absolute bottom-3 left-3 h-0.5 w-0.5 rounded-full bg-primary/60" />
    </div>
  );
};

// ============================================================
// IMPROVED GLASS-TILE VARIANTS — on-palette only
// Uses brand tokens: primary (#00B3E3), secondary (#56565A),
// muted/accent (#A7A5A8), background (#FFFFFF). No raw hex.
// ============================================================

/** Shared glyph set used by all glass variants — refined geometry. */
const GlassGlyph = ({ practice, opacity = 0.6 }: { practice: string; opacity?: number }) => (
  <>
    {practice === "AI & Generative" && (
      <>
        {/* Hexagonal neural core with internal triangulation */}
        <path d="M32 8L52 20v24L32 56 12 44V20z" />
        <path d="M32 8v48M12 20l40 24M52 20L12 44" opacity={opacity} />
        <circle cx="32" cy="32" r="3" fill="currentColor" />
        <circle cx="32" cy="14" r="1.2" fill="currentColor" opacity={0.7} />
        <circle cx="48" cy="38" r="1.2" fill="currentColor" opacity={0.7} />
        <circle cx="16" cy="38" r="1.2" fill="currentColor" opacity={0.7} />
      </>
    )}
    {practice === "Data & Analytics" && (
      <>
        {/* Layered cylinder stack with flow indicator */}
        <ellipse cx="32" cy="14" rx="16" ry="4" />
        <path d="M16 14v10c0 2.2 7.2 4 16 4s16-1.8 16-4V14" opacity={opacity} />
        <path d="M16 28v10c0 2.2 7.2 4 16 4s16-1.8 16-4V28" opacity={opacity} />
        <path d="M16 42v8c0 2.2 7.2 4 16 4s16-1.8 16-4v-8" />
        <circle cx="32" cy="14" r="1.5" fill="currentColor" />
      </>
    )}
    {practice === "Automation" && (
      <>
        {/* Concentric rotating gears */}
        <circle cx="32" cy="32" r="16" opacity={opacity} />
        <circle cx="32" cy="32" r="10" />
        <circle cx="32" cy="32" r="3" fill="currentColor" />
        <path d="M32 10v6M32 48v6M10 32h6M48 32h6M16 16l4 4M44 44l4 4M48 16l-4 4M16 48l4-4" />
      </>
    )}
    {practice === "Security" && (
      <>
        {/* Shield with inner lock geometry */}
        <path d="M32 8l18 6v14c0 12-8 20-18 26-10-6-18-14-18-26V14z" />
        <path d="M22 30v-3a10 10 0 0120 0v3" opacity={opacity} />
        <rect x="22" y="30" width="20" height="14" rx="2" />
        <circle cx="32" cy="37" r="2" fill="currentColor" />
      </>
    )}
    {practice === "Hybrid Cloud" && (
      <>
        {/* Two interlocked cubes — hybrid topology */}
        <path d="M22 18l14-7 14 7v14l-14 7-14-7z" />
        <path d="M22 18l14 7 14-7M36 25v14" opacity={opacity} />
        <path d="M14 32l12-6 12 6v12l-12 6-12-6z" />
        <path d="M14 32l12 6 12-6M26 38v12" opacity={opacity} />
      </>
    )}
  </>
);

// ---------- Style 9: Refined Glass — sharper, denser, brand-only ----------
const Style9 = ({ practice }: { practice: string }) => (
  <div className="relative grid h-24 w-24 place-items-center overflow-hidden rounded-2xl bg-secondary">
    {/* Brand cyan radial glow */}
    <span className="absolute inset-0 bg-[radial-gradient(circle_at_25%_15%,hsl(var(--primary)/0.35),transparent_55%)]" />
    {/* Subtle inner ring for glass edge */}
    <span className="absolute inset-0 rounded-2xl shadow-[inset_0_0_0_1px_hsl(var(--background)/0.08)]" />
    {/* Bottom rim highlight */}
    <span className="absolute -bottom-10 left-1/2 h-20 w-32 -translate-x-1/2 rounded-full bg-primary/15 blur-2xl" />
    <svg
      viewBox="0 0 64 64"
      className="relative h-12 w-12 text-primary"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.3}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <GlassGlyph practice={practice} opacity={0.55} />
    </svg>
    {/* Corner micro-dots in cyan */}
    <span className="absolute right-3 top-3 h-1 w-1 rounded-full bg-primary" />
    <span className="absolute right-5 top-3 h-0.5 w-0.5 rounded-full bg-primary/50" />
    <span className="absolute bottom-3 left-3 h-0.5 w-0.5 rounded-full bg-primary/60" />
  </div>
);

// ---------- Style 10: Bordered Glass — primary outline + glow ----------
const Style10 = ({ practice }: { practice: string }) => (
  <div className="relative grid h-24 w-24 place-items-center overflow-hidden rounded-2xl bg-secondary ring-1 ring-primary/40 shadow-[0_8px_28px_-12px_hsl(var(--primary)/0.5)]">
    {/* Diagonal cyan sweep */}
    <span className="absolute inset-0 bg-[linear-gradient(135deg,hsl(var(--primary)/0.25),transparent_55%)]" />
    {/* Soft secondary noise via dual-radial */}
    <span className="absolute -top-6 right-0 h-16 w-16 rounded-full bg-primary/20 blur-2xl" />
    <svg
      viewBox="0 0 64 64"
      className="relative h-12 w-12 text-background"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <GlassGlyph practice={practice} opacity={0.45} />
    </svg>
    {/* Bottom-right cyan accent corner */}
    <span className="absolute bottom-2 right-2 h-3 w-3 rounded-sm border border-primary/60" />
  </div>
);

// ---------- Style 11: Light Glass — inverted, white tile ----------
const Style11 = ({ practice }: { practice: string }) => (
  <div className="relative grid h-24 w-24 place-items-center overflow-hidden rounded-2xl bg-background ring-1 ring-border shadow-[0_10px_24px_-16px_hsl(var(--secondary)/0.35)]">
    {/* Cyan glow pinned to corner */}
    <span className="absolute -left-6 -top-6 h-20 w-20 rounded-full bg-primary/25 blur-2xl" />
    {/* Faint grid pattern in muted */}
    <span
      className="absolute inset-0 opacity-[0.18]"
      style={{
        backgroundImage:
          "linear-gradient(hsl(var(--muted)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--muted)) 1px, transparent 1px)",
        backgroundSize: "10px 10px",
      }}
    />
    <svg
      viewBox="0 0 64 64"
      className="relative h-12 w-12 text-primary"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <GlassGlyph practice={practice} opacity={0.5} />
    </svg>
    <span className="absolute bottom-2.5 right-2.5 h-1 w-1 rounded-full bg-primary" />
  </div>
);


const Row = ({
  num,
  name,
  description,
  recommended,
  Style,
}: {
  num: number;
  name: string;
  description: string;
  recommended?: boolean;
  Style: React.FC<{ practice: string }>;
}) => (
  <div className="rounded-xl border border-border bg-background p-8">
    <div className="flex flex-wrap items-baseline gap-3">
      <span className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
        Style {num}
      </span>
      <h3 className="text-2xl font-bold">{name}</h3>
      {recommended && (
        <span className="rounded-full border border-primary px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
          Recommended
        </span>
      )}
    </div>
    <p className="mt-2 max-w-2xl text-sm font-light text-muted-foreground">{description}</p>

    <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-5">
      {PRACTICES.map((p) => (
        <div key={p} className="flex flex-col items-center gap-3 rounded-lg border border-border/50 p-5">
          <Style practice={p} />
          <p className="text-center text-[11px] font-bold uppercase tracking-[0.14em] text-secondary">
            {p}
          </p>
        </div>
      ))}
    </div>
  </div>
);

const IconLab = () => {
  return (
    <Layout>
      <section className="section">
        <div className="container-page">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Internal · Icon Lab</p>
          <h1 className="mt-4 text-5xl font-bold leading-[1.05]">Icon system exploration</h1>
          <p className="mt-4 max-w-2xl text-base font-light text-muted-foreground">
            Five candidate icon styles applied across the five practices. Each row keeps the same
            geometry so you can compare style — not subject — at a glance. Brand cyan
            (#00B3E3) and secondary gray are the only colors used.
          </p>

          <div className="mt-12 space-y-8">
            <Row
              num={1}
              name="Editorial line"
              description="Thin 1.5px strokes in secondary gray. Calm, Stripe/Linear-feel. Quiet, scales beautifully, but can feel generic if every brand uses it."
              Style={Style1}
            />
            <Row
              num={2}
              name="Duotone tile"
              description="Soft cyan rounded tile with a crisp cyan glyph. Warm and on-brand without shouting. Reads well at small sizes on the solution cards."
              recommended
              Style={Style2}
            />
            <Row
              num={3}
              name="Drawn / dashed"
              description="Strokes that animate in on hover (see them light up). Distinct, but lots of motion across 5 cards on a single page can feel busy."
              Style={Style3}
            />
            <Row
              num={4}
              name="Solid badge"
              description="Filled cyan tile with white glyph. Highest contrast, almost a logo lockup. Great for hero/eyebrow placements; risks visual noise on a card grid."
              Style={Style4}
            />
            <Row
              num={5}
              name="Particle composition"
              description="Icon shape rendered with cyan dots — echoes the hero particle field. Strong identity, but legibility drops at small sizes (icons must stay ≥56px)."
              Style={Style5}
            />
            <Row
              num={6}
              name="3D wireframe (live)"
              description="Real Three.js geometry — wireframe primitives floating in space, with cyan accent points and a slow auto-rotation. Distinct, premium, but heavy if used on every card."
              Style={Style6}
            />
            <Row
              num={7}
              name="3D solid (live)"
              description="Soft-shaded solid 3D forms with rim lighting and a brand-cyan tint. Product-marketing energy (Linear / Vercel / Apple landing). Best as one or two hero accents, not 5×."
              recommended
              Style={Style7}
            />
            <Row
              num={8}
              name="Glass tile (Supabase-style)"
              description="Dark slate tile with a thin cyan vector glyph and soft radial glow — directly inspired by the reference image you sent. Strong product-card identity."
              recommended
              Style={Style8}
            />
            <Row
              num={9}
              name="Refined glass — denser glyph"
              description="Same DNA as Style 8 but tightened: secondary-gray tile (on-palette), cleaner inner ring, layered cyan glow, denser glyph geometry, refined micro-dots. Pure brand tokens — no off-palette colors."
              recommended
              Style={Style9}
            />
            <Row
              num={10}
              name="Bordered glass — cyan ring"
              description="Glass tile wrapped in a 1px primary ring with a soft cyan drop-shadow and diagonal sweep. Slightly bolder presence — useful when the icon needs to anchor a card without competing with the title."
              Style={Style10}
            />
            <Row
              num={11}
              name="Light glass — inverted"
              description="White tile with subtle muted grid, cyan corner glow, and primary glyph. Same family but works on light surfaces — solves the case where dark tiles feel heavy in a content-dense card."
              Style={Style11}
            />
          </div>

          <div className="mt-16 rounded-xl border-2 border-primary/30 bg-primary/[0.03] p-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">My recommendation</p>
            <h2 className="mt-3 text-3xl font-bold">Style 8 (Glass tile) for solution cards · Style 7 (3D solid) for hero accents</h2>
            <p className="mt-4 max-w-3xl text-base font-light text-secondary">
              The reference you sent (Supabase Vector card) maps almost exactly to <strong>Style 8</strong>:
              dark slate tile, thin cyan vector glyph, soft radial glow, micro accent dots. It carries
              clear product identity at the card scale and pairs cleanly with the rotating border beam.
              Reserve <strong>Style 7</strong> (live 3D solids) for one or two marquee placements — hero
              eyebrow, "Why TechD" feature, or a Resources hero — where motion earns its weight. Use
              <strong> Style 2</strong> (duotone tile) as a fallback for utility surfaces (footer, nav, in-line
              content). Avoid running 5 × Three.js canvases inside the solution grid — the bundle and
              CPU cost is real.
            </p>
          </div>

          <p className="mt-12 text-xs font-light text-muted-foreground">
            Temporary internal page · /icon-lab — delete when an icon style is chosen.
          </p>
        </div>
      </section>

      <style>{`
        .iconlab-draw path,
        .iconlab-draw circle {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          transition: stroke-dashoffset 900ms ease;
        }
        .iconlab-draw:hover path,
        .iconlab-draw:hover circle {
          stroke-dashoffset: 0;
        }
      `}</style>
    </Layout>
  );
};

export default IconLab;
