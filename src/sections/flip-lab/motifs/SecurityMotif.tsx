/** Concentric rotating arcs. */
export const SecurityMotif = () => (
  <svg
    viewBox="0 0 200 140"
    className="pointer-events-none absolute -bottom-2 -right-2 h-32 w-44 text-primary"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
  >
    <g style={{ transformOrigin: "150px 90px" }}>
      <g className="flip-motif-spin-slow" style={{ transformOrigin: "150px 90px" }}>
        <circle cx="150" cy="90" r="46" strokeWidth={1.25} strokeDasharray="6 8" opacity={0.45} />
      </g>
      <g className="flip-motif-spin-rev" style={{ transformOrigin: "150px 90px" }}>
        <circle cx="150" cy="90" r="32" strokeWidth={1.5} strokeDasharray="14 10" opacity={0.7} />
      </g>
      <g className="flip-motif-spin-slow" style={{ transformOrigin: "150px 90px" }}>
        <circle cx="150" cy="90" r="18" strokeWidth={1.5} strokeDasharray="3 6" opacity={0.85} />
      </g>
      <circle cx="150" cy="90" r="3" fill="currentColor" />
    </g>
  </svg>
);

export default SecurityMotif;
