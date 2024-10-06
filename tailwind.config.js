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
        orange: '#D94C00',
      },
      spacing: {
        sm: '5px',
        md: '10px',
        'md-lg': '12px',
        lg: '16px',
        xlg: '20px',
        xxlg: '30px',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        mono: ['var(--font-space-mono)', 'monospace'],
      },
      fontSize: {
        '12-20': ['12px', { lineHeight: '20px' }],
        '14-18': ['14px', { lineHeight: '18px' }],
        '14-22': ['14px', { lineHeight: '22px' }],
        '14-25': ['14px', { lineHeight: '25px' }],
        '14-28': ['14px', { lineHeight: '28px' }],
        '14-30': ['14px', { lineHeight: '30px' }],
        '18-28': ['18px', { lineHeight: '28px' }],
        '28-44': ['28px', { lineHeight: '44px' }],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
