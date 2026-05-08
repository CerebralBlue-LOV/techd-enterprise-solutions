import Layout from "@layout/Layout";
import SolutionsFigure from "@/components/shared/heroFigures/SolutionsFigure";
import IndustriesFigure from "@/components/shared/heroFigures/IndustriesFigure";
import ServicesFigure from "@/components/shared/heroFigures/ServicesFigure";
import ResourcesFigure from "@/components/shared/heroFigures/ResourcesFigure";
import CompanyFigure from "@/components/shared/heroFigures/CompanyFigure";

/**
 * /figure-lab — internal page to preview each section's hero figure in
 * isolation, on the same engineered grid background used by the hero
 * backdrops. Lets us iterate on each motif without touching real pages.
 */

const GRID_STYLE: React.CSSProperties = {
  backgroundImage:
    "linear-gradient(to right, hsl(var(--border) / 0.55) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--border) / 0.55) 1px, transparent 1px)",
  backgroundSize: "48px 48px",
};

const SLOTS = [
  { label: "Solutions", Figure: SolutionsFigure },
  { label: "Industries", Figure: IndustriesFigure },
  { label: "Services", Figure: ServicesFigure },
  { label: "Resources", Figure: ResourcesFigure },
  { label: "Company", Figure: CompanyFigure },
] as const;

const FigureLab = () => {
  return (
    <Layout>
      <section className="container mx-auto px-6 py-16">
        <header className="mb-10">
          <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
            Internal
          </p>
          <h1 className="mt-2 text-3xl font-bold text-secondary md:text-4xl">
            Figure Lab
          </h1>
          <p className="mt-3 max-w-2xl text-sm font-light text-muted-foreground">
            Hero figures for each top-level section, isolated on the shared
            engineered grid. Each figure lives in its own component so it can
            be iterated independently.
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-2">
          {SLOTS.map(({ label, Figure }) => (
            <article
              key={label}
              className="overflow-hidden rounded-lg border border-border bg-background"
            >
              <div className="flex items-center justify-between border-b border-border px-4 py-2">
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {label}
                </span>
                <code className="text-[10px] text-muted-foreground">
                  {label}Figure
                </code>
              </div>
              <div className="relative aspect-[4/3] w-full" style={GRID_STYLE}>
                <Figure />
              </div>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default FigureLab;
