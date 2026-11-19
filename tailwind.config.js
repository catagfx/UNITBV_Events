/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"UT Sans"', '"UT-Sans"'],
        heading: ['"UT Sans"', '"UT-Sans"'],
        mono: ['"UT Sans"', '"UT-Sans"'],
      },
      colors: {
        unitbv: {
          blue: '#003C7E',
          dark: '#002652',
          light: '#0055A5',
          cyan: '#288ABA',
          green: '#1DA63F',
        },
        tsg: {
          navy: '#0C2442',
          deep: '#07172B',
          gold: '#FAD027',
          goldHover: '#E5BD1B',
        }
      }
    },
  },
  plugins: [],
}
