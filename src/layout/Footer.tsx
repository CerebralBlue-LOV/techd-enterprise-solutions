import { Link } from "react-router-dom";
import logo from "@/assets/techd-logo.webp";
import { NAV } from "@/content/site";

export const Footer = () => (
  <footer className="border-t border-border bg-background">
    <div className="container-page py-16 grid gap-10 md:grid-cols-5">
      <div className="md:col-span-2">
        <img src={logo} alt="TechD" className="h-8 w-auto" loading="lazy" />
        <p className="mt-4 max-w-sm text-sm font-light text-muted-foreground">
          Enterprise AI, data, security, and automation for the Fortune 500.
          IBM Platinum Business Partner.
        </p>
        <div className="mt-6 inline-flex items-center gap-3 rounded-md border border-border px-4 py-3">
          <div className="h-8 w-8 rounded-sm bg-secondary text-background grid place-items-center text-xs font-bold">
            IBM
          </div>
          <div className="leading-tight">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Platinum</div>
            <div className="text-sm font-bold text-secondary">Business Partner</div>
          </div>
        </div>
      </div>

      {NAV.slice(0, 4).map((col) => (
        <div key={col.label}>
          <div className="text-sm font-bold text-secondary">{col.label}</div>
          <ul className="mt-3 space-y-2">
            {(col.children ?? [{ label: col.label, href: col.href }]).map((c) => (
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
          © {new Date().getFullYear()} TechD. All rights reserved.
        </p>
        <p className="text-xs text-muted-foreground">
          <Link to="/contact" className="hover:text-primary">Contact</Link>
          <span className="mx-2">·</span>
          <a href="#" className="hover:text-primary">Privacy</a>
          <span className="mx-2">·</span>
          <a href="#" className="hover:text-primary">Terms</a>
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
