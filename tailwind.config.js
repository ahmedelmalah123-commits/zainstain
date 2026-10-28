/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1a05a2',
        magenta: '#8f0177',
        rose: '#de1a58',
        orange: '#f67d31',
        dark: '#04020f',
        surface: '#0a061f',
      },
      fontFamily: {
        mono: ['Space Mono', 'monospace'],
        sans: ['Cairo', 'sans-serif'],
      },
      backdropBlur: {
        'xl': '20px',
      },
      animation: {
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-border': 'pulse-border 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        'pulse-border': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(246, 125, 49, 0.4)' },
          '50%': { boxShadow: '0 0 0 10px rgba(246, 125, 49, 0)' },
        },
        'glow': {
          '0%, 100%': { 
            textShadow: '0 0 10px rgba(246, 125, 49, 0.5), 0 0 20px rgba(246, 125, 49, 0.3)',
            opacity: '1'
          },
          '50%': { 
            textShadow: '0 0 20px rgba(246, 125, 49, 0.8), 0 0 30px rgba(246, 125, 49, 0.5)',
            opacity: '0.9'
          },
        },
      },
    },
  },
  plugins: [],
}
