/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      width:{
        '1130': '1130px',
      },
      // colors:{
      //   'ContentOutline':'#F5F5F5'
      // }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}