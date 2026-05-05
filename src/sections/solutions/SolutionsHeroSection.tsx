import Reveal from "@shared/Reveal";
import SectionHeading from "@shared/SectionHeading";
import SectionMarker from "@shared/SectionMarker";
import GeometricAccent from "@shared/GeometricAccent";

/**
 * Section: Solutions / Hero
 * Purpose: Page-level intro for the five practice areas.
 * Order:   1 of 2 on the Solutions page.
 */
export const SolutionsHeroSection = () => (
  <section className="relative overflow-hidden">
    <SectionMarker page="Solutions" name="Hero" />
    <GeometricAccent />
    <div className="container-page relative pt-20 pb-16 md:pt-28">
      <Reveal>
        <SectionHeading
          as="h1"
          eyebrow="Solutions"
          title="Five practices. Engineered for enterprise outcomes."
          subtitle="Each practice is anchored by IBM-certified architects and senior engineers who have shipped for the world's most regulated organizations."
        />
      </Reveal>
    </div>
  </section>
);

export default SolutionsHeroSection;
