import { Slider } from "@ui/slider";
import { HEIGHT_TOKENS, toLogoClass, type HeightToken, type LabClient } from "./clients-lab-data";

interface LogoTileProps {
  client: LabClient;
  height: HeightToken;
  onHeightChange: (h: HeightToken) => void;
  variant?: "light" | "dark";
}

export const LogoTile = ({ client, height, onHeightChange, variant = "light" }: LogoTileProps) => {
  const heightIndex = HEIGHT_TOKENS.indexOf(height);
  const logoClass = toLogoClass(height);
  const isDark = variant === "dark";

  const lightSrc = client.currentLogo
    ? `${import.meta.env.BASE_URL}${client.currentLogo.replace(/^\//, "")}`
    : undefined;
  const darkSrc = client.currentLogoDark
    ? `${import.meta.env.BASE_URL}${client.currentLogoDark.replace(/^\//, "")}`
    : undefined;

  // Dark preview: prefer generated white PNG; fallback to CSS-inverted light source
  const src = isDark ? (darkSrc ?? lightSrc) : lightSrc;
  const needsInvert = isDark && !darkSrc && !!lightSrc;

  return (
    <div
      className={`flex flex-col rounded-lg border p-5 ${
        isDark ? "border-muted-foreground/30 bg-secondary" : "border-border bg-card"
      }`}
    >
      {/* Preview area */}
      <div
        className={`flex h-32 items-center justify-center rounded border border-dashed ${
          isDark ? "border-muted-foreground/40 bg-secondary" : "border-border bg-background"
        }`}
      >
        {client.placeholder || !src ? (
          <div
            className={`${logoClass} flex items-center justify-center rounded border border-dashed px-4 text-center text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${
              isDark
                ? "border-background/40 bg-background/10 text-background"
                : "border-muted-foreground bg-muted/40 text-muted-foreground"
            }`}
          >
            {client.name}
          </div>
        ) : (
          <img
            src={src}
            alt={client.name}
            className={`${logoClass} w-auto object-contain transition-all duration-300 opacity-70 hover:scale-105 hover:opacity-100 ${
              isDark
                ? needsInvert
                  ? "invert brightness-0"
                  : ""
                : "grayscale hover:grayscale-0"
            }`}
          />
        )}
      </div>

      {/* Meta */}
      <div className="mt-4 min-h-[2.5rem]">
        <p className={`text-sm font-bold leading-tight ${isDark ? "text-background" : "text-foreground"}`}>
          {client.name}
        </p>
        <a
          href={client.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-1 inline-block text-[11px] font-light hover:text-primary truncate max-w-full ${
            isDark ? "text-background/70" : "text-muted-foreground"
          }`}
        >
          {client.url.replace(/^https?:\/\//, "")} ↗
        </a>
        {client.placeholder && (
          <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-primary">
            Placeholder — needs logo file
          </p>
        )}
      </div>

      {/* Slider — both variants stay in sync via shared parent state */}
      <div className="mt-3">
        <Slider
          value={[heightIndex]}
          min={0}
          max={HEIGHT_TOKENS.length - 1}
          step={1}
          onValueChange={(vals) => onHeightChange(HEIGHT_TOKENS[vals[0]])}
        />
        <div className={`mt-2 flex items-center justify-between font-mono text-[11px] ${isDark ? "text-background/70" : "text-muted-foreground"}`}>
          <span>h-6</span>
          <span className={`rounded px-2 py-0.5 ${isDark ? "bg-background/10 text-background" : "bg-muted text-foreground"}`}>{logoClass}</span>
          <span>h-20</span>
        </div>
      </div>
    </div>
  );
};

export default LogoTile;
