/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "lingualist-primary": "#5F249F",
        "lingualist-secondary": "#1B1B1B",
        "lingualist-accent": "#FBD38D",
        "lingualist-accent-focus": "#FFE082",
        "lingualist-background": "#F7F7F7",
        "lingualist-text": "#1B1B1B",

        "lingualist-text-accent": "#FBD38D",
        "lingualist-primary-action": "#5F249F",
        "lingualist-primary-action-hover": "#7f3ca9",
        "lingualist-primary-action-focus": "#8f4dc2",
        "lingualist-primary-action-active": "#4f1b6e",
        "lingualist-secondary-action": "#E7E7E7",
        "lingualist-secondary-action-hover": "#d9d9d9",
        "lingualist-secondary-action-focus": "#c4c4c4",
        "lingualist-secondary-action-active": "#b2b2b2",
      },
    },
  },
  plugins: [],
};
