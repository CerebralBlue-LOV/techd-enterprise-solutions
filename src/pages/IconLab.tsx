import Layout from "@shared/Layout";

/**
 * /icon-lab — temporary internal page exploring icon styles for the 5 practices.
 * Each row shows one stylistic approach across all five practice concepts so we
 * can pick a coherent system before applying icons to the solution cards.
 *
 * Practices: AI · Data · Automation · Security · Hybrid Cloud
 */

const PRACTICES = ["AI & Generative", "Data & Analytics", "Automation", "Security", "Hybrid Cloud"] as const;

// ---------- Style 1: Editorial line ----------
// Thin 1.5px strokes, generous padding, no fill. Calm, Stripe-like.
const Style1 = ({ practice }: { practice: string }) => {
  const stroke = "hsl(var(--secondary))";
  const sw = 1.5;
  return (
    <svg viewBox="0 0 64 64" className="h-14 w-14" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
      {practice === "AI & Generative" && (
        <>
          <circle cx="32" cy="32" r="6" />
          <path d="M32 12v8M32 44v8M12 32h8M44 32h8M18 18l5.5 5.5M40.5 40.5L46 46M46 18l-5.5 5.5M23.5 40.5L18 46" />
        </>
      )}
      {practice === "Data & Analytics" && (
        <>
          <ellipse cx="32" cy="18" rx="16" ry="5" />
          <path d="M16 18v12c0 2.8 7.2 5 16 5s16-2.2 16-5V18M16 32v12c0 2.8 7.2 5 16 5s16-2.2 16-5V32" />
        </>
      )}
      {practice === "Automation" && (
        <>
          <circle cx="32" cy="32" r="12" />
          <path d="M32 14v6M32 44v6M50 32h-6M20 32h-6M44.7 19.3l-4.2 4.2M23.5 40.5l-4.2 4.2M44.7 44.7l-4.2-4.2M23.5 23.5l-4.2-4.2" />
        </>
      )}
      {practice === "Security" && (
        <>
          <path d="M32 10l18 6v12c0 12-8 20-18 26-10-6-18-14-18-26V16z" />
          <path d="M25 32l5 5 9-10" />
        </>
      )}
      {practice === "Hybrid Cloud" && (
        <>
          <path d="M20 40a8 8 0 010-16 12 12 0 0123 3 8 8 0 011 15z" />
          <path d="M14 50h36" strokeDasharray="2 3" />
        </>
      )}
    </svg>
  );
};

// ---------- Style 2: Duotone cyan-fill ----------
// Soft cyan rounded background block + crisp cyan glyph. Editorial but warmer.
const Style2 = ({ practice }: { practice: string }) => {
  const stroke = "hsl(var(--primary))";
  return (
    <div className="relative grid h-14 w-14 place-items-center rounded-[14px] bg-primary/10">
      <svg viewBox="0 0 32 32" className="h-7 w-7" fill="none" stroke={stroke} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        {practice === "AI & Generative" && (
          <>
            <circle cx="16" cy="16" r="3" fill={stroke} />
            <path d="M16 4v6M16 22v6M4 16h6M22 16h6M7 7l4 4M21 21l4 4M25 7l-4 4M11 21l-4 4" />
          </>
        )}
        {practice === "Data & Analytics" && (
          <>
            <ellipse cx="16" cy="9" rx="9" ry="3" />
            <path d="M7 9v8c0 1.7 4 3 9 3s9-1.3 9-3V9M7 17v6c0 1.7 4 3 9 3s9-1.3 9-3v-6" />
          </>
        )}
        {practice === "Automation" && (
          <>
            <path d="M16 4l3 4 5-1 1 5 4 3-4 3-1 5-5-1-3 4-3-4-5 1-1-5-4-3 4-3 1-5 5 1z" />
            <circle cx="16" cy="16" r="3" fill={stroke} />
          </>
        )}
        {practice === "Security" && (
          <>
            <path d="M16 4l10 3v7c0 6-4 11-10 14-6-3-10-8-10-14V7z" />
            <circle cx="16" cy="15" r="2.5" fill={stroke} />
            <path d="M16 17.5V22" />
          </>
        )}
        {practice === "Hybrid Cloud" && (
          <>
            <path d="M9 21a4 4 0 010-8 7 7 0 0113 1.5A4.5 4.5 0 0123 22z" />
            <path d="M16 26v3M11 27.5l-2 1.5M21 27.5l2 1.5" />
          </>
        )}
      </svg>
    </div>
  );
};

// ---------- Style 3: Dashed / drawn (animated on hover) ----------
const Style3 = ({ practice }: { practice: string }) => {
  const stroke = "hsl(var(--primary))";
  return (
    <svg viewBox="0 0 64 64" className="iconlab-draw h-14 w-14" fill="none" stroke={stroke} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      {practice === "AI & Generative" && (
        <>
          <circle cx="32" cy="32" r="8" pathLength={1} />
          <circle cx="14" cy="14" r="3" pathLength={1} />
          <circle cx="50" cy="14" r="3" pathLength={1} />
          <circle cx="14" cy="50" r="3" pathLength={1} />
          <circle cx="50" cy="50" r="3" pathLength={1} />
          <path d="M16 16l10 10M48 16L38 26M16 48l10-10M48 48L38 38" pathLength={1} />
        </>
      )}
      {practice === "Data & Analytics" && (
        <>
          <path d="M12 50V34M24 50V24M36 50V14M48 50V28" pathLength={1} />
          <path d="M12 50h36" pathLength={1} />
        </>
      )}
      {practice === "Automation" && (
        <>
          <path d="M14 32a18 18 0 0136 0" pathLength={1} />
          <path d="M50 32a18 18 0 01-36 0" pathLength={1} strokeDasharray="2 3" />
          <path d="M44 22l6-2 2 6M20 42l-6 2-2-6" pathLength={1} />
        </>
      )}
      {practice === "Security" && (
        <>
          <path d="M32 10l18 6v12c0 12-8 20-18 26-10-6-18-14-18-26V16z" pathLength={1} />
          <circle cx="32" cy="30" r="4" pathLength={1} />
          <path d="M32 34v8" pathLength={1} />
        </>
      )}
      {practice === "Hybrid Cloud" && (
        <>
          <path d="M20 40a8 8 0 010-16 12 12 0 0123 3 8 8 0 011 15z" pathLength={1} />
          <path d="M16 48h32" strokeDasharray="2 4" pathLength={1} />
          <circle cx="22" cy="48" r="1.5" fill={stroke} />
          <circle cx="42" cy="48" r="1.5" fill={stroke} />
        </>
      )}
    </svg>
  );
};

// ---------- Style 4: Geometric mark (badge) ----------
// Solid cyan square, white glyph inside. Bold. Reads like a logo lockup.
const Style4 = ({ practice }: { practice: string }) => {
  return (
    <div className="grid h-14 w-14 place-items-center rounded-[14px] bg-primary text-background shadow-[0_8px_24px_-12px_hsl(var(--primary)/0.6)]">
      <svg viewBox="0 0 32 32" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        {practice === "AI & Generative" && (
          <>
            <circle cx="16" cy="16" r="3" fill="currentColor" />
            <path d="M16 5v5M16 22v5M5 16h5M22 16h5M8 8l3 3M21 21l3 3M24 8l-3 3M11 21l-3 3" />
          </>
        )}
        {practice === "Data & Analytics" && (
          <>
            <ellipse cx="16" cy="9" rx="9" ry="3" />
            <path d="M7 9v14c0 1.7 4 3 9 3s9-1.3 9-3V9" />
            <path d="M7 16c0 1.7 4 3 9 3s9-1.3 9-3" />
          </>
        )}
        {practice === "Automation" && (
          <>
            <circle cx="16" cy="16" r="6" />
            <path d="M16 5v3M16 24v3M5 16h3M24 16h3M9 9l2 2M21 21l2 2M23 9l-2 2M11 21l-2 2" />
          </>
        )}
        {practice === "Security" && (
          <>
            <path d="M16 4l10 3v8c0 6-4 11-10 13-6-2-10-7-10-13V7z" />
            <path d="M12 15l3 3 5-6" />
          </>
        )}
        {practice === "Hybrid Cloud" && (
          <>
            <path d="M9 21a4 4 0 010-8 7 7 0 0113 1.5A4.5 4.5 0 0123 22z" />
            <path d="M13 26h6M11 29h10" />
          </>
        )}
      </svg>
    </div>
  );
};

// ---------- Style 5: Particle composition ----------
// Icon shape rendered with brand-cyan dots. Echoes the hero particle system.
const Style5 = ({ practice }: { practice: string }) => {
  const fill = "hsl(var(--primary))";
  // Each shape = array of [x, y, r]
  const SHAPES: Record<string, [number, number, number][]> = {
    "AI & Generative": [
      [32, 32, 3],
      [16, 16, 1.5], [48, 16, 1.5], [16, 48, 1.5], [48, 48, 1.5],
      [32, 12, 1.2], [32, 52, 1.2], [12, 32, 1.2], [52, 32, 1.2],
      [22, 22, 1], [42, 22, 1], [22, 42, 1], [42, 42, 1],
    ],
    "Data & Analytics": [
      [14, 50, 1.4], [22, 50, 1.4], [30, 50, 1.4], [38, 50, 1.4], [46, 50, 1.4],
      [14, 42, 1.4], [22, 36, 1.4], [30, 28, 1.4], [38, 22, 1.4], [46, 16, 1.4],
      [14, 34, 1], [22, 28, 1], [30, 22, 1], [38, 16, 1],
    ],
    "Automation": [
      [32, 14, 1.4], [40, 16, 1.4], [46, 22, 1.4], [50, 30, 1.4], [50, 38, 1.4],
      [46, 44, 1.4], [40, 48, 1.4], [32, 50, 1.4], [24, 48, 1.4], [18, 44, 1.4],
      [14, 38, 1.4], [14, 30, 1.4], [18, 22, 1.4], [24, 16, 1.4],
      [32, 32, 3],
    ],
    "Security": [
      [32, 10, 1.4], [22, 14, 1.4], [42, 14, 1.4], [16, 22, 1.4], [48, 22, 1.4],
      [16, 32, 1.4], [48, 32, 1.4], [18, 40, 1.4], [46, 40, 1.4],
      [24, 48, 1.4], [40, 48, 1.4], [32, 54, 1.4],
      [32, 30, 2], [32, 36, 1.2],
    ],
    "Hybrid Cloud": [
      [22, 24, 1.4], [30, 20, 1.4], [38, 20, 1.4], [46, 24, 1.4], [50, 32, 1.4],
      [46, 38, 1.4], [38, 40, 1.4], [22, 40, 1.4], [16, 36, 1.4], [14, 28, 1.4], [18, 22, 1.4],
      [16, 50, 1], [24, 50, 1], [32, 50, 1], [40, 50, 1], [48, 50, 1],
    ],
  };
  return (
    <svg viewBox="0 0 64 64" className="h-14 w-14">
      {SHAPES[practice].map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill={fill} />
      ))}
    </svg>
  );
};

// ---------- Layout helpers ----------
const Row = ({
  num,
  name,
  description,
  recommended,
  Style,
}: {
  num: number;
  name: string;
  description: string;
  recommended?: boolean;
  Style: React.FC<{ practice: string }>;
}) => (
  <div className="rounded-xl border border-border bg-background p-8">
    <div className="flex flex-wrap items-baseline gap-3">
      <span className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
        Style {num}
      </span>
      <h3 className="text-2xl font-bold">{name}</h3>
      {recommended && (
        <span className="rounded-full border border-primary px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
          Recommended
        </span>
      )}
    </div>
    <p className="mt-2 max-w-2xl text-sm font-light text-muted-foreground">{description}</p>

    <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-5">
      {PRACTICES.map((p) => (
        <div key={p} className="flex flex-col items-center gap-3 rounded-lg border border-border/50 p-5">
          <Style practice={p} />
          <p className="text-center text-[11px] font-bold uppercase tracking-[0.14em] text-secondary">
            {p}
          </p>
        </div>
      ))}
    </div>
  </div>
);

const IconLab = () => {
  return (
    <Layout>
      <section className="section">
        <div className="container-page">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Internal · Icon Lab</p>
          <h1 className="mt-4 text-5xl font-bold leading-[1.05]">Icon system exploration</h1>
          <p className="mt-4 max-w-2xl text-base font-light text-muted-foreground">
            Five candidate icon styles applied across the five practices. Each row keeps the same
            geometry so you can compare style — not subject — at a glance. Brand cyan
            (#00B3E3) and secondary gray are the only colors used.
          </p>

          <div className="mt-12 space-y-8">
            <Row
              num={1}
              name="Editorial line"
              description="Thin 1.5px strokes in secondary gray. Calm, Stripe/Linear-feel. Quiet, scales beautifully, but can feel generic if every brand uses it."
              Style={Style1}
            />
            <Row
              num={2}
              name="Duotone tile"
              description="Soft cyan rounded tile with a crisp cyan glyph. Warm and on-brand without shouting. Reads well at small sizes on the solution cards."
              recommended
              Style={Style2}
            />
            <Row
              num={3}
              name="Drawn / dashed"
              description="Strokes that animate in on hover (see them light up). Distinct, but lots of motion across 5 cards on a single page can feel busy."
              Style={Style3}
            />
            <Row
              num={4}
              name="Solid badge"
              description="Filled cyan tile with white glyph. Highest contrast, almost a logo lockup. Great for hero/eyebrow placements; risks visual noise on a card grid."
              Style={Style4}
            />
            <Row
              num={5}
              name="Particle composition"
              description="Icon shape rendered with cyan dots — echoes the hero particle field. Strong identity, but legibility drops at small sizes (icons must stay ≥56px)."
              Style={Style5}
            />
          </div>

          <div className="mt-16 rounded-xl border-2 border-primary/30 bg-primary/[0.03] p-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">My recommendation</p>
            <h2 className="mt-3 text-3xl font-bold">Style 2 (Duotone tile) on cards · Style 5 (Particle) for hero accents</h2>
            <p className="mt-4 max-w-3xl text-base font-light text-secondary">
              Style 2 is the workhorse: strong brand presence, scales to 40–56px without losing
              identity, and pairs cleanly with the rotating border beam on the solution cards.
              Reserve Style 5 (particle composition) for larger marquee placements — the hero,
              section dividers, or a "Why TechD" feature — where it can echo the particle field
              without competing with body content. Style 1 stays available for utility surfaces
              (footer, dropdown menus, inline content). Style 3 and Style 4 are too loud for
              repeated use across a 5-card grid.
            </p>
          </div>

          <p className="mt-12 text-xs font-light text-muted-foreground">
            Temporary internal page · /icon-lab — delete when an icon style is chosen.
          </p>
        </div>
      </section>

      <style>{`
        .iconlab-draw path,
        .iconlab-draw circle {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          transition: stroke-dashoffset 900ms ease;
        }
        .iconlab-draw:hover path,
        .iconlab-draw:hover circle {
          stroke-dashoffset: 0;
        }
      `}</style>
    </Layout>
  );
};

export default IconLab;
