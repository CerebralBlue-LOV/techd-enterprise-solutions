import { useEffect, useRef, useState } from "react";

interface Props {
  /** Cursor position in section-local coords, or null when outside. */
  cursor: { x: number; y: number } | null;
}

const SPACING = 48;       // grid cell size
const SEGMENT = 8;        // line subdivision (smaller = smoother curve)
const RADIUS = 200;       // bulge radius in px
const STRENGTH = 28;      // max displacement in px

/**
 * SVG grid that bulges outward radially around the cursor (lens effect).
 * Pure structural distortion — no color change.
 */
const BulgeGrid = ({ cursor, width, height }: Props & { width: number; height: number }) => {
  if (width === 0 || height === 0) return null;

  const cols = Math.ceil(width / SPACING) + 1;
  const rows = Math.ceil(height / SPACING) + 1;

  const warp = (x: number, y: number) => {
    if (!cursor) return { x, y };
    const dx = x - cursor.x;
    const dy = y - cursor.y;
    const d = Math.hypot(dx, dy);
    if (d > RADIUS || d === 0) return { x, y };
    const t = 1 - d / RADIUS;
    const push = STRENGTH * t * t; // ease-out
    return { x: x + (dx / d) * push, y: y + (dy / d) * push };
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
        WebkitMaskImage: "radial-gradient(80% 90% at 50% 35%, black 35%, transparent 85%)",
        maskImage: "radial-gradient(80% 90% at 50% 35%, black 35%, transparent 85%)",
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

export const PracticeHeroBackdrop = ({ cursor }: BackdropProps) => {
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
      <BulgeGrid cursor={cursor} width={size.w} height={size.h} />

      {/* Gradient wash (kept) */}
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

export default PracticeHeroBackdrop;
