/** Discrete tailwind height presets for customer logos in the marquee. */
export interface SizePreset {
  label: string;
  className: string | null; // null = use default (h-10 md:h-12)
}

export const SIZE_PRESETS: SizePreset[] = [
  { label: "XS", className: "h-6 md:h-7" },
  { label: "S",  className: "h-8 md:h-9" },
  { label: "M (default)", className: null },
  { label: "L",  className: "h-12 md:h-14" },
  { label: "XL", className: "h-14 md:h-16" },
  { label: "2XL", className: "h-16 md:h-20" },
  { label: "3XL", className: "h-20 md:h-24" },
];

export const DEFAULT_CLASS = "h-10 md:h-12";

export const matchPreset = (cls: string | undefined): SizePreset => {
  if (!cls) return SIZE_PRESETS[2];
  const found = SIZE_PRESETS.find((p) => p.className === cls);
  return found ?? { label: "Custom", className: cls };
};
