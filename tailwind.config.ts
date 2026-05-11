import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      fontFamily: {
        sans: ['"Roboto Condensed"', "system-ui", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "gradient-drift": {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)", opacity: "0.7" },
          "50%": { transform: "translate3d(2%, -1%, 0) scale(1.05)", opacity: "0.9" },
        },
        "blob-a": {
          "0%, 100%": { transform: "translate3d(-10%, -8%, 0) scale(1)" },
          "33%": { transform: "translate3d(15%, 5%, 0) scale(1.15)" },
          "66%": { transform: "translate3d(5%, 20%, 0) scale(0.9)" },
        },
        "blob-b": {
          "0%, 100%": { transform: "translate3d(20%, 10%, 0) scale(1.1)" },
          "50%": { transform: "translate3d(-15%, -10%, 0) scale(0.95)" },
        },
        "blob-c": {
          "0%, 100%": { transform: "translate3d(0%, 25%, 0) scale(0.9)" },
          "40%": { transform: "translate3d(-20%, -15%, 0) scale(1.2)" },
          "70%": { transform: "translate3d(18%, 8%, 0) scale(1)" },
        },
        "shimmer-rotate": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(-6px)" },
          "50%": { transform: "translateY(6px)" },
        },
        "card-sweep": {
          "0%": { transform: "translateX(-100%) skewX(-12deg)" },
          "100%": { transform: "translateX(100%) skewX(-12deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-up": "fade-up 0.5s ease-out both",
        marquee: "marquee 45s linear infinite",
        "gradient-drift": "gradient-drift 18s ease-in-out infinite",
        "blob-a": "blob-a 11s ease-in-out infinite",
        "blob-b": "blob-b 13s ease-in-out infinite",
        "blob-c": "blob-c 15s ease-in-out infinite",
        "shimmer-rotate": "shimmer-rotate 20s linear infinite",
        float: "float 7s ease-in-out infinite",
        "card-sweep": "card-sweep 0.3s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
