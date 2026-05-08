import { useEffect, useRef, useState } from "react";

/**
 * Honeycomb hero backdrop — moved from Industries to Resources.
 * Self-contained: tracks the cursor relative to its own bounding box,
 * so it can drop straight into any `relative overflow-hidden` hero
 * without the parent section wiring up listeners.
 */

const SIZE = 28;
const W = Math.sqrt(3) * SIZE;
const H = 2 * SIZE;
const V_STEP = H * 0.75;

const hexPath = (cx: number, cy: number) => {
  const pts: string[] = [];
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i - Math.PI / 2;
    const x = cx + SIZE * Math.cos(a);
    const y = cy + SIZE * Math.sin(a);
    pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return `M${pts.join(" L")} Z`;
};

interface HoneycombProps {
  cursor: { x: number; y: number } | null;
  width: number;
  height: number;
}

const Honeycomb = ({ cursor, width, height }: HoneycombProps) => {
  if (width === 0 || height === 0) return null;

  const cols = Math.ceil(width / W) + 2;
  const rows = Math.ceil(height / V_STEP) + 2;
  const FALLOFF = SIZE * 2.6;

  const cells: Array<{ d: string; cx: number; cy: number }> = [];
  for (let r = -1; r < rows; r++) {
    const offset = r % 2 === 0 ? 0 : W / 2;
    for (let c = -1; c < cols; c++) {
      const cx = c * W + offset;
      const cy = r * V_STEP;
      cells.push({ d: hexPath(cx, cy), cx, cy });
    }
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
      {cursor && (
        <g>
          {cells.map((cell, i) => {
            const d = Math.hypot(cell.cx - cursor.x, cell.cy - cursor.y);
            if (d > FALLOFF) return null;
            const t = 1 - d / FALLOFF;
            const opacity = (t * t).toFixed(3);
            return (
              <path key={`f${i}`} d={cell.d} fill="hsl(var(--primary) / 0.18)" opacity={opacity} />
            );
          })}
        </g>
      )}

      <g fill="none" strokeWidth={1} strokeLinejoin="round">
        {cells.map((cell, i) => {
          let strokeOpacity = 0.55;
          if (cursor) {
            const d = Math.hypot(cell.cx - cursor.x, cell.cy - cursor.y);
            const STROKE_FALLOFF = FALLOFF * 1.6;
            if (d < STROKE_FALLOFF) {
              const t = 1 - d / STROKE_FALLOFF;
              strokeOpacity = Math.max(0, 0.55 * (1 - t * 1.8));
            }
          }
          return (
            <path
              key={`s${i}`}
              d={cell.d}
              stroke={`hsl(var(--border) / ${strokeOpacity.toFixed(3)})`}
            />
          );
        })}
      </g>
    </svg>
  );
};

export const HoneycombHeroBackdrop = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const ro = new ResizeObserver(() => {
      setSize({ w: node.clientWidth, h: node.clientHeight });
    });
    ro.observe(node);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (e: MouseEvent) => {
      const rect = node.getBoundingClientRect();
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        if (cursor) setCursor(null);
        return;
      }
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => setCursor({ x, y }));
    };

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <Honeycomb cursor={cursor} width={size.w} height={size.h} />

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

export default HoneycombHeroBackdrop;
