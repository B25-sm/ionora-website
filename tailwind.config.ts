import type { Config } from 'tailwindcss'
const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./data/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: { DEFAULT: "1rem", sm: "1rem", md: "1.25rem", lg: "1.5rem", xl: "2rem", "2xl": "2rem" } },
    extend: {
      colors: {
        // Background - Dark Blue
        bg: {
          DEFAULT: '#0A2238',
        },
        // Primary - Light Grey
        primary: {
          DEFAULT: '#EBEBEB',
          50: '#E4E7EB',
          100: '#C9CFD7',
          200: '#939FAF',
          300: '#5D6F87',
          400: '#335070',
          500: '#0A2238',
          600: '#081B2D',
          700: '#061422',
          800: '#040D17',
          900: '#02060B',
        },
        // Accent - Light Grey
        accent: {
          DEFAULT: '#EBEBEB',
          50: '#E4E7EB',
          100: '#C9CFD7',
          200: '#939FAF',
          300: '#5D6F87',
          400: '#335070',
          500: '#0A2238',
          600: '#081B2D',
          700: '#061422',
          800: '#040D17',
          900: '#02060B',
        },
        // Secondary - Light Grey shades
        secondary: {
          DEFAULT: '#EBEBEB',
          50: '#EBEBEB',
          100: '#D1D1D1',
          200: '#A3A3A3',
          300: '#757575',
          400: '#474747',
          500: '#0A2238',
          600: '#081B2D',
          700: '#061422',
          800: '#040D17',
          900: '#02060B',
        },
        // Button/CTA - Primary
        cta: {
          DEFAULT: '#EBEBEB',
          50: '#E4E7EB',
          100: '#C9CFD7',
          200: '#939FAF',
          300: '#5D6F87',
          400: '#335070',
          500: '#0A2238',
          600: '#081B2D',
          700: '#061422',
          800: '#040D17',
          900: '#02060B',
        },
      },
      screens: {
        xs: "360px",
        sm: "480px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
        "3xl": "1920px",
        "4xl": "2560px",
        "5xl": "3840px", // 4K screens
        "6xl": "5120px", // 5K+ screens
      },
    },
  },
  plugins: [],
}
export default config