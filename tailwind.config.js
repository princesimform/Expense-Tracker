/** @type {import('tailwindcss').Config} */
import neutral from "./src/theme/color";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        sans: ["sans-serif"],
      },
      colors: {
        primary: '#8f24bd',
      },
    },
  },
  plugins: [],
};
