import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        accent: "var(--accent)",
        muted: "var(--muted)",
        border: "var(--border)",
        error: "var(--error)",
        success: "var(--success)",
        bgOpac: "var(--bgOpac)",
        icons: "var(--icons)",
        iconsHover: "var(--iconsHover)",
        cardsBorder: "var(--cardsBorder)",
        cards: "var(--cards)",
        borderHover: "var(--borderHover)",
      },
    },
  },
  plugins: [],
} satisfies Config;
