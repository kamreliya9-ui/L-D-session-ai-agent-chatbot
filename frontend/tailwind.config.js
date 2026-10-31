/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#FBF8EE',
          100: '#F5EED5',
          200: '#EBDCA9',
          300: '#DEC477',
          400: '#D4AF37',
          500: '#C29B27',
          600: '#A47D1C',
          700: '#7E5B17',
          800: '#5F4416',
          900: '#433013',
        },
        noir: {
          950: '#0B0A09',
          900: '#12100E',
          850: '#181613',
          800: '#201D19',
          750: '#2A2621',
          700: '#35302A',
        },
        stone: {
          50: '#FAF8F5',
          100: '#F3EFEA',
          200: '#E5DFD6',
          300: '#D2C8BC',
          400: '#B5A897',
          500: '#948573',
          600: '#766857',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'luxe': '0 20px 50px rgba(0, 0, 0, 0.7)',
        'gold-glow': '0 0 35px rgba(212, 175, 55, 0.25)',
      }
    },
  },
  plugins: [],
}
