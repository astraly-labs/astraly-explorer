const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: 'class',
  purge: ['./src/pages/**/*.tsx', './src/components/**/*.tsx', './src/layout/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Avenir Next', ...defaultTheme.fontFamily.sans],
        heading: ['Druk Wide Web', ...defaultTheme.fontFamily.sans],
      },
      lineHeight: {
        12: '1.2',
        128: '1.28',
        131: '1.31',
        138: '1.38',
        15: '1.5',
      },
      spacing: {
        22: '48px',
      },
      fontSize: {
        12: '12px',
        14: '14px',
        16: '16px',
        20: '20px',
        24: '24px',
        40: '40px',
        54: '54px',
      },
      colors: {
        primaryDark: '#370063',
        primaryClear: '#9D69DE',
        primary: '#8F00FF',
        primaryClearBg: '#FAF3FF',
        whitePurple: '#C89CFF',
        gray: '#898989',
        bgPurple: 'rgba(143, 0, 255, 0.05)',
        primaryClearBgDark: '#161616',
        gray3: '#2C2A30',
      },
      maxWidth: {
        '558px': '558px',
      },
      width: {
        50: '200px',
        90: '360px',
        127: '508px',
        147: '588px',
      },
      height: {
        50: '200px',
        82: '328px',
        149: '569px',
      },
      boxShadow: {
        purpleDark: '0px 20px 35px rgba(55, 0, 99, 0.2)',
        purpleLight: '0px 32px 48px rgba(55, 0, 99, 0.08)',
      },
      margin: {
        '-13': '-52px',
        '-100': '-400px',
      },
    },
  },
  plugins: [],
}
