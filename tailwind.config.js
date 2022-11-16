/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors:{
        brand: '#F96162',
        kakao: '#F1C86F',
        brawon: '#816C5B',
        brawons:'#763931',
        org : '#E48E59'
      },
      backgroundImage:{
        banner :`url('../public/images/banner.jpg')`
      }
    },
  },
  plugins: [],
}
