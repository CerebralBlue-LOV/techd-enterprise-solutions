import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Resets scroll to the top on every route change.
 * If router state carries `scrollTo`, smooth-scrolls to that section id
 * after the new page mounts (used by ScrollToSectionLink for cross-page nav).
 */
const ScrollToTop = () => {
  const { pathname, state } = useLocation() as {
    pathname: string;
    state: { scrollTo?: string } | null;
  };

  useEffect(() => {
    const target = state?.scrollTo;
    if (target) {
      requestAnimationFrame(() => {
        document
          .getElementById(target)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, state]);

  return null;
};

export default ScrollToTop;
