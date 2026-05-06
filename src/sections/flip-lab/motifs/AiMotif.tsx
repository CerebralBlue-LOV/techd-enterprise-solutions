/**
 * AI motif — concentric arc bloom.
 * Simple, dense, single cyan hue. Anchored bottom-right corner.
 */
const ARCS = 22;

const AiMotif = () => (
  <svg
    viewBox="0 0 320 320"
    preserveAspectRatio="xMaxYMax slice"
    className="flip-motif-svg"
    aria-hidden="true"
  >
    <g fill="none" stroke="hsl(var(--primary))" strokeLinecap="round">
      {Array.from({ length: ARCS }).map((_, i) => {
        const r = 30 + i * 16;
        const opacity = 0.15 + (i / ARCS) * 0.55;
        const sw = 1.2 + (i / ARCS) * 1.6;
        return (
          <circle
            key={i}
            cx={320}
            cy={320}
            r={r}
            strokeWidth={sw}
            opacity={opacity}
            strokeDasharray={`${r * 1.4} ${r * 6}`}
            className="flip-motif-line"
            style={{ animationDelay: `${i * 70}ms` }}
          />
        );
      })}
    </g>
  </svg>
);

export default AiMotif;
