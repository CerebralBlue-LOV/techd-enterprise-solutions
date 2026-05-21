import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Resets scroll to the top on every route change.
 * If the URL contains a hash, lets the browser handle the anchor scroll instead.
 */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        // Strip the hash so the URL stays clean and the same link can be
        // clicked again (react-router skips navigation to an identical location).
        window.history.replaceState(null, "", pathname);
      });
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
