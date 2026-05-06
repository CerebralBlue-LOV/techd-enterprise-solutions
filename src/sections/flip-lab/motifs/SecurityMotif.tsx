/**
 * Security motif — stacked nested chevrons with thick strokes.
 * Strokes draw in on mount; brighten + lift on hover.
 */
const CHEVRONS = 5;

const SecurityMotif = () => (
  <svg
    viewBox="0 0 280 280"
    preserveAspectRatio="xMaxYMax meet"
    className="flip-motif-svg"
    aria-hidden="true"
  >
    <g
      fill="none"
      stroke="hsl(var(--primary))"
      strokeLinecap="square"
      strokeLinejoin="miter"
    >
      {Array.from({ length: CHEVRONS }).map((_, i) => {
        const offset = i * 20;
        const opacity = 0.95 - i * 0.13;
        const sw = 9 - i * 0.6;
        // upward chevron pointing up-right
        const d = `M ${80 + offset} ${250}
                   L ${180 - offset} ${130 + offset}
                   L ${280 - offset} ${250}`;
        return (
          <path
            key={i}
            d={d}
            strokeWidth={sw}
            opacity={opacity}
            className="flip-motif-chevron"
            style={{ animationDelay: `${i * 90}ms` }}
          />
        );
      })}
    </g>
  </svg>
);

export default SecurityMotif;
