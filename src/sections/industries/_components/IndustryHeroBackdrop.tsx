import { Suspense, lazy, useEffect, useRef, useState } from "react";

interface BackdropProps {
  /** Cursor position in section-local coords, or null when outside. */
  cursor: { x: number; y: number } | null;
}

const FloorScene = lazy(() => import("./IndustryFloorScene"));

/**
 * Industries hero backdrop.
 * - 3D perspective floor (three.js / r3f) receding into the horizon
 * - Subtle parallax tilt that follows the cursor
 * - Same gradient wash + top vignette as before
 */
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

  // Normalise cursor → -1..1 for parallax tilt.
  const tilt =
    cursor && size.w > 0 && size.h > 0
      ? {
          x: (cursor.x / size.w) * 2 - 1,
          y: (cursor.y / size.h) * 2 - 1,
        }
      : { x: 0, y: 0 };

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* 3D floor canvas */}
      <div className="absolute inset-0">
        <Suspense fallback={null}>
          <FloorScene tiltX={tilt.x} tiltY={tilt.y} />
        </Suspense>
      </div>

      {/* Soft side/top fade — keeps the floor visible in the middle/bottom */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, hsl(var(--background)) 0%, transparent 35%, transparent 80%, hsl(var(--background) / 0.4) 100%), linear-gradient(to right, hsl(var(--background)) 0%, transparent 12%, transparent 88%, hsl(var(--background)) 100%)",
        }}
      />

      {/* Gradient wash */}
      <div className="absolute -top-40 -right-32 h-[640px] w-[640px] rounded-full bg-primary/15 blur-3xl animate-gradient-drift" />
      <div
        className="absolute top-1/3 -left-40 h-[520px] w-[520px] rounded-full bg-primary/10 blur-3xl animate-gradient-drift"
        style={{ animationDelay: "-9s" }}
      />

      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent" />
    </div>
  );
};

export default IndustryHeroBackdrop;
