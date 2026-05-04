import { cn } from "@/lib/utils";

interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2";
}

export const SectionHeading = ({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
  as: Tag = "h2",
}: Props) => (
  <div
    className={cn(
      "max-w-3xl",
      align === "center" && "mx-auto text-center",
      className,
    )}
  >
    {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
    <Tag className="text-4xl md:text-5xl leading-[1.05]">{title}</Tag>
    {subtitle && (
      <p className="mt-5 text-lg md:text-xl text-muted-foreground font-light">
        {subtitle}
      </p>
    )}
  </div>
);

export default SectionHeading;
