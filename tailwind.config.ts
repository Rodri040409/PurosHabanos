import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Inter', ...defaultTheme.fontFamily.sans],
        switzer: ['Switzer', 'sans-serif'], // Agregar la fuente Switzer
        switzerBlackItalic: ['Switzer-BlackItalic', 'sans-serif'], // Agregar la variante Switzer Black Italic
      },
      colors: {
        primary: {
          50: 'rgb(var(--tw-color-primary-50) / <alpha-value>)',
          100: 'rgb(var(--tw-color-primary-100) / <alpha-value>)',
          200: 'rgb(var(--tw-color-primary-200) / <alpha-value>)',
          300: 'rgb(var(--tw-color-primary-300) / <alpha-value>)',
          400: 'rgb(var(--tw-color-primary-400) / <alpha-value>)',
          500: 'rgb(var(--tw-color-primary-500) / <alpha-value>)',
          600: 'rgb(var(--tw-color-primary-600) / <alpha-value>)',
          700: 'rgb(var(--tw-color-primary-700) / <alpha-value>)',
          800: 'rgb(var(--tw-color-primary-800) / <alpha-value>)',
          900: 'rgb(var(--tw-color-primary-900) / <alpha-value>)',
          950: 'rgb(var(--tw-color-primary-950) / <alpha-value>)',
        },
        dark: '#222222',
      },
      keyframes: {
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
            opacity: '0.99',
            filter:
              'drop-shadow(0 0 1px rgba(252, 211, 77)) drop-shadow(0 0 15px rgba(245, 158, 11)) drop-shadow(0 0 1px rgba(252, 211, 77))',
          },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
            opacity: '0.4',
            filter: 'none',
          },
        },
        rotateLogo: {
          '0%': {
            transform: 'translateX(-100vw) rotate(0deg)', // Empieza fuera de la pantalla (izquierda)
          },
          '50%': {
            transform: 'translateX(0%) rotate(360deg)', // Mueve al centro con 1 vuelta
          },
          '60%': {
            transform: 'translateX(0%) rotate(360deg)', // Se queda en el centro por 1s
          },
          '100%': {
            transform: 'translateX(100vw) rotate(720deg)', // Sale por el lado derecho, rotando una vez más
          },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-700px 0',
          },
          '100%': {
            backgroundPosition: '700px 0',
          },
        },
        'blur-text': {
          '0%, 100%': {
            filter: 'blur(4px)',
            opacity: '0',
          },
          '50%': {
            filter: 'blur(0px)',
            opacity: '1',
          },
        },
        'fade-out': {
          '0%': {
            opacity: '1',
          },
          '100%': {
            opacity: '0',
          },
        },
        'heroLogoEnter': {
          '0%': {
            transform: 'translateX(100vw) rotate(0deg)',
            opacity: '0',
          },
          '80%': {
            transform: 'translateX(0) rotate(-720deg)',
            opacity: '1',
          },
          '100%': {
            transform: 'translateX(0) rotate(-720deg)',
            opacity: '1',
          },
        }
      },
      animation: {
        flicker: 'flicker 3s linear infinite',
        shimmer: 'shimmer 1.3s linear infinite',
        rotateLogo: 'rotateLogo 4s ease-in-out forwards',
        'blur-text': 'blur-text 3s ease-out', // Cambié a duración fija para evitar repetición infinita
        'fade-out': 'fade-out 1s ease-out 2s forwards',
        heroLogoEnter: 'heroLogoEnter 2.5s ease-out forwards',
      },
      clipPath: {
        'hero': 'polygon(50%)',
        'ellipse': 'ellipse(50% 50% at 50% 50%)',
        'polygon': 'polygon(50% 0%, 100% 100%, 0% 100%)',
        // Agregar más formas personalizadas
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    // Plugin para añadir utilidades de clip-path
    function ({ addUtilities, theme, e }: any) {
      const clipPaths = theme('clipPath');
      const clipPathUtilities = Object.keys(clipPaths).reduce((acc: any, key: string) => {
        acc[`.${e(`clip-${key}`)}`] = { clipPath: clipPaths[key] };
        return acc;
      }, {});

      addUtilities(clipPathUtilities, ['responsive', 'hover']);
    },
  ],
} satisfies Config;
