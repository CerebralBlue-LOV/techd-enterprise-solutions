import Layout from "@layout/Layout";

/**
 * /icon-lab — temporary internal page exploring icon glass-tile styles.
 * Strict palette: primary (cyan), secondary, muted, border, background.
 * No dark slate, no off-palette hex.
 *
 * Practices: AI · Data · Automation · Security · Hybrid Cloud
 */

const PRACTICES = [
  "AI & Generative",
  "Data & Analytics",
  "Automation",
  "Security",
  "Hybrid Cloud",
] as const;

/** Shared glyph set used by every glass variant — refined geometry. */
const GlassGlyph = ({ practice, opacity = 0.55 }: { practice: string; opacity?: number }) => (
  <>
    {practice === "AI & Generative" && (
      <>
        <path d="M32 8L52 20v24L32 56 12 44V20z" />
        <path d="M32 8v48M12 20l40 24M52 20L12 44" opacity={opacity} />
        <circle cx="32" cy="32" r="3" fill="currentColor" />
        <circle cx="32" cy="14" r="1.2" fill="currentColor" opacity={0.7} />
        <circle cx="48" cy="38" r="1.2" fill="currentColor" opacity={0.7} />
        <circle cx="16" cy="38" r="1.2" fill="currentColor" opacity={0.7} />
      </>
    )}
    {practice === "Data & Analytics" && (
      <>
        <ellipse cx="32" cy="14" rx="16" ry="4" />
        <path d="M16 14v10c0 2.2 7.2 4 16 4s16-1.8 16-4V14" opacity={opacity} />
        <path d="M16 28v10c0 2.2 7.2 4 16 4s16-1.8 16-4V28" opacity={opacity} />
        <path d="M16 42v8c0 2.2 7.2 4 16 4s16-1.8 16-4v-8" />
        <circle cx="32" cy="14" r="1.5" fill="currentColor" />
      </>
    )}
    {practice === "Automation" && (
      <>
        <circle cx="32" cy="32" r="16" opacity={opacity} />
        <circle cx="32" cy="32" r="10" />
        <circle cx="32" cy="32" r="3" fill="currentColor" />
        <path d="M32 10v6M32 48v6M10 32h6M48 32h6M16 16l4 4M44 44l4 4M48 16l-4 4M16 48l4-4" />
      </>
    )}
    {practice === "Security" && (
      <>
        <path d="M32 8l18 6v14c0 12-8 20-18 26-10-6-18-14-18-26V14z" />
        <path d="M22 30v-3a10 10 0 0120 0v3" opacity={opacity} />
        <rect x="22" y="30" width="20" height="14" rx="2" />
        <circle cx="32" cy="37" r="2" fill="currentColor" />
      </>
    )}
    {practice === "Hybrid Cloud" && (
      <>
        <path d="M22 18l14-7 14 7v14l-14 7-14-7z" />
        <path d="M22 18l14 7 14-7M36 25v14" opacity={opacity} />
        <path d="M14 32l12-6 12 6v12l-12 6-12-6z" />
        <path d="M14 32l12 6 12-6M26 38v12" opacity={opacity} />
      </>
    )}
  </>
);

// ---------- Style A: Light glass on background — soft cyan halo ----------
const StyleA = ({ practice }: { practice: string }) => (
  <div className="relative grid h-24 w-24 place-items-center overflow-hidden rounded-2xl bg-background ring-1 ring-border shadow-[0_10px_30px_-18px_hsl(var(--secondary)/0.4)]">
    {/* layered cyan glow */}
    <span className="absolute -left-6 -top-6 h-24 w-24 rounded-full bg-primary/25 blur-2xl" />
    <span className="absolute -bottom-8 -right-4 h-20 w-20 rounded-full bg-primary/15 blur-2xl" />
    <svg
      viewBox="0 0 64 64"
      className="relative h-12 w-12 text-primary"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <GlassGlyph practice={practice} opacity={0.5} />
    </svg>
    <span className="absolute right-3 top-3 h-1 w-1 rounded-full bg-primary" />
    <span className="absolute right-5 top-3 h-0.5 w-0.5 rounded-full bg-primary/50" />
    <span className="absolute bottom-3 left-3 h-0.5 w-0.5 rounded-full bg-primary/60" />
  </div>
);

// ---------- Style B: Cyan-tinted glass — bg-primary/8 with primary ring ----------
const StyleB = ({ practice }: { practice: string }) => (
  <div className="relative grid h-24 w-24 place-items-center overflow-hidden rounded-2xl bg-primary/[0.06] ring-1 ring-primary/30 shadow-[0_8px_24px_-14px_hsl(var(--primary)/0.45)]">
    {/* diagonal cyan sweep */}
    <span className="absolute inset-0 bg-[linear-gradient(135deg,hsl(var(--primary)/0.18),transparent_60%)]" />
    <span className="absolute -top-6 right-0 h-16 w-16 rounded-full bg-primary/25 blur-2xl" />
    <svg
      viewBox="0 0 64 64"
      className="relative h-12 w-12 text-primary"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <GlassGlyph practice={practice} opacity={0.5} />
    </svg>
    <span className="absolute bottom-2 right-2 h-3 w-3 rounded-sm border border-primary/60" />
  </div>
);

// ---------- Style C: Mute glass — accent/30 grid + cyan glyph ----------
const StyleC = ({ practice }: { practice: string }) => (
  <div className="relative grid h-24 w-24 place-items-center overflow-hidden rounded-2xl bg-background ring-1 ring-border">
    {/* faint muted grid pattern */}
    <span
      className="absolute inset-0 opacity-[0.18]"
      style={{
        backgroundImage:
          "linear-gradient(hsl(var(--muted)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--muted)) 1px, transparent 1px)",
        backgroundSize: "10px 10px",
      }}
    />
    {/* corner cyan glow */}
    <span className="absolute -right-6 -bottom-6 h-20 w-20 rounded-full bg-primary/30 blur-2xl" />
    <svg
      viewBox="0 0 64 64"
      className="relative h-12 w-12 text-primary"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <GlassGlyph practice={practice} opacity={0.5} />
    </svg>
    <span className="absolute top-2.5 left-2.5 h-1 w-1 rounded-full bg-primary" />
  </div>
);

// ---------- Style D: Solid secondary tile — flat, primary glyph ----------
// Pure bg-secondary (#56565A). No halos / blurs that tint the surface.
const StyleD = ({ practice }: { practice: string }) => (
  <div className="relative grid h-24 w-24 place-items-center rounded-2xl bg-secondary shadow-[0_10px_24px_-14px_hsl(var(--secondary)/0.6)]">
    <svg
      viewBox="0 0 64 64"
      className="h-12 w-12 text-primary"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <GlassGlyph practice={practice} opacity={0.55} />
    </svg>
    <span className="absolute right-3 top-3 h-1 w-1 rounded-full bg-primary" />
  </div>
);

// ---------- Style E: Secondary tile — primary ring + corner accent ----------
const StyleE = ({ practice }: { practice: string }) => (
  <div className="relative grid h-24 w-24 place-items-center rounded-2xl bg-secondary ring-2 ring-primary shadow-[0_10px_24px_-14px_hsl(var(--primary)/0.5)]">
    <svg
      viewBox="0 0 64 64"
      className="h-12 w-12 text-primary"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <GlassGlyph practice={practice} opacity={0.6} />
    </svg>
    <span className="absolute bottom-2 right-2 h-3 w-3 rounded-sm bg-primary" />
  </div>
);

// ---------- Style F: Solid primary tile — secondary glyph ----------
const StyleF = ({ practice }: { practice: string }) => (
  <div className="relative grid h-24 w-24 place-items-center rounded-2xl bg-primary shadow-[0_10px_24px_-14px_hsl(var(--primary)/0.55)]">
    <svg
      viewBox="0 0 64 64"
      className="h-12 w-12 text-secondary"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <GlassGlyph practice={practice} opacity={0.7} />
    </svg>
    <span className="absolute bottom-2 right-2 h-1.5 w-1.5 rounded-full bg-secondary" />
  </div>
);

// ---------- Layout ----------
const Row = ({
  letter,
  name,
  description,
  recommended,
  Style,
}: {
  letter: string;
  name: string;
  description: string;
  recommended?: boolean;
  Style: React.FC<{ practice: string }>;
}) => (
  <div className="rounded-xl border border-border bg-background p-8">
    <div className="flex flex-wrap items-baseline gap-3">
      <span className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
        Style {letter}
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
        <div
          key={p}
          className="flex flex-col items-center gap-3 rounded-lg border border-border/50 p-5"
        >
          <Style practice={p} />
          <p className="text-center text-[11px] font-bold uppercase tracking-[0.14em] text-secondary">
            {p}
          </p>
        </div>
      ))}
    </div>
  </div>
);

const IconLab = () => (
  <Layout>
    <section className="section">
      <div className="container-page">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
          Internal · Icon Lab
        </p>
        <h1 className="mt-4 text-5xl font-bold leading-[1.05]">Icon system exploration</h1>
        <p className="mt-4 max-w-2xl text-base font-light text-muted-foreground">
          Three refined glass-tile variants, all on the TechD palette only —
          primary (cyan), secondary, muted, border, background. No dark slate.
        </p>

        <div className="mt-12 space-y-8">
          <Row
            letter="A"
            name="Light glass — soft cyan halo"
            description="White tile, 1px border, layered cyan glow in opposite corners. Quietest of the three; reads well next to dense card content."
            recommended
            Style={StyleA}
          />
          <Row
            letter="B"
            name="Cyan-tinted glass — primary ring"
            description="Subtle primary tint background with a 1px primary ring and diagonal cyan sweep. Strongest brand presence while staying on white-family palette."
            Style={StyleB}
          />
          <Row
            letter="C"
            name="Mute glass — grid + cyan glow"
            description="White tile with a faint muted-gray grid and a single corner cyan bloom. Architectural feel — useful for technical / engineering surfaces."
            Style={StyleC}
          />
          <Row
            letter="D"
            name="Dark glass — secondary tile + cyan halo"
            description="Dark secondary-gray tile with layered cyan halos in opposite corners. The dark Style A — closest to the Supabase reference while staying strictly on TechD palette."
            Style={StyleD}
          />
          <Row
            letter="E"
            name="Dark gradient — primary ring"
            description="Dark tile with a diagonal cyan sweep, primary ring, and bottom rim highlight. Strongest brand presence; works as a hero accent on dark sections."
            Style={StyleE}
          />
          <Row
            letter="F"
            name="Dark grid — muted lines + cyan bloom"
            description="Dark tile with a faint muted grid and a single cyan corner bloom. Architectural / technical feel — pairs with engineering content on dark surfaces."
            Style={StyleF}
          />
        </div>

        <div className="mt-16 rounded-xl border-2 border-primary/30 bg-primary/[0.03] p-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
            My recommendation
          </p>
          <h2 className="mt-3 text-3xl font-bold">Style A for solution cards</h2>
          <p className="mt-4 max-w-3xl text-base font-light text-secondary">
            <strong>Style A</strong> sits cleanest on the existing solution cards: the white tile
            matches the card surface, the layered cyan halo gives the reference Supabase vibe
            without the heavy dark slate, and the primary glyph keeps brand presence. <strong>Style B</strong> is
            the right choice when an icon needs to anchor a section without a card around it
            (hero eyebrow, "Why TechD"). Reserve <strong>Style C</strong> for technical content surfaces.
          </p>
        </div>

        <p className="mt-12 text-xs font-light text-muted-foreground">
          Temporary internal page · /icon-lab — delete when an icon style is chosen.
        </p>
      </div>
    </section>
  </Layout>
);

export default IconLab;
