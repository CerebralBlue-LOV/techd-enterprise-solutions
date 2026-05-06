/**
 * Data motif — bold halftone dot field, denser and more robust.
 * Larger dots, deeper contrast falloff, anchored bottom-right.
 */
const COLS = 26;
const ROWS = 18;

const DataMotif = () => {
  const dots: { cx: number; cy: number; r: number; o: number; i: number }[] = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const x = 20 + c * 12;
      const wave = Math.sin((c / COLS) * Math.PI * 1.6 + r * 0.2) * 22;
      const y = 40 + r * 14 + wave;
      // distance from bottom-right corner: bigger/brighter dots near the corner
      const dx = (c - COLS * 0.62) / COLS;
      const dy = (r - ROWS * 0.62) / ROWS;
      const d = Math.sqrt(dx * dx + dy * dy);
      const radius = Math.max(0.7, 4.6 - d * 5.2);
      const opacity = Math.max(0.14, 1 - d * 1.25);
      if (radius < 0.9) continue;
      dots.push({ cx: x, cy: y, r: radius, o: opacity, i: r * COLS + c });
    }
  }

  return (
    <svg
      viewBox="0 0 320 320"
      preserveAspectRatio="xMaxYMax slice"
      className="flip-motif-svg"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="data-glow" cx="100%" cy="100%" r="80%">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.18" />
          <stop offset="70%" stopColor="hsl(var(--primary))" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="320" height="320" fill="url(#data-glow)" />
      <g fill="hsl(var(--primary))">
        {dots.map((d) => (
          <circle
            key={d.i}
            cx={d.cx}
            cy={d.cy}
            r={d.r}
            opacity={d.o}
            className="flip-motif-dot"
            style={{ animationDelay: `${(d.i % 40) * 22}ms` }}
          />
        ))}
      </g>
    </svg>
  );
};

export default DataMotif;
