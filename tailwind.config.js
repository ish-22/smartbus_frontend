/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'xs': '320px',
      'sm': '375px',
      'md': '414px',
      'lg': '768px',
      'xl': '1024px',
      '2xl': '1280px',
    },
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        blue: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        green: {
          500: '#10b981',
          600: '#059669',
          700: '#047857',
        },
        red: {
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
        },
        yellow: {
          500: '#f59e0b',
        },
        orange: {
          500: '#f97316',
          600: '#ea580c',
        },
        purple: {
          600: '#9333ea',
          700: '#7c3aed',
        },
        teal: {
          600: '#0d9488',
        },
        indigo: {
          600: '#4f46e5',
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      },
      animation: {
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'flash': 'flash 0.5s ease-in-out',
        'fade-in': 'fadeIn 200ms ease-out',
        'slide-in': 'slideIn 0.2s ease-out',
        'loading': 'loading 1.5s infinite',
      },
      keyframes: {
        flash: {
          '0%': { backgroundColor: 'rgba(59, 130, 246, 0.1)' },
          '50%': { backgroundColor: 'rgba(59, 130, 246, 0.3)' },
          '100%': { backgroundColor: 'transparent' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-4px)', opacity: '0.8' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        loading: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      },
      backdropBlur: {
        'xs': '2px',
      },
      backgroundSize: {
        '200%': '200% 100%',
      },
    },
  },
  plugins: [],
}