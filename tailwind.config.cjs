/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        lopi: {
          grey: {
            "extra-light": "#454545",
            light: "#303030",
            DEFAULT: "#1f1f1f",
          },
          white: "#f0f0f0",
          blue: {
            DEFAULT: "#34a3e0",
            mid: "#008eca",
            dark: "#1672a2",
          },
        },
      },
    },
  },
  plugins: [],
};
