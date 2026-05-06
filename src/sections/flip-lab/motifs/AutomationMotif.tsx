/**
 * Automation & FinOps motif — branching workflow nodes that converge into
 * a single optimized stream. Reads as "automate + optimize", not just orbit.
 */

type Node = { x: number; y: number; r: number; o: number };

// Tree-like graph anchored bottom-right. Compact bounding box so it stays
// in the corner and doesn't crowd the title.
const NODES: Node[] = [
  // inputs (mid-left)
  { x: 130, y: 170, r: 3.6, o: 0.5 },
  { x: 130, y: 215, r: 3.2, o: 0.45 },
  { x: 130, y: 260, r: 3.6, o: 0.55 },
  // mid junction
  { x: 195, y: 195, r: 4.6, o: 0.7 },
  { x: 195, y: 250, r: 4.2, o: 0.65 },
  // pre-trunk
  { x: 250, y: 222, r: 5.2, o: 0.85 },
  // trunk + outputs near corner
  { x: 295, y: 270, r: 6.4, o: 1 },
  { x: 295, y: 305, r: 4, o: 0.7 },
];

const EDGES: Array<[number, number]> = [
  [0, 3],
  [1, 3],
  [1, 4],
  [2, 4],
  [3, 5],
  [4, 5],
  [5, 6],
  [6, 7],
];

const AutomationMotif = () => (
  <svg
    viewBox="0 0 320 320"
    preserveAspectRatio="xMaxYMax slice"
    className="flip-motif-svg"
    aria-hidden="true"
  >
    <defs>
      <radialGradient id="auto-glow" cx="100%" cy="100%" r="60%">
        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.22" />
        <stop offset="70%" stopColor="hsl(var(--primary))" stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="320" height="320" fill="url(#auto-glow)" />

    {/* edges with directional arrowheads */}
    <defs>
      <marker
        id="auto-arrow"
        viewBox="0 0 10 10"
        refX="9"
        refY="5"
        markerWidth="5"
        markerHeight="5"
        orient="auto-start-reverse"
      >
        <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(var(--primary))" opacity="0.85" />
      </marker>
    </defs>
    <g stroke="hsl(var(--primary))" fill="none" strokeLinecap="round">
      {EDGES.map(([a, b], i) => {
        const A = NODES[a];
        const B = NODES[b];
        // gentle quadratic curve
        const mx = (A.x + B.x) / 2;
        const my = (A.y + B.y) / 2 - 18;
        return (
          <path
            key={`e${i}`}
            d={`M ${A.x} ${A.y} Q ${mx} ${my} ${B.x} ${B.y}`}
            strokeWidth={1.3}
            opacity={0.45 + i * 0.04}
            markerEnd="url(#auto-arrow)"
            className="flip-motif-line"
            style={{ animationDelay: `${i * 90}ms` }}
          />
        );
      })}
    </g>

    {/* nodes */}
    <g fill="hsl(var(--primary))">
      {NODES.map((n, i) => (
        <g
          key={`n${i}`}
          className="flip-motif-dot"
          style={{ animationDelay: `${i * 60}ms`, transformOrigin: `${n.x}px ${n.y}px` }}
        >
          <circle cx={n.x} cy={n.y} r={n.r * 2.4} opacity={n.o * 0.18} />
          <circle cx={n.x} cy={n.y} r={n.r} opacity={n.o} />
        </g>
      ))}
    </g>

    {/* trunk pulse halo */}
    <circle
      cx={295}
      cy={270}
      r={16}
      fill="none"
      stroke="hsl(var(--primary))"
      strokeWidth={1.2}
      opacity={0.55}
      className="flip-motif-pulse-center"
    />
  </svg>
);

export default AutomationMotif;
