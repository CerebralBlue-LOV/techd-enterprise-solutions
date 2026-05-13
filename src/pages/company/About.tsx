import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, GitBranch, Hammer, Brain } from "lucide-react";
import Layout from "@layout/Layout";
import SEO from "@seo/SEO";
import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import SectionHeading from "@shared/SectionHeading";
import CompanyFigure from "@shared/heroFigures/CompanyFigure";
import PageHero from "@shared/page/PageHero";
import PageFinalCtaSection from "@shared/page/PageFinalCtaSection";
import StatBand from "@shared/StatBand";
import StepFlow from "@shared/StepFlow";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@ui/tabs";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@ui/hover-card";
import {
  COMPANY_FACTS,
  PRACTICE_AREAS,
  PORTFOLIO_BY_PRACTICE,
  COMPLIANCE_FRAMEWORKS,
  ENGAGEMENT_STAGES,
  LEADERSHIP,
  WHY_THIS_TEAM,
} from "@content/about";

const initials = (name: string) =>
  name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const PRACTICE_ICONS = [Brain, GitBranch, Hammer, ShieldCheck];

const VERTICALS = [
  "Healthcare & Life Sciences",
  "Insurance",
  "Public Sector",
  "Media & Entertainment",
  "Higher Education",
  "Energy & Utilities",
];

const TIMELINE = [
  { year: "2009", note: "Founded in Miami" },
  { year: "2017", note: "Expanded to full IBM data & AI portfolio" },
  { year: "Today", note: "IBM Platinum, US & Canada delivery" },
];

const About = () => {
  return (
    <Layout>
      <SEO
        title="About — TechD"
        description="Founded 2009 in Miami. IBM Platinum Business Partner delivering AI, data, automation, and security across regulated US and Canadian enterprises."
      />

      <PageHero
        pageLabel="Company / About"
        parent="Company"
        child="About"
        headline="An IBM Platinum partner built for regulated enterprise delivery."
        lede="Founded 2009 in Miami. Practitioner-led across the full watsonx, data, automation, and security portfolio — for healthcare, insurance, public sector, media, higher education, and energy clients."
        figure={<CompanyFigure />}
        anchors={[
          { href: "#story", label: "Story" },
          { href: "#practices", label: "Practices" },
          { href: "#industries", label: "Industries" },
          { href: "#leadership", label: "Leadership" },
          { href: "#methodology", label: "Methodology" },
        ]}
      />

      {/* Founding story */}
      <section id="story" className="section scroll-mt-24">
        <SectionMarker page="Company / About" name="Story" />
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] items-start">
            <Reveal>
              <div className="relative pl-6 md:pl-8">
                {/* timeline rail */}
                <span
                  aria-hidden
                  className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-primary/60 via-border to-transparent"
                />
                <div className="space-y-5 text-base font-light text-muted-foreground leading-relaxed">
                  <p>
                    We founded TechD in 2009 to deliver IBM analytics implementations
                    directly, without the overhead of a generalist systems integrator. Marc
                    Martina started the firm as a Cognos and TM1 specialist practice in
                    Miami, FL.
                  </p>
                  <p>
                    Seventeen years later, we operate as an IBM Platinum Business Partner
                    under IBM Partner Plus — IBM's highest commercial tier — with
                    practitioners certified across the full watsonx, data, automation, and
                    security portfolio.
                  </p>
                  <p>
                    Headquartered in Miami, FL. Delivery teams distributed across the
                    United States and Canada.
                  </p>
                </div>

                <ul className="mt-8 flex flex-wrap gap-2">
                  {TIMELINE.map((t) => (
                    <li
                      key={t.year}
                      className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-[11px] font-light text-muted-foreground"
                    >
                      <span className="font-bold tracking-wider text-primary">
                        {t.year}
                      </span>
                      <span className="text-secondary/70">·</span>
                      <span>{t.note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <StatBand items={COMPANY_FACTS.map((f) => ({ value: f.value, label: f.label }))} className="grid-cols-2 lg:grid-cols-2 sm:grid-cols-2" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Four practices */}
      <section id="practices" className="section bg-muted/30 scroll-mt-24">
        <SectionMarker page="Company / About" name="Practices" />
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Four practices"
              title="Where TechD delivers"
              subtitle="A practitioner team in each practice area, mapped to IBM's AI Operating Model."
            />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {PRACTICE_AREAS.map((p, i) => {
              const Icon = PRACTICE_ICONS[i] ?? Brain;
              const stack = PORTFOLIO_BY_PRACTICE[i]?.products.slice(0, 3) ?? [];
              return (
                <Reveal key={p.name} delay={i * 60}>
                  <Link
                    to={p.to}
                    className="group relative block h-full overflow-hidden rounded-xl border border-border bg-background p-6 transition-all duration-300 hover:border-primary/60 hover:shadow-[0_8px_30px_-12px_hsl(var(--primary)/0.25)] hover:-translate-y-0.5"
                  >
                    {/* faint background numeral */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -top-4 -right-2 text-[110px] font-bold leading-none text-primary/[0.06] transition-colors group-hover:text-primary/[0.10]"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="relative">
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-primary transition-colors group-hover:border-primary/60">
                          <Icon className="h-4 w-4" />
                        </span>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                          Practice 0{i + 1}
                        </p>
                      </div>
                      <h3 className="mt-4 text-xl font-bold text-secondary leading-tight">
                        {p.name}
                      </h3>
                      <p className="mt-2 text-sm font-light text-muted-foreground leading-relaxed">
                        {p.description}
                      </p>
                      {stack.length > 0 && (
                        <p className="mt-4 text-[11px] font-light text-muted-foreground/80">
                          <span className="font-bold uppercase tracking-wider text-secondary/70">
                            Stack ·{" "}
                          </span>
                          {stack.join(" · ")}
                        </p>
                      )}
                      <p className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-secondary group-hover:text-primary transition-colors">
                        See the practice
                        <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                      </p>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Regulated-industry depth */}
      <section id="industries" className="section scroll-mt-24">
        <SectionMarker page="Company / About" name="Industries" />
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Regulated-industry depth"
              title="Six verticals, four compliance frameworks"
              subtitle="We anchor every engagement to the regulatory frame the client already operates inside."
            />
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-12">
              <Tabs defaultValue={COMPLIANCE_FRAMEWORKS[0].framework}>
                <TabsList className="h-auto flex-wrap gap-2 bg-transparent p-0 justify-start">
                  {COMPLIANCE_FRAMEWORKS.map((f) => (
                    <TabsTrigger
                      key={f.framework}
                      value={f.framework}
                      className="rounded-full border border-border px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-secondary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:border-primary"
                    >
                      {f.framework}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {COMPLIANCE_FRAMEWORKS.map((f) => (
                  <TabsContent key={f.framework} value={f.framework} className="mt-6">
                    <div className="rounded-xl border border-border p-6 md:p-8">
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                        {f.industry}
                      </p>
                      <p className="mt-3 text-base md:text-lg font-light text-muted-foreground leading-relaxed max-w-3xl">
                        {f.detail}
                      </p>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div className="mt-10">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-secondary/70">
                Verticals served
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {VERTICALS.map((v) => (
                  <li
                    key={v}
                    className="rounded-full border border-border px-3 py-1.5 text-xs font-light text-muted-foreground"
                  >
                    {v}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Leadership */}
      <section id="leadership" className="section bg-muted/30 scroll-mt-24">
        <SectionMarker page="Company / About" name="Leadership" />
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Leadership"
              title="The team behind the work"
              subtitle="Two leaders, both ends of every IBM engagement."
            />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {LEADERSHIP.map((l, i) => (
              <Reveal key={l.name} delay={i * 80}>
                <div className="group h-full rounded-xl border border-border bg-background p-6 transition-colors hover:border-primary/40">
                  <div className="flex items-start gap-4">
                    <HoverCard openDelay={120}>
                      <HoverCardTrigger asChild>
                        <button
                          type="button"
                          aria-label={`More about ${l.name}`}
                          className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-border bg-muted/40 text-base font-bold tracking-wider text-secondary outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        >
                          <span
                            aria-hidden
                            className="pointer-events-none absolute -inset-[2px] rounded-full bg-gradient-to-br from-primary/60 via-primary/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
                          />
                          <span className="relative">{initials(l.name)}</span>
                        </button>
                      </HoverCardTrigger>
                      <HoverCardContent align="start" className="w-80">
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                          {l.title}
                        </p>
                        <p className="mt-2 text-sm font-bold text-secondary">{l.name}</p>
                        <p className="mt-2 text-xs font-light text-muted-foreground leading-relaxed">
                          {l.bio}
                        </p>
                      </HoverCardContent>
                    </HoverCard>
                    <div>
                      <h3 className="text-lg font-bold text-secondary leading-tight">
                        {l.name}
                      </h3>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary mt-1">
                        {l.title}
                      </p>
                    </div>
                  </div>
                  <p className="mt-5 text-sm font-light text-muted-foreground leading-relaxed">
                    {l.bio}
                  </p>
                  <div className="mt-5 border-t border-border pt-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-secondary/60 mb-2.5">
                      Domains
                    </p>
                    <ul className="flex flex-wrap gap-2">
                      {l.domains.map((d) => (
                        <li
                          key={d}
                          className="rounded-full border border-border px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-secondary"
                        >
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={160}>
            <p className="mt-10 max-w-3xl text-base font-light text-muted-foreground leading-relaxed">
              {WHY_THIS_TEAM}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Methodology preview */}
      <section id="methodology" className="section scroll-mt-24">
        <SectionMarker page="Company / About" name="Methodology preview" />
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="How we deliver"
              title="Five engagement stages, one team"
              subtitle="The same certified practitioners run every stage — advisory through go-live."
            />
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-12 rounded-xl border border-border p-6 md:p-8">
              <StepFlow
                steps={ENGAGEMENT_STAGES.map((s) => ({ label: s.name }))}
              />
              <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-border pt-6">
                <p className="text-sm font-light text-muted-foreground max-w-xl">
                  Engagement stages, IBM Platform Assessment scope, regulated-industry
                  depth, and our same-practitioners commitment.
                </p>
                <Link
                  to="/company/delivery-methodology"
                  className="inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-[0.18em] text-secondary hover:text-primary transition-colors whitespace-nowrap"
                >
                  Read the full methodology
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <PageFinalCtaSection pageLabel="Company / About" eyebrow="TechD" />
    </Layout>
  );
};

export default About;
