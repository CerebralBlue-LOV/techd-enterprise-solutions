/**
 * Security motif — bold padlock anchored bottom-right with a dashed
 * pulse halo. Chevrons removed (moved to Hybrid Cloud).
 */
const SecurityMotif = () => (
  <svg
    viewBox="0 0 320 320"
    preserveAspectRatio="xMaxYMax slice"
    className="flip-motif-svg"
    aria-hidden="true"
  >
    <defs>
      <radialGradient id="sec-glow" cx="100%" cy="100%" r="75%">
        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.22" />
        <stop offset="70%" stopColor="hsl(var(--primary))" stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="320" height="320" fill="url(#sec-glow)" />

    {/* Padlock */}
    <g
      transform="translate(220 200)"
      stroke="hsl(var(--primary))"
      fill="hsl(var(--primary))"
      className="flip-motif-lock"
    >
      <path
        d="M -24 -6 V -24 a 24 24 0 0 1 48 0 V -6"
        fill="none"
        strokeWidth={8}
        strokeLinecap="round"
        opacity={0.95}
      />
      <rect x={-34} y={-6} width={68} height={56} rx={7} ry={7} opacity={0.95} stroke="none" />
      <circle cx={0} cy={18} r={5.5} fill="hsl(var(--background))" />
      <rect x={-2.2} y={18} width={4.4} height={16} fill="hsl(var(--background))" rx={1.4} />
    </g>

    {/* Halo pulse */}
    <circle
      cx={220}
      cy={222}
      r={74}
      fill="none"
      stroke="hsl(var(--primary))"
      strokeWidth={1}
      opacity={0.35}
      strokeDasharray="3 8"
      className="flip-motif-pulse-center"
    />
  </svg>
);

export default SecurityMotif;
