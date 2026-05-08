import { useEffect, useRef, useState } from "react";

interface Props {
  /** Cursor position in section-local coords, or null when outside. */
  cursor: { x: number; y: number } | null;
}

const SPACING = 56;       // grid cell size
const SEGMENT = 10;       // line subdivision (smaller = smoother curve)
const RADIUS = 200;       // bulge radius around cursor
const STRENGTH = 26;      // max bulge displacement
const SWAY_AMP = 6;       // ambient sway amplitude in px
const SWAY_PERIOD = 9000; // sway full cycle in ms
const SWAY_WAVE = 280;    // wavelength of the sway shape in px

/**
 * Industries hero backdrop.
 * - Vertical + horizontal lines that subtly sway sideways (off-vertical drift)
 * - Cursor bulge interaction (lens effect) borrowed from PracticeHeroBackdrop
 * Pure structural distortion — no color change.
 */
const SwayingBulgeGrid = ({ cursor, width, height }: Props & { width: number; height: number }) => {
  const [t, setT] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    let mounted = true;
    const start = performance.now();
    const tick = (now: number) => {
      if (!mounted) return;
      setT((now - start) / SWAY_PERIOD);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      mounted = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (width === 0 || height === 0) return null;

  const cols = Math.ceil(width / SPACING) + 1;
  const rows = Math.ceil(height / SPACING) + 1;
  const phase = t * Math.PI * 2;

  // Sway: sideways offset that varies along the line, plus slow phase drift.
  const swayX = (y: number) => Math.sin(y / SWAY_WAVE + phase) * SWAY_AMP;
  const swayY = (x: number) => Math.cos(x / SWAY_WAVE + phase * 0.85) * (SWAY_AMP * 0.6);

  const warp = (x: number, y: number) => {
    let nx = x + swayX(y);
    let ny = y + swayY(x);
    if (cursor) {
      const dx = nx - cursor.x;
      const dy = ny - cursor.y;
      const d = Math.hypot(dx, dy);
      if (d > 0 && d < RADIUS) {
        const k = 1 - d / RADIUS;
        const push = STRENGTH * k * k;
        nx += (dx / d) * push;
        ny += (dy / d) * push;
      }
    }
    return { x: nx, y: ny };
  };

  const buildPath = (points: Array<{ x: number; y: number }>) => {
    if (points.length === 0) return "";
    let d = `M ${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)}`;
    for (let i = 1; i < points.length; i++) d += ` L ${points[i].x.toFixed(2)} ${points[i].y.toFixed(2)}`;
    return d;
  };

  const verticals: string[] = [];
  for (let c = 0; c < cols; c++) {
    const x = c * SPACING;
    const pts: Array<{ x: number; y: number }> = [];
    for (let y = 0; y <= height; y += SEGMENT) pts.push(warp(x, y));
    pts.push(warp(x, height));
    verticals.push(buildPath(pts));
  }

  const horizontals: string[] = [];
  for (let r = 0; r < rows; r++) {
    const y = r * SPACING;
    const pts: Array<{ x: number; y: number }> = [];
    for (let x = 0; x <= width; x += SEGMENT) pts.push(warp(x, y));
    pts.push(warp(width, y));
    horizontals.push(buildPath(pts));
  }

  return (
    <svg
      className="absolute inset-0 h-full w-full"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      style={{
        WebkitMaskImage: "radial-gradient(80% 90% at 50% 40%, black 35%, transparent 88%)",
        maskImage: "radial-gradient(80% 90% at 50% 40%, black 35%, transparent 88%)",
      }}
    >
      <g stroke="hsl(var(--border) / 0.55)" strokeWidth={1} fill="none">
        {verticals.map((d, i) => <path key={`v${i}`} d={d} />)}
        {horizontals.map((d, i) => <path key={`h${i}`} d={d} />)}
      </g>
    </svg>
  );
};

interface BackdropProps {
  cursor: { x: number; y: number } | null;
}

export const IndustryHeroBackdrop = ({ cursor }: BackdropProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const ro = new ResizeObserver(() => {
      setSize({ w: node.clientWidth, h: node.clientHeight });
    });
    ro.observe(node);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <SwayingBulgeGrid cursor={cursor} width={size.w} height={size.h} />

      {/* Gradient wash */}
      <div className="absolute -top-40 -right-32 h-[640px] w-[640px] rounded-full bg-primary/15 blur-3xl animate-gradient-drift" />
      <div
        className="absolute top-1/3 -left-40 h-[520px] w-[520px] rounded-full bg-primary/10 blur-3xl animate-gradient-drift"
        style={{ animationDelay: "-9s" }}
      />
      <div
        className="absolute bottom-0 left-[10%] h-[420px] w-[680px] rounded-full bg-background blur-3xl animate-gradient-drift"
        style={{ animationDelay: "-4s" }}
      />

      <div className="absolute inset-x-0 top-0 bg-gradient-to-b from-background to-transparent" />
    </div>
  );
};

export default IndustryHeroBackdrop;
