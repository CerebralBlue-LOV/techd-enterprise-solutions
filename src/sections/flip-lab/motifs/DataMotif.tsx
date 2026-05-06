/**
 * Data motif — compact halftone dot field anchored bottom-right.
 * Smaller bounding box so it stays a corner accent and doesn't crowd the title.
 */
const COLS = 16;
const ROWS = 12;

const DataMotif = () => {
  const dots: { cx: number; cy: number; r: number; o: number; i: number }[] = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      // Cluster the field in the lower-right quadrant of a 320 viewBox
      const x = 130 + c * 12;
      const wave = Math.sin((c / COLS) * Math.PI * 1.5 + r * 0.22) * 14;
      const y = 150 + r * 13 + wave;
      // distance from bottom-right corner
      const dx = (c - COLS * 0.7) / COLS;
      const dy = (r - ROWS * 0.7) / ROWS;
      const d = Math.sqrt(dx * dx + dy * dy);
      const radius = Math.max(0.7, 4.2 - d * 5.0);
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
        <radialGradient id="data-glow" cx="100%" cy="100%" r="55%">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
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
