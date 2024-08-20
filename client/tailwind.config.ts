import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      fontSize: {
        h1: '3.5rem'
      },
      colors: {
        primary: '#1A2C50',
        'sunshine-yellow': '#FFBE00',
        'sweet-red': '#FF6B6B',
        'sky-blue': '#118EEA',
        'pastel-yellow': '#F2C46F',
        shade: {
          100: '#FFFFFF',
          200: '#DADFE8',
          300: '#BDC5D4',
          400: '#9DA8BE',
          500: '#8F98AA',
          600: '#5A637A',
          700: '#414A62',
          800: '#333D58',
          900: '#333333'
        }
      }
    }
  },
  plugins: []
}
export default config
