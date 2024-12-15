/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // FOR LIGHT THEME
        blue: {
          // 1100: "#0284c7",
          1100: "#38bdf8",
        },
        white: "#ffffff",

        // FOR DARK THEMEN
        // dark: "#0f172a",
        dark: "#030712",
      },
    },
  },
  plugins: [],
};
