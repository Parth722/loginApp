module.exports = {
  purge: {
    enabled: true,
    content: [
      './src/components/*.js',
      './src/*.js'
    ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      'sans': ['Montserrat', 'Opensans', 'Roboto', 'Lato']
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
