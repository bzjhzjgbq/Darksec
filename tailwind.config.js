/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0b1120",
        mist: "#e2e8f0",
        accent: "#0f766e",
        accentSoft: "#99f6e4",
        panel: "#111827",
        panelLight: "#172033",
      },
      boxShadow: {
        glow: "0 20px 60px rgba(15, 118, 110, 0.18)",
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(148, 163, 184, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.08) 1px, transparent 1px)",
      },
      fontFamily: {
        sans: ["'Segoe UI'", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
