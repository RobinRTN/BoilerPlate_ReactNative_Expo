/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',  // Main App
    './src/**/*.{js,jsx,ts,tsx}',  // All source files in src
  ],
  theme: {
    extend: {
      colors: {
        'olympic-blue': '#0085C7',    // Olympic Blue
        'gold-medal': '#FFD700',      // Gold Medal
        'silver-shine': '#C0C0C0',    // Silver Shine
        'victory-red': '#E4002B',     // Victory Red
        'pure-white': '#FFFFFF',      // Pure White
        'athletic-green': '#00A86B',  // Athletic Green
        'dark-navy': '#02012B',       // Dark Navy Blue for Background
        'light-navy': '#1c2432',
        'contrast-navy': '#2E3743',
        'light-purple': '#b1b9ff',
        'classic-purple': '#818CF8',
        'darker-purple': '#636ed2',
        'black-purple': '#0e1340',
        'beige': '#FFECC3',
        'beige-variant': '#FBEEDA',
        'beige-light': '#FDF7ED',
        'black-alternative': '#171C4F',
        'black-alternative-light': '#1d2262',
        'black-alternative-lighter': '#40488F',
      },
    },
  },
  plugins: [],
}
