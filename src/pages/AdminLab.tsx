import { Link } from "react-router-dom";
import { ArrowUpRight, FlaskConical, ImageOff } from "lucide-react";
import Layout from "@layout/Layout";

const LAB_ROUTES = [
  {
    path: "/section-lab",
    name: "Section Lab",
    blurb:
      '7 visual variants for the per-industry "Solutions in this industry" section, rendered with Healthcare data.',
  },
  {
    path: "/figure-lab",
    name: "Figure Lab",
    blurb:
      "3D scene / figure prototypes used in hero sections — industry cubes, practice wireframes, resource stacks.",
  },
  {
    path: "/logo-lab",
    name: "Logo Lab",
    blurb:
      "Customer logo QA tool — drag to reorder, pick size presets, export diff back to site.ts.",
  },
];

const DEPRECATED_LOGOS = [
  "burlington.png",
  "chop.png",
  "comcast-peacock.svg",
  "corning.png",
  "dhs.svg",
  "dominion-energy.png",
  "genesis-healthcare.png",
  "hamilton-beach.png",
  "jefferson-health.png",
  "johns-hopkins.png",
  "johnson-and-johnson.png",
  "kennedy-center.png",
  "kenseal.png",
  "l3harris.png",
  "miso-energy.png",
  "national-general.png",
  "princeton-university.png",
  "pure-insurance.png",
  "sony-interactive.svg",
  "sony-pictures.png",
  "temple-health.png",
  "vcu.png",
  "white-cap.png",
];

const AdminLab = () => (
  <Layout>
    {/* Header */}
    <div className="container-page pt-12 pb-6">
      <p className="eyebrow">Internal · Admin Lab</p>
      <h1 className="mt-3 text-4xl md:text-5xl font-bold text-secondary tracking-tight">
        Admin Lab
      </h1>
      <p className="mt-4 max-w-2xl text-muted-foreground font-light">
        Internal hub for design labs and orphaned assets. Not linked in navigation — accessible
        at <code className="text-xs bg-muted px-1.5 py-0.5 rounded">/admin-lab</code>.
      </p>
    </div>

    {/* ── Lab pages ── */}
    <section className="border-t border-border">
      <div className="container-page py-10">
        <div className="flex items-center gap-3 mb-6">
          <FlaskConical className="size-4 text-primary" />
          <h2 className="text-xl font-bold text-secondary">Lab pages</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {LAB_ROUTES.map((lab) => (
            <Link
              key={lab.path}
              to={lab.path}
              className="group flex flex-col gap-2 rounded-xl border border-border bg-background p-6 transition-all hover:border-primary/40 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-12px_hsl(var(--primary)/0.2)]"
            >
              <div className="flex items-start justify-between">
                <span className="text-base font-bold text-secondary group-hover:text-primary transition-colors">
                  {lab.name}
                </span>
                <ArrowUpRight className="size-4 text-muted-foreground transition-all group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0 mt-0.5" />
              </div>
              <p className="text-sm font-light text-muted-foreground leading-relaxed">
                {lab.blurb}
              </p>
              <code className="mt-1 text-xs text-muted-foreground">{lab.path}</code>
            </Link>
          ))}
        </div>
      </div>
    </section>

    {/* ── Deprecated logos ── */}
    <section className="border-t border-border">
      <div className="container-page py-10">
        <div className="flex items-center gap-3 mb-2">
          <ImageOff className="size-4 text-primary" />
          <h2 className="text-xl font-bold text-secondary">Deprecated logos</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-6 max-w-2xl">
          Logos moved to{" "}
          <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
            public/logos/deprecated/
          </code>
          . Not referenced in{" "}
          <code className="text-xs bg-muted px-1.5 py-0.5 rounded">site.ts</code> and not
          displayed in LogoStrip. Keep until PM confirms they can be removed from the repo.
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {DEPRECATED_LOGOS.map((file) => {
            const name = file.replace(/\.[^.]+$/, "").replace(/-/g, " ");
            return (
              <div
                key={file}
                className="flex flex-col items-center gap-2 rounded-lg border border-border bg-muted/20 p-4"
              >
                <div className="flex h-12 w-full items-center justify-center">
                  <img
                    src={`/techd-enterprise-solutions/logos/deprecated/${file}`}
                    alt={name}
                    className="max-h-10 max-w-full object-contain opacity-50 grayscale"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
                <span className="text-center text-[10px] text-muted-foreground capitalize leading-tight">
                  {name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>

    <div className="container-page py-16" />
  </Layout>
);

export default AdminLab;
