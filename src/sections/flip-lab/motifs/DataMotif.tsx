/**
 * Data motif — halftone dot field shaped into a curving wave surface.
 * Single cyan hue; dot radius varies by curvature distance.
 */
const COLS = 22;
const ROWS = 14;

const DataMotif = () => {
  const dots: { cx: number; cy: number; r: number; o: number; i: number }[] = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const x = 30 + c * 11;
      // sine surface so the field bends like a wave from upper-right to lower-left
      const wave = Math.sin((c / COLS) * Math.PI * 1.6 + r * 0.18) * 18;
      const y = 60 + r * 14 + wave;
      // distance from a soft center → governs radius (halftone effect)
      const dx = (c - COLS * 0.55) / COLS;
      const dy = (r - ROWS * 0.5) / ROWS;
      const d = Math.sqrt(dx * dx + dy * dy);
      const radius = Math.max(0.6, 2.6 - d * 3.8);
      const opacity = Math.max(0.12, 0.85 - d * 1.2);
      if (radius < 0.7) continue;
      dots.push({ cx: x, cy: y, r: radius, o: opacity, i: r * COLS + c });
    }
  }

  return (
    <svg
      viewBox="0 0 280 280"
      preserveAspectRatio="xMaxYMax meet"
      className="flip-motif-svg"
      aria-hidden="true"
    >
      <g fill="hsl(var(--primary))">
        {dots.map((d) => (
          <circle
            key={d.i}
            cx={d.cx}
            cy={d.cy}
            r={d.r}
            opacity={d.o}
            className="flip-motif-dot"
            style={{ animationDelay: `${(d.i % 40) * 25}ms` }}
          />
        ))}
      </g>
    </svg>
  );
};

export default DataMotif;
