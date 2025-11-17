/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-pink': '#fde2e4',
        'brand-purple': '#cddafd',
        'brand-blue': '#a2d2ff',
        'brand-green': '#bde0fe',
        'brand-yellow': '#fff1e6',
        'brand-text': '#574143',
        'brand-primary': '#ff8fab',
        'brand-secondary': '#fb6f92',
      },
      fontFamily: {
        'sans': ['"Comic Sans MS"', 'cursive', 'sans-serif'],
        'display': ['"Fredoka One"', 'cursive'],
      },
    },
  },
  plugins: [],
}