/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        shake: {
          '0%, 100%': {transform: 'translateX(0)'},
          '25%': {transform: 'translateX(-5px)'},
          '50%': {transform: 'translateX(5px)'},
          '75%': {transform: 'translateX(-5px)'},
        },
        fadeIn: {
          '0%': {opacity: 0},
          '100%': {opacity: 1},
        },
      },
      animation: {
        shake: 'shake 0.4s ease-in-out',
        fadeIn: 'fadeIn 0.5s ease-in-out', // Added fade-in animation
      },
    },
  },
  plugins: [],
};