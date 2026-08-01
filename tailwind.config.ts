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
        zotdor: {
          green: {
            DEFAULT: "#1b3e2b",
            hover: "#122b1e",
            light: "#2d5a3f",
            soft: "#e8f0eb",
          },
          sand: {
            DEFAULT: "#f7f4ee",
            card: "#ffffff",
            dark: "#e8e2d5",
            accent: "#f0eae1",
          },
          earth: {
            DEFAULT: "#4a3728",
            dark: "#38271a",
            light: "#8c6f56",
          },
          text: {
            main: "#1c261e",
            muted: "#526054",
            light: "#829285",
          },
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      minHeight: {
        touch: "48px",
      },
      minWidth: {
        touch: "48px",
      },
    },
  },
  plugins: [],
};

export default config;
