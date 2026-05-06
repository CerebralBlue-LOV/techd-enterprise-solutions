/**
 * Hybrid Cloud motif — stacked chevron arcs fanning up from the corner.
 * Single cyan hue, varied stroke width + opacity, staggered draw-in.
 */
const CHEVRONS = 6;

const CloudMotif = () => (
  <svg
    viewBox="0 0 320 320"
    preserveAspectRatio="xMaxYMax slice"
    className="flip-motif-svg"
    aria-hidden="true"
  >
    <defs>
      <radialGradient id="cloud-glow" cx="100%" cy="100%" r="75%">
        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.22" />
        <stop offset="70%" stopColor="hsl(var(--primary))" stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="320" height="320" fill="url(#cloud-glow)" />

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
  </svg>
);

export default CloudMotif;
