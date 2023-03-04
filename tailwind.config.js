/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{tsx,ts,js,jsx}",
    "./pages/**/*.{tsx,ts,js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        VDB: "hsl(220, 13%, 13%)",
        DGB: "hsl(219, 9%, 45%)",
        GB: "hsl(220, 14%, 75%)",
        LGB: "hsl(223, 64%, 98%)",
        White: "hsl(0, 0%, 100%)",
        Black: "hsl(0, 0%, 0%)",
        Orange: "hsl(26, 100%, 55%)",
        PaleOrange: "hsl(25, 100%, 94%)",
      },
      fontFamily: {
        kumbh: ["Kumbh Sans"],
      },
      animation: {
        right: "right 1s ease-in-out",
        left: "left 1s ease-in-out",
      },
      keyframes: {
        right: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0%)" },
        },
        left: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0%)" },
        },

      },
    },
    screens: {
      xs: "375px",
      sm: "425px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      desktop: "1440px",
    },
  },
  plugins: [],
};
