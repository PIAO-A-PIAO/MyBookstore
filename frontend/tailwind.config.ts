import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontSize: {
        h1: ["32px", { lineHeight: "40px", fontWeight: "bold" }],
        h2: ["28px", { lineHeight: "34px", fontWeight: "bold" }],
        h3: ["24px", { lineHeight: "28px", fontWeight: "bold" }],
        h4: ["18px", { lineHeight: "24px", fontWeight: "bold" }],
        h5: ["16px", { lineHeight: "18px", fontWeight: "bold" }],
        h6: ["14px", { lineHeight: "16px", fontWeight: "bold" }],
        body1: ["18px", "150%"],
        body2: ["16px", "150%"],
        body3: ["14px", "150%"],
        body4: ["12px", "150%"],
        body5: ["10px", "150%"],
        caption: ["12px", "150%"],
        cap3: ["12px", { lineHeight: "16px", fontWeight: "medium" }],
        cap2: ["14px", { lineHeight: "16px", fontWeight: "medium" }],
        cap1: ["16px", { lineHeight: "20px", fontWeight: "medium" }],
        btn1: ["16px", { lineHeight: "150%", fontWeight: "medium" }],
        btn2: ["14px", { lineHeight: "150%", fontWeight: "medium" }],
        btn3: ["12px", { lineHeight: "150%", fontWeight: "medium" }],
      },
      colors: {
        blue: {
          lightest: "#E8EEFF",
          light: "#B4D7FF",
          cta: "#0C57A5",
          dark: "#001349",
        },
        red: {
          error: "#C81E1E",
        },
        orange: {
          light: "#FEF6EE",
          cta: "#F9DBAF",
          dark: "#B93815",
        },
      },
    },
  },
  plugins: [],
};
export default config;
