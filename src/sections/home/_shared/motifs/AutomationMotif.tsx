/** Automation motif — step-flow sparkline with traveling dot */
export const AutomationMotif = () => (
  <svg
    viewBox="0 0 320 140"
    aria-hidden="true"
    className="absolute inset-0 h-full w-full"
    preserveAspectRatio="none"
  >
    <path
      d="M10,100 L70,100 L90,60 L150,60 L170,90 L230,90 L250,40 L310,40"
      fill="none"
      stroke="hsl(var(--muted-foreground))"
      strokeWidth={1}
      opacity={0.4}
    />
    <path
      id="auto-path"
      d="M10,100 L70,100 L90,60 L150,60 L170,90 L230,90 L250,40 L310,40"
      fill="none"
      stroke="hsl(var(--primary))"
      strokeWidth={1.5}
      strokeDasharray="600"
      className="motif-draw-long"
    />
    {/* nodes */}
    {[
      [70, 100],
      [90, 60],
      [150, 60],
      [170, 90],
      [230, 90],
      [250, 40],
    ].map(([x, y], i) => (
      <circle
        key={i}
        cx={x}
        cy={y}
        r={2.5}
        fill="hsl(var(--background))"
        stroke="hsl(var(--primary))"
        strokeWidth={1.2}
      />
    ))}
    {/* traveling dot */}
    <circle r={3} fill="hsl(var(--primary))" className="motif-travel">
      <animateMotion
        dur="3s"
        repeatCount="indefinite"
        path="M10,100 L70,100 L90,60 L150,60 L170,90 L230,90 L250,40 L310,40"
      />
    </circle>
  </svg>
);
export default AutomationMotif;
