/** Diagonal stripe field — slides in then drifts. */
export const AutomationMotif = () => (
  <svg
    viewBox="0 0 200 140"
    className="pointer-events-none absolute -bottom-2 -right-2 h-32 w-44 overflow-visible text-primary"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
  >
    <g className="flip-motif-stripes">
      {Array.from({ length: 10 }).map((_, i) => (
        <line
          key={i}
          x1={40 + i * 18}
          y1={140}
          x2={120 + i * 18}
          y2={20}
          opacity={0.25 + (i % 4) * 0.18}
          style={{ animationDelay: `${i * 60}ms` }}
          className="flip-motif-stripe"
        />
      ))}
    </g>
  </svg>
);

export default AutomationMotif;
