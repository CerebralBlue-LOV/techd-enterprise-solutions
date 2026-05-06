/**
 * Automation motif — concentric pulsing rings + a small orbiting node.
 * Slow rotation idle; orbit speeds up on hover.
 */
const RINGS = 7;

const AutomationMotif = () => (
  <svg
    viewBox="0 0 280 280"
    preserveAspectRatio="xMaxYMax meet"
    className="flip-motif-svg"
    aria-hidden="true"
  >
    <g
      fill="none"
      stroke="hsl(var(--primary))"
      style={{ transformOrigin: "210px 210px" }}
    >
      {Array.from({ length: RINGS }).map((_, i) => {
        const r = 28 + i * 16;
        const opacity = 0.65 - i * 0.07;
        // dashed arc, each ring a different gap pattern
        const dash = `${20 + i * 4} ${8 + i * 3}`;
        return (
          <circle
            key={i}
            cx={210}
            cy={210}
            r={r}
            opacity={opacity}
            strokeWidth={1.25}
            strokeDasharray={dash}
            className="flip-motif-ring"
            style={{ animationDelay: `${i * 120}ms` }}
          />
        );
      })}
    </g>
    {/* orbit dot */}
    <g
      style={{ transformOrigin: "210px 210px" }}
      className="flip-motif-orbit"
    >
      <circle cx={210} cy={130} r={4.5} fill="hsl(var(--primary))" />
      <circle
        cx={210}
        cy={130}
        r={9}
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth={1}
        opacity={0.4}
      />
    </g>
    {/* center node */}
    <circle
      cx={210}
      cy={210}
      r={3.5}
      fill="hsl(var(--primary))"
      className="flip-motif-pulse-center"
    />
  </svg>
);

export default AutomationMotif;
