import { forwardRef, MouseEvent, ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface Props {
  /** Target section id (without `#`). */
  sectionId: string;
  /** Path containing the section. Defaults to "/". */
  path?: string;
  className?: string;
  children: ReactNode;
}

/**
 * Anchor that scrolls to an in-page section without putting the hash in the URL.
 * - Same page: smooth-scrolls directly to the element.
 * - Different page: navigates with router state `{ scrollTo }`, then
 *   ScrollToTop handles the scroll after mount.
 */
const ScrollToSectionLink = forwardRef<HTMLAnchorElement, Props>(
  ({ sectionId, path = "/", className, children }, ref) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      e.preventDefault();
      if (pathname === path) {
        document
          .getElementById(sectionId)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        navigate(path, { state: { scrollTo: sectionId } });
      }
    };

    return (
      <a ref={ref} href={path} onClick={handleClick} className={className}>
        {children}
      </a>
    );
  },
);
ScrollToSectionLink.displayName = "ScrollToSectionLink";

export default ScrollToSectionLink;
