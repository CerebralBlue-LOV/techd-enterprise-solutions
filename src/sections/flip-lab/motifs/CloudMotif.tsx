/** Scattered dashes / sparkles, sequential fade-in then float. */
export const CloudMotif = () => {
  const marks = [
    { x: 30, y: 100, r: -20, d: 0 },
    { x: 50, y: 80, r: 30, d: 80 },
    { x: 70, y: 110, r: -10, d: 160 },
    { x: 90, y: 70, r: 45, d: 240 },
    { x: 110, y: 95, r: -30, d: 320 },
    { x: 130, y: 75, r: 15, d: 400 },
    { x: 150, y: 105, r: -45, d: 480 },
    { x: 60, y: 60, r: 60, d: 200 },
    { x: 100, y: 115, r: 0, d: 360 },
    { x: 140, y: 55, r: 25, d: 540 },
    { x: 40, y: 115, r: 75, d: 280 },
    { x: 120, y: 45, r: -60, d: 600 },
  ];
  return (
    <svg
      viewBox="0 0 200 140"
      className="pointer-events-none absolute -bottom-2 -right-2 h-32 w-44 text-primary"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
    >
      {marks.map((m, i) => (
        <line
          key={i}
          x1={m.x - 5}
          y1={m.y}
          x2={m.x + 5}
          y2={m.y}
          transform={`rotate(${m.r} ${m.x} ${m.y})`}
          opacity={0.7}
          className="flip-motif-scatter"
          style={{ animationDelay: `${m.d}ms` }}
        />
      ))}
    </svg>
  );
};

export default CloudMotif;
