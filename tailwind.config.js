/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./overrides/partials/footer.html"],
  presets: [
    require('decanter')
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

