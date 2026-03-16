import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sand: {
          50: "#fbf7f0",
          100: "#f6efe3",
          200: "#eadcc7",
          300: "#dcc5a4",
          400: "#c9a57c",
          500: "#b48b5c",
          600: "#9a7048",
          700: "#7b573a",
          800: "#5d4330",
          900: "#3e2d22"
        },
        ink: {
          900: "#1b1410",
          800: "#2a201a",
          700: "#3a2c24"
        }
      },
      boxShadow: {
        soft: "0 20px 60px rgba(27,20,16,.18)",
        lift: "0 18px 40px rgba(27,20,16,.22)",
      },
      borderRadius: {
        xl2: "1.25rem"
      },
      fontFamily: {
        display: ["ui-serif", "Georgia", "serif"],
        body: ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"],
      },
      keyframes: {
        sheen: {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(120%)" }
        }
      },
      animation: {
        sheen: "sheen 1.2s ease-in-out"
      }
    },
  },
  plugins: [],
} satisfies Config;
