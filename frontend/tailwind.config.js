/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        spotifyBlack: '#191414',
        spotifyGreen: '#1DB954',
        spotifyGray: '#535353',
        spotifyWhite: '#FFFFFF',
      }
    },
  },
  plugins: [],
}

