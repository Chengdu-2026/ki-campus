import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eff6ff",
          100: "#dbeafe",
          500: "#1e50a2",
          600: "#173f82",
          700: "#122f62",
          800: "#0f2a56",
          900: "#0b1f40",
        },
        accent: {
          400: "#22d3ee",
          500: "#06b6d4",
          600: "#0891b2",
        },
      },
      borderRadius: { xl: "0.9rem" },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
