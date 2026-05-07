import { useEffect, useRef, useState } from "react";

/**
 * Practice hero backdrop. Same engineered grid + gradient wash as the home hero,
 * with a subtle cursor-driven ripple effect on mouse move (throttled).
 * Respects prefers-reduced-motion.
 */

type Ripple = { id: number; x: number; y: number };

export const PracticeHeroBackdrop = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const lastEmit = useRef(0);
  const idRef = useRef(0);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastEmit.current < 140) return; // throttle for subtlety
      lastEmit.current = now;
      const rect = node.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = ++idRef.current;
      setRipples((prev) => [...prev.slice(-5), { id, x, y }]);
      window.setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 1400);
    };

    node.addEventListener("mousemove", onMove);
    return () => node.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* 1. Grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, hsl(var(--border) / 0.55) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--border) / 0.55) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          WebkitMaskImage: "radial-gradient(80% 90% at 50% 35%, black 35%, transparent 85%)",
          maskImage: "radial-gradient(80% 90% at 50% 35%, black 35%, transparent 85%)",
        }}
      />

      {/* 2. Gradient wash */}
      <div className="absolute -top-40 -right-32 h-[640px] w-[640px] rounded-full bg-primary/15 blur-3xl animate-gradient-drift" />
      <div
        className="absolute top-1/3 -left-40 h-[520px] w-[520px] rounded-full bg-primary/10 blur-3xl animate-gradient-drift"
        style={{ animationDelay: "-9s" }}
      />
      <div
        className="absolute bottom-0 left-[10%] h-[420px] w-[680px] rounded-full bg-background blur-3xl animate-gradient-drift"
        style={{ animationDelay: "-4s" }}
      />

      {/* 3. Cursor ripples — subtle cyan rings expanding from cursor */}
      {ripples.map((r) => (
        <span
          key={r.id}
          className="absolute rounded-full border border-primary/30"
          style={{
            left: r.x,
            top: r.y,
            width: 0,
            height: 0,
            transform: "translate(-50%, -50%)",
            animation: "practice-ripple 1.4s ease-out forwards",
          }}
        />
      ))}

      {/* 4. Top vignette */}
      <div className="absolute inset-x-0 top-0 bg-gradient-to-b from-background to-transparent" />

      <style>{`
        @keyframes practice-ripple {
          0%   { width: 0;     height: 0;     opacity: 0.5; border-width: 1.5px; }
          100% { width: 220px; height: 220px; opacity: 0;   border-width: 1px;   }
        }
      `}</style>
    </div>
  );
};

export default PracticeHeroBackdrop;
