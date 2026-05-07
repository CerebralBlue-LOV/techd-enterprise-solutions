import { useEffect, useRef, useState } from "react";

interface Props {
  cursor: { x: number; y: number } | null;
}

/**
 * Services hero backdrop — modular block grid.
 *
 * A field of small rounded squares ("modules") on a regular grid. Blocks within
 * a soft radius of the cursor scale up and brighten toward the brand primary;
 * far blocks rest at a faint neutral tint. Evokes "building blocks of service".
 */

const STEP = 34;          // grid spacing (px)
const BLOCK = 6;           // resting block size (px)
const RADIUS = 200;        // cursor influence radius
const BASE_OPACITY = 0.22;
const HIT_OPACITY = 0.95;
const MAX_SCALE = 2.4;     // peak scale near cursor

type Block = { cx: number; cy: number };

const ModularBlocks = ({
  cursor,
  width,
  height,
}: Props & { width: number; height: number }) => {
  if (width === 0 || height === 0) return null;

  const cols = Math.ceil(width / STEP) + 1;
  const rows = Math.ceil(height / STEP) + 1;
  const offsetX = (width - (cols - 1) * STEP) / 2;
  const offsetY = (height - (rows - 1) * STEP) / 2;

  const blocks: Block[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      blocks.push({ cx: offsetX + c * STEP, cy: offsetY + r * STEP });
    }
  }

  return (
    <svg
      className="absolute inset-0 h-full w-full"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      style={{
        WebkitMaskImage:
          "radial-gradient(85% 95% at 50% 45%, black 40%, transparent 92%)",
        maskImage:
          "radial-gradient(85% 95% at 50% 45%, black 40%, transparent 92%)",
      }}
    >
      <g>
        {blocks.map((b, i) => {
          let opacity = BASE_OPACITY;
          let scale = 1;
          let fill = `hsl(var(--muted-foreground) / ${BASE_OPACITY})`;
          if (cursor) {
            const d = Math.hypot(b.cx - cursor.x, b.cy - cursor.y);
            if (d < RADIUS) {
              const t = 1 - d / RADIUS;
              const eased = t * t;
              opacity = BASE_OPACITY + (HIT_OPACITY - BASE_OPACITY) * eased;
              scale = 1 + (MAX_SCALE - 1) * eased;
              fill = `hsl(var(--muted-foreground) / ${opacity.toFixed(3)})`;
            }
          }
          const size = BLOCK * scale;
          return (
            <rect
              key={i}
              x={b.cx - size / 2}
              y={b.cy - size / 2}
              width={size}
              height={size}
              rx={1.5}
              fill={fill}
            />
          );
        })}
      </g>
    </svg>
  );
};

interface BackdropProps {
  cursor: { x: number; y: number } | null;
}

export const ServiceHeroBackdrop = ({ cursor }: BackdropProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const ro = new ResizeObserver(() => {
      setSize({ w: node.clientWidth, h: node.clientHeight });
    });
    ro.observe(node);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <ModularBlocks cursor={cursor} width={size.w} height={size.h} />

      {/* Gradient wash to match the family of hero backdrops. */}
      <div className="absolute -top-40 -right-32 h-[640px] w-[640px] rounded-full bg-primary/15 blur-3xl animate-gradient-drift" />
      <div
        className="absolute top-1/3 -left-40 h-[520px] w-[520px] rounded-full bg-primary/10 blur-3xl animate-gradient-drift"
        style={{ animationDelay: "-9s" }}
      />
      <div
        className="absolute bottom-0 left-[10%] h-[420px] w-[680px] rounded-full bg-background blur-3xl animate-gradient-drift"
        style={{ animationDelay: "-4s" }}
      />

      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
};

export default ServiceHeroBackdrop;
