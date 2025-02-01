/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // for light theme
        blue: {
          1100: "#38bdf8",
        },
        white: "#ffffff",

        // for dark theme
        dark: "#030712",
      },
    },
  },
  plugins: [],
};
