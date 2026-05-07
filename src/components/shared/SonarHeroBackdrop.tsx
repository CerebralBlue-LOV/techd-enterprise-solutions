import { useEffect, useRef, useState } from "react";

/**
 * Resources hero backdrop — flow-field streamlines.
 *
 * Faint vector-field streamlines slowly drift across the surface. Near the
 * cursor, the field is gently bent toward the pointer, so nearby lines curve
 * around it. Monochrome — no brand color in the animation, only neutral
 * muted-foreground tones. Self-contained.
 *
 * Implementation: a fixed grid of streamlines, each made of a polyline of
 * sample points. Each frame we advance a phase offset and resample, so lines
 * appear to drift along the field. The base field is a smooth low-frequency
 * curl-like pattern; cursor adds a radial bend within a falloff radius.
 */

const STEP = 56;            // grid spacing for streamline seeds (px)
const SEG_LEN = 10;         // segment length along a streamline (px)
const SEG_COUNT = 10;       // segments per streamline (so total ~100px long)
const DRIFT_SPEED = 0.018;  // phase advance per ms
const FIELD_SCALE = 0.0035; // spatial frequency of the base field
const CURSOR_RADIUS = 180;  // px, falloff radius of cursor influence
const CURSOR_STRENGTH = 1.4;

const FlowFieldBackdrop = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const cursorRef = useRef<{ x: number; y: number } | null>(null);
  const pathsRef = useRef<SVGPathElement[]>([]);
  const seedsRef = useRef<Array<{ x: number; y: number }>>([]);
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

  // Build seed grid when size changes
  useEffect(() => {
    const { w, h } = size;
    if (w === 0 || h === 0) {
      seedsRef.current = [];
      return;
    }
    const seeds: Array<{ x: number; y: number }> = [];
    const cols = Math.ceil(w / STEP) + 2;
    const rows = Math.ceil(h / STEP) + 2;
    const ox = (w - (cols - 1) * STEP) / 2;
    const oy = (h - (rows - 1) * STEP) / 2;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // jitter slightly so it doesn't look like a grid
        const jx = ((c * 31 + r * 17) % 13) - 6;
        const jy = ((c * 19 + r * 23) % 11) - 5;
        seeds.push({ x: ox + c * STEP + jx, y: oy + r * STEP + jy });
      }
    }
    seedsRef.current = seeds;
    pathsRef.current = pathsRef.current.slice(0, seeds.length);
  }, [size]);

  // Animation loop
  useEffect(() => {
    if (size.w === 0 || size.h === 0) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      // Render once with phase 0
      drawFrame(0);
      return;
    }

    const tick = (now: number) => {
      const elapsed = now - startRef.current;
      drawFrame(elapsed * DRIFT_SPEED);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size]);

  const drawFrame = (phase: number) => {
    const seeds = seedsRef.current;
    const cursor = cursorRef.current;
    for (let i = 0; i < seeds.length; i++) {
      const path = pathsRef.current[i];
      if (!path) continue;
      const seed = seeds[i];
      // start point drifts along the field a bit so streams flow
      let x = seed.x;
      let y = seed.y;
      let d = `M ${x.toFixed(1)} ${y.toFixed(1)}`;
      for (let s = 0; s < SEG_COUNT; s++) {
        // base angle from a smooth low-frequency function
        const a =
          Math.sin((x + phase * 30) * FIELD_SCALE) * Math.PI +
          Math.cos((y - phase * 20) * FIELD_SCALE) * Math.PI;
        let ang = a;
        if (cursor) {
          const dx = cursor.x - x;
          const dy = cursor.y - y;
          const dist = Math.hypot(dx, dy);
          if (dist < CURSOR_RADIUS && dist > 0.001) {
            const falloff = 1 - dist / CURSOR_RADIUS;
            // bend tangentially around cursor (perpendicular to radial)
            const tangent = Math.atan2(dy, dx) + Math.PI / 2;
            ang = ang + (tangent - ang) * falloff * CURSOR_STRENGTH * 0.5;
          }
        }
        x += Math.cos(ang) * SEG_LEN;
        y += Math.sin(ang) * SEG_LEN;
        d += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
      }
      path.setAttribute("d", d);
    }
  };

  const { w, h } = size;
  const seeds = seedsRef.current;

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
              "radial-gradient(85% 95% at 50% 45%, black 40%, transparent 92%)",
            maskImage:
              "radial-gradient(85% 95% at 50% 45%, black 40%, transparent 92%)",
          }}
        >
          <g
            fill="none"
            stroke="hsl(var(--muted-foreground))"
            strokeWidth={1}
            strokeLinecap="round"
            strokeOpacity={0.28}
          >
            {seeds.map((_, i) => (
              <path
                key={i}
                ref={(el) => {
                  if (el) pathsRef.current[i] = el;
                }}
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

export default FlowFieldBackdrop;
