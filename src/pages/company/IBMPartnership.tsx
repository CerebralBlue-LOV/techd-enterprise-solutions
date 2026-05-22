import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";
import Layout from "@layout/Layout";
import SEO from "@seo/SEO";
import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import SectionHeading from "@shared/SectionHeading";
import CompanyFigure from "@shared/heroFigures/CompanyFigure";
import PageHero from "@shared/page/PageHero";
import PageFinalCtaSection from "@shared/page/PageFinalCtaSection";
import PracticeStaticMotif, { initialsFor } from "@shared/PracticeStaticMotif";
import FlipCard from "@sections/home/_components/FlipCard";
import ibmLogoWhite from "@/assets/brand/ibm-logo-white.png";
import { Button } from "@ui/button";
import {
  IBM_AI_OPERATING_MODEL,
  QUICK_START_ADVISORY,
  IBM_PARTNER_DIRECTORY_URL,
} from "@content/about";
import { SOLUTIONS } from "@content/solutions";

const WHAT_GOLD_MEANS = [
  {
    title: "IBM-certified practitioners",
    body: "Certified architects and engineers across all four practices — watsonx, Cloud Pak for Data, IBM Z, and IBM Security — current on the platforms they deliver.",
  },
  {
    title: "Cross-product integration depth",
    body: "We deliver across the IBM stack — AI, data, automation, and security — so your architecture decisions hold together end to end, not just inside a single product silo.",
  },
  {
    title: "Regulated-industry track record",
    body: "Delivery patterns proven in HIPAA, FedRAMP, PCI-DSS, and NERC-CIP environments — where access controls and audit trails aren't optional features.",
  },
  {
    title: "Since 2009",
    body: "Over 15 years as an IBM partner. The continuity that lets us run platforms through budget cycles, IBM release waves, and organizational change.",
  },
];

const IBMPartnership = () => {
  const totalProducts = SOLUTIONS.reduce((n, s) => n + s.products.length, 0);


  return (
    <Layout>
      <SEO
        title="IBM Partnership — TechD"
        description="TechD is an IBM Gold Business Partner under IBM Partner Plus — certified across 21 IBM products spanning AI, data, automation, and security."
      />

      <PageHero
        pageLabel="Company / IBM Partnership"
        parent="Company"
        child="IBM Partnership"
        headline="IBM Gold Business Partner since 2009."
        lede="An IBM Partner Plus tier we have held through 15+ years of continuous delivery. Certified across 21 IBM products spanning AI &amp; Generative, Data &amp; Analytics, Automation &amp; FinOps, and Security &amp; Compliance."
        figure={<CompanyFigure />}
        primaryCta={{ label: "Talk to an expert", to: "/contact" }}
        anchors={[
          { href: "#credentials", label: "Credential" },
          { href: "#what-gold", label: "What Gold means" },
          { href: "#portfolio", label: "Portfolio" },
          { href: "#operating-model", label: "AI Operating Model" },
          { href: "#quick-start", label: "Quick Start Advisory" },
          { href: "#cta", label: "Contact" },
        ]}
      />

      <div className="border-t border-border" />

      {/* Credential block — dark panel */}
      <section id="credentials" className="section scroll-mt-24">
        <SectionMarker page="Company / IBM Partnership" name="Credential" />
        <div className="container-page">
          <Reveal>
            <div
              className="relative overflow-hidden rounded-2xl border border-white/10 p-6 md:p-10"
              style={{
                background:
                  "linear-gradient(160deg, hsl(var(--surface-dark)) 0%, hsl(var(--surface-dark) / 0.92) 60%, hsl(var(--surface-dark-deep)) 100%)",
              }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -top-1/2 -right-1/3 h-[120%] w-[80%] rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, hsl(var(--primary) / 0.35) 0%, transparent 60%)",
                  filter: "blur(80px)",
                }}
              />
              <div className="relative flex flex-col md:flex-row md:items-center gap-6 md:justify-between">
                <div className="flex items-center gap-5">
                  <div className="grid place-items-center rounded-md bg-white shrink-0 h-12 w-16 px-2">
                    <img src={ibmLogoWhite} alt="IBM" className="h-full w-full object-contain invert" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                      IBM Partner Plus
                    </p>
                    <p className="mt-2 text-2xl md:text-3xl font-bold text-white leading-tight">
                      Gold Business Partner — active since 2009.
                    </p>
                    <p className="mt-3 text-sm font-light text-white/70 leading-relaxed max-w-2xl">
                      Authorized IBM reseller and implementer. Verifiable on the IBM Partner Directory.
                    </p>
                    <p className="mt-2 text-xs font-light text-white/50 leading-relaxed max-w-2xl">
                      IBM partner since 2009 — held Platinum tier prior to IBM&apos;s 2024 Partner Plus criteria update.
                    </p>
                  </div>
                </div>
                <a
                  href={IBM_PARTNER_DIRECTORY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 h-12 px-6 rounded-md border border-white/30 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:border-primary hover:text-primary self-start md:self-auto whitespace-nowrap"
                >
                  Verify on IBM Partner Directory
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
              <div className="relative mt-8 pt-6 border-t border-white/10 grid grid-cols-3 gap-4">
                {[
                  { value: "21", label: "IBM products" },
                  { value: "4", label: "Practices" },
                  { value: "15+", label: "Years delivering" },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="text-2xl md:text-3xl font-bold text-white">{s.value}</p>
                    <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.18em] text-white/60">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* What Gold means */}
      <section id="what-gold" className="section bg-muted/30 scroll-mt-24">
        <SectionMarker page="Company / IBM Partnership" name="What Gold means" />
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="What Gold means"
              title="An IBM Partner Plus tier backed by certified practitioners and 15+ years of continuous IBM delivery"
            />
          </Reveal>
          <ol className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {WHAT_GOLD_MEANS.map((p, i) => {
              const num = String(i + 1).padStart(2, "0");
              return (
                <Reveal key={p.title} delay={i * 80}>
                  <li className="group relative h-full flex flex-col rounded-2xl border border-border bg-background p-7 overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-[0_18px_40px_-18px_hsl(var(--primary)/0.4)]">
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -top-4 -right-2 text-[7rem] leading-none font-bold tracking-tighter select-none text-primary/[0.06] transition-all duration-700 ease-out group-hover:-translate-y-1 group-hover:scale-105 group-hover:text-primary/[0.12]"
                    >
                      {num}
                    </span>

                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-br from-transparent via-primary/[0.06] to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full motion-reduce:hidden"
                    />

                    <div className="relative flex items-center gap-3">
                      <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
                        {num}
                      </span>
                      <span
                        aria-hidden
                        className="relative h-px flex-1 overflow-hidden bg-border"
                      >
                        <span className="absolute inset-y-0 left-0 w-0 bg-primary transition-[width] duration-700 ease-out group-hover:w-full" />
                      </span>
                    </div>

                    <h3 className="relative mt-5 text-xl md:text-2xl font-bold leading-tight tracking-tight text-secondary transition-transform duration-500 group-hover:translate-x-0.5">
                      {p.title}
                    </h3>

                    <p className="relative mt-3 text-sm font-light leading-relaxed text-muted-foreground">
                      {p.body}
                    </p>
                  </li>
                </Reveal>
              );
            })}
          </ol>

        </div>
      </section>

      {/* Practice → product grid */}
      <section id="portfolio" className="section scroll-mt-24">
        <SectionMarker page="Company / IBM Partnership" name="Portfolio" />
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Solutions → products"
              title={`Certified across ${totalProducts} IBM products`}
              subtitle="A scannable scope reference for procurement, architecture, and licensing conversations."
            />
          </Reveal>

          <Reveal delay={60}>
            <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-border px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-secondary">
              <span className="text-primary">{totalProducts} products</span>
              <span className="text-border">·</span>
              <span>{SOLUTIONS.length} solution areas</span>
              <span className="text-border">·</span>
              <span className="text-muted-foreground">Hover any card to flip</span>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {SOLUTIONS.map((sol, i) => {
              const CAP = 6;
              const all = sol.products.map((p) => ({
                label: p.name,
                to:
                  p.link.kind === "internal"
                    ? `/solutions/${sol.id}/${p.link.slug}`
                    : p.link.url,
                external: p.link.kind === "external",
              }));
              const chips =
                all.length <= CAP
                  ? all
                  : [
                      ...all.slice(0, CAP),
                      { label: `+${all.length - CAP} more`, to: `/solutions/${sol.id}` },
                    ];
              return (
                <Reveal key={sol.id} delay={i * 60}>
                  <FlipCard
                    compact
                    to={`/solutions/${sol.id}`}
                    eyebrow={sol.name}
                    title={sol.outcome}
                    footer={`${sol.products.length} IBM-certified products`}
                    backTitle={sol.outcome}
                    backBody={sol.pitch}
                    chips={chips}
                    ctaLabel={sol.ctaLabel}
                    motif={<PracticeStaticMotif initials={initialsFor(sol.name)} />}
                  />
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* IBM AI Operating Model alignment */}
      <section id="operating-model" className="section bg-muted/30 scroll-mt-24">
        <SectionMarker page="Company / IBM Partnership" name="AI Operating Model" />
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-16 items-start">
            {/* Left: editorial framing */}
            <Reveal>
              <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                <span className="h-px w-8 bg-primary" />
                Announced at IBM Think 2026
              </p>
              <h2 className="mt-5 text-3xl md:text-4xl font-bold text-secondary leading-[1.1]">
                The same four words IBM uses{" "}
                <span className="text-primary">to scope enterprise AI.</span>
              </h2>
              <p className="mt-5 text-base font-light text-muted-foreground leading-relaxed">
                Govern. Integrate. Orchestrate. Automate. IBM's 2026 operating model is the
                vocabulary their field teams, product roadmaps, and procurement motions now run on.
              </p>
              <p className="mt-4 text-base font-light text-muted-foreground leading-relaxed">
                We mapped every TechD engagement stage to it — so when you brief your IBM account
                team on what we're building, the framing already matches the deck they're reading
                from internally.
              </p>
              <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-border pt-6">
                <div>
                  <dt className="text-3xl font-bold text-secondary tracking-tight">4</dt>
                  <dd className="mt-1 text-xs font-light uppercase tracking-[0.12em] text-muted-foreground">
                    IBM pillars mapped
                  </dd>
                </div>
                <div>
                  <dt className="text-3xl font-bold text-secondary tracking-tight">5</dt>
                  <dd className="mt-1 text-xs font-light uppercase tracking-[0.12em] text-muted-foreground">
                    TechD delivery stages
                  </dd>
                </div>
              </dl>
            </Reveal>

            {/* Right: paired mapping rows — IBM pillar → TechD stage */}
            <ol className="space-y-3">
              {IBM_AI_OPERATING_MODEL.map((row, i) => (
                <Reveal key={row.pillar} delay={i * 60}>
                  <li className="group relative grid grid-cols-1 md:grid-cols-[1fr_auto_1.4fr] items-stretch gap-3 md:gap-0 rounded-xl border border-border bg-background overflow-hidden hover:border-primary/40 transition-colors">
                    {/* IBM pillar */}
                    <div className="flex items-center gap-4 p-5 md:p-6 bg-secondary/[0.02]">
                      <span className="font-mono text-xs text-primary/70 tracking-tighter">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                          IBM pillar
                        </p>
                        <p className="mt-1 text-lg font-bold text-secondary leading-none">
                          {row.pillar}
                        </p>
                      </div>
                    </div>
                    {/* Connector */}
                    <div className="hidden md:flex items-center justify-center px-2 text-primary/60">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                    {/* TechD stage */}
                    <div className="p-5 md:p-6 border-t md:border-t-0 md:border-l border-dashed border-border">
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
                        TechD · {row.stage}
                      </p>
                      <p className="mt-2 text-sm font-light text-muted-foreground leading-relaxed">
                        {row.detail}
                      </p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Quick Start Advisory Services */}
      <section id="quick-start" className="section scroll-mt-24">
        <SectionMarker page="Company / IBM Partnership" name="Quick Start Advisory" />
        <div className="container-page">
          <div className="relative overflow-hidden rounded-xl border border-border p-6 md:p-10 grid gap-8 md:grid-cols-[1.3fr_1fr] items-start">
            <span
              aria-hidden
              className="pointer-events-none absolute -bottom-1/3 -right-1/4 h-[80%] w-[60%] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, hsl(var(--primary) / 0.10) 0%, transparent 65%)",
                filter: "blur(60px)",
              }}
            />
            <Reveal>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                Named offer
              </p>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold text-secondary leading-tight">
                {QUICK_START_ADVISORY.name}
              </h2>
              <p className="mt-4 text-base font-light text-muted-foreground leading-relaxed">
                {QUICK_START_ADVISORY.scope}
              </p>
              <Button asChild className="btn-glow mt-6 h-12 px-6">
                <Link to={QUICK_START_ADVISORY.ctaTo}>
                  {QUICK_START_ADVISORY.ctaLabel}
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </Reveal>
            <Reveal delay={80}>
              <dl className="space-y-5 text-sm">
                <div>
                  <dt className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                    Target
                  </dt>
                  <dd className="mt-1.5 font-light text-muted-foreground leading-relaxed">
                    {QUICK_START_ADVISORY.target}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                    Format
                  </dt>
                  <dd className="mt-1.5 font-light text-muted-foreground leading-relaxed">
                    {QUICK_START_ADVISORY.format}
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      <PageFinalCtaSection
        pageLabel="Company / IBM Partnership"
        eyebrow="IBM Gold"
        title="Bring a Gold-tier IBM partner to your next engagement."
      />
    </Layout>
  );
};

export default IBMPartnership;
