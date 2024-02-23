/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'my_orange': '#FFC47E',
        'brown': '#8B4513'
      }
    },

  },
  plugins: [],
}

