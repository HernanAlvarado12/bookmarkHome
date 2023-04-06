/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.{html,js}'],
  darkMode: 'class',
  future: {
    hoverOnlyWhenSupported: true
  },
  theme: {
    extend: {
      colors: {
        red: 'hsl(0, 94%, 66%)',
        blue: {
          DEFAULT: 'hsl(231, 69%, 60%)',
          100: 'hsl(229, 8%, 60%)',
          200: 'hsl(229, 31%, 21%)'
        }
      },
      fontSize: {
        min: '1.2rem',
        xs: '1.4rem',
        sm: '1.6rem',
        lg: '2.8rem',
        xl: '3.2rem',
        '2xl': '3.8rem'
      },
      borderRadius: {
        xs: '0.6rem',
        sm: '0.8rem',
        lg: '1rem'
      }
    },
  },
  plugins: [],
}

