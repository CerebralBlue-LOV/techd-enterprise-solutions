import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, ChevronDown } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import logo from "@/assets/techd-logo.webp";
import { NAV } from "@/content/site";

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeNav, setActiveNav] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setActiveNav(null);
  }, [location.pathname]);

  const handleEnter = (label: string) => {
    clearTimeout(closeTimer.current);
    setActiveNav(label);
  };

  const handleLeave = () => {
    closeTimer.current = setTimeout(() => setActiveNav(null), 100);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background/90 backdrop-blur border-b border-border">
      <div className="container-page flex h-16 items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-2 shrink-0" aria-label="TechD home">
          <img src={logo} alt="TechD" className="h-8 w-auto" loading="eager" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1 self-stretch">
          {NAV.map((item, idx) => (
            <div
              key={item.label}
              className="relative self-stretch flex items-center"
              onMouseEnter={() => item.children && handleEnter(item.label)}
              onMouseLeave={() => item.children && handleLeave()}
            >
              {item.children ? (
                <button
                  className={cn(
                    "inline-flex h-10 items-center gap-1.5 px-4 text-sm font-medium text-secondary transition-colors hover:text-primary",
                    activeNav === item.label && "text-primary"
                  )}
                >
                  {item.label}
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 shrink-0 transition-transform duration-200",
                      activeNav === item.label && "rotate-180"
                    )}
                    aria-hidden="true"
                  />
                </button>
              ) : item.href ? (
                <Link
                  to={item.href}
                  className="inline-flex h-10 items-center px-4 text-sm font-medium text-secondary transition-colors hover:text-primary"
                >
                  {item.label}
                </Link>
              ) : null}

              {item.children && (
                <div
                  className={cn(
                    "absolute top-full z-50 w-[320px]",
                    "left-0",
                    activeNav === item.label ? "block" : "hidden"
                  )}
                >
                  <ul className="rounded-md border bg-popover shadow-lg p-1.5 flex flex-col gap-0.5">
                    {item.children.map((c) => (
                      <li key={c.label}>
                        <Link
                          to={c.href}
                          className="block rounded-md p-3 transition-colors hover:bg-accent focus:bg-accent"
                        >
                          <div className="text-sm font-bold text-secondary">{c.label}</div>
                          {c.description && (
                            <div className="mt-0.5 text-sm font-light text-muted-foreground">
                              {c.description}
                            </div>
                          )}
                          {c.latest && (
                            <div className="mt-1 text-xs text-muted-foreground/50">
                              Latest: {c.latest}
                            </div>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild className="btn-glow hidden md:inline-flex">
            <Link to="/contact">Talk to an expert</Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[88vw] sm:w-96 flex flex-col gap-0 overflow-y-auto">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <div className="mb-6 pr-8">
                <img src={logo} alt="TechD" className="h-7 w-auto" />
              </div>
              <nav className="flex flex-col gap-1">
                {NAV.map((item) => (
                  <div key={item.label} className="py-2 border-b border-border">
                    {item.href ? (
                      <Link
                        to={item.href}
                        className="block text-base font-bold text-secondary hover:text-primary"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <p className="text-base font-bold text-secondary">{item.label}</p>
                    )}
                    {item.children && (
                      <ul className="mt-2 space-y-1.5 pl-3">
                        {item.children.map((c) => (
                          <li key={c.label}>
                            <Link
                              to={c.href}
                              className="block text-sm font-light text-muted-foreground hover:text-primary"
                            >
                              {c.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </nav>
              <Button asChild className="btn-glow mt-6 mb-2 w-full shrink-0">
                <Link to="/contact">Talk to an expert</Link>
              </Button>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
