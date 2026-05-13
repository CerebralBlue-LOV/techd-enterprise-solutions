import { cn } from "@/lib/utils";

const INITIALS: Record<string, string> = {
  "AI & Generative": "AI",
  "Data & Analytics": "DA",
  "Automation & FinOps": "AF",
  "Security & Compliance": "SC",
};

interface Props {
  practice: string;
  className?: string;
  /** Tone of the ghost initial — defaults to primary cyan. */
  tone?: "primary" | "background";
}

/**
 * Oversized 2-letter ghost initial for the four IBM practice areas.
 * Used as a left-rail anchor in service Product Coverage rows; reusable
 * elsewhere when a practice needs a quick visual marker.
 */
export const PracticeBadge = ({ practice, className, tone = "primary" }: Props) => {
  const initials = INITIALS[practice] ?? practice.slice(0, 2).toUpperCase();
  const color = tone === "primary" ? "text-primary/[0.12]" : "text-background/[0.18]";
  return (
    <span
      aria-hidden="true"
      className={cn(
        "select-none font-bold leading-none tracking-tighter",
        color,
        className,
      )}
    >
      {initials}
    </span>
  );
};

export default PracticeBadge;
