/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-montserrat)", "system-ui", "sans-serif"],
      },
      colors: {
        cream: {
          50: "#FFFEFA",
          100: "#FAF8F2",
          200: "#F2EFE5",
          300: "#E5E0D5",
          400: "#D4CDB8",
        },
        navy: {
          50: "#E6E9F2",
          100: "#C2C9DC",
          200: "#9AA4C3",
          300: "#6F7DA6",
          400: "#4D5C8A",
          500: "#2D3D6E",
          600: "#1B2750",
          700: "#111A3A",
          800: "#0A1029",
          900: "#05081A",
          950: "#02040F",
        },
        gold: {
          50: "#FBF5E1",
          100: "#F6E9B8",
          200: "#EFD884",
          300: "#E6C552",
          400: "#D4AF37",
          500: "#B8941F",
          600: "#967814",
          700: "#735B0F",
        },
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #F6E9B8 0%, #D4AF37 50%, #967814 100%)",
        "navy-gradient": "linear-gradient(180deg, #02040F 0%, #0A1029 50%, #111A3A 100%)",
        "radial-gold": "radial-gradient(circle at center, rgba(212,175,55,0.15) 0%, transparent 70%)",
      },
      animation: {
        "shimmer": "shimmer 3s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "glow": "glow 2.5s ease-in-out infinite alternate",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 20px rgba(212,175,55,0.3)" },
          "100%": { boxShadow: "0 0 40px rgba(212,175,55,0.6)" },
        },
      },
    },
  },
  plugins: [],
};
