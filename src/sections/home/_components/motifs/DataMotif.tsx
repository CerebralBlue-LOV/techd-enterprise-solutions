/** Data motif — dot grid with pulsing nodes + connecting lines */
const COLS = 12;
const ROWS = 5;
const HIGHLIGHTS = [
  [2, 1],
  [5, 3],
  [8, 1],
  [10, 2],
];

export const DataMotif = () => {
  const cellW = 320 / (COLS + 1);
  const cellH = 140 / (ROWS + 1);
  return (
    <svg
      viewBox="0 0 320 140"
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="none"
    >
      {/* base dots */}
      {Array.from({ length: COLS }).map((_, c) =>
        Array.from({ length: ROWS }).map((_, r) => (
          <circle
            key={`${c}-${r}`}
            cx={(c + 1) * cellW}
            cy={(r + 1) * cellH}
            r={1}
            fill="hsl(var(--muted-foreground))"
            opacity={0.35}
          />
        )),
      )}
      {/* connecting lines */}
      {HIGHLIGHTS.slice(0, -1).map(([c, r], i) => {
        const [c2, r2] = HIGHLIGHTS[i + 1];
        return (
          <line
            key={i}
            x1={(c + 1) * cellW}
            y1={(r + 1) * cellH}
            x2={(c2 + 1) * cellW}
            y2={(r2 + 1) * cellH}
            stroke="hsl(var(--primary))"
            strokeWidth={1}
            strokeDasharray="80"
            className="motif-draw"
            style={{ animationDelay: `${i * 150}ms` }}
          />
        );
      })}
      {/* highlight nodes */}
      {HIGHLIGHTS.map(([c, r], i) => (
        <circle
          key={`h-${i}`}
          cx={(c + 1) * cellW}
          cy={(r + 1) * cellH}
          r={2.5}
          fill="hsl(var(--primary))"
          className="motif-pulse"
          style={{ animationDelay: `${i * 200}ms` }}
        />
      ))}
    </svg>
  );
};
export default DataMotif;
