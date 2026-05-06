/**
 * AI motif — bold flowing ribbon-like wave lines.
 * Inspired by layered topographic / sound-wave compositions:
 * thicker strokes, larger amplitude, anchored bottom-right.
 */
const LINES = 14;

const AiMotif = () => (
  <svg
    viewBox="0 0 320 320"
    preserveAspectRatio="xMaxYMax slice"
    className="flip-motif-svg"
    aria-hidden="true"
  >
    <g fill="none" stroke="hsl(var(--primary))" strokeLinecap="round">
      {Array.from({ length: LINES }).map((_, i) => {
        const t = i / (LINES - 1);
        // Stack the waves toward the bottom-right corner with generous amplitude.
        const yBase = 110 + t * 170;
        const amp = 38 + t * 22;
        const phase = i * 0.55;
        const opacity = 0.22 + t * 0.65;
        const sw = 1.8 + t * 1.6; // bigger lines

        const d = `M -20 ${yBase + Math.sin(phase) * amp * 0.4}
                   C ${40} ${yBase - amp + Math.sin(phase + 0.4) * 8},
                     ${130} ${yBase + amp + Math.sin(phase + 1.1) * 10},
                     ${210} ${yBase - amp * 0.7 + Math.sin(phase + 1.6) * 6}
                   S ${360} ${yBase + amp * 0.5}, ${400} ${yBase - amp * 0.2}`;

        return (
          <path
            key={i}
            d={d}
            strokeWidth={sw}
            opacity={opacity}
            className="flip-motif-line"
            style={{ animationDelay: `${i * 90}ms` }}
          />
        );
      })}
    </g>
  </svg>
);

export default AiMotif;
