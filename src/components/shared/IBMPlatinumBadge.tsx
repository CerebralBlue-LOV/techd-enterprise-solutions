import ibmLogo from "@/assets/ibm-logo-white.png";
import { cn } from "@/lib/utils";

type Size = "sm" | "md" | "lg";

const SIZES: Record<Size, { wrap: string; logo: string; eyebrow: string; title: string }> = {
  sm: {
    wrap: "px-3 py-2 gap-3",
    logo: "h-7 w-12 px-1.5",
    eyebrow: "text-[10px]",
    title: "text-xs",
  },
  md: {
    wrap: "px-4 py-3 gap-3",
    logo: "h-9 w-14 px-2",
    eyebrow: "text-xs",
    title: "text-sm",
  },
  lg: {
    wrap: "px-8 py-7 md:px-10 md:py-8 gap-4 flex-col",
    logo: "h-16 w-24 px-3",
    eyebrow: "text-xs tracking-[0.18em]",
    title: "text-xl",
  },
};

type Props = {
  size?: Size;
  className?: string;
  /** lg: stacked centered card; sm/md: inline horizontal pill */
  variant?: "inline" | "card";
  showTenure?: boolean;
  /** If set, renders as an external link (opens in new tab). */
  href?: string;
};

export const IBMPlatinumBadge = ({
  size = "md",
  variant = "inline",
  showTenure = false,
  className,
  href,
}: Props) => {
  const s = SIZES[size];
  const isCard = variant === "card";
  const Comp: "a" | "div" = href ? "a" : "div";
  const linkProps = href
    ? {
        href,
        target: "_blank",
        rel: "noopener noreferrer",
        "aria-label": "TechD — IBM Platinum Business Partner (opens IBM)",
      }
    : {};

  return (
    <Comp
      {...linkProps}
      className={cn(
        "inline-flex items-center rounded-lg border border-border bg-background",
        isCard &&
          "flex-col text-center rounded-2xl border-primary/30 bg-background/90 shadow-2xl shadow-primary/10 backdrop-blur-xl",
        href && "transition-colors hover:border-primary",
        s.wrap,
        className,
      )}
    >
      <div className={cn("grid place-items-center rounded-md bg-secondary shrink-0", s.logo)}>
        <img src={ibmLogo} alt="IBM" className="h-full w-full object-contain" />
      </div>
      <div className={cn("leading-tight", isCard ? "text-center" : "text-left")}>
        <div className={cn("font-bold uppercase tracking-wider text-primary", s.eyebrow)}>
          Platinum
        </div>
        <div className={cn("font-bold text-secondary", s.title)}>Business Partner</div>
        {showTenure && (
          <div className="mt-2 text-xs font-light text-muted-foreground">
            15+ years · Platinum since 2009
          </div>
        )}
      </div>
    </Comp>
  );
};

export default IBMPlatinumBadge;
