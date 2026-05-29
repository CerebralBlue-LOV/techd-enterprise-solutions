import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/** Strips trailing slash so WordPress-style `/foo/` matches our `/foo` routes. */
export default function TrailingSlashRedirect() {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname.length > 1 && location.pathname.endsWith("/")) {
      navigate(
        location.pathname.replace(/\/+$/, "") + location.search + location.hash,
        { replace: true }
      );
    }
  }, [location, navigate]);
  return null;
}
