/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui"),
    require("@tailwindcss/typography"),
    /*  require("@tailwindcss/forms"), */
    require("tailwindcss-animate"),
  ],
  daisyui: {
    styled: true,
    themes: [
      {
        light: {
          ".bg-tertiary": {
            backgroundColor: "#9333ea",
          },

          primary: "#111827",

          secondary: "#fb923c",

          accent: "#60a5fa",

          neutral: "#fef3c7",

          "base-100": "#f3f4f6",

          info: "#3b82f6",

          success: "#84cc16",

          warning: "#facc15",

          error: "#b91c1c",
        },
        dark: {
          primary: "#f3f4f6",

          secondary: "#075985",

          ".bg-tertiary": {
            backgroundColor: "#7e22ce",
          },

          accent: "#3730a3",

          neutral: "#a5f3fc",

          "base-100": "#111827",

          info: "#1d4ed8",

          success: "#166534",

          warning: "#facc15",

          error: "#b91c1c",
        },
      },
    ],

    // utils: true,

    darkTheme: "dark",
  },
};
