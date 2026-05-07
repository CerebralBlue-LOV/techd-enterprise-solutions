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
  const horizonY = height * 0.45;

  const SPOT_RADIUS = 240;
  const brightness = (cx: number, cy: number) => {
    if (!cursor) return 0;
    const d = Math.hypot(cx - cursor.x, cy - cursor.y);
    if (d > SPOT_RADIUS) return 0;
    const t = 1 - d / SPOT_RADIUS;
    return t * t;
  };

  // Build a uniform "floor" grid then project every point with the same
  // mapping (lerp from base point to vanishing point). This guarantees
  // depth lines and rungs share endpoints exactly.
  const COLS = 24; // columns across the floor (-COLS/2 .. +COLS/2)
  const ROWS = 14; // depth rows from base (t=0) to horizon (t=1)
  const baseSpread = width * 1.6; // how wide the floor is at the front

  const projectColumn = (i: number, t: number) => {
    const baseX = vp.x + ((i / COLS) - 0.5) * baseSpread;
    const baseY = height;
    return {
      x: baseX + (vp.x - baseX) * t,
      y: baseY + (vp.y - baseY) * t,
    };
  };

  // Non-linear depth so rungs compress near the horizon (perspective feel).
  const depthT = (j: number) => Math.pow(j / ROWS, 1.7);

  // Depth (vertical) lines: each column from t=0 to t=1.
  const depthLines = Array.from({ length: COLS + 1 }, (_, i) => {
    const a = projectColumn(i, 0);
    const b = projectColumn(i, 1);
    const cx = (a.x + b.x) / 2;
    const cy = (a.y + b.y) / 2;
    return { a, b, br: brightness(cx, cy) };
  });

  // Rungs (horizontal lines): at each depth t, span from leftmost to
  // rightmost column. Endpoints come from the same projection.
  const rungs = Array.from({ length: ROWS }, (_, j) => {
    const t = depthT(j + 1);
    const left = projectColumn(0, t);
    const right = projectColumn(COLS, t);
    const cx = (left.x + right.x) / 2;
    const cy = left.y;
    return { a: left, b: right, br: brightness(cx, cy) };
  });

  return (
    <svg
      className="absolute inset-0 h-full w-full"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      style={{
        WebkitMaskImage:
          "linear-gradient(to top, black 25%, rgba(0,0,0,0.6) 60%, transparent 95%)",
        maskImage:
          "linear-gradient(to top, black 25%, rgba(0,0,0,0.6) 60%, transparent 95%)",
      }}
    >
      <defs>
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
            x1={l.a.x}
            y1={l.a.y}
            x2={l.b.x}
            y2={l.b.y}
            stroke={`hsl(var(--border) / ${(0.4 + l.br * 0.6).toFixed(3)})`}
            strokeWidth={0.7 + l.br * 1.1}
          />
        ))}
        {rungs.map((r, i) => (
          <line
            key={`r${i}`}
            x1={r.a.x}
            y1={r.a.y}
            x2={r.b.x}
            y2={r.b.y}
            stroke={`hsl(var(--border) / ${(0.4 + r.br * 0.6).toFixed(3)})`}
            strokeWidth={0.7 + r.br * 1.1}
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
