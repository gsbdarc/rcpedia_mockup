/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}',
    './overrides/**/*.html'
  ],
  theme: {
    extend: {},
  },
  presets: [
    require('decanter'),
  ],
  plugins: [],
}

