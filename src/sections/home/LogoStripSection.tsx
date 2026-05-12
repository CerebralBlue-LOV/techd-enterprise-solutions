import LogoStrip from "@shared/LogoStrip";
import SectionMarker from "@shared/SectionMarker";

/**
 * Section: Home / Logo Strip
 * Purpose: Social proof — Fortune 500 client names in a marquee.
 * Order:   2 of 7 on the Home page.
 * Notes:   Thin wrapper that exists to (a) attach a SectionMarker and
 *          (b) keep the home page composition uniform. Edit logos in
 *          @content/site (CUSTOMERS).
 */
export const LogoStripSection = () => (
  <div id="clients">
    <SectionMarker page="Home" name="Customer Logo Strip" />
    <LogoStrip />
  </div>
);

export default LogoStripSection;
