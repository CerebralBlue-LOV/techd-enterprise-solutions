import { useEffect, useRef, useState } from "react";

/**
 * Resources hero backdrop — concentric sonar arcs.
 *
 * A faint dot grid surface. The cursor emits slow, expanding concentric arcs
 * (like a sonar ping) that fade as they grow. Monochrome — no brand color in
 * the animation, only neutral muted-foreground tones. Self-contained: it
 * tracks the cursor on its own root element.
 */

const DOT_STEP = 32;
const DOT_RADIUS = 1;
const DOT_BASE_OPACITY = 0.22;
const RING_COUNT = 3;
const RING_PERIOD = 3200;        // ms for a ring to expand fully
const RING_MAX_RADIUS = 260;     // px

const SonarBackdrop = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const cursorRef = useRef<{ x: number; y: number } | null>(null);
  const ringsRef = useRef<SVGCircleElement[]>([]);
  const startRef = useRef<number>(performance.now());
  const rafRef = useRef<number | null>(null);

  // Size + cursor tracking
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const ro = new ResizeObserver(() => {
      setSize({ w: node.clientWidth, h: node.clientHeight });
    });
    ro.observe(node);

    const onMove = (e: MouseEvent) => {
      const rect = node.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
        cursorRef.current = null;
      } else {
        cursorRef.current = { x, y };
      }
    };
    const onLeave = () => {
      cursorRef.current = null;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      ro.disconnect();
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  // Animation loop for the rings
  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const tick = (now: number) => {
      const c = cursorRef.current;
      const elapsed = now - startRef.current;
      for (let i = 0; i < RING_COUNT; i++) {
        const ring = ringsRef.current[i];
        if (!ring) continue;
        const phase = ((elapsed + (i * RING_PERIOD) / RING_COUNT) % RING_PERIOD) / RING_PERIOD;
        if (!c) {
          ring.setAttribute("opacity", "0");
          continue;
        }
        const r = phase * RING_MAX_RADIUS;
        const opacity = (1 - phase) * 0.5;
        ring.setAttribute("cx", String(c.x));
        ring.setAttribute("cy", String(c.y));
        ring.setAttribute("r", r.toFixed(1));
        ring.setAttribute("opacity", opacity.toFixed(3));
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Build dot grid
  const { w, h } = size;
  const dots: Array<{ cx: number; cy: number }> = [];
  if (w > 0 && h > 0) {
    const cols = Math.ceil(w / DOT_STEP) + 1;
    const rows = Math.ceil(h / DOT_STEP) + 1;
    const ox = (w - (cols - 1) * DOT_STEP) / 2;
    const oy = (h - (rows - 1) * DOT_STEP) / 2;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        dots.push({ cx: ox + c * DOT_STEP, cy: oy + r * DOT_STEP });
      }
    }
  }

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {w > 0 && h > 0 && (
        <svg
          ref={svgRef}
          className="absolute inset-0 h-full w-full"
          width={w}
          height={h}
          viewBox={`0 0 ${w} ${h}`}
          preserveAspectRatio="none"
          style={{
            WebkitMaskImage:
              "radial-gradient(85% 95% at 50% 45%, black 40%, transparent 92%)",
            maskImage:
              "radial-gradient(85% 95% at 50% 45%, black 40%, transparent 92%)",
          }}
        >
          <g fill={`hsl(var(--muted-foreground) / ${DOT_BASE_OPACITY})`}>
            {dots.map((d, i) => (
              <circle key={i} cx={d.cx} cy={d.cy} r={DOT_RADIUS} />
            ))}
          </g>
          <g
            fill="none"
            stroke="hsl(var(--muted-foreground))"
            strokeWidth={1}
          >
            {Array.from({ length: RING_COUNT }).map((_, i) => (
              <circle
                key={i}
                ref={(el) => {
                  if (el) ringsRef.current[i] = el;
                }}
                cx={0}
                cy={0}
                r={0}
                opacity={0}
              />
            ))}
          </g>
        </svg>
      )}

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

export default SonarBackdrop;
