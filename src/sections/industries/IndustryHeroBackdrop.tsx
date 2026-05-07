import { useEffect, useRef, useState } from "react";

interface Props {
  cursor: { x: number; y: number } | null;
}

/**
 * Isometric "3D floor" grid receding to a vanishing point near the top.
 * Lines brighten near the cursor (spotlight reveal) — no color shift.
 */
const IsoFloor = ({
  cursor,
  width,
  height,
}: Props & { width: number; height: number }) => {
  if (width === 0 || height === 0) return null;

  // Vanishing point sits above and slightly right of center.
  const vp = { x: width * 0.55, y: height * 0.18 };
  // Floor starts at this Y (everything below recedes upward toward vp).
  const horizonY = height * 0.45;

  // Spotlight radius for the cursor reveal effect.
  const SPOT_RADIUS = 240;

  // Brightness for a path: nearest point on its centroid toward cursor.
  const brightness = (cx: number, cy: number) => {
    if (!cursor) return 0;
    const d = Math.hypot(cx - cursor.x, cy - cursor.y);
    if (d > SPOT_RADIUS) return 0;
    const t = 1 - d / SPOT_RADIUS;
    return t * t; // 0..1
  };

  // 1. Receding "depth" lines — from base of floor to vanishing point.
  // Spaced along the bottom edge.
  const COLS = 22;
  const depthLines = Array.from({ length: COLS + 1 }, (_, i) => {
    const baseX = (i / COLS) * width * 1.6 - width * 0.3; // wider than viewport
    const cx = (baseX + vp.x) / 2;
    const cy = (height + vp.y) / 2;
    return { x1: baseX, y1: height, x2: vp.x, y2: vp.y, b: brightness(cx, cy) };
  });

  // 2. Horizontal "rung" lines — get closer together as they approach the vanishing point.
  // Use a non-linear t so spacing compresses near the horizon.
  const ROWS = 14;
  const rungs = Array.from({ length: ROWS }, (_, i) => {
    const t = (i + 1) / (ROWS + 1);
    // Ease so that t near 1 is closer to vp (compressed).
    const eased = Math.pow(t, 1.8);
    const y = height - eased * (height - vp.y);
    // Width of the rung shrinks toward vp.
    const halfWidth = (1 - eased) * width * 0.9 + eased * 20;
    const x1 = vp.x - halfWidth;
    const x2 = vp.x + halfWidth;
    return { x1, y1: y, x2, y2: y, b: brightness(vp.x, y) };
  });

  return (
    <svg
      className="absolute inset-0 h-full w-full"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      style={{
        // Fade the top/edges so the grid feels like it dissolves into the page.
        WebkitMaskImage:
          "linear-gradient(to top, black 25%, rgba(0,0,0,0.6) 60%, transparent 95%)",
        maskImage:
          "linear-gradient(to top, black 25%, rgba(0,0,0,0.6) 60%, transparent 95%)",
      }}
    >
      <defs>
        {/* Soft floor wash to seat the grid */}
        <linearGradient id="iso-floor-wash" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="hsl(var(--primary) / 0.05)" />
          <stop offset="100%" stopColor="hsl(var(--primary) / 0)" />
        </linearGradient>
      </defs>

      <rect
        x="0"
        y={horizonY}
        width={width}
        height={height - horizonY}
        fill="url(#iso-floor-wash)"
      />

      <g fill="none" strokeLinecap="round">
        {depthLines.map((l, i) => (
          <line
            key={`d${i}`}
            x1={l.x1}
            y1={l.y1}
            x2={l.x2}
            y2={l.y2}
            stroke={`hsl(var(--border) / ${(0.45 + l.b * 0.55).toFixed(3)})`}
            strokeWidth={0.7 + l.b * 1.1}
          />
        ))}
        {rungs.map((r, i) => (
          <line
            key={`r${i}`}
            x1={r.x1}
            y1={r.y1}
            x2={r.x2}
            y2={r.y2}
            stroke={`hsl(var(--border) / ${(0.45 + r.b * 0.55).toFixed(3)})`}
            strokeWidth={0.7 + r.b * 1.1}
          />
        ))}
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
      <IsoFloor cursor={cursor} width={size.w} height={size.h} />

      {/* Gradient wash (matches solutions hero) */}
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
