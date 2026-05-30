import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#FBF8EF",
          100: "#F5F0E1",
          200: "#EDE6D2",
          300: "#E2D9BF"
        },
        moss: {
          50: "#EEF4E5",
          100: "#DDE9CB",
          200: "#BFD3A2",
          500: "#5B7A3B",
          700: "#2F4421",
          900: "#1A2914"
        },
        lime: {
          200: "#E4F19A",
          300: "#D6EC4F",
          400: "#CDE34D",
          500: "#B9D62F"
        },
        ink: {
          900: "#1A1A1A",
          700: "#3D3D3D",
          500: "#6B6B6B",
          300: "#A8A8A8"
        },
        terracotta: {
          200: "#F4D4C2",
          400: "#E89B7A",
          500: "#D97757",
          700: "#A85A3E"
        }
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-sans-serif", "system-ui"],
        body: ["var(--font-body)", "ui-sans-serif", "system-ui"]
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem"
      },
      boxShadow: {
        soft: "0 8px 28px -12px rgba(26, 41, 20, 0.18)",
        card: "0 12px 32px -16px rgba(26, 41, 20, 0.22)"
      }
    }
  },
  plugins: []
};

export default config;
