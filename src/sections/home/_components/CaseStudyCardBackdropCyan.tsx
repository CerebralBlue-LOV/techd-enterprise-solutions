import HoverGridBackdrop from "@shared/HoverGridBackdrop";

/**
 * Featured Case Study backdrop — preset of the reusable HoverGridBackdrop
 * (dark variant, cyan top rim). Kept as a named wrapper so the home page
 * keeps a self-documenting component name.
 *
 * For new usages, import HoverGridBackdrop directly from @shared.
 */
export const CaseStudyCardBackdropCyan = () => (
  <HoverGridBackdrop variant="dark" topRim />
);

export default CaseStudyCardBackdropCyan;
