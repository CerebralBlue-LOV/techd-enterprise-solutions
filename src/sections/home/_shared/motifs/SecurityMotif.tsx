/** Security motif — concentric shield arcs with a center lock node */
export const SecurityMotif = () => (
  <svg
    viewBox="0 0 320 140"
    aria-hidden="true"
    className="absolute inset-0 h-full w-full"
    preserveAspectRatio="xMidYMid meet"
  >
    <g transform="translate(160,75)">
      {[60, 48, 36, 24].map((r, i) => (
        <path
          key={i}
          d={`M${-r},0 A${r},${r} 0 0 1 ${r},0`}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth={1}
          opacity={0.2 + i * 0.18}
          strokeDasharray={`${r * 3.14}`}
          className="motif-draw"
          style={{ animationDelay: `${i * 120}ms` }}
        />
      ))}
      {/* mesh dots along arcs */}
      {Array.from({ length: 14 }).map((_, i) => {
        const a = (Math.PI * i) / 13 + Math.PI;
        return (
          <circle
            key={i}
            cx={Math.cos(a) * 36}
            cy={Math.sin(a) * 36}
            r={1.2}
            fill="hsl(var(--muted-foreground))"
            opacity={0.5}
          />
        );
      })}
      {/* lock node */}
      <circle r={6} fill="hsl(var(--primary))" className="motif-pulse" />
      <rect x={-2} y={-1} width={4} height={4} fill="hsl(var(--primary-foreground))" rx={0.5} />
    </g>
  </svg>
);
export default SecurityMotif;
