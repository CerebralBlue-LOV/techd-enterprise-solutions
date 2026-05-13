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
import { Button } from "@ui/button";
import {
  PORTFOLIO_BY_PRACTICE,
  IBM_AI_OPERATING_MODEL,
  QUICK_START_ADVISORY,
  IBM_PARTNER_DIRECTORY_URL,
} from "@content/about";

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

      {/* Credential block */}
      <section id="credential" className="section scroll-mt-24">
        <SectionMarker page="Company / IBM Partnership" name="Credential" />
        <div className="container-page">
          <Reveal>
            <div className="rounded-xl border border-border p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6 md:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                  IBM Partner Plus
                </p>
                <p className="mt-2 text-2xl md:text-3xl font-bold text-secondary leading-tight">
                  IBM Platinum Business Partner — active since 2009.
                </p>
                <p className="mt-3 text-sm font-light text-muted-foreground leading-relaxed max-w-2xl">
                  Authorized IBM reseller and implementer. Verifiable on the IBM Partner Directory.
                </p>
              </div>
              <a
                href={IBM_PARTNER_DIRECTORY_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 h-12 px-6 rounded-md border border-border text-sm font-bold uppercase tracking-wider text-secondary transition-colors hover:border-primary hover:text-primary self-start md:self-auto whitespace-nowrap"
              >
                Verify on IBM Partner Directory
                <ExternalLink className="h-4 w-4" />
              </a>
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
                <div className="card-hover h-full rounded-xl p-6">
                  <h3 className="text-base font-bold text-secondary leading-tight">{p.title}</h3>
                  <p className="mt-2 text-sm font-light text-muted-foreground leading-relaxed">
                    {p.body}
                  </p>
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
              eyebrow="Practice → product"
              title="Certified across 21 IBM products"
              subtitle="A scannable scope reference for procurement, architecture, and licensing conversations."
            />
          </Reveal>
          <div className="mt-12 space-y-4">
            {PORTFOLIO_BY_PRACTICE.map((row, i) => (
              <Reveal key={row.practice} delay={i * 60}>
                <div className="rounded-xl border border-border p-6 grid gap-5 md:grid-cols-[1fr_2.4fr] md:items-start">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                      Practice
                    </p>
                    <h3 className="mt-2 text-lg font-bold text-secondary leading-tight">
                      {row.practice}
                    </h3>
                    <Link
                      to={row.to}
                      className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-secondary hover:text-primary transition-colors"
                    >
                      See the practice
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                  <ul className="flex flex-wrap gap-2">
                    {row.products.map((p) => (
                      <li
                        key={p}
                        className="rounded-full border border-border px-3 py-1 text-[12px] font-light text-muted-foreground"
                      >
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* IBM AI Operating Model alignment */}
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
          <div className="mt-12 overflow-hidden rounded-xl border border-border">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_2fr] bg-muted/40 text-xs font-bold uppercase tracking-[0.18em] text-secondary">
              <div className="px-5 py-3">IBM pillar</div>
              <div className="px-5 py-3 hidden md:block">TechD stage</div>
              <div className="px-5 py-3 hidden md:block">What we deliver</div>
            </div>
            {IBM_AI_OPERATING_MODEL.map((row) => (
              <div
                key={row.pillar}
                className="grid grid-cols-1 md:grid-cols-[1fr_1fr_2fr] border-t border-border text-sm"
              >
                <div className="px-5 py-4 font-bold text-primary uppercase tracking-[0.18em] text-xs">
                  {row.pillar}
                </div>
                <div className="px-5 py-4 font-bold text-secondary md:py-4">{row.stage}</div>
                <div className="px-5 py-4 font-light text-muted-foreground leading-relaxed">
                  {row.detail}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Start Advisory Services */}
      <section id="quick-start" className="section scroll-mt-24">
        <SectionMarker page="Company / IBM Partnership" name="Quick Start Advisory" />
        <div className="container-page">
          <div className="rounded-xl border border-border p-6 md:p-10 grid gap-8 md:grid-cols-[1.3fr_1fr] items-start">
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
