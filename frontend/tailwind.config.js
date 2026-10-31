/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: '#F5F0E7',
          light: '#F8F4EC',
          soft: '#FAF7F2',
        },
        champagne: {
          DEFAULT: '#EAE1D2',
          light: '#EDE4D6',
          dark: '#DCCBB0',
        },
        espresso: {
          DEFAULT: '#211A16',
          dark: '#171310',
          charcoal: '#211C18',
          deep: '#1A1411',
          surface: '#2A211B',
        },
        taupe: {
          DEFAULT: '#786B60',
          muted: '#8C7E72',
          light: '#A89B8F',
          dark: '#5C5148',
        },
        gold: {
          DEFAULT: '#B39754',
          antique: '#B39754',
          light: '#C7A968',
          dark: '#A48642',
          sheen: '#D8BD7C',
        },
        olive: {
          DEFAULT: '#656B4F',
          muted: '#656B4F',
          soft: '#7A8062',
          light: '#8E9475',
        },
        beige: {
          DEFAULT: '#D8CCBA',
          subtle: '#E4D9C8',
          border: '#D8CCBA',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Manrope"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 4px 20px -2px rgba(33, 26, 22, 0.05)',
        'elevated': '0 12px 36px -4px rgba(33, 26, 22, 0.08)',
        'luxe': '0 24px 60px -12px rgba(33, 26, 22, 0.12)',
        'dark-luxe': '0 24px 60px -12px rgba(0, 0, 0, 0.4)',
      },
      letterSpacing: {
        'widest-luxury': '0.25em',
        'subtle-caps': '0.15em',
      }
    },
  },
  plugins: [],
}
