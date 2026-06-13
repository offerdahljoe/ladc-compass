import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#24313f",
        paper: "#fbfaf7",
        sage: "#6f8f7a",
        lagoon: "#2f7f8f",
        clay: "#b66a55",
        marigold: "#d49b3d",
      },
      boxShadow: {
        soft: "0 12px 35px rgba(36, 49, 63, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
