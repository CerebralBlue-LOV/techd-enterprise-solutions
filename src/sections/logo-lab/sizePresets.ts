/** Discrete tailwind height presets for customer logos in the marquee. */
export interface SizePreset {
  label: string;
  className: string | null; // null = use default (h-10 md:h-12)
}

export const SIZE_PRESETS: SizePreset[] = [
  { label: "3XS", className: "h-3 md:h-4" },
  { label: "2XS", className: "h-4 md:h-5" },
  { label: "XS", className: "h-6 md:h-7" },
  { label: "S",  className: "h-8 md:h-9" },
  { label: "M (default)", className: null },
  { label: "L",  className: "h-12 md:h-14" },
  { label: "XL", className: "h-14 md:h-16" },
  { label: "2XL", className: "h-16 md:h-20" },
  { label: "3XL", className: "h-20 md:h-24" },
  { label: "4XL", className: "h-24 md:h-28" },
  { label: "5XL", className: "h-28 md:h-32" },
  { label: "6XL", className: "h-32 md:h-40" },
];

export const DEFAULT_CLASS = "h-10 md:h-12";

export const matchPreset = (cls: string | undefined): SizePreset => {
  if (!cls) return SIZE_PRESETS[2];
  const found = SIZE_PRESETS.find((p) => p.className === cls);
  return found ?? { label: "Custom", className: cls };
};
