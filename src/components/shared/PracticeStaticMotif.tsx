/**
 * Static, typographic motif per practice — designed to pair with FlipCard.
 * Mirrors the home SolutionsGridSection visual grammar without an r3f canvas,
 * so secondary pages (industries, company) can echo the home rhythm cheaply.
 */
export const PracticeStaticMotif = ({ initials }: { initials: string }) => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
    <svg
      aria-hidden="true"
      className="absolute inset-0 h-full w-full text-primary/10"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id={`grid-${initials}`} width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#grid-${initials})`} />
    </svg>
    <span
      aria-hidden="true"
      className="absolute -right-2 -bottom-6 text-[7rem] md:text-[9rem] font-bold leading-none tracking-tighter text-primary/[0.07] select-none"
    >
      {initials}
    </span>
  </div>
);

export const initialsFor = (name: string) =>
  name
    .split(/[\s&/-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

export default PracticeStaticMotif;
