import { useEffect } from "react";

/**
 * Dev helper: logs a labeled marker to the console when a section mounts.
 * Lets the user reference sections by name when giving feedback.
 */
const SectionMarker = ({ page, name }: { page: string; name: string }) => {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(`%c[Section] ${page} → ${name}`, "color:#00B3E3;font-weight:bold;");
  }, [page, name]);
  return null;
};

export default SectionMarker;
