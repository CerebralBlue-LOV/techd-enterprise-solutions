import { useState } from "react";
import Layout from "@layout/Layout";
import SEO from "@seo/SEO";
import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import SectionHeading from "@shared/SectionHeading";
import CompanyFigure from "@shared/heroFigures/CompanyFigure";
import PageHero from "@shared/page/PageHero";
import PageFinalCtaSection from "@shared/page/PageFinalCtaSection";
import LogoStrip from "@shared/LogoStrip";
import StatBand from "@shared/StatBand";
import { cn } from "@/lib/utils";
import { CUSTOMERS } from "@content/site";

/**
 * Industry groupings reference names already present in CUSTOMERS (src/content/site.ts).
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
  const [filter, setFilter] = useState<string>("All");

  const visibleGroups = INDUSTRY_GROUPS.map((g) => ({
    ...g,
    logos: CUSTOMERS.filter((c) => g.ids.includes(c.name)),
  })).filter((g) => g.logos.length > 0 && (filter === "All" || g.label === filter));

  const filterChips = ["All", ...INDUSTRY_GROUPS.map((g) => g.label)];

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

      {/* Stat band + marquee */}
      <section id="logos" className="section bg-muted/30">
        <SectionMarker page="Company / Customers" name="Logo strip" />
        <div className="container-page">
          <Reveal>
            <StatBand
              items={[
                { value: `${CUSTOMERS.length}+`, label: "Enterprises served" },
                { value: "15+", label: "Years as IBM Platinum" },
                { value: "6", label: "Regulated verticals" },
              ]}
            />
          </Reveal>
          <div className="mt-12">
            <LogoStrip />
          </div>
        </div>
      </section>

      {/* By industry */}
      <section id="by-industry" className="section">
        <SectionMarker page="Company / Customers" name="By industry" />
        <div className="container-page">
          <Reveal>
            <SectionHeading eyebrow="By industry" title="Where we've delivered" />
          </Reveal>

          <Reveal delay={60}>
            <ul className="mt-8 flex flex-wrap gap-2">
              {filterChips.map((chip) => {
                const active = filter === chip;
                return (
                  <li key={chip}>
                    <button
                      type="button"
                      onClick={() => setFilter(chip)}
                      className={cn(
                        "rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] transition-colors",
                        active
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border text-secondary hover:border-primary/60 hover:text-primary",
                      )}
                    >
                      {chip}
                    </button>
                  </li>
                );
              })}
            </ul>
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visibleGroups.map((group, gi) => (
              <Reveal key={group.label} delay={gi * 50}>
                <div className="rounded-xl border border-border p-6 h-full transition-colors hover:border-primary/40">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                      {group.label}
                    </p>
                    <span className="text-[11px] font-light text-muted-foreground">
                      {group.logos.length} {group.logos.length === 1 ? "client" : "clients"}
                    </span>
                  </div>

                  {/* Logo grid */}
                  <ul className="mt-5 grid grid-cols-3 gap-3">
                    {group.logos.map((c) =>
                      c.logo ? (
                        <li
                          key={c.name}
                          title={c.name}
                          className="group flex h-14 items-center justify-center rounded-md border border-border bg-background px-2 transition-colors hover:border-primary/50"
                        >
                          <img
                            src={c.logo}
                            alt={c.name}
                            loading="lazy"
                            className={cn(
                              "max-h-8 max-w-full object-contain opacity-60 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0",
                              c.logoClass,
                            )}
                          />
                        </li>
                      ) : (
                        <li
                          key={c.name}
                          className="flex h-14 items-center justify-center rounded-md border border-border bg-background px-2 text-[11px] font-light text-muted-foreground text-center"
                        >
                          {c.name}
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              </Reveal>
            ))}
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
