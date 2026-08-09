/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        field: {
          50: '#f2f6f2',
          100: '#dfe9e0',
          200: '#b9cfbb',
          300: '#8fb193',
          400: '#5f8d67',
          500: '#3e6f48',
          600: '#2c5638',
          700: '#1f4230',
          800: '#173226',
          900: '#0f231a',
          950: '#091712',
        },
        mustard: {
          50: '#fdf8e9',
          100: '#f9ecc0',
          200: '#f2d885',
          300: '#e9bf4c',
          400: '#dda528',
          500: '#c1861a',
          600: '#996714',
          700: '#734d10',
        },
        soil: {
          50: '#f7f4f1',
          100: '#e9e0d8',
          200: '#cdb9a7',
          300: '#a98a6f',
          400: '#8a6a4f',
          500: '#6b4f3a',
          600: '#4f3a2a',
          700: '#382a1e',
        },
        paper: '#f7f5ee',
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        soft: '0 2px 10px -2px rgba(15, 35, 26, 0.12)',
        card: '0 4px 20px -6px rgba(15, 35, 26, 0.18)',
      },
      borderRadius: {
        xl2: '1.1rem',
      },
    },
  },
  plugins: [],
};
