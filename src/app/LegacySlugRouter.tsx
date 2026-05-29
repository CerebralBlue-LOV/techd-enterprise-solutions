import { Navigate, useLocation } from "react-router-dom";
import NotFound from "@pages/NotFound";

/**
 * Catch-all for unmatched URLs. WordPress posts lived at root level as
 * hyphenated single-segment slugs. We inspect the slug for known keywords
 * and redirect to the closest Resources section. Truly unknown paths (typos,
 * multi-segment paths that don't match any route) fall through to NotFound.
 */
export default function LegacySlugRouter() {
  const { pathname } = useLocation();
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 1 && segments[0].includes("-")) {
    const slug = segments[0].toLowerCase();
    if (/(webinar|live-webinar|lunch-and-learn)/.test(slug)) {
      return <Navigate to="/resources/webinars" replace />;
    }
    if (/(workshop|user-group|summit|event|sponsors|emerge|q[1-4]-20)/.test(slug)) {
      return <Navigate to="/resources/events" replace />;
    }
    return <Navigate to="/resources/blog" replace />;
  }

  return <NotFound />;
}
