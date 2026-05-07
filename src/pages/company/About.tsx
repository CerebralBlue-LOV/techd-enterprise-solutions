import Layout from "@layout/Layout";
import SEO from "@seo/SEO";
import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import SectionHeading from "@shared/SectionHeading";
import RingsHeroBackdrop from "@shared/RingsHeroBackdrop";

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
  const sectionRef = useRef<HTMLElement | null>(null);
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onMove = (e: MouseEvent) => {
      const rect = node.getBoundingClientRect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() =>
        setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top })
      );
    };
    const onLeave = () => setCursor(null);
    node.addEventListener("mousemove", onMove);
    node.addEventListener("mouseleave", onLeave);
    return () => {
      node.removeEventListener("mousemove", onMove);
      node.removeEventListener("mouseleave", onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <Layout>
      <SEO
        title="About — TechD"
        description="Designing, building, and running AI, data, and hybrid cloud systems for Fortune 500 enterprises since 2009."
      />

      {/* Hero */}
      <section
        ref={sectionRef}
        className="relative overflow-hidden min-h-[50vh] flex items-center"
      >
        <SectionMarker page="Company / About" name="Hero" />
        <PracticeHeroBackdrop cursor={cursor} />
        <div className="container-page relative z-10 pt-16 pb-12 md:pt-20 md:pb-16">
          <Reveal>
            <div className="max-w-4xl">
              <p className="eyebrow flex items-center gap-3">
                <span className="inline-block h-px w-8 bg-primary" />
                Company
                <span className="text-muted-foreground/60">/</span>
                <span>About</span>
              </p>
              <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight text-secondary">
                IBM's partner for regulated enterprise delivery.
              </h1>
              <p className="mt-6 max-w-2xl text-lg md:text-xl font-light text-muted-foreground leading-relaxed">
                Designing, building, and running AI, data, and hybrid cloud systems for Fortune 500 enterprises since 2009.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Company description */}
      <section className="section">
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

            {/* Fact callouts */}
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
      <section className="section bg-muted/30">
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
    </Layout>
  );
};

export default About;
