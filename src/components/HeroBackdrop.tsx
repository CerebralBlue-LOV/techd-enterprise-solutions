/**
 * Hero-only backdrop. Two layers, all decorative:
 *  1. Engineered grid (full-bleed, no mask — visible across the whole hero)
 *  2. Soft cyan wash anchored to the top-right (does not cover the grid below)
 */
export const HeroBackdrop = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 overflow-hidden"
  >
    {/* 1. Grid — strong enough to read on white, no radial mask. */}
    <div
      className="absolute inset-0"
      style={{
        backgroundImage:
          "linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
        opacity: 0.7,
      }}
    />

    {/* 2. Gradient wash — top-right only, does not bleed into the bottom grid area. */}
    <div className="absolute -top-40 -right-32 h-[560px] w-[640px] rounded-full bg-primary/20 blur-3xl animate-gradient-drift" />
    <div
      className="absolute -top-20 right-1/4 h-[360px] w-[420px] rounded-full bg-primary/10 blur-3xl animate-gradient-drift"
      style={{ animationDelay: "-9s" }}
    />
  </div>
);

export default HeroBackdrop;
