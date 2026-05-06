import { useMemo } from "react";

/**
 * AnimatedPlexus — renders a plexus network (nodes + auto-connected edges)
 * from a list of 2D points. Edges within `threshold` distance are drawn,
 * stroke-dashoffset animates the lines in, and nodes pulse continuously.
 *
 * Coordinate space: 0..100 on both axes (viewBox 100x100).
 * Anchor the silhouette wherever you like inside that box.
 */

type Pt = [number, number];

interface Props {
  points: Pt[];
  /** Max edge length to connect (in viewBox units). Default 22. */
  threshold?: number;
  /** Unique id prefix to avoid SVG defs collisions. */
  id: string;
}

export const AnimatedPlexus = ({ points, threshold = 22, id }: Props) => {
  const edges = useMemo(() => {
    const out: { x1: number; y1: number; x2: number; y2: number; len: number }[] = [];
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const [x1, y1] = points[i];
        const [x2, y2] = points[j];
        const len = Math.hypot(x2 - x1, y2 - y1);
        if (len < threshold) out.push({ x1, y1, x2, y2, len });
      }
    }
    return out;
  }, [points, threshold]);

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
      className="plexus-svg absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={`${id}-glow`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.5" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Edges */}
      <g stroke="hsl(var(--primary))" strokeWidth="0.35" strokeLinecap="round" fill="none">
        {edges.map((e, i) => {
          const dash = e.len.toFixed(2);
          return (
            <line
              key={`e-${i}`}
              x1={e.x1}
              y1={e.y1}
              x2={e.x2}
              y2={e.y2}
              opacity={0.55}
              strokeDasharray={dash}
              strokeDashoffset={dash}
              style={{
                animation: `plexus-draw 1.2s ease-out forwards`,
                animationDelay: `${0.05 + (i % 12) * 0.04}s`,
              }}
            />
          );
        })}
      </g>

      {/* Nodes */}
      <g fill="hsl(var(--primary))">
        {points.map(([x, y], i) => (
          <circle
            key={`n-${i}`}
            cx={x}
            cy={y}
            r={0.9}
            opacity={0}
            style={{
              animation: `plexus-pop 0.5s ease-out forwards, plexus-pulse 2.6s ease-in-out infinite`,
              animationDelay: `${0.3 + (i % 14) * 0.05}s, ${0.8 + (i * 0.13) % 2}s`,
              transformOrigin: `${x}px ${y}px`,
            }}
          />
        ))}
      </g>
    </svg>
  );
};

export default AnimatedPlexus;
