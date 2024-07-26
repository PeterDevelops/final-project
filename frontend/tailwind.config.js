/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      height: {
        '50vh': '50vh',
      },
      width: {
        '80vw': '80vw',
      },
    },
  },
  plugins: [],
}

