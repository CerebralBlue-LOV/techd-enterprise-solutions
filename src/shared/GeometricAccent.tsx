import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

/** Decorative ambient gradient blobs. Aria-hidden. */
export const GeometricAccent = ({ className }: Props) => (
  <div
    aria-hidden="true"
    className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
  >
    <div className="absolute -top-32 -right-24 h-[480px] w-[480px] rounded-full bg-primary/20 blur-3xl animate-gradient-drift" />
    <div
      className="absolute top-40 -left-32 h-[360px] w-[360px] rounded-full bg-primary/10 blur-3xl animate-gradient-drift"
      style={{ animationDelay: "-9s" }}
    />
    <svg
      className="absolute right-10 top-10 h-40 w-40 text-primary/30"
      viewBox="0 0 200 200"
      fill="none"
    >
      <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="1" />
      <circle cx="100" cy="100" r="50" stroke="currentColor" strokeWidth="1" />
      <circle cx="100" cy="100" r="20" stroke="currentColor" strokeWidth="1" />
    </svg>
  </div>
);

export default GeometricAccent;
