import { cn } from "@/lib/utils";

type Props = { className?: string };

const ContactMap = ({ className }: Props = {}) => (
  <div
    className={cn(
      "relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-border",
      className,
    )}
  >
    <iframe
      src="https://www.openstreetmap.org/export/embed.html?bbox=-80.2918%2C25.7117%2C-80.0918%2C25.8117&layer=mapnik&marker=25.7617%2C-80.1918"
      className="absolute inset-0 w-full h-full"
      title="TechD Headquarters — Miami, FL"
      loading="lazy"
      style={{ border: 0 }}
    />
  </div>
);

export default ContactMap;
