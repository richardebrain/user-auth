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
    },
    screens: {
      xs: "425px",
      desktop: "1440px",
    },
  },
  plugins: [],
};
