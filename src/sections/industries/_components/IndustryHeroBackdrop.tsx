import { Suspense, lazy, useEffect, useRef, useState } from "react";

interface BackdropProps {
  /** Kept for API compatibility — unused by the static CSS floor. */
  cursor?: { x: number; y: number } | null;
}

/**
 * Industries hero backdrop.
 * - Pure-CSS perspective grid floor (no JS, no WebGL, no animation)
 * - Soft side/top fades and ambient gradient wash
 */
export const IndustryHeroBackdrop = (_: BackdropProps) => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* CSS perspective floor */}
      <div className="absolute inset-x-0 bottom-0 h-[70%] [perspective:600px]">
        <div
          className="absolute inset-0 origin-bottom"
          style={{
            transform: "rotateX(60deg) scale(1.6)",
            backgroundImage:
              "linear-gradient(to right, hsl(var(--muted-foreground) / 0.55) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--muted-foreground) / 0.55) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            backgroundPosition: "center bottom",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 35%, black 90%, transparent 100%)",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 35%, black 90%, transparent 100%)",
          }}
        />
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
      <div className="absolute -top-40 -right-32 h-[640px] w-[640px] rounded-full bg-primary/15 blur-3xl" />
      <div className="absolute top-1/3 -left-40 h-[520px] w-[520px] rounded-full bg-primary/10 blur-3xl" />

      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent" />
    </div>
  );
};

export default IndustryHeroBackdrop;
