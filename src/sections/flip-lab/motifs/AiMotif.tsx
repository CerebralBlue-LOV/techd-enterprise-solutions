/**
 * AI motif — layered flowing line waves (Apple-award style).
 * Single cyan hue, varied opacity + subtle phase animation.
 */
const LINES = 18;

const AiMotif = () => (
  <svg
    viewBox="0 0 280 280"
    preserveAspectRatio="xMaxYMax meet"
    className="flip-motif-svg"
    aria-hidden="true"
  >
    <g fill="none" stroke="hsl(var(--primary))" strokeLinecap="round">
      {Array.from({ length: LINES }).map((_, i) => {
        const t = i / (LINES - 1);
        const yBase = 60 + t * 180;
        const opacity = 0.18 + t * 0.55;
        const sw = 1 + t * 0.6;
        // Each line is a smooth S-curve with a slight per-line phase shift.
        const d = `M -10 ${yBase}
                   C 50 ${yBase - 30 - i * 1.2},
                     120 ${yBase + 30 + i * 1.4},
                     200 ${yBase - 20 - i * 0.8}
                   S 320 ${yBase + 10 + i * 0.6}, 360 ${yBase}`;
        return (
          <path
            key={i}
            d={d}
            strokeWidth={sw}
            opacity={opacity}
            className="flip-motif-line"
            style={{ animationDelay: `${i * 80}ms` }}
          />
        );
      })}
    </g>
  </svg>
);

export default AiMotif;
