import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import garrettPhoto from "../../assets/garrett-rowe.jpg";
import marcPhoto from "../../assets/marc-martina.jpg";
import Layout from "@layout/Layout";
import SEO from "@seo/SEO";
import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import SectionHeading from "@shared/SectionHeading";
import DarkSection from "@shared/DarkSection";
import CompanyFigure from "@shared/heroFigures/CompanyFigure";
import PageHero from "@shared/page/PageHero";
import PageFinalCtaSection from "@shared/page/PageFinalCtaSection";
import PageApproachSection from "@shared/page/PageApproachSection";
import {
  COMPANY_FACTS,
  PRACTICE_AREAS,
  PORTFOLIO_BY_PRACTICE,
  COMPLIANCE_FRAMEWORKS,
  ENGAGEMENT_STAGES,
  LEADERSHIP,
  WHY_THIS_TEAM,
} from "@content/about";

const LEADER_PHOTOS: Record<string, string> = {
  "Marc Martina": marcPhoto,
  "Garrett Rowe": garrettPhoto,
};

const LEADER_PHOTO_POSITION: Record<string, string> = {
  "Marc Martina": "object-center",
  "Garrett Rowe": "object-top",
};

const VERTICALS = [
  "Financial Services & Insurance",
  "Healthcare & Life Sciences",
  "Manufacturing & Industrials",
  "Higher Education & Research",
  "Media & Entertainment",
  "Energy & Utilities",
  "Public Sector",
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
          { href: "#leadership", label: "Leadership" },
          { href: "#industries", label: "Industries" },
          { href: "#methodology", label: "Methodology" },
        ]}
      />

      <div className="border-t border-border" />

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

              </div>
            </Reveal>

            <div className="grid grid-cols-2 gap-4">
              {COMPANY_FACTS.map((f, i) => (
                <Reveal key={f.label} delay={80 + i * 70}>
                  <div className="group relative overflow-hidden rounded-xl border border-border bg-background px-6 py-5 transition-all duration-300 hover:border-primary/50 hover:shadow-[0_8px_24px_-8px_hsl(var(--primary)/0.2)]">
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-primary/[0.06] to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full motion-reduce:hidden"
                    />
                    <p className="text-2xl md:text-3xl font-bold text-secondary leading-none transition-all duration-300 group-hover:scale-105 group-hover:text-primary">
                      {f.value}
                    </p>
                    <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
                      {f.label}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Four practices */}
      <DarkSection id="practices" className="section scroll-mt-24">
        <SectionMarker page="Company / About" name="Practices" />
        <div className="container-page">
          <Reveal>
            <div className="max-w-3xl">
              <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-primary mb-3">
                Four practices
              </p>
              <h2 className="text-4xl md:text-5xl leading-[1.05] font-bold tracking-tight text-background">
                Where TechD delivers
              </h2>
              <p className="mt-4 text-base font-light text-background/70 leading-relaxed">
                A practitioner team in each practice area, mapped to IBM's AI Operating Model.
              </p>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {PRACTICE_AREAS.map((p, i) => {
              const stack = PORTFOLIO_BY_PRACTICE[i]?.products.slice(0, 3) ?? [];
              return (
                <Reveal key={p.name} delay={i * 60}>
                  <Link
                    to={p.to}
                    className="group relative block h-full overflow-hidden rounded-xl border border-white/10 bg-background/[0.04] backdrop-blur-sm p-6 transition-all duration-300 hover:border-primary/60 hover:shadow-[0_8px_30px_-12px_hsl(var(--primary)/0.55)] hover:-translate-y-0.5"
                  >
                    {/* faint background numeral */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -top-4 -right-2 text-[110px] font-bold leading-none text-background/[0.06] transition-colors group-hover:text-background/[0.10]"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="relative">
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                        Practice 0{i + 1}
                      </p>
                      <h3 className="mt-4 text-xl font-bold text-background leading-tight">
                        {p.name}
                      </h3>
                      <p className="mt-2 text-sm font-light text-background/70 leading-relaxed">
                        {p.description}
                      </p>
                      {stack.length > 0 && (
                        <p className="mt-4 text-[11px] font-light text-background/50">
                          <span className="font-bold uppercase tracking-wider text-background/50">
                            Stack ·{" "}
                          </span>
                          {stack.join(" · ")}
                        </p>
                      )}
                      <p className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-background/70 group-hover:text-primary transition-colors">
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
      </DarkSection>

      {/* Leadership */}
      <section id="leadership" className="section scroll-mt-24">
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
                <div className="group h-full rounded-xl border border-border bg-background overflow-hidden transition-all duration-300 hover:border-primary/40 hover:shadow-[0_16px_48px_-12px_hsl(var(--primary)/0.2)]">
                  {/* Photo header */}
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <img
                      src={LEADER_PHOTOS[l.name]}
                      alt={l.name}
                      className={`h-full w-full object-cover ${LEADER_PHOTO_POSITION[l.name] ?? "object-center"} transition-transform duration-700 ease-out group-hover:scale-105`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                        {l.title}
                      </p>
                      <h3 className="mt-1 text-2xl font-bold text-background leading-tight">
                        {l.name}
                      </h3>
                    </div>
                  </div>
                  {/* Card body */}
                  <div className="p-6">
                    <p className="text-sm font-light text-muted-foreground leading-relaxed">
                      {l.bio}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={160}>
            <div className="mt-8 relative overflow-hidden rounded-xl border border-border bg-muted/30 px-8 py-6">
              <span
                aria-hidden
                className="pointer-events-none absolute -top-6 left-4 text-[96px] leading-none font-bold text-primary/12 select-none"
              >
                "
              </span>
              <p className="relative text-base font-light text-muted-foreground leading-relaxed max-w-3xl">
                {WHY_THIS_TEAM}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Regulated-industry depth */}
      <section id="industries" className="section bg-muted/30 scroll-mt-24">
        <SectionMarker page="Company / About" name="Industries" />
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Regulated-industry depth"
              title="Seven verticals, four compliance frameworks"
              subtitle="We anchor every engagement to the regulatory frame the client already operates inside."
            />
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {COMPLIANCE_FRAMEWORKS.map((f, i) => (
              <Reveal key={f.framework} delay={i * 60}>
                <div className="group relative h-full overflow-hidden rounded-xl border border-border border-l-2 border-l-primary/30 bg-background p-6 transition-all duration-300 hover:border-l-primary hover:shadow-[0_8px_30px_-12px_hsl(var(--primary)/0.2)] hover:-translate-y-0.5">
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -top-3 -right-1 text-[72px] font-bold leading-none text-primary/[0.05] select-none transition-colors duration-300 group-hover:text-primary/[0.10]"
                  >
                    {f.framework}
                  </span>
                  <div className="relative">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                      {f.framework}
                    </p>
                    <p className="mt-2 text-base font-bold text-secondary leading-tight">
                      {f.industry}
                    </p>
                    <p className="mt-3 text-sm font-light text-muted-foreground leading-relaxed">
                      {f.detail}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={160}>
            <div className="mt-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-secondary/60 mb-3">
                Verticals served
              </p>
              <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {VERTICALS.map((v, i) => (
                  <li
                    key={v}
                    className="flex items-center gap-2.5 rounded-lg border border-border bg-background px-3 py-2.5"
                  >
                    <span className="text-[10px] font-bold text-primary/50 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-xs font-light text-muted-foreground leading-tight">
                      {v}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <PageApproachSection
        pageLabel="Company / About"
        id="methodology"
        markerName="Methodology preview"
        eyebrow="How we deliver"
        title="Five engagement stages, one team"
        steps={ENGAGEMENT_STAGES.map((s) => ({ step: s.name, detail: s.detail }))}
        tone="dark"
      />

      <PageFinalCtaSection pageLabel="Company / About" eyebrow="TechD" />
    </Layout>
  );
};

export default About;
