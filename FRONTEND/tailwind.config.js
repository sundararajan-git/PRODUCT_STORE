/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // FOR LIGHT THEME
        blue: "0284c7",

        // FOR DARK THEMEN

        dark: "#0f172a",
      },
    },
  },
  plugins: [],
};
