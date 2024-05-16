import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
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
      }
    },
  },
  plugins: [],
}

export default config
