import { Suspense, lazy, useEffect, useRef, useState } from "react";

const ConstellationScene = lazy(() => import("./PracticeConstellationScene"));

interface BackdropProps {
  /** Cursor position in section-local coords, or null when outside. */
  cursor: { x: number; y: number } | null;
}

export const PracticeHeroBackdrop = ({ cursor }: BackdropProps) => {
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

  const tilt =
    cursor && size.w > 0 && size.h > 0
      ? { x: (cursor.x / size.w) * 2 - 1, y: (cursor.y / size.h) * 2 - 1 }
      : { x: 0, y: 0 };

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Particle constellation */}
      <div
        className="absolute inset-0"
        style={{
          WebkitMaskImage:
            "radial-gradient(80% 90% at 50% 45%, black 40%, transparent 90%)",
          maskImage:
            "radial-gradient(80% 90% at 50% 45%, black 40%, transparent 90%)",
        }}
      >
        <Suspense fallback={null}>
          <ConstellationScene tiltX={tilt.x} tiltY={tilt.y} />
        </Suspense>
      </div>

      {/* Gradient wash (kept) */}
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

export default PracticeHeroBackdrop;
