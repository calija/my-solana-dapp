/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        background: '#000000',
        card: '#141414',
        gray1: '#B2B2B2',
        gray2: '#787878',
        gray3: '#7D7D7D',
        gray4: '#434343',
        gray5: '#3D3D3D',
        green1: '#003628',
        green2: '#06D6A0',
        green3: '#07A87E',
        orange: '#FF5900',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        mono: ['var(--font-space-mono)', 'monospace'],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
