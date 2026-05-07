import { useEffect, useRef, useState } from "react";

interface Props {
  cursor: { x: number; y: number } | null;
}

/**
 * Topographic contour map. Smooth curved bands that read like elevation lines.
 * Built from a sum-of-sines height field, contoured at fixed levels.
 * Cursor reveals depth — lines near the pointer brighten and thicken.
 */
const TopoContours = ({
  cursor,
  width,
  height,
}: Props & { width: number; height: number }) => {
  if (width === 0 || height === 0) return null;

  // Sample the height field at this resolution; contour lines are emitted by
  // tracing horizontal scanlines of the field at each contour level.
  // We keep this lightweight: ~ROWS scanlines per unit width.
  const STEP = 6;                                   // px between samples
  const COLS = Math.ceil(width / STEP) + 1;
  const ROWS = Math.ceil(height / STEP) + 1;
  const LEVELS = 11;                                // number of contour bands
  const SPOT = 240;

  // Two off-center "peaks" + a long ridge — gives a quiet, plausible terrain.
  const field = (x: number, y: number) => {
    const nx = x / width;
    const ny = y / height;
    const peakA = Math.exp(-(((nx - 0.78) ** 2) * 6 + ((ny - 0.25) ** 2) * 7));
    const peakB = Math.exp(-(((nx - 0.18) ** 2) * 5 + ((ny - 0.78) ** 2) * 6));
    const ridge = 0.35 * Math.sin((nx - ny) * 4.2 + 0.6);
    const swell = 0.25 * Math.cos(nx * 3.1) * Math.sin(ny * 2.4 + 1.1);
    return peakA + peakB + ridge + swell;          // ~ -0.6 .. 1.6
  };

  // Sample once.
  const grid: number[][] = new Array(ROWS);
  let minV = Infinity;
  let maxV = -Infinity;
  for (let r = 0; r < ROWS; r++) {
    grid[r] = new Array(COLS);
    for (let c = 0; c < COLS; c++) {
      const v = field(c * STEP, r * STEP);
      grid[r][c] = v;
      if (v < minV) minV = v;
      if (v > maxV) maxV = v;
    }
  }

  // Per-row crossings of each contour level — emit short segments connecting
  // crossings between adjacent rows on the same column. Cheap, smooth-enough.
  const levels = Array.from(
    { length: LEVELS },
    (_, i) => minV + ((i + 1) / (LEVELS + 1)) * (maxV - minV),
  );

  const brightness = (x: number, y: number) => {
    if (!cursor) return 0;
    const d = Math.hypot(x - cursor.x, y - cursor.y);
    if (d > SPOT) return 0;
    const t = 1 - d / SPOT;
    return t * t;
  };

  // Build a path per level by tracing horizontal-edge crossings (marching
  // squares lite — sufficient for a decorative backdrop).
  const paths: { d: string; level: number }[] = [];

  for (const level of levels) {
    let d = "";
    for (let r = 0; r < ROWS - 1; r++) {
      for (let c = 0; c < COLS - 1; c++) {
        const a = grid[r][c];
        const b = grid[r][c + 1];
        const cc = grid[r + 1][c + 1];
        const dd = grid[r + 1][c];
        // Find where the contour crosses each cell edge.
        const pts: Array<{ x: number; y: number }> = [];
        const x0 = c * STEP;
        const y0 = r * STEP;
        const x1 = x0 + STEP;
        const y1 = y0 + STEP;
        const cross = (va: number, vb: number, ax: number, ay: number, bx: number, by: number) => {
          if ((va < level && vb >= level) || (va >= level && vb < level)) {
            const t = (level - va) / (vb - va);
            pts.push({ x: ax + (bx - ax) * t, y: ay + (by - ay) * t });
          }
        };
        cross(a,  b,  x0, y0, x1, y0);
        cross(b,  cc, x1, y0, x1, y1);
        cross(cc, dd, x1, y1, x0, y1);
        cross(dd, a,  x0, y1, x0, y0);
        if (pts.length >= 2) {
          // Connect the first two crossings (handles the common cases; the
          // saddle case is rare enough at this resolution to ignore).
          d += `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)} L ${pts[1].x.toFixed(1)} ${pts[1].y.toFixed(1)} `;
        }
      }
    }
    paths.push({ d, level });
  }

  return (
    <svg
      className="absolute inset-0 h-full w-full"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      style={{
        WebkitMaskImage: "radial-gradient(85% 95% at 50% 40%, black 40%, transparent 90%)",
        maskImage: "radial-gradient(85% 95% at 50% 40%, black 40%, transparent 90%)",
      }}
    >
      <defs>
        {/* Cursor spotlight — a soft white circle that lifts opacity locally. */}
        {cursor && (
          <radialGradient id="topo-spot" cx={cursor.x / width} cy={cursor.y / height} r="0.18">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          </radialGradient>
        )}
      </defs>

      {/* Base contour layer — quiet. */}
      <g fill="none" stroke="hsl(var(--border) / 0.55)" strokeWidth={0.8} strokeLinecap="round">
        {paths.map((p, i) => (
          <path key={`c${i}`} d={p.d} />
        ))}
      </g>

      {/* Spotlight layer — same paths, painted with cursor radial as stroke
          opacity boost. Renders only when cursor is present. */}
      {cursor && (
        <g
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth={1.1}
          strokeLinecap="round"
          style={{
            opacity: 1,
            mask: "url(#topo-spot-mask)",
            WebkitMask: "url(#topo-spot-mask)",
          }}
        >
          <defs>
            <mask id="topo-spot-mask" maskUnits="userSpaceOnUse">
              <rect x="0" y="0" width={width} height={height} fill="black" />
              <circle cx={cursor.x} cy={cursor.y} r="180" fill="url(#topo-spot-fade)" />
            </mask>
            <radialGradient id="topo-spot-fade" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
          </defs>
          {paths.map((p, i) => (
            <path key={`s${i}`} d={p.d} />
          ))}
        </g>
      )}

      {/* Suppress unused warning — brightness helper kept for future tuning. */}
      <desc>{brightness(0, 0)}</desc>
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
      <TopoContours cursor={cursor} width={size.w} height={size.h} />

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
