/**
 * AI motif — flowing topographic contour lines, dense in the lower-right
 * corner and rippling outward like wind-swept iso-curves.
 */
const LINES = 22;

const AiMotif = () => (
  <svg
    viewBox="0 0 320 320"
    preserveAspectRatio="xMaxYMax meet"
    className="flip-motif-svg"
    aria-hidden="true"
  >
    <g
      fill="none"
      stroke="hsl(var(--primary))"
      strokeLinecap="round"
      style={{ transform: "translate(40px, 30px)" }}
    >
      {Array.from({ length: LINES }).map((_, i) => {
        const t = i / (LINES - 1);
        // Each contour expands outward from the bottom-right anchor.
        const spread = 18 + i * 12;
        const opacity = 0.22 + (1 - t) * 0.55;
        const sw = 1 + (1 - t) * 0.9;
        const d = `
          M ${320 - spread * 0.2} ${320}
          C ${300 - spread} ${320 - spread * 0.4},
            ${260 - spread * 1.1} ${300 - spread * 0.9},
            ${200 - spread * 1.0} ${260 - spread * 0.8}
          S ${100 - spread * 0.9} ${200 - spread * 0.7},
            ${20 - spread * 0.5} ${160 - spread * 0.6}
          L ${-20} ${160 - spread * 0.6}
        `;
        return (
          <path
            key={i}
            d={d}
            strokeWidth={sw}
            opacity={opacity}
            className="flip-motif-line"
            style={{ animationDelay: `${i * 70}ms` }}
          />
        );
      })}
    </g>
  </svg>
);

export default AiMotif;
