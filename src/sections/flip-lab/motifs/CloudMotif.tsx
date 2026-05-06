/**
 * Cloud motif — scattered tilted line-segment burst (TikTok-award style).
 * Short cyan strokes at varied lengths/angles, fade-in stagger.
 */
type Stroke = { x: number; y: number; len: number; angle: number; o: number; w: number };

const seed = (n: number) => {
  // Tiny deterministic pseudo-random so layout doesn't shift between renders.
  const x = Math.sin(n * 9301 + 49297) * 233280;
  return x - Math.floor(x);
};

const COUNT = 70;
const strokes: Stroke[] = Array.from({ length: COUNT }).map((_, i) => {
  const r1 = seed(i + 1);
  const r2 = seed(i + 100);
  const r3 = seed(i + 200);
  const r4 = seed(i + 300);
  // cluster around bottom-right with falloff
  const cx = 200 + (r1 - 0.5) * 160;
  const cy = 200 + (r2 - 0.5) * 160;
  const dist = Math.hypot(cx - 210, cy - 210) / 120;
  return {
    x: cx,
    y: cy,
    len: 8 + r3 * 22,
    angle: r4 * 360,
    o: Math.max(0.15, 0.85 - dist * 0.7),
    w: 1.4 + r3 * 1.4,
  };
});

const CloudMotif = () => (
  <svg
    viewBox="0 0 280 280"
    preserveAspectRatio="xMaxYMax meet"
    className="flip-motif-svg"
    aria-hidden="true"
  >
    <g stroke="hsl(var(--primary))" strokeLinecap="round" fill="none">
      {strokes.map((s, i) => (
        <line
          key={i}
          x1={s.x - s.len / 2}
          y1={s.y}
          x2={s.x + s.len / 2}
          y2={s.y}
          strokeWidth={s.w}
          opacity={s.o}
          transform={`rotate(${s.angle} ${s.x} ${s.y})`}
          className="flip-motif-shard"
          style={{ animationDelay: `${(i % 24) * 35}ms` }}
        />
      ))}
    </g>
  </svg>
);

export default CloudMotif;
