/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx,css}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx,css}',
  ],
  theme: {
    screens: {
      xs: '480px', // => @media (min-width: 480px) { ... }
      sm: '576px', // => @media (min-width: 576px) { ... }
      md: '768px', // => @media (min-width: 768px) { ... }
      lg: '992px', // => @media (min-width: 992px) { ... }
      xl: '1200px', // => @media (min-width: 1200px) { ... }
      xxl: '1600px', // => @media (min-width: 1600px) { ... }
    },
    container: { center: true },
    extend: {
      colors: {
        'color-primary': 'var(--color-primary)',
        'color-primary-hover': 'var(--color-primary-hover)',
        'color-primary-active': 'var(--color-primary-active)',
        'color-secondary': 'var(--color-secondary)',
        'color-success': 'var(--color-success)',
        'color-error': 'var(--color-error)',
        'color-warning': 'var(--color-warning)',
        'color-link': 'var(--color-link)',
        'color-link-hover': 'var(--color-link-hover)',
        'color-link-active': 'var(--color-link-active)',
        'color-bg-light': 'var(--color-bg-light)',
        'color-bg-dark': 'var(--color-bg-dark)',
        'color-txt-light': 'var(--color-txt-light)',
        'color-txt-dark': 'var(--color-txt-dark)',
        'color-gray': 'var(--color-gray)',
      },
      fontFamily: {
        // use next.js google fonts variables
        'font-montserrat': 'var(--font-montserrat)',
        'font-roboto': 'var(--font-roboto)',
      },
      fontSize: {
        'h1-font-size': '32px',
        'h2-font-size': '24px',
        'h3-font-size': '18.72px',
        'h4-font-size': '16px',
        'normal-font-size': '15.008px',
        'small-font-size': '13.008px',
        'smaller-font-size': '12px',
        'tiny-font-size': '10px',
      },
      fontWeight: {
        'font-normal': '400',
        'font-medium': '500',
        'font-semi-bold': '600',
        'font-bold': '800',
      },
      borderRadius: {
        'rounded-default': 'var(--border-radius)',
      },
      zIndex: {
        'z-normal': '1',
        'z-tooltip': '10',
        'z-fixed': '100',
      },
      keyframes: {
        rotating: {
          '0%, 100%': { transform: 'rotate(360deg)' },
          '50%': { transform: 'rotate(0deg)' },
        },
      },
      animation: {
        rotating: 'rotating 30s linear infinite',
        'ping-once': 'ping 5s cubic-bezier(0, 0, 0.2, 1)',
        'spin-1.5': 'spin 1.5s linear infinite',
      },
    },
  },
  corePlugins: { preflight: false },
  plugins: [],
};
