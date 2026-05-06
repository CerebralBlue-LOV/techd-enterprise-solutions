/**
 * Security motif — bold padlock icon framed by stacked chevron arcs.
 * Larger, more iconic; chevrons draw in, lock body sits in the corner.
 */

const CHEVRONS = 6;

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

    {/* Stacked chevrons fanning up from the corner */}
    <g
      fill="none"
      stroke="hsl(var(--primary))"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {Array.from({ length: CHEVRONS }).map((_, i) => {
        const offset = i * 26;
        const opacity = 0.85 - i * 0.11;
        const sw = 11 - i * 0.9;
        const d = `M ${60 - offset * 0.4} ${300}
                   L ${210 - offset * 0.2} ${150 - offset}
                   L ${360 + offset * 0.2} ${300}`;
        return (
          <path
            key={i}
            d={d}
            strokeWidth={sw}
            opacity={opacity}
            className="flip-motif-chevron"
            style={{ animationDelay: `${i * 100}ms` }}
          />
        );
      })}
    </g>

    {/* Padlock — bold, anchored center-bottom-right */}
    <g
      transform="translate(200 170)"
      stroke="hsl(var(--primary))"
      fill="hsl(var(--primary))"
      className="flip-motif-lock"
    >
      {/* shackle */}
      <path
        d="M -28 -8 V -28 a 28 28 0 0 1 56 0 V -8"
        fill="none"
        strokeWidth={9}
        strokeLinecap="round"
        opacity={0.95}
      />
      {/* body */}
      <rect
        x={-40}
        y={-8}
        width={80}
        height={66}
        rx={8}
        ry={8}
        opacity={0.95}
        stroke="none"
      />
      {/* keyhole */}
      <circle cx={0} cy={18} r={6} fill="hsl(var(--background))" />
      <rect
        x={-2.5}
        y={18}
        width={5}
        height={18}
        fill="hsl(var(--background))"
        rx={1.5}
      />
    </g>

    {/* outer halo ring around lock */}
    <circle
      cx={200}
      cy={195}
      r={86}
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
