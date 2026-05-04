/**
 * Hero-only backdrop. Three layers, all decorative:
 *  1. Faint engineered grid (CSS, masked to fade at edges)
 *  2. Multi-blob soft cyan gradient wash (slowly drifting)
 *  3. Top + bottom vignette into background
 */
export const HeroBackdrop = () => (
  <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
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
      className="absolute bottom-0 left-1/3 h-[420px] w-[680px] rounded-full bg-background blur-3xl animate-gradient-drift"
      style={{ animationDelay: "-4s" }}
    />

    {/* 3. Top vignette only — bottom kept open so the grid reads into the next section. */}
    <div className="absolute inset-x-0 top-0 bg-gradient-to-b from-background to-transparent" />
  </div>
);

export default HeroBackdrop;
