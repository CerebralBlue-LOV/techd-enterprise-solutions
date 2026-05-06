import AnimatedPlexus from "./AnimatedPlexus";

/**
 * Plexus point sets for each practice. Coordinates in 0..100 viewBox space.
 * Hand-tuned silhouettes — sparse enough to read as a network, dense enough
 * to suggest the shape (brain, database, gears, shield, cloud).
 */

// BRAIN — two lobes with a central fold
const BRAIN: [number, number][] = [
  [30, 32], [40, 26], [52, 24], [64, 26], [74, 32],
  [26, 44], [38, 40], [50, 38], [62, 40], [74, 44],
  [24, 56], [36, 54], [50, 52], [64, 54], [76, 56],
  [28, 68], [40, 70], [50, 72], [60, 70], [72, 68],
  [50, 30], [50, 46], [50, 60], [50, 74],
];

// DATABASE — stacked cylinder ellipses
const DATABASE: [number, number][] = [
  [28, 26], [40, 22], [52, 21], [64, 22], [76, 26], [72, 30], [60, 32], [48, 32], [36, 30],
  [28, 42], [40, 44], [52, 45], [64, 44], [76, 42],
  [28, 58], [40, 60], [52, 61], [64, 60], [76, 58],
  [28, 74], [40, 76], [52, 77], [64, 76], [76, 74],
  [28, 26], [28, 74], [76, 26], [76, 74],
];

// GEARS — central hub + ring of teeth
const GEARS: [number, number][] = [
  [50, 50],
  [50, 28], [62, 31], [70, 40], [73, 50], [70, 60], [62, 69], [50, 72], [38, 69], [30, 60], [27, 50], [30, 40], [38, 31],
  [50, 38], [60, 44], [60, 56], [50, 62], [40, 56], [40, 44],
  [22, 22], [78, 22], [22, 78], [78, 78],
];

// SHIELD — pointed-bottom escutcheon
const SHIELD: [number, number][] = [
  [30, 22], [50, 20], [70, 22],
  [28, 34], [50, 34], [72, 34],
  [28, 46], [40, 46], [50, 46], [60, 46], [72, 46],
  [30, 58], [42, 58], [50, 58], [58, 58], [70, 58],
  [34, 70], [44, 70], [50, 70], [56, 70], [66, 70],
  [40, 80], [50, 84], [60, 80],
];

// CLOUD — three overlapping puffs
const CLOUD: [number, number][] = [
  [28, 56], [34, 48], [42, 44], [50, 42], [58, 44], [66, 48], [72, 56],
  [24, 64], [32, 60], [40, 56], [48, 54], [56, 54], [64, 56], [72, 60], [76, 64],
  [28, 72], [38, 72], [48, 72], [58, 72], [68, 72], [76, 72],
  [44, 36], [56, 36],
];

const SHAPES = {
  brain: BRAIN,
  database: DATABASE,
  gears: GEARS,
  shield: SHIELD,
  cloud: CLOUD,
} as const;

export type PlexusShape = keyof typeof SHAPES;

interface Props {
  shape: PlexusShape;
}

export const PlexusShapeMotif = ({ shape }: Props) => {
  const points = SHAPES[shape];
  // Tuned per-shape to keep edge count readable
  const threshold = shape === "gears" ? 26 : shape === "shield" ? 18 : 20;
  return (
    <div className="flip-motif-svg relative h-full w-full">
      <div
        aria-hidden="true"
        className="absolute right-0 bottom-0 h-[80%] w-[80%] rounded-full opacity-50 blur-2xl"
        style={{
          background:
            "radial-gradient(circle at 60% 60%, hsl(var(--primary) / 0.3), transparent 65%)",
        }}
      />
      <AnimatedPlexus id={`plexus-${shape}`} points={points} threshold={threshold} />
    </div>
  );
};

export default PlexusShapeMotif;
