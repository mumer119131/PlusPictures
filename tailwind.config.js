/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2fd9c4",
        secondary: "#3f3f3f",
        secondaryLight: "#f4f4fc",
        secondaryDark: "#1f1f1f",
        white: "#ffffff",
        black: "#000000",
      }
    },
  },
  plugins: [],
}