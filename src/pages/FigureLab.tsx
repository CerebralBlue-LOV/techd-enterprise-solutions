import { Suspense, lazy, useState } from "react";
import Layout from "@layout/Layout";
import SolutionsFigure from "@/components/shared/heroFigures/SolutionsFigure";
import IndustriesFigure from "@/components/shared/heroFigures/IndustriesFigure";
import ServicesFigure from "@/components/shared/heroFigures/ServicesFigure";
import ResourcesFigure from "@/components/shared/heroFigures/ResourcesFigure";
import CompanyFigure from "@/components/shared/heroFigures/CompanyFigure";
import AiGenerativeFigure from "@/components/shared/heroFigures/solutions/AiGenerativeFigure";
import DataAnalyticsFigure from "@/components/shared/heroFigures/solutions/DataAnalyticsFigure";
import AutomationFinOpsFigure from "@/components/shared/heroFigures/solutions/AutomationFinOpsFigure";
import SecurityComplianceFigure from "@/components/shared/heroFigures/solutions/SecurityComplianceFigure";


const ResourceTileStackScene = lazy(
  () => import("@/sections/resources/_components/ResourceTileStackScene"),
);

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
  { label: "Company", Figure: CompanyFigure },
] as const;

const SOLUTION_SLOTS = [
  { label: "AI & Generative", code: "AiGenerativeFigure", Figure: AiGenerativeFigure },
  { label: "Data & Analytics", code: "DataAnalyticsFigure", Figure: DataAnalyticsFigure },
  { label: "Automation & FinOps", code: "AutomationFinOpsFigure", Figure: AutomationFinOpsFigure },
  { label: "Security & Compliance", code: "SecurityComplianceFigure", Figure: SecurityComplianceFigure },
] as const;

type Vec3 = [number, number, number];

interface SliderRowProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}

const SliderRow = ({ label, value, min, max, step, onChange }: SliderRowProps) => (
  <label className="flex items-center gap-3 text-xs">
    <span className="w-10 font-mono uppercase text-muted-foreground">{label}</span>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value))}
      className="flex-1 accent-primary"
    />
    <input
      type="number"
      step={step}
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
      className="w-16 rounded border border-border bg-background px-1 py-0.5 text-right font-mono text-xs"
    />
  </label>
);

const ResourcesTuner = () => {
  const [rot, setRot] = useState<Vec3>([-0.95, -0.6, 0.3]);
  const [pos, setPos] = useState<Vec3>([0, 0.2, -2.5]);

  const setRotI = (i: number, v: number) =>
    setRot(([a, b, c]) => {
      const n: Vec3 = [a, b, c];
      n[i] = v;
      return n;
    });
  const setPosI = (i: number, v: number) =>
    setPos(([a, b, c]) => {
      const n: Vec3 = [a, b, c];
      n[i] = v;
      return n;
    });

  const snippet = `rotation={[${rot.map((n) => n.toFixed(2)).join(", ")}]} position={[${pos
    .map((n) => n.toFixed(2))
    .join(", ")}]}`;

  return (
    <article className="overflow-hidden rounded-lg border border-border bg-background md:col-span-2">
      <div className="flex items-center justify-between border-b border-border px-4 py-2">
        <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Resources — Live Tuner
        </span>
        <code className="text-[10px] text-muted-foreground">ResourcesFigure</code>
      </div>
      <div className="grid gap-4 md:grid-cols-[1.2fr_1fr]">
        <div className="relative aspect-[4/3] w-full" style={GRID_STYLE}>
          <div className="absolute inset-0">
            <Suspense fallback={null}>
              <ResourceTileStackScene
                tiltX={0}
                tiltY={0}
                rotationOverride={rot}
                positionOverride={pos}
              />
            </Suspense>
          </div>
        </div>
        <div className="flex flex-col gap-4 p-4">
          <div>
            <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Rotation (radians)
            </p>
            <div className="space-y-2">
              <SliderRow label="rot X" value={rot[0]} min={-Math.PI} max={Math.PI} step={0.01} onChange={(v) => setRotI(0, v)} />
              <SliderRow label="rot Y" value={rot[1]} min={-Math.PI} max={Math.PI} step={0.01} onChange={(v) => setRotI(1, v)} />
              <SliderRow label="rot Z" value={rot[2]} min={-Math.PI} max={Math.PI} step={0.01} onChange={(v) => setRotI(2, v)} />
            </div>
          </div>
          <div>
            <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Position
            </p>
            <div className="space-y-2">
              <SliderRow label="pos X" value={pos[0]} min={-5} max={5} step={0.05} onChange={(v) => setPosI(0, v)} />
              <SliderRow label="pos Y" value={pos[1]} min={-5} max={5} step={0.05} onChange={(v) => setPosI(1, v)} />
              <SliderRow label="pos Z" value={pos[2]} min={-8} max={5} step={0.05} onChange={(v) => setPosI(2, v)} />
            </div>
          </div>
          <div>
            <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Copy these values
            </p>
            <textarea
              readOnly
              value={snippet}
              onFocus={(e) => e.currentTarget.select()}
              className="h-16 w-full resize-none rounded border border-border bg-background p-2 font-mono text-[11px] text-secondary"
            />
            <button
              type="button"
              onClick={() => navigator.clipboard?.writeText(snippet)}
              className="mt-2 rounded border border-border px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:border-primary hover:text-primary"
            >
              Copy
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

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

        {/* Solutions — per-practice wireframe figures */}
        <section className="mb-16">
          <header className="mb-6">
            <h2 className="text-lg font-bold text-secondary">Solutions — per practice</h2>
            <p className="mt-1 max-w-2xl text-sm font-light text-muted-foreground">
              One figure per solution practice, sharing the same r3f wireframe
              language (cyan edges + additive vertex points, slow rotation).
              Only the geometry changes between practices.
            </p>
          </header>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {SOLUTION_SLOTS.map(({ label, code, Figure }) => (
              <article
                key={label}
                className="overflow-hidden rounded-lg border border-border bg-background"
              >
                <div className="flex items-center justify-between border-b border-border px-4 py-2">
                  <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {label}
                  </span>
                  <code className="text-[10px] text-muted-foreground">{code}</code>
                </div>
                <div className="relative aspect-[4/3] w-full" style={GRID_STYLE}>
                  <Figure />
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="grid gap-8 md:grid-cols-2">
          <ResourcesTuner />
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
          <article className="overflow-hidden rounded-lg border border-border bg-background">
            <div className="flex items-center justify-between border-b border-border px-4 py-2">
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Resources (live)
              </span>
              <code className="text-[10px] text-muted-foreground">ResourcesFigure</code>
            </div>
            <div className="relative aspect-[4/3] w-full" style={GRID_STYLE}>
              <ResourcesFigure />
            </div>
          </article>
        </div>
      </section>
    </Layout>
  );
};

export default FigureLab;
