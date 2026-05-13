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

/**
 * Industry groupings reference names already present in CUSTOMERS (src/content/site.ts).
 * Adding new client names here is out of scope until PM signs off on additional logos.
 */
const INDUSTRY_GROUPS = [
  {
    label: "Financial Services",
    ids: [
      "Santander",
      "MetLife",
      "Mizuho",
      "NatWest",
      "Itaú",
      "Fiserv",
      "Banorte",
      "Sicoob",
      "Dah Sing Bank",
      "Banco del Pacífico",
      "BROU",
    ],
  },
  {
    label: "Higher Education & Research",
    ids: [
      "Harvard University",
      "Penn State",
      "National University of Singapore",
      "Stony Brook University",
      "New York Institute of Technology",
    ],
  },
  {
    label: "Healthcare & Life Sciences",
    ids: ["Netcare", "Children's Health", "Admed"],
  },
  {
    label: "Media, Tech & Telecom",
    ids: ["Adobe", "Snap Inc.", "Verizon"],
  },
  {
    label: "Industrial & Manufacturing",
    ids: [
      "Mercedes-Benz",
      "Dow",
      "Seagate",
      "Wabtec",
      "NSK",
      "Itochu",
      "Great Day Improvements",
    ],
  },
  {
    label: "Energy & Utilities",
    ids: ["TEPSCO"],
  },
  {
    label: "Real Estate & Retail",
    ids: ["Vornado Realty Trust", "Clip"],
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
      <section id="logos" className="section bg-muted/30">
        <SectionMarker page="Company / Customers" name="Logo strip" />
        <div className="container-page">
          <LogoStrip />
        </div>
      </section>

      {/* By industry */}
      <section id="by-industry" className="section">
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
