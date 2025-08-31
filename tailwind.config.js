/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'rgb(var(--color-bg-secondary))',
          100: 'rgb(var(--color-bg-tertiary))',
          900: 'rgb(var(--color-text-primary))',
        },
        gray: {
          50: 'rgb(var(--color-bg-secondary))',
          100: 'rgb(var(--color-bg-tertiary))',
          200: 'rgb(var(--color-border-light))',
          300: 'rgb(var(--color-border))',
          600: 'rgb(var(--color-text-tertiary))',
          700: 'rgb(var(--color-text-secondary))',
          900: 'rgb(var(--color-text-primary))',
        }
      },
      backgroundColor: {
        'primary': 'rgb(var(--color-bg-primary))',
        'secondary': 'rgb(var(--color-bg-secondary))',
        'tertiary': 'rgb(var(--color-bg-tertiary))',
      },
      textColor: {
        'primary': 'rgb(var(--color-text-primary))',
        'secondary': 'rgb(var(--color-text-secondary))',
        'tertiary': 'rgb(var(--color-text-tertiary))',
      },
      borderColor: {
        'primary': 'rgb(var(--color-border))',
        'light': 'rgb(var(--color-border-light))',
      }
    },
  },
  plugins: [],
};
