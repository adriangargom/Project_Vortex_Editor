/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      keyframes: {
        smoothYExpand: {
          '0%': { 
            zIndex: '30',
            transform: 'scaleY(0)',
            opacity: '0',
            display: 'block',
          },
          '100%': { 
            transform: 'scaleY(1)',
            opacity: '1',
          }
        },
        smoothYContract: {
          '0%': { 
            display: 'block',
            transform: 'scaleY(1)',
            opacity: '1',
          },
          '100%': { 
            transform: 'scaleY(0)',
            opacity: '0',
            display: 'none',
          }
        }
      },
      animation: {
        'smooth-y-expand': 'smoothYExpand .25s ease-in-out forwards',
        'smooth-y-contract': 'smoothYContract .25s ease-in-out forwards'
      }
    },
  },
  plugins: [],
}

