/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        vaultic: {
          black: "#050505",
          charcoal: "#0D0D0D",
          orange: "#FF4500", // Lava Orange (Action)
          mint: "#00FFC2",   // Cyber Mint (Growth)
          slate: "#1A1A1A",
        },
      },
      backdropBlur: {
        '3xl': '80px',
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        }
      }
    },
  },
  plugins: [],
};