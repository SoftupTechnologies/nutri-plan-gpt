/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      colors: {
        "section-title": "#1F1F1E",
        "section-subtitle": "#8a8a8a",
        "primary": '#21b78a'
      },
      fontFamily: {
        display: ["var(--font-sf)", "system-ui", "sans-serif"],
        default: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      animation: {
        // Tooltip
        "slide-up-fade": "slide-up-fade 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-down-fade": "slide-down-fade 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        // Tooltip
        "slide-up-fade": {
          "0%": { opacity: 0, transform: "translateY(6px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "slide-down-fade": {
          "0%": { opacity: 0, transform: "translateY(-6px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      colors: {
        "section-title": "#1F1F1E",
        "section-subtitle": "#8a8a8a",
        "primary": '#21b78a',
        "card-bg":"#FF8228",
        "weekday-bg":"#FCBF49",
        "section-fill":"#FF9500"
      },
      grayscale: {
        70: '70%',
      },
      brightness:{
        70:'70%'
      },
      minHeight: {
        '4/5': '70vh',
      },
      boxShadow:{
        mdOffsetTop:'0 2px 6px -1px rgb(0 0 0 / 0.1), 0 3px 4px -2px rgb(0 0 0 / 0.1);',
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
    plugin(({ addVariant }) => {
      addVariant("radix-side-top", '&[data-side="top"]');
      addVariant("radix-side-bottom", '&[data-side="bottom"]');
    }),
  ],
};
