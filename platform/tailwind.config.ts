/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./layouts/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        exoFont: ["var(--font-exoFont)"],
      },
      colors: {
        greenis: "#0AE47C",
        black: "#1C1C1C",
        pink: "#DF01A5",
        orange: "#FD960B",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        admin: "url('/img/bg.png')",
        user: "url('/img/user.jpg')",
        dashboard: "url('/img/dashboard-bg.png')",
      },
    },
  },
  plugins: [],
};
