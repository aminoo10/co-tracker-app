import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/flowbite-react/lib/**/*.js'
  ],
  theme: {
    extend: {
      minHeight: {
        '80v': '80vh',
        '85v': '85vh',
        '90v': '90vh',
        '95v': '95vh',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        slideLeft: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideRight: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': {transform: 'translateX(0)'},
        },
        quake: {
          '15%': { transform: 'translateY(50px)'},
          '30%' : {transform: 'translateY(-50px)'},
          '45%' : {transform: 'translateY(50px)'},
          '60%' : {transform: 'translateY(-50px)'},
          '75%' : {transform: 'translateY(50px)'},
        }
      },
      animation: {
        quake: 'quake 0.5s ease-in-out',
        'slide-left': 'slideLeft 0.3s ease-in-out',
        'slide-right': 'slideRight 0.3s ease-in-out',
      }
    },
  },
  plugins: [
    require("flowbite/plugin")
  ],
}

export default config
