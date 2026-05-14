import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { cn } from "@/lib/utils";

type Props = { className?: string };

// TechD HQ — Miami, FL
const HQ: [number, number] = [25.7617, -80.1918];

/**
 * Quiet, on-brand interactive map.
 * - CartoDB Positron tiles (clean monochrome basemap, no API key required)
 * - Brand-cyan custom pin
 * - Subtle gradient edges for editorial feel
 * - Interactivity dialed back (no zoom controls, no scroll-wheel zoom)
 *   so it reads as a location indicator, not a navigation tool.
 */
const ContactMap = ({ className }: Props = {}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: HQ,
      zoom: 13,
      zoomControl: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      boxZoom: false,
      keyboard: false,
      dragging: true,
      attributionControl: true,
    });
    mapRef.current = map;

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
      {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
      },
    ).addTo(map);

    // Brand-cyan SVG pin — uses currentColor so we can theme via Tailwind.
    const pinHtml = `
      <div class="techd-pin">
        <span class="techd-pin__pulse"></span>
        <span class="techd-pin__dot"></span>
      </div>
    `;
    const icon = L.divIcon({
      html: pinHtml,
      className: "techd-pin-wrapper",
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });

    L.marker(HQ, { icon, keyboard: false, interactive: false }).addTo(map);

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div
      className={cn(
        "relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-border bg-muted/20",
        className,
      )}
    >
      <div ref={containerRef} className="absolute inset-0 h-full w-full" />
      {/* Soft inner edge to blend tiles into the page */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-border/60"
      />
    </div>
  );
};

export default ContactMap;
