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
import ibmLogoWhite from "@/assets/ibm-logo-white.png";
import { Button } from "@ui/button";
import {
  IBM_AI_OPERATING_MODEL,
  QUICK_START_ADVISORY,
  IBM_PARTNER_DIRECTORY_URL,
} from "@content/about";
import { SOLUTIONS } from "@content/solutions";

const WHAT_PLATINUM_MEANS = [
  {
    title: "Direct engineering access",
    body: "Relationships with IBM product engineering across watsonx, Cloud Pak for Data, IBM Z, and IBM Security — not just a support line.",
  },
  {
    title: "Early product access",
    body: "Participation in IBM beta programs and pre-release testing — so the architectures we recommend reflect where IBM is going, not just where it has been.",
  },
  {
    title: "Deepest certifications",
    body: "IBM-certified architects and engineers across all four practices — the credential bar required to hold Platinum status under IBM Partner Plus.",
  },
  {
    title: "Since 2009",
    body: "Over 15 years as an IBM partner. The track record required to maintain IBM's highest tier year over year.",
  },
];

const IBMPartnership = () => {
  const totalProducts = SOLUTIONS.reduce((n, s) => n + s.products.length, 0);


  return (
    <Layout>
      <SEO
        title="IBM Partnership — TechD"
        description="TechD is an IBM Platinum Business Partner under IBM Partner Plus — certified across 21 IBM products spanning AI, data, automation, and security."
      />

      <PageHero
        pageLabel="Company / IBM Partnership"
        parent="Company"
        child="IBM Partnership"
        headline="IBM Platinum Business Partner since 2009."
        lede="The highest commercial tier under IBM Partner Plus. Certified across 21 IBM products spanning AI &amp; Generative, Data &amp; Analytics, Automation &amp; FinOps, and Security &amp; Compliance."
        figure={<CompanyFigure />}
        anchors={[
          { href: "#credential", label: "Credential" },
          { href: "#what-platinum", label: "What Platinum means" },
          { href: "#portfolio", label: "Portfolio" },
          { href: "#operating-model", label: "AI Operating Model" },
          { href: "#quick-start", label: "Quick Start Advisory" },
        ]}
      />

      <div className="border-t border-border" />

      {/* Credential block — dark panel */}
      <section id="credential" className="section scroll-mt-24">
        <SectionMarker page="Company / IBM Partnership" name="Credential" />
        <div className="container-page">
          <Reveal>
            <div
              className="relative overflow-hidden rounded-2xl border border-white/10 p-6 md:p-10"
              style={{
                background:
                  "linear-gradient(160deg, hsl(var(--secondary)) 0%, hsl(var(--secondary) / 0.92) 60%, hsl(220 15% 12%) 100%)",
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
                      Platinum Business Partner — active since 2009.
                    </p>
                    <p className="mt-3 text-sm font-light text-white/70 leading-relaxed max-w-2xl">
                      Authorized IBM reseller and implementer. Verifiable on the IBM Partner Directory.
                    </p>
                  </div>
                </div>
                <a
                  href={IBM_PARTNER_DIRECTORY_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 h-12 px-6 rounded-md border border-white/30 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:border-primary hover:text-primary self-start md:self-auto whitespace-nowrap"
                >
                  Verify on IBM Partner Directory
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* What Platinum means */}
      <section id="what-platinum" className="section bg-muted/30 scroll-mt-24">
        <SectionMarker page="Company / IBM Partnership" name="What Platinum means" />
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="What Platinum means"
              title="IBM's highest partner classification — reserved for the deepest track records"
            />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {WHAT_PLATINUM_MEANS.map((p, i) => (
              <Reveal key={p.title} delay={i * 60}>
                <div className="group relative h-full overflow-hidden rounded-xl border border-border bg-background p-6 transition-colors hover:border-primary/50">
                  <p className="text-[11px] font-bold tracking-[0.18em] text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 text-base font-bold text-secondary leading-tight">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm font-light text-muted-foreground leading-relaxed">
                    {p.body}
                  </p>
                  <span
                    aria-hidden
                    className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary transition-all duration-500 group-hover:w-full"
                  />
                </div>
              </Reveal>
            ))}
          </div>
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
              <span>{PORTFOLIO_BY_PRACTICE.length} solution areas</span>
              <span className="text-border">·</span>
              <span className="text-muted-foreground">Hover any chip for details</span>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {PORTFOLIO_BY_PRACTICE.map((row, i) => (
              <Reveal key={row.practice} delay={i * 60}>
                <div className="group relative h-full overflow-hidden rounded-xl border border-border bg-background p-6 md:p-8 transition-colors duration-300 hover:border-primary/50">
                  {/* Oversized ghost initial backdrop */}
                  <PracticeBadge
                    practice={row.practice}
                    className="pointer-events-none absolute -right-2 -top-6 text-[160px] md:text-[180px] leading-none"
                  />

                  <div className="relative flex h-full flex-col">
                    <p className="text-[11px] font-bold tracking-[0.18em] text-primary">
                      Solution {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-3 text-lg font-bold text-secondary leading-tight">
                      {row.practice}
                    </h3>
                    <p className="mt-1 text-xs font-light text-muted-foreground">
                      {row.products.length} certified products
                    </p>

                    <ul className="mt-5 flex flex-wrap gap-2">
                      {row.products.map((p) => {
                        const meta = productMeta.get(p.toLowerCase());
                        const interactive = !!meta?.tagline || !!meta?.href;
                        const chip = (
                          <span
                            className={cn(
                              "inline-block rounded-full border border-border bg-background px-3 py-1 text-[12px] font-light text-muted-foreground transition-all duration-200",
                              interactive &&
                                "hover:border-primary hover:text-secondary hover:-translate-y-0.5",
                            )}
                          >
                            {p}
                          </span>
                        );
                        const trigger = meta?.href ? (
                          <Link to={meta.href}>{chip}</Link>
                        ) : (
                          chip
                        );
                        return (
                          <li key={p}>
                            {meta?.tagline ? (
                              <HoverCard openDelay={120}>
                                <HoverCardTrigger asChild>{trigger}</HoverCardTrigger>
                                <HoverCardContent className="w-72">
                                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                                    {p}
                                  </p>
                                  <p className="mt-2 text-xs font-light text-muted-foreground leading-relaxed">
                                    {meta.tagline}
                                  </p>
                                  {meta.href && (
                                    <p className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.18em] text-secondary">
                                      Open product
                                      <ArrowRight className="h-3 w-3" />
                                    </p>
                                  )}
                                </HoverCardContent>
                              </HoverCard>
                            ) : (
                              trigger
                            )}
                          </li>
                        );
                      })}
                    </ul>

                    <Link
                      to={row.to}
                      className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-secondary group-hover:text-primary transition-colors"
                    >
                      Explore the solution
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </Link>
                    <span
                      aria-hidden
                      className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary transition-all duration-500 group-hover:w-full"
                    />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* IBM AI Operating Model alignment — horizontal flow */}
      <section id="operating-model" className="section bg-muted/30 scroll-mt-24">
        <SectionMarker page="Company / IBM Partnership" name="AI Operating Model" />
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="IBM Think 2026"
              title="Aligned to the IBM AI Operating Model"
              subtitle="Govern, integrate, orchestrate, automate. We use IBM's framework so client roadmaps share vocabulary with IBM's own field teams."
            />
          </Reveal>
          <div className="mt-12 relative grid gap-6 md:grid-cols-4">
            {/* horizontal connector rail (md+) */}
            <span
              aria-hidden
              className="hidden md:block absolute top-12 left-[8%] right-[8%] h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
            />
            {IBM_AI_OPERATING_MODEL.map((row, i) => (
              <Reveal key={row.pillar} delay={i * 70}>
                <div className="relative h-full rounded-xl border border-border bg-background p-5">
                  <div className="flex items-center gap-3">
                    <span className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border border-primary bg-background text-xs font-bold text-primary">
                      0{i + 1}
                    </span>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                      {row.pillar}
                    </p>
                  </div>
                  <p className="mt-4 text-sm font-bold text-secondary leading-tight">
                    {row.stage}
                  </p>
                  <p className="mt-2 text-xs font-light text-muted-foreground leading-relaxed">
                    {row.detail}
                  </p>
                </div>
              </Reveal>
            ))}
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
        eyebrow="IBM Platinum"
        title="Bring a Platinum partner to your next IBM engagement."
      />
    </Layout>
  );
};

export default IBMPartnership;
