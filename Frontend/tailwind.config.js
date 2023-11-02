/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['Montserrat']
      },
      colors: {
        'Purple':  '#B0A0DF',
        'Purple-ligth':  '#DFD6FB',
        'Green': '#BEDEBA',
        'Gray-dark': '#383838',
        'Gray': '#E9E9E9',
      },
    },
  },
  plugins: [],
}

