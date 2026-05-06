/** Topographic wave lines, drawn then floating. */
export const AiMotif = () => (
  <svg
    viewBox="0 0 200 140"
    className="pointer-events-none absolute -bottom-2 -right-2 h-32 w-44 text-primary"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.25}
    strokeLinecap="round"
  >
    <g className="flip-motif-wave">
      <path className="flip-motif-draw-long" d="M-10 110 C 30 80, 70 130, 110 95 S 200 110, 230 80" opacity={0.85} />
      <path className="flip-motif-draw-long" style={{ animationDelay: "120ms" }} d="M-10 90 C 30 60, 70 110, 110 75 S 200 90, 230 60" opacity={0.6} />
      <path className="flip-motif-draw-long" style={{ animationDelay: "240ms" }} d="M-10 70 C 30 40, 70 90, 110 55 S 200 70, 230 40" opacity={0.4} />
      <path className="flip-motif-draw-long" style={{ animationDelay: "360ms" }} d="M-10 50 C 30 20, 70 70, 110 35 S 200 50, 230 20" opacity={0.25} />
    </g>
  </svg>
);

export default AiMotif;
