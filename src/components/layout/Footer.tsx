import { Link } from "react-router-dom";
import { Facebook, Linkedin, Twitter, Youtube } from "lucide-react";
import logo from "@/assets/techd-logo.webp";
import { NAV } from "@/content/site";
import { IBMPlatinumBadge } from "@shared/IBMPlatinumBadge";

export const Footer = () => (
  <footer className="border-t border-border bg-background">
    <div className="container-page py-16 grid gap-10 md:grid-cols-6">
      <div className="md:col-span-2">
        <img src={logo} alt="TechD" className="h-8 w-auto" loading="lazy" />
        <p className="mt-4 max-w-sm text-sm font-light text-muted-foreground">
          Enterprise AI, data, security, and automation for the Fortune 500.
          IBM Platinum Business Partner.
        </p>
        <IBMPlatinumBadge size="md" className="mt-6" />
        <div className="mt-6 flex items-center gap-3">
          {[
            { Icon: Linkedin, href: "https://www.linkedin.com/company/techd", label: "LinkedIn" },
            { Icon: Twitter,  href: "https://twitter.com/techd",              label: "Twitter / X" },
            { Icon: Facebook, href: "https://www.facebook.com/techd",         label: "Facebook" },
            { Icon: Youtube,  href: "https://www.youtube.com/@techd",         label: "YouTube" },
          ].map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`TechD on ${label}`}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>

      {NAV.map((col) => (
        <div key={col.label}>
          <div className="text-sm font-bold text-secondary">{col.label}</div>
          <ul className="mt-3 space-y-2">
            {(col.children ?? [{ label: col.label, href: col.href ?? "#" }]).map((c) => (
              <li key={c.label}>
                <Link
                  to={c.href}
                  className="text-sm font-light text-muted-foreground hover:text-primary transition-colors"
                >
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <div className="border-t border-border">
      <div className="container-page py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} TechD Inc. All rights reserved.
        </p>
        <p className="text-xs text-muted-foreground">
          <Link to="/contact" className="hover:text-primary">Contact</Link>
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
