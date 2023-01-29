/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './**/*.tsx'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'abstract': 'url("/background.png")'
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif']
      },
      screens: {
        'xs': '322px'
      },
      borderRadius: {
        '4xl': '28px'
      }
    },
  },
  plugins: [],
}
