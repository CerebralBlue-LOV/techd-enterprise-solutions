import Layout from "@layout/Layout";
import SEO from "@seo/SEO";
import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import SectionHeading from "@shared/SectionHeading";
import CompanyFigure from "@shared/heroFigures/CompanyFigure";
import PageHero from "@shared/page/PageHero";
import PageFinalCtaSection from "@shared/page/PageFinalCtaSection";

const SPECIALIZATIONS = [
  {
    label: "Data & AI",
    detail: "watsonx, Db2, Cognos Analytics, Planning Analytics, DataStage, Netezza, SPSS Modeler",
  },
  {
    label: "Security",
    detail: "Guardium, QRadar, Resilient — data protection, threat detection, and incident response",
  },
  {
    label: "Hybrid Cloud",
    detail: "IBM Cloud, Red Hat OpenShift, IBM Z integration and mainframe modernization",
  },
  {
    label: "Automation & FinOps",
    detail: "Apptio, Instana, Turbonomic — observability, cost management, and resource optimization",
  },
];

const WHAT_PLATINUM_MEANS = [
  {
    title: "Direct engineering access",
    body: "Relationships with IBM product engineering teams across watsonx, IBM Z, Red Hat OpenShift, and IBM Security — not just a support line.",
  },
  {
    title: "Early product access",
    body: "Participation in IBM beta programs and pre-release product testing — so our architectures reflect where IBM is going, not just where it's been.",
  },
  {
    title: "Deepest certifications",
    body: "IBM-certified architects and engineers across every practice area — the credential bar required to hold Platinum status.",
  },
  {
    title: "Since 2009",
    body: "Over 15 years as an IBM partner. The track record required to maintain Platinum classification year over year.",
  },
];

const IBMPartnership = () => {
  return (
    <Layout>
      <SEO
        title="IBM Partnership — TechD"
        description="TechD is an IBM Platinum Business Partner — IBM's highest partner classification — with direct access to watsonx, IBM Z, OpenShift, and IBM Security engineering."
      />

      <PageHero
        pageLabel="Company / IBM Partnership"
        parent="Company"
        child="IBM Partnership"
        headline="Platinum. IBM's highest partner classification."
        lede="Direct access to IBM product engineering, early participation in beta programs, and IBM-certified practitioners across every practice area."
        figure={<CompanyFigure />}
      />

      {/* What Platinum means */}
      <section id="what-platinum" className="section">
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

      {/* Practice specializations */}
      <section id="specializations" className="section bg-muted/30">
        <SectionMarker page="Company / IBM Partnership" name="Specializations" />
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Practice specializations"
              title="Certified across the full IBM portfolio"
            />
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {SPECIALIZATIONS.map((s, i) => (
              <Reveal key={s.label} delay={i * 50}>
                <div className="rounded-xl border border-border p-6 h-full">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                    {s.label}
                  </p>
                  <p className="mt-2 text-sm font-light text-muted-foreground leading-relaxed">
                    {s.detail}
                  </p>
                </div>
              </Reveal>
            ))}
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
