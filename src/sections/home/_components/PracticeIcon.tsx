/**
 * PracticeIcon — Style A "Light glass — corner halos (original)" tile.
 * White surface, 1px border, two cyan halos in opposite corners, primary glyph.
 * Keyed by solution id: ai · data-analytics · automation · security · hybrid-cloud.
 */

type PracticeId = "ai" | "data-analytics" | "automation" | "security" | "hybrid-cloud";

const Glyph = ({ id }: { id: PracticeId }) => {
  switch (id) {
    case "ai":
      return (
        <>
          <path d="M32 8L52 20v24L32 56 12 44V20z" />
          <path d="M32 8v48M12 20l40 24M52 20L12 44" opacity={0.5} />
          <circle cx="32" cy="32" r="3" fill="currentColor" />
          <circle cx="32" cy="14" r="1.2" fill="currentColor" opacity={0.7} />
          <circle cx="48" cy="38" r="1.2" fill="currentColor" opacity={0.7} />
          <circle cx="16" cy="38" r="1.2" fill="currentColor" opacity={0.7} />
        </>
      );
    case "data-analytics":
      return (
        <>
          <ellipse cx="32" cy="14" rx="16" ry="4" />
          <path d="M16 14v10c0 2.2 7.2 4 16 4s16-1.8 16-4V14" opacity={0.5} />
          <path d="M16 28v10c0 2.2 7.2 4 16 4s16-1.8 16-4V28" opacity={0.5} />
          <path d="M16 42v8c0 2.2 7.2 4 16 4s16-1.8 16-4v-8" />
          <circle cx="32" cy="14" r="1.5" fill="currentColor" />
        </>
      );
    case "automation":
      return (
        <>
          <circle cx="32" cy="32" r="16" opacity={0.5} />
          <circle cx="32" cy="32" r="10" />
          <circle cx="32" cy="32" r="3" fill="currentColor" />
          <path d="M32 10v6M32 48v6M10 32h6M48 32h6M16 16l4 4M44 44l4 4M48 16l-4 4M16 48l4-4" />
        </>
      );
    case "security":
      return (
        <>
          <path d="M32 8l18 6v14c0 12-8 20-18 26-10-6-18-14-18-26V14z" />
          <path d="M22 30v-3a10 10 0 0120 0v3" opacity={0.5} />
          <rect x="22" y="30" width="20" height="14" rx="2" />
          <circle cx="32" cy="37" r="2" fill="currentColor" />
        </>
      );
    case "hybrid-cloud":
      return (
        <>
          <path d="M22 18l14-7 14 7v14l-14 7-14-7z" />
          <path d="M22 18l14 7 14-7M36 25v14" opacity={0.5} />
          <path d="M14 32l12-6 12 6v12l-12 6-12-6z" />
          <path d="M14 32l12 6 12-6M26 38v12" opacity={0.5} />
        </>
      );
  }
};

export const PracticeIcon = ({ id }: { id: PracticeId }) => (
  <div className="relative grid h-20 w-20 place-items-center overflow-hidden rounded-2xl bg-background ring-1 ring-border shadow-[0_10px_30px_-18px_hsl(var(--secondary)/0.4)]">
    <span aria-hidden className="absolute -left-5 -top-5 h-20 w-20 rounded-full bg-primary/25 blur-2xl" />
    <span aria-hidden className="absolute -bottom-6 -right-3 h-16 w-16 rounded-full bg-primary/15 blur-2xl" />
    <svg
      viewBox="0 0 64 64"
      className="relative h-12 w-12 text-primary"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Glyph id={id} />
    </svg>
    <span aria-hidden className="absolute right-2.5 top-2.5 h-1 w-1 rounded-full bg-primary" />
    <span aria-hidden className="absolute bottom-2.5 left-2.5 h-0.5 w-0.5 rounded-full bg-primary/60" />
  </div>
);

export default PracticeIcon;
