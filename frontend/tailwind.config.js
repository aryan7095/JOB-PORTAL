/** @type {import('tailwindcss').Config} */
// Tailwind CSS configuration file, set up for shadcn/ui's theming system
module.exports = {
  // Enables class-based dark mode (toggle a "dark" class on a parent element,
  // rather than relying on the OS-level prefers-color-scheme media query)
  darkMode: ["class"],
  // Files Tailwind scans to detect which utility classes are actually used
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  // No class prefix applied (matches components.json's "prefix": "")
  prefix: "",
  theme: {
    // Custom `container` utility settings: centers content, adds horizontal padding,
    // and caps max-width at 1400px on 2xl screens
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      // Semantic color tokens, each referencing a CSS variable (defined elsewhere, likely
      // in index.css) so the whole theme can be restyled by changing those variables —
      // this is what "cssVariables": true in components.json enables, and what all the
      // ui/*.jsx components (Badge, Button, Table, etc.) reference via classes like
      // bg-primary, text-muted-foreground, border-input, etc.
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
      },
      // Border radius tokens, derived from a single --radius CSS variable
      // so rounding can be tuned globally in one place
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      // Custom keyframe animations for Radix's Accordion component (height-based
      // expand/collapse, driven by a CSS variable Radix sets at runtime).
      // Note: no Accordion component has appeared in this codebase so far —
      // this looks like unused shadcn boilerplate, similar to the next-themes note earlier
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      // Named animation utilities built from the keyframes above
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  // Plugin providing the animate-in/animate-out/fade-in-0/zoom-in-95/slide-in-from-*
  // utility classes used throughout the Radix-based ui components (Dialog, Popover, Select)
  plugins: [require("tailwindcss-animate")],
}
