/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // if you're using the app directory
    "./pages/**/*.{js,ts,jsx,tsx}", // if you're using the pages directory
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
       screens: {
        "2xl": "1440px",
      },
      fontFamily: {
        poppins: ["var(--font-poppins)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
