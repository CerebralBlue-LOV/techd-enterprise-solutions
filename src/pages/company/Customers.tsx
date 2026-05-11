import Layout from "@layout/Layout";
import SEO from "@seo/SEO";
import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import SectionHeading from "@shared/SectionHeading";
import CompanyFigure from "@shared/heroFigures/CompanyFigure";
import PageHero from "@shared/page/PageHero";
import PageFinalCtaSection from "@shared/page/PageFinalCtaSection";
import LogoStrip from "@shared/LogoStrip";
import { CUSTOMERS } from "@content/site";

const INDUSTRY_GROUPS = [
  {
    label: "Healthcare & Life Sciences",
    ids: ["Johns Hopkins Medicine", "CHOP", "Jefferson Health", "Temple Health", "Genesis HealthCare", "Johnson & Johnson"],
  },
  {
    label: "Media & Entertainment",
    ids: ["Sony Pictures", "Sony Interactive Entertainment", "Comcast / Peacock"],
  },
  {
    label: "Insurance",
    ids: ["PURE Insurance", "National General Insurance"],
  },
  {
    label: "Energy & Utilities",
    ids: ["Dominion Energy", "MISO Energy"],
  },
  {
    label: "Higher Education",
    ids: ["Princeton University", "VCU", "The Kennedy Center"],
  },
  {
    label: "Public Sector & Defense",
    ids: ["DHS", "L3Harris"],
  },
  {
    label: "Enterprise",
    ids: ["Corning", "Hamilton Beach", "Burlington", "White Cap"],
  },
];

const Customers = () => {
  return (
    <Layout>
      <SEO
        title="Customers — TechD"
        description="TechD serves Fortune 500 enterprises across healthcare, media, insurance, energy, higher education, and public sector."
      />

      <PageHero
        pageLabel="Company / Customers"
        parent="Company"
        child="Customers"
        headline="Trusted by regulated enterprises."
        lede="Fortune 500 health systems, studios, insurers, utilities, universities, and federal agencies — clients who can't afford a bad delivery."
        figure={<CompanyFigure />}
      />

      {/* Marquee strip */}
      <section className="section bg-muted/30">
        <SectionMarker page="Company / Customers" name="Logo strip" />
        <div className="container-page">
          <LogoStrip />
        </div>
      </section>

      {/* By industry */}
      <section className="section">
        <SectionMarker page="Company / Customers" name="By industry" />
        <div className="container-page">
          <Reveal>
            <SectionHeading eyebrow="By industry" title="Where we've delivered" />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {INDUSTRY_GROUPS.map((group, gi) => {
              const logos = CUSTOMERS.filter((c) => group.ids.includes(c.name));
              if (logos.length === 0) return null;
              return (
                <Reveal key={group.label} delay={gi * 50}>
                  <div className="rounded-xl border border-border p-6 h-full">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary mb-4">
                      {group.label}
                    </p>
                    <ul className="space-y-2">
                      {logos.map((c) => (
                        <li key={c.name} className="text-sm font-light text-muted-foreground">
                          {c.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <PageFinalCtaSection
        pageLabel="Company / Customers"
        eyebrow="Be the next one"
        title="Talk to the team behind the work."
      />
    </Layout>
  );
};

export default Customers;
