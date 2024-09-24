import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        paper1: "url('/assets/paper1.svg')",
      },
      aspectRatio: {
        paper: "3 / 4",
        "3/2":"3 / 2"
      },
      colors: {
        lake: "#64a8a8",
        rainforest: "#006400",
        savanna: "#DAA520",
        grassland: "#7CFC00",
        tundra: "#ADD8E6",
        desert: "#F4A460",
        taiga: "#556B2F",
        peachblossom: "#FFC0CB",
        island: "#A52A2A",
      },
    },
  },
  plugins: [],
};
export default config;
