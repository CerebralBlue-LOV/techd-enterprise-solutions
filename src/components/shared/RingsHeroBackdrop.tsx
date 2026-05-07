import { useEffect, useRef, useState } from "react";

/**
 * Company hero backdrop — concentric rings.
 *
 * A set of faint concentric circles centered on the section, slowly rotating
 * (via dashed-stroke offset). The ring nearest the cursor brightens softly.
 * Monochrome — no brand color in the animation. Self-contained: tracks its
 * own cursor.
 */

const RING_COUNT = 9;
const RING_BASE = 90;       // px — innermost ring radius
const RING_GAP = 56;        // px between rings
const BASE_OPACITY = 0.18;
const HIT_OPACITY = 0.55;
const PROXIMITY = 70;       // px — how close to a ring to trigger highlight

const RingsBackdrop = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const ringsRef = useRef<SVGCircleElement[]>([]);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const cursorRef = useRef<{ x: number; y: number } | null>(null);
  const offsetRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef<number>(performance.now());

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

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const cx = size.w / 2;
    const cy = size.h * 0.45;

    const tick = (now: number) => {
      const dt = now - lastRef.current;
      lastRef.current = now;
      offsetRef.current = (offsetRef.current + dt * 0.012) % 1000;
      const c = cursorRef.current;

      for (let i = 0; i < RING_COUNT; i++) {
        const ring = ringsRef.current[i];
        if (!ring) continue;
        const r = RING_BASE + i * RING_GAP;
        let opacity = BASE_OPACITY;
        if (c) {
          const dCursor = Math.hypot(c.x - cx, c.y - cy);
          const diff = Math.abs(dCursor - r);
          if (diff < PROXIMITY) {
            const t = 1 - diff / PROXIMITY;
            opacity = BASE_OPACITY + (HIT_OPACITY - BASE_OPACITY) * t * t;
          }
        }
        ring.setAttribute("opacity", opacity.toFixed(3));
        // Alternate rotation direction for visual interest
        const dir = i % 2 === 0 ? 1 : -1;
        ring.setAttribute(
          "stroke-dashoffset",
          (offsetRef.current * dir).toFixed(2)
        );
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [size.w, size.h]);

  const { w, h } = size;
  const cx = w / 2;
  const cy = h * 0.45;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {w > 0 && h > 0 && (
        <svg
          className="absolute inset-0 h-full w-full"
          width={w}
          height={h}
          viewBox={`0 0 ${w} ${h}`}
          preserveAspectRatio="none"
          style={{
            WebkitMaskImage:
              "radial-gradient(85% 95% at 50% 45%, black 45%, transparent 95%)",
            maskImage:
              "radial-gradient(85% 95% at 50% 45%, black 45%, transparent 95%)",
          }}
        >
          <g
            fill="none"
            stroke="hsl(var(--muted-foreground))"
            strokeWidth={1}
            strokeDasharray="3 6"
          >
            {Array.from({ length: RING_COUNT }).map((_, i) => (
              <circle
                key={i}
                ref={(el) => {
                  if (el) ringsRef.current[i] = el;
                }}
                cx={cx}
                cy={cy}
                r={RING_BASE + i * RING_GAP}
                opacity={BASE_OPACITY}
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

export default RingsBackdrop;
