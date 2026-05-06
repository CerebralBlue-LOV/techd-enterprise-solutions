/**
 * AI & Generative motif — neural bloom.
 * A radial network of nodes connected by soft arcs, anchored bottom-right.
 * Single cyan hue, varied opacity. Deterministic layout.
 */

// Deterministic pseudo-random
const seed = (n: number) => {
  const x = Math.sin(n * 9301 + 49297) * 233280;
  return x - Math.floor(x);
};

const RINGS = [
  { r: 60, count: 6 },
  { r: 110, count: 10 },
  { r: 165, count: 14 },
  { r: 220, count: 18 },
];

type Node = { x: number; y: number; ring: number; idx: number; op: number };

const CX = 320;
const CY = 320;

const nodes: Node[] = [];
RINGS.forEach((ring, ri) => {
  for (let i = 0; i < ring.count; i++) {
    const jitter = (seed(ri * 31 + i) - 0.5) * 0.18;
    const a = Math.PI + (Math.PI / 2) * (i / (ring.count - 1)) + jitter;
    // quarter arc sweeping from left (PI) up to top (1.5PI) so nodes fill the corner
    const x = CX + Math.cos(a) * ring.r;
    const y = CY + Math.sin(a) * ring.r;
    nodes.push({ x, y, ring: ri, idx: i, op: 0.25 + (1 - ri / RINGS.length) * 0.6 });
  }
});

// Build connections: each node links to 1-2 nodes in the next ring
const links: Array<{ a: Node; b: Node; op: number }> = [];
nodes.forEach((n) => {
  const next = nodes.filter((m) => m.ring === n.ring + 1);
  if (!next.length) return;
  // pick the 2 closest
  const sorted = [...next].sort(
    (p, q) => Math.hypot(p.x - n.x, p.y - n.y) - Math.hypot(q.x - n.x, q.y - n.y)
  );
  sorted.slice(0, 2).forEach((m, k) => {
    links.push({ a: n, b: m, op: 0.12 + (1 - n.ring / RINGS.length) * 0.35 - k * 0.06 });
  });
});

const AiMotif = () => (
  <svg
    viewBox="0 0 320 320"
    preserveAspectRatio="xMaxYMax slice"
    className="flip-motif-svg"
    aria-hidden="true"
  >
    {/* Soft radial halo */}
    <defs>
      <radialGradient id="ai-halo" cx="100%" cy="100%" r="80%">
        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.18" />
        <stop offset="60%" stopColor="hsl(var(--primary))" stopOpacity="0.04" />
        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="320" height="320" fill="url(#ai-halo)" />

    {/* Connection lines */}
    <g stroke="hsl(var(--primary))" fill="none" strokeLinecap="round">
      {links.map((l, i) => (
        <line
          key={`l-${i}`}
          x1={l.a.x}
          y1={l.a.y}
          x2={l.b.x}
          y2={l.b.y}
          strokeWidth={0.9}
          opacity={l.op}
          className="flip-motif-line"
          style={{ animationDelay: `${i * 22}ms` }}
        />
      ))}
    </g>

    {/* Concentric guide arcs */}
    <g fill="none" stroke="hsl(var(--primary))" strokeLinecap="round">
      {RINGS.map((ring, i) => (
        <circle
          key={`r-${i}`}
          cx={CX}
          cy={CY}
          r={ring.r}
          strokeWidth={0.6}
          opacity={0.18}
          strokeDasharray="2 6"
        />
      ))}
    </g>

    {/* Nodes */}
    <g fill="hsl(var(--primary))">
      {nodes.map((n, i) => {
        const isHub = n.ring === 0;
        const radius = isHub ? 3.4 : 2 + (1 - n.ring / RINGS.length) * 1.6;
        return (
          <g
            key={`n-${i}`}
            className="flip-motif-dot"
            style={{ animationDelay: `${i * 18}ms`, transformOrigin: `${n.x}px ${n.y}px` }}
          >
            {isHub && (
              <circle cx={n.x} cy={n.y} r={radius * 3} opacity={0.18} />
            )}
            <circle cx={n.x} cy={n.y} r={radius} opacity={n.op} />
          </g>
        );
      })}
    </g>

    {/* Anchor core at the corner */}
    <g>
      <circle cx={CX} cy={CY} r={6} fill="hsl(var(--primary))" opacity={0.9} />
      <circle cx={CX} cy={CY} r={14} fill="none" stroke="hsl(var(--primary))" strokeWidth={1} opacity={0.5} />
      <circle cx={CX} cy={CY} r={26} fill="none" stroke="hsl(var(--primary))" strokeWidth={0.6} opacity={0.3} />
    </g>
  </svg>
);

export default AiMotif;
