/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily : {
        sofadi: ['Sofadi One'],
        inter: ['Inter'],
        poppin: ['Poppins']
      },
      colors: {
        customBlue: '#0873BB', 
        customBg: '#F7F9FB',
      },
      screen: {
        'defaultsize': '900px'
      }
    },
  },
  plugins: [],
}

