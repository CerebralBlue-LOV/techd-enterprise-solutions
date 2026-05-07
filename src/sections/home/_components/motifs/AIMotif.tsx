/** AI motif — layered sine waves */
export const AIMotif = ({ featured = false }: { featured?: boolean }) => (
  <svg
    viewBox="0 0 320 140"
    aria-hidden="true"
    className="absolute inset-0 h-full w-full"
    preserveAspectRatio="none"
  >
    <defs>
      <linearGradient id="ai-grad" x1="0" x2="1" y1="0" y2="0">
        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
        <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.9" />
        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
      </linearGradient>
    </defs>
    {[0, 1, 2, 3].map((i) => (
      <path
        key={i}
        d={`M0,${70 + i * 4} Q80,${40 - i * 6} 160,${70 + i * 4} T320,${70 + i * 4}`}
        fill="none"
        stroke="url(#ai-grad)"
        strokeWidth={featured ? 1.4 : 1}
        opacity={0.85 - i * 0.18}
        className="motif-wave"
        style={{ animationDelay: `${i * 120}ms` }}
      />
    ))}
  </svg>
);
export default AIMotif;
