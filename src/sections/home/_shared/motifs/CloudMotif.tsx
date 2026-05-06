/** Cloud motif — orbiting nodes around a soft cloud */
export const CloudMotif = () => (
  <svg
    viewBox="0 0 320 140"
    aria-hidden="true"
    className="absolute inset-0 h-full w-full"
    preserveAspectRatio="xMidYMid meet"
  >
    <g transform="translate(160,75)">
      {/* orbits */}
      {[60, 45].map((r, i) => (
        <ellipse
          key={i}
          cx={0}
          cy={0}
          rx={r}
          ry={r * 0.42}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth={1}
          opacity={0.35}
        />
      ))}
      {/* cloud shape */}
      <g opacity={0.9}>
        <circle cx={-12} cy={2} r={10} fill="hsl(var(--primary) / 0.18)" />
        <circle cx={4} cy={-4} r={13} fill="hsl(var(--primary) / 0.22)" />
        <circle cx={16} cy={3} r={9} fill="hsl(var(--primary) / 0.18)" />
        <ellipse cx={2} cy={7} rx={20} ry={5} fill="hsl(var(--primary) / 0.14)" />
      </g>
      {/* orbiting nodes */}
      <g className="motif-spin-slow">
        <circle cx={60} cy={0} r={3} fill="hsl(var(--primary))" />
      </g>
      <g className="motif-spin-rev">
        <circle cx={-45} cy={0} r={2.5} fill="hsl(var(--primary))" opacity={0.8} />
      </g>
    </g>
  </svg>
);
export default CloudMotif;
