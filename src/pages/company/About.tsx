import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Layout from "@layout/Layout";
import SEO from "@seo/SEO";
import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import SectionHeading from "@shared/SectionHeading";
import CompanyFigure from "@shared/heroFigures/CompanyFigure";
import PageHero from "@shared/page/PageHero";
import PageFinalCtaSection from "@shared/page/PageFinalCtaSection";
import {
  COMPANY_FACTS,
  PRACTICE_AREAS,
  COMPLIANCE_FRAMEWORKS,
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
              <div className="space-y-5 text-base font-light text-muted-foreground leading-relaxed">
                <p>
                  We founded TechD in 2009 to deliver IBM analytics implementations directly,
                  without the overhead of a generalist systems integrator. Marc Martina started
                  the firm as a Cognos and TM1 specialist practice in Miami, FL.
                </p>
                <p>
                  Seventeen years later, we operate as an IBM Platinum Business Partner under
                  IBM Partner Plus — IBM's highest commercial tier — with practitioners certified
                  across the full watsonx, data, automation, and security portfolio.
                </p>
                <p>
                  Headquartered in Miami, FL. Delivery teams distributed across the United States
                  and Canada.
                </p>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className="grid grid-cols-2 gap-4">
                {COMPANY_FACTS.map((f) => (
                  <div key={f.label} className="rounded-xl border border-border p-5">
                    <p className="text-2xl font-bold text-primary leading-none">{f.value}</p>
                    <p className="mt-1.5 text-xs font-light text-muted-foreground">{f.label}</p>
                  </div>
                ))}
              </div>
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
            {PRACTICE_AREAS.map((p, i) => (
              <Reveal key={p.name} delay={i * 60}>
                <Link
                  to={p.to}
                  className="group block h-full rounded-xl border border-border bg-background p-6 transition-colors hover:border-primary"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                    Practice
                  </p>
                  <h3 className="mt-3 text-xl font-bold text-secondary leading-tight">
                    {p.name}
                  </h3>
                  <p className="mt-2 text-sm font-light text-muted-foreground leading-relaxed">
                    {p.description}
                  </p>
                  <p className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-secondary group-hover:text-primary transition-colors">
                    See the practice
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </p>
                </Link>
              </Reveal>
            ))}
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
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {COMPLIANCE_FRAMEWORKS.map((f, i) => (
              <Reveal key={f.framework} delay={i * 50}>
                <div className="rounded-xl border border-border p-6 h-full">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                    {f.framework}
                  </p>
                  <p className="mt-2 text-sm font-bold text-secondary">{f.industry}</p>
                  <p className="mt-2 text-sm font-light text-muted-foreground leading-relaxed">
                    {f.detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={120}>
            <p className="mt-8 text-sm font-light text-muted-foreground">
              Verticals served: Healthcare &amp; Life Sciences · Insurance · Public Sector ·
              Media &amp; Entertainment · Higher Education · Energy &amp; Utilities.
            </p>
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
                <div className="card-hover h-full rounded-xl border border-border bg-background p-6">
                  <div className="flex items-start gap-4">
                    <div
                      aria-hidden
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-border bg-muted/40 text-base font-bold tracking-wider text-secondary"
                    >
                      {initials(l.name)}
                    </div>
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
                  <ul className="mt-5 flex flex-wrap gap-2">
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
          <div className="grid gap-8 md:grid-cols-[1.2fr_1fr] items-start">
            <Reveal>
              <SectionHeading
                eyebrow="How we deliver"
                title="Five engagement stages, one team"
                subtitle="Advisory Assessment → Architecture Design → Implementation → Knowledge Transfer → Post-Go-Live Support. The same certified practitioners run every stage."
              />
            </Reveal>
            <Reveal delay={80}>
              <div className="rounded-xl border border-border p-6">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                  Read the full methodology
                </p>
                <p className="mt-3 text-sm font-light text-muted-foreground leading-relaxed">
                  Engagement stages, IBM Platform Assessment scope, regulated-industry depth, and
                  our same-practitioners commitment.
                </p>
                <Link
                  to="/company/delivery-methodology"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-[0.18em] text-secondary hover:text-primary transition-colors"
                >
                  Delivery methodology
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <PageFinalCtaSection pageLabel="Company / About" eyebrow="TechD" />
    </Layout>
  );
};

export default About;
