import { useEffect, useRef, useState } from "react";

interface Props {
  cursor: { x: number; y: number } | null;
}

/**
 * Services hero backdrop — isometric blueprint grid.
 *
 * A faint 30° isometric line lattice (three line families at 30°, 150°, 90°)
 * forms a calm engineering-blueprint surface. A soft cursor-following spotlight
 * brightens nearby line segments toward the brand primary; far segments stay
 * at a low neutral border tint. Stationary when the cursor is absent (and on
 * reduced-motion, the parent withholds cursor updates).
 */

const STEP = 44;            // base spacing between parallel lines (px)
const ANGLE_DEG = 30;       // isometric angle
const SPOTLIGHT = 220;      // radius of cursor influence (px)
const BASE_OPACITY = 0.28;  // resting line opacity (border tint)
const HIT_OPACITY = 0.95;   // peak line opacity at cursor (primary tint)

type Seg = { x1: number; y1: number; x2: number; y2: number; mx: number; my: number };

/** Distance from point P to line segment AB. */
const distPointToSegment = (px: number, py: number, s: Seg) => {
  const dx = s.x2 - s.x1;
  const dy = s.y2 - s.y1;
  const len2 = dx * dx + dy * dy;
  if (len2 === 0) return Math.hypot(px - s.x1, py - s.y1);
  let t = ((px - s.x1) * dx + (py - s.y1) * dy) / len2;
  t = Math.max(0, Math.min(1, t));
  const cx = s.x1 + t * dx;
  const cy = s.y1 + t * dy;
  return Math.hypot(px - cx, py - cy);
};

/**
 * Build an array of segments for one direction by intersecting a family of
 * parallel lines (spaced STEP apart, perpendicular to the direction) with the
 * canvas rectangle. This keeps stroke counts predictable across viewport sizes.
 */
const buildFamily = (width: number, height: number, dirDeg: number): Seg[] => {
  const segs: Seg[] = [];
  const a = (dirDeg * Math.PI) / 180;
  const dx = Math.cos(a);
  const dy = Math.sin(a);
  // perpendicular axis
  const nx = -dy;
  const ny = dx;

  // Project corners onto the perpendicular axis to find min/max offset.
  const corners = [
    [0, 0],
    [width, 0],
    [0, height],
    [width, height],
  ];
  let minP = Infinity;
  let maxP = -Infinity;
  for (const [cx, cy] of corners) {
    const p = cx * nx + cy * ny;
    if (p < minP) minP = p;
    if (p > maxP) maxP = p;
  }

  const startK = Math.floor(minP / STEP) - 1;
  const endK = Math.ceil(maxP / STEP) + 1;

  // For each parallel line at perpendicular offset = k*STEP, clip to the rect.
  for (let k = startK; k <= endK; k++) {
    const offset = k * STEP;
    // A point on the line: offset * (nx, ny). Direction: (dx, dy).
    const ox = offset * nx;
    const oy = offset * ny;

    // Intersect with rect edges by solving for parameter t along (dx,dy).
    const ts: number[] = [];
    // x = 0
    if (Math.abs(dx) > 1e-6) {
      const t = (0 - ox) / dx;
      const y = oy + t * dy;
      if (y >= 0 && y <= height) ts.push(t);
      // x = width
      const t2 = (width - ox) / dx;
      const y2 = oy + t2 * dy;
      if (y2 >= 0 && y2 <= height) ts.push(t2);
    }
    if (Math.abs(dy) > 1e-6) {
      // y = 0
      const t = (0 - oy) / dy;
      const x = ox + t * dx;
      if (x >= 0 && x <= width) ts.push(t);
      const t2 = (height - oy) / dy;
      const x2 = ox + t2 * dx;
      if (x2 >= 0 && x2 <= width) ts.push(t2);
    }
    if (ts.length < 2) continue;
    ts.sort((a, b) => a - b);
    const t1 = ts[0];
    const t2 = ts[ts.length - 1];
    if (t2 - t1 < 4) continue;

    // Subdivide the long line into shorter segments so the spotlight can
    // brighten only nearby pieces (not the whole line across the canvas).
    const SEG_LEN = STEP; // segment length ~= grid spacing
    const totalLen = t2 - t1;
    const pieces = Math.max(1, Math.ceil(totalLen / SEG_LEN));
    for (let p = 0; p < pieces; p++) {
      const ta = t1 + (totalLen * p) / pieces;
      const tb = t1 + (totalLen * (p + 1)) / pieces;
      const x1 = ox + ta * dx;
      const y1 = oy + ta * dy;
      const x2 = ox + tb * dx;
      const y2 = oy + tb * dy;
      segs.push({
        x1,
        y1,
        x2,
        y2,
        mx: (x1 + x2) / 2,
        my: (y1 + y2) / 2,
      });
    }
  }

  return segs;
};

const Blueprint = ({
  cursor,
  width,
  height,
}: Props & { width: number; height: number }) => {
  // Memoize segments per size — recompute only when size changes.
  const segsRef = useRef<{ key: string; segs: Seg[] }>({ key: "", segs: [] });
  const key = `${width}x${height}`;
  if (segsRef.current.key !== key && width > 0 && height > 0) {
    const a = buildFamily(width, height, ANGLE_DEG);
    const b = buildFamily(width, height, 180 - ANGLE_DEG);
    const c = buildFamily(width, height, 90);
    segsRef.current = { key, segs: [...a, ...b, ...c] };
  }
  const segs = segsRef.current.segs;
  if (segs.length === 0) return null;

  return (
    <svg
      className="absolute inset-0 h-full w-full"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      style={{
        WebkitMaskImage:
          "radial-gradient(85% 95% at 50% 45%, black 40%, transparent 92%)",
        maskImage:
          "radial-gradient(85% 95% at 50% 45%, black 40%, transparent 92%)",
      }}
    >
      <g strokeLinecap="round">
        {segs.map((s, i) => {
          let opacity = BASE_OPACITY;
          let stroke = `hsl(var(--border) / ${BASE_OPACITY})`;
          let strokeWidth = 1;
          if (cursor) {
            const d = distPointToSegment(cursor.x, cursor.y, s);
            if (d < SPOTLIGHT) {
              const t = 1 - d / SPOTLIGHT; // 0..1
              const eased = t * t;
              opacity = BASE_OPACITY + (HIT_OPACITY - BASE_OPACITY) * eased;
              // Blend toward primary as we get closer.
              stroke = `hsl(var(--primary) / ${opacity.toFixed(3)})`;
              strokeWidth = 1 + eased * 0.6;
            }
          }
          return (
            <line
              key={i}
              x1={s.x1}
              y1={s.y1}
              x2={s.x2}
              y2={s.y2}
              stroke={stroke}
              strokeWidth={strokeWidth}
              opacity={opacity}
            />
          );
        })}
      </g>
    </svg>
  );
};

interface BackdropProps {
  cursor: { x: number; y: number } | null;
}

export const ServiceHeroBackdrop = ({ cursor }: BackdropProps) => {
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
      <Blueprint cursor={cursor} width={size.w} height={size.h} />

      {/* Gradient wash to match the family of hero backdrops. */}
      <div className="absolute -top-40 -right-32 h-[640px] w-[640px] rounded-full bg-primary/15 blur-3xl animate-gradient-drift" />
      <div
        className="absolute top-1/3 -left-40 h-[520px] w-[520px] rounded-full bg-primary/10 blur-3xl animate-gradient-drift"
        style={{ animationDelay: "-9s" }}
      />
      <div
        className="absolute bottom-0 left-[10%] h-[420px] w-[680px] rounded-full bg-background blur-3xl animate-gradient-drift"
        style={{ animationDelay: "-4s" }}
      />

      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
};

export default ServiceHeroBackdrop;
