/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50:  '#edfaf4',
          100: '#d0f3e5',
          200: '#a3e8cc',
          400: '#5fcfa3',
          500: '#3DBE8B',
          600: '#2da578',
          700: '#228060',
          800: '#185e46',
          900: '#0f3d2d',
          950: '#081f17',
        },
      },
      boxShadow: {
        'glow':  '0 0 60px rgba(16,185,129,0.20)',
        'glow-lg': '0 0 100px rgba(16,185,129,0.25)',
        'card': '0 4px 24px rgba(11,18,32,0.07)',
        'card-hover': '0 12px 40px rgba(11,18,32,0.12)',
      },
    },
  },
  plugins: [],
};
