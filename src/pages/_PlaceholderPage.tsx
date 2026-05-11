import Layout from "@layout/Layout";
import SEO from "@seo/SEO";
import Reveal from "@shared/Reveal";
import SectionHeading from "@shared/SectionHeading";
import GeometricAccent from "@shared/GeometricAccent";
import PageFinalCtaSection from "@shared/page/PageFinalCtaSection";

type Props = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  seoTitle?: string;
  seoDescription?: string;
  /** Set to false to suppress the standardized final CTA. Defaults to true. */
  showFinalCta?: boolean;
};

/**
 * Shared scaffold for new IA pages. Minimal hero only — full content arrives
 * in per-page follow-up plans.
 */
const PlaceholderPage = ({
  eyebrow,
  title,
  subtitle,
  seoTitle,
  seoDescription,
  showFinalCta = true,
}: Props) => (
  <Layout>
    <SEO
      title={seoTitle ?? `${title} — TechD`}
      description={seoDescription ?? subtitle ?? title}
    />
    <section className="relative overflow-hidden">
      <GeometricAccent />
      <div className="container-page relative pt-20 pb-32 md:pt-28 md:pb-40">
        <Reveal>
          <SectionHeading
            as="h1"
            eyebrow={eyebrow}
            title={title}
            subtitle={subtitle ?? "Page in progress — full content coming soon."}
          />
        </Reveal>
      </div>
    </section>
    {showFinalCta ? <PageFinalCtaSection pageLabel={title} /> : null}
  </Layout>
);

export default PlaceholderPage;
