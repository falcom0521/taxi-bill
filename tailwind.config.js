/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#0F172A',
        accent: '#2563EB',
        surface: '#F8FAFC',
      },
      boxShadow: {
        soft: '0 10px 35px -12px rgba(15, 23, 42, 0.2)',
      },
    },
  },
  plugins: [],
};
