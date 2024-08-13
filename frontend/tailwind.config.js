/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['OxyReg', 'OxyLight', 'OxyBold'],
        heading: ['RufReg', 'RufBold']
      },
      height: {
        '35vh': '35vh',
      },
      width: {
        '80vw': '80vw',
      },
      colors: {
        'custom-gray': '#d1d5db',
        'icon': '#4b5a3d',
        'border': '#564225',
        'navbar': '#71875c',
        'listitem': '#EEECE9',
      },
      boxShadow: {
        'text-outline': '2px 2px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
      },
      spacing: {
        'navbar': '194px',
        'navbar-no-search': '140px',
      },
      backgroundImage: {
        // 'nav': "url('https://www.toptal.com/designers/subtlepatterns/uploads/bananas.png')",
        // 'main': "url('https://www.toptal.com/designers/subtlepatterns/uploads/leaves-pattern.png')",
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.text-shadow-outline': {
          textShadow: '2px 2px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
        },
      });
    },
  ],
}

