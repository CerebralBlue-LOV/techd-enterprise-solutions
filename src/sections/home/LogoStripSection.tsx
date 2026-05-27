import LogoStrip from "@shared/LogoStrip";
import SectionMarker from "@shared/SectionMarker";

/**
 * Section: Home / Logo Strip
 * Purpose: Social proof — TechD client names in a marquee.
 * Order:   2 of 7 on the Home page.
 * Notes:   Thin wrapper that exists to (a) attach a SectionMarker and
 *          (b) keep the home page composition uniform. Edit logos in
 *          @sections/clients-lab/clients-lab-data (CLIENTS) — that file is
 *          the single source of truth; site.ts derives from it.
 */
export const LogoStripSection = () => (
  <section id="logos" className="scroll-mt-24">
    <SectionMarker page="Home" name="Client Logo Strip" />
    <LogoStrip />
  </section>
);

export default LogoStripSection;
