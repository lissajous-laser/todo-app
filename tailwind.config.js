/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    screens: {
      'xs': '376px',
      'sm': '540px',
      'md': '640px',
    },
    colors: {
      'very-light-gray': 'hsl(0, 0%, 98%)',
      'very-light-grayish-blue': 'hsl(236, 33%, 92%)',
      'light-grayish-blue': 'hsl(233, 11%, 84%)',
      'dark-grayish-blue': 'hsl(236, 9%, 61%)',
      'very-dark-grayish-blue': 'hsl(235, 19%, 35%)',
      'icon-blue': 'hsl(192, 100%, 67%)',
      'icon-purple': 'hsl(280, 87%, 65%)',
      'white': 'rgb(255, 255, 255)',
      'bright-blue': 'hsl(220, 98%, 61%)',
      'very-dark-blue': 'hsl(235, 21%, 11%)',
      'very-dark-desaturated-blue': 'hsl(235, 24%, 19%)',
      'light-grayish-blue-dark-mode': 'hsl(234, 39%, 85%)',
      'light-grayish-blue-hover': 'hsl(236, 33%, 92%)',
      'dark-grayish-blue-dark-mode': 'hsl(234, 11%, 52%)',
      'very-dark-grayish-blue-dark-mode-1': 'hsl(233, 14%, 35%)',
      'very-dark-grayish-blue-dark-mode-2': 'hsl(237, 14%, 26%)'
    },
    extend: {
      spacing: {
        '5minus': '1.15rem',
        '6minus': '1.4rem',
        '132':  '530px'
      },
      animation: {
        'lightToDark': 'lightToDark 0.15s linear',
        'darkToLight': 'darkToLight 0.15s linear',
      },
      keyframes: {
        lightToDark: {
          '0%': {
            'background-color': 'hsl(0, 0%, 98%)'
          },
          '100%': {
            'background-color': 'hsl(235, 21%, 11%)'
          }
        },
        darkToLight: {
          '0%': {
            'background-color': 'hsl(235, 21%, 11%)'            
          },
          '100%': {
            'background-color': 'hsl(0, 0%, 98%)'
          }
        }
      }
    },

  },
  plugins: [],
}
