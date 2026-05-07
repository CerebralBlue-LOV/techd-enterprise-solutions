import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import logo from "@/assets/techd-logo.webp";
import { NAV } from "@/content/site";

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50 w-full bg-background/90 backdrop-blur border-b border-border">
      <div className="container-page flex h-16 items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-2 shrink-0" aria-label="TechD home">
          <img src={logo} alt="TechD" className="h-8 w-auto" loading="eager" />
        </Link>

        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            {NAV.map((item) => (
              <NavigationMenuItem key={item.label}>
                {item.children ? (
                  <>
                    <NavigationMenuTrigger className="text-sm font-medium text-secondary">
                      {item.label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[420px] gap-1 p-3">
                        {item.children.map((c) => (
                          <li key={c.label}>
                            <NavigationMenuLink asChild>
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
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </>
                ) : item.href ? (
                  <NavigationMenuLink asChild>
                    <Link
                      to={item.href}
                      className="inline-flex h-10 items-center px-4 text-sm font-medium text-secondary transition-colors hover:text-primary"
                    >
                      {item.label}
                    </Link>
                  </NavigationMenuLink>
                ) : null}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

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
            <SheetContent side="right" className="w-[88vw] sm:w-96">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <div className="flex items-center justify-between mb-6">
                <img src={logo} alt="TechD" className="h-7 w-auto" />
                <Button variant="ghost" size="icon" onClick={() => setOpen(false)} aria-label="Close menu">
                  <X />
                </Button>
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
              <Button asChild className="btn-glow mt-6 w-full">
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
