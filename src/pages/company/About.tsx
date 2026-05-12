import Layout from "@layout/Layout";
import SEO from "@seo/SEO";
import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import SectionHeading from "@shared/SectionHeading";
import CompanyFigure from "@shared/heroFigures/CompanyFigure";
import PageHero from "@shared/page/PageHero";
import PageFinalCtaSection from "@shared/page/PageFinalCtaSection";

const LEADERSHIP = [
  {
    title: "Founder & President",
    body: "Co-founded TechD in 2009. 15+ years of IBM Cognos, TM1, and enterprise data warehousing delivery.",
  },
  {
    title: "VP of AI & Managing Partner",
    body: "Joined TechD after 15 years at IBM in Data & AI sales and engineering. AI practice lead.",
  },
  {
    title: "VP of Delivery",
    body: "Oversees implementation and managed services delivery across all client engagements.",
  },
];

const FACTS = [
  { value: "2009", label: "Founded" },
  { value: "Platinum", label: "IBM partner tier" },
  { value: "Miami, FL", label: "Headquarters" },
  { value: "US & Canada", label: "Delivery footprint" },
];

const About = () => {
  return (
    <Layout>
      <SEO
        title="About — TechD"
        description="Designing, building, and running AI, data, and hybrid cloud systems for Fortune 500 enterprises since 2009."
      />

      <PageHero
        pageLabel="Company / About"
        parent="Company"
        child="About"
        headline="IBM's partner for regulated enterprise delivery."
        lede="Designing, building, and running AI, data, and hybrid cloud systems for Fortune 500 enterprises since 2009."
        figure={<CompanyFigure />}
      />

      {/* Company description */}
      <section id="story" className="section">
        <SectionMarker page="Company / About" name="Story" />
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] items-start">
            <Reveal>
              <div className="space-y-5 text-base font-light text-muted-foreground leading-relaxed">
                <p>
                  TechD has helped Fortune 500 organizations turn data into trustworthy AI since 2009. We design, build, and run secure AI, data, and hybrid cloud systems for healthcare, media, energy, insurance, and public sector enterprises — on IBM watsonx, Db2, and the open stack around them.
                </p>
                <p>
                  As an IBM Platinum Business Partner — IBM's highest partner classification — we have direct access to IBM product engineering teams across watsonx, IBM Z, Red Hat OpenShift, and IBM Security. That means our clients get the reference architectures and early product access that come with a practitioner relationship, not just a reseller agreement.
                </p>
                <p>
                  Headquartered in Miami, FL. Delivering across the US and Canada.
                </p>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className="grid grid-cols-2 gap-4">
                {FACTS.map((f) => (
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

      {/* Leadership */}
      <section id="leadership" className="section bg-muted/30">
        <SectionMarker page="Company / About" name="Leadership" />
        <div className="container-page">
          <Reveal>
            <SectionHeading eyebrow="Leadership" title="The team behind the work" />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {LEADERSHIP.map((l, i) => (
              <Reveal key={l.title} delay={i * 60}>
                <div className="card-hover h-full rounded-xl p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                    {l.title}
                  </p>
                  <p className="mt-3 text-sm font-light text-muted-foreground leading-relaxed">
                    {l.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <PageFinalCtaSection pageLabel="Company / About" eyebrow="TechD" />
    </Layout>
  );
};

export default About;
