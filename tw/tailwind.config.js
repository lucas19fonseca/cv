/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Poppin: ['Poppins', 'sans-serif'],
      },
      keyframes: {
        'move-forever': {
          '0%': { transform: 'translate3d(-90px, 0, 0)' },
          '100%': { transform: 'translate3d(85px, 0, 0)' },
        },
      },
      animation: {
        'move-forever': 'move-forever 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite',
      },
    },
  },
  plugins: [],
}
