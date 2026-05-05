import { useMemo } from "react";

/**
 * Static plexus / node-network overlay.
 * Pure SVG, no animation, no deps. Place inside a `relative` container.
 * Nodes are deterministic (seeded), connected when within `linkDistance`.
 */
type Props = {
  nodeCount?: number;
  linkDistance?: number;
  className?: string;
  /** Concentrate nodes toward the top of the box (0 = uniform, 1 = strong top bias). */
  topBias?: number;
};

// Tiny seeded PRNG so the layout is stable across renders.
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = seed;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const PlexusOverlay = ({
  nodeCount = 28,
  linkDistance = 26,
  className = "",
  topBias = 0.6,
}: Props) => {
  const { nodes, links } = useMemo(() => {
    const rand = mulberry32(7);
    const pts = Array.from({ length: nodeCount }, () => {
      const x = rand() * 100;
      // Bias y toward 0 (top): pow > 1 pushes values toward 0
      const yRaw = rand();
      const y = Math.pow(yRaw, 1 + topBias * 2) * 100;
      return { x, y };
    });
    const ls: { a: number; b: number; d: number }[] = [];
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x;
        const dy = pts[i].y - pts[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < linkDistance) ls.push({ a: i, b: j, d });
      }
    }
    return { nodes: pts, links: ls };
  }, [nodeCount, linkDistance, topBias]);

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    >
      <g stroke="hsl(195 100% 80%)" strokeWidth="0.08">
        {links.map((l, i) => {
          const a = nodes[l.a];
          const b = nodes[l.b];
          const opacity = 0.35 * (1 - l.d / 26);
          return (
            <line
              key={i}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              opacity={opacity}
            />
          );
        })}
      </g>
      <g fill="hsl(195 100% 90%)">
        {nodes.map((n, i) => (
          <circle key={i} cx={n.x} cy={n.y} r="0.35" opacity={0.7} />
        ))}
      </g>
    </svg>
  );
};

export default PlexusOverlay;
