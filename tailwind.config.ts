import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Go language branding colors
        go: {
          // Primary blue color
          blue: {
            light: "#5DC9E2",
            DEFAULT: "#00ADD8",
            dark: "#007D9C",
            darker: "#00526A",
          },
          // Secondary colors
          black: "#2E2E2E",
          gray: {
            light: "#F0F0F0",
            DEFAULT: "#D2D6DE",
            dark: "#9E9E9E",
          },
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-roboto-mono)", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-pattern": "url('/images/hero-pattern.svg')",
      },
    },
  },
  plugins: [],
};

export default config;
