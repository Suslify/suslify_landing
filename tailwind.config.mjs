/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Reshaded around the brand mark green #00BF8A (see public/favicon.svg)
        brand: {
          50:  '#f5fcfa',
          100: '#e6f9f3',
          200: '#c7f1e5',
          300: '#99e5d0',
          400: '#59d5b3',
          500: '#00bf8a',
          600: '#00a477',
          700: '#008661',
          800: '#0a6349',
          900: '#0a4232',
          950: '#06241a',
        },
      },
      boxShadow: {
        'glow':  '0 0 60px rgba(0,191,138,0.20)',
        'glow-lg': '0 0 100px rgba(0,191,138,0.25)',
        'card': '0 4px 24px rgba(11,18,32,0.07)',
        'card-hover': '0 12px 40px rgba(11,18,32,0.12)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
