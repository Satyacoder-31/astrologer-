import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cosmic: {
          void: "#000000",
          space: "#020208",
          deep: "#040612",
          midnight: "#060919",
          galaxy: "#0a0f24",
          peacock: "#087E8B",
          gold: "#D4AF62",
          goldLight: "#F5DF9E",
          goldDark: "#9E7B31",
          purple: "#513B83",
          purpleDark: "#1f1035",
          white: "#F5F1E8",
          saffron: "#E6A64A",
          card: "rgba(3, 4, 12, 0.70)",
          cardHover: "rgba(8, 12, 28, 0.85)",
          border: "rgba(212, 175, 98, 0.2)",
          borderGlow: "rgba(212, 175, 98, 0.6)",
        },
      },
      fontFamily: {
        cinzel: ["var(--font-cinzel)", "Cinzel", "serif"],
        poppins: ["var(--font-poppins)", "Poppins", "sans-serif"],
        devanagari: ["var(--font-devanagari)", "Noto Sans Devanagari", "sans-serif"],
        playfair: ["var(--font-playfair)", "Playfair Display", "serif"],
      },
      boxShadow: {
        goldGlow: "0 0 25px rgba(212, 175, 98, 0.35)",
        goldGlowLg: "0 0 50px rgba(212, 175, 98, 0.6)",
        spaceGlow: "0 0 40px rgba(8, 126, 139, 0.3)",
        purpleGlow: "0 0 40px rgba(81, 59, 131, 0.4)",
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #F5DF9E 0%, #D4AF62 50%, #9E7B31 100%)",
        "cosmic-void": "radial-gradient(circle at 50% 50%, #060919 0%, #020208 50%, #000000 100%)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "spin-slow": "spin 30s linear infinite",
        "spin-reverse": "spin-rev 40s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "spin-rev": {
          "0%": { transform: "rotate(360deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
