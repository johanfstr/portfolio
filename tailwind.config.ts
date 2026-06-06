import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,js,jsx}",
    "./pages/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        ripple: {
          "0%": { transform: "translate(-50%, -50%) scale(1)", opacity: "0.8" },
          "100%": { transform: "translate(-50%, -50%) scale(4)", opacity: "0" },
        },
      },
      animation: {
        ripple: "ripple 0.5s ease-out forwards",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
