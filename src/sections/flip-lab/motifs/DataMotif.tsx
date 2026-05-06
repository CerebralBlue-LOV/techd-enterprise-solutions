/** Cluster of dots with pulsing nodes. */
export const DataMotif = () => {
  const dots = [
    { x: 30, y: 90, r: 3, p: true, d: 0 },
    { x: 50, y: 70, r: 2, d: 100 },
    { x: 70, y: 100, r: 4, p: true, d: 200 },
    { x: 90, y: 60, r: 2.5, d: 300 },
    { x: 110, y: 90, r: 3, p: true, d: 400 },
    { x: 130, y: 70, r: 2, d: 150 },
    { x: 150, y: 110, r: 3.5, p: true, d: 250 },
    { x: 60, y: 110, r: 2, d: 350 },
    { x: 100, y: 110, r: 2.5, d: 450 },
    { x: 140, y: 80, r: 2, d: 500 },
    { x: 40, y: 60, r: 1.5, d: 200 },
    { x: 120, y: 50, r: 2, d: 600 },
  ];
  return (
    <svg
      viewBox="0 0 200 140"
      className="pointer-events-none absolute -bottom-2 -right-2 h-32 w-44 text-primary"
      fill="currentColor"
    >
      {dots.map((d, i) => (
        <circle
          key={i}
          cx={d.x}
          cy={d.y}
          r={d.r}
          opacity={d.p ? 0.9 : 0.55}
          className={d.p ? "flip-motif-pulse" : undefined}
          style={{ animationDelay: `${d.d}ms` }}
        />
      ))}
    </svg>
  );
};

export default DataMotif;
