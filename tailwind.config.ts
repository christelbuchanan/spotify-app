import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Space Grotesk", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      colors: {
        slate: {
          950: "#020617"
        }
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(148,163,184,0.2), 0 18px 45px rgba(2,6,23,0.45)"
      }
    }
  },
  plugins: []
} satisfies Config;
