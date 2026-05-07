import { useEffect, useRef, useState } from "react";

interface Props {
  cursor: { x: number; y: number } | null;
}

/**
 * One-point perspective floor grid (reference: classic "tron floor").
 * Depth lines converge to a centered vanishing point on the horizon.
 * Horizontal rungs are perfectly horizontal and compress toward the horizon.
 * Lines brighten/thicken in a soft spotlight around the cursor.
 */
const PerspectiveFloor = ({
  cursor,
  width,
  height,
}: Props & { width: number; height: number }) => {
  if (width === 0 || height === 0) return null;

  // Centered vanishing point sitting on a horizon line.
  const horizonY = height * 0.42;
  const vp = { x: width * 0.5, y: horizonY };

  const COLS = 24;                 // depth lines (left + right of vp combined)
  const ROWS = 16;                 // horizontal rungs from bottom to horizon
  const baseHalf = width * 0.85;   // half-width of the floor at the front edge
  const SPOT = 220;

  const brightness = (cx: number, cy: number) => {
    if (!cursor) return 0;
    const d = Math.hypot(cx - cursor.x, cy - cursor.y);
    if (d > SPOT) return 0;
    const t = 1 - d / SPOT;
    return t * t;
  };

  // Depth lines: from the bottom edge spaced uniformly across the floor base,
  // converging to the vanishing point.
  const depthLines = Array.from({ length: COLS + 1 }, (_, i) => {
    const baseX = vp.x + ((i / COLS) - 0.5) * 2 * baseHalf;
    const cx = (baseX + vp.x) / 2;
    const cy = (height + vp.y) / 2;
    return {
      x1: baseX, y1: height,
      x2: vp.x,  y2: vp.y,
      br: brightness(cx, cy),
    };
  });

  // Horizontal rungs: perfectly horizontal lines that span the floor width
  // at each depth. Spacing follows perspective (closer together near horizon).
  // Use the standard 1/(N - i*k) progression so it reads as "even-spaced floor
  // tiles" projected into perspective.
  const rungs = Array.from({ length: ROWS }, (_, i) => {
    const t = (i + 1) / (ROWS + 1);
    // Eased so spacing visibly compresses near the horizon.
    const eased = Math.pow(t, 1.6);
    const y = height - eased * (height - horizonY);
    // Width of the visible rung shrinks linearly with eased depth — matches
    // where the leftmost/rightmost depth lines actually are at this y.
    const halfWidth = (1 - eased) * baseHalf;
    return {
      x1: vp.x - halfWidth, y1: y,
      x2: vp.x + halfWidth, y2: y,
      br: brightness(vp.x, y),
    };
  });

  return (
    <svg
      className="absolute inset-0 h-full w-full"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      style={{
        // Fade upward into the page — keep the floor solid at the bottom.
        WebkitMaskImage:
          "linear-gradient(to top, black 30%, rgba(0,0,0,0.55) 65%, transparent 95%)",
        maskImage:
          "linear-gradient(to top, black 30%, rgba(0,0,0,0.55) 65%, transparent 95%)",
      }}
    >
      <g fill="none" strokeLinecap="round">
        {depthLines.map((l, i) => (
          <line
            key={`d${i}`}
            x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
            stroke={`hsl(var(--border) / ${(0.45 + l.br * 0.5).toFixed(3)})`}
            strokeWidth={0.7 + l.br * 1.0}
          />
        ))}
        {rungs.map((r, i) => (
          <line
            key={`r${i}`}
            x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2}
            stroke={`hsl(var(--border) / ${(0.45 + r.br * 0.5).toFixed(3)})`}
            strokeWidth={0.7 + r.br * 1.0}
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
      <PerspectiveFloor cursor={cursor} width={size.w} height={size.h} />

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
