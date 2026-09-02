import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        /* Brand blue — sampled from the Krystallo logo (#2678D1 / #3873C2) */
        crystal: {
          50: '#EFF7FE',
          100: '#DBEDFC',
          200: '#BEDFFA',
          300: '#8FC8F5',
          400: '#59A8EA',
          500: '#2678D1',
          600: '#1C61B4',
          700: '#1A4E92',
          800: '#1B4278',
          900: '#1B3A63',
          950: '#122540',
          DEFAULT: '#2678D1',
          light: '#59A8EA',
          dark: '#1C61B4',
        },
        /* Aqua sparkle accent — sampled from the logo (#6ECFE1) */
        aqua: {
          50: '#EEFBFD',
          100: '#D6F4F9',
          200: '#B0E9F3',
          300: '#6ECFE1',
          400: '#3BB4CD',
          500: '#1F95B0',
          600: '#1A7893',
          DEFAULT: '#6ECFE1',
        },
        ink: {
          50: '#F5F8FC',
          100: '#E8EFF7',
          200: '#CFDCEB',
          300: '#A6BAD2',
          400: '#6B84A3',
          500: '#4B6280',
          600: '#365071',
          700: '#25405E',
          800: '#16304C',
          900: '#0F2440',
          950: '#0A1930',
          DEFAULT: '#0F2440',
        },
        navy: {
          50: '#F5F8FC',
          100: '#E8EFF7',
          DEFAULT: '#16304C',
          dark: '#0F2440',
        },
        body: '#4B6280',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        whatsapp: {
          DEFAULT: '#25D366',
          dark: '#1FAD55',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        '4xl': '2rem',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(15,36,64,0.04), 0 8px 24px -12px rgba(15,36,64,0.12)',
        'card-hover': '0 2px 4px rgba(15,36,64,0.04), 0 18px 40px -16px rgba(15,36,64,0.22)',
        brand: '0 10px 30px -10px rgba(38,120,209,0.55)',
        'brand-lg': '0 18px 44px -12px rgba(38,120,209,0.5)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'grow-x': {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out',
        'fade-in': 'fade-in 0.5s ease-out',
        sparkle: 'sparkle 2s ease-in-out infinite',
        shimmer: 'shimmer 3s ease-in-out infinite',
        float: 'float 3s ease-in-out infinite',
        marquee: 'marquee 30s linear infinite',
        'grow-x': 'grow-x 1.3s ease-in-out 0.25s both',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
}

export default config
