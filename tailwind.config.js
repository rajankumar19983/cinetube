/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        black_1: "#04152d",
        black_2: "#041226",
        black_3: "#020c1b",
        black_lighter: "#1c4b91",
        black_light: "#173d77",
        pink: "#da2f68",
        orange: "#f89e00",
      },

      backgroundImage: {
        "app-theme": "linear-gradient(98.37deg, #f89e00 0.99%, #da2f68 100%)",
      },
      width: {
        "full-100px": "calc(100% - 100px)",
        "full-150px": "calc(100% - 150px)",
        "50%-5px": "calc(50% - 5px)",
        "25%-15px": "calc(25% - 15px)",
        "20%-16px": "calc(20% - 16px)",
      },
      keyframes: {
        mobileMenu: {
          "0%": {
            transform: "translateY(-130%)",
          },
          "100%": {
            transform: "translateY(0)",
          },
        },
        shimmer: {
          "0%": {
            transform: "translateX(-100%)",
          },
          "100%": {
            transform: "translateX(100%)",
          },
        },
        rotate: {
          "100%": {
            transform: "rotate(360deg)",
          },
        },
        dash: {
          "0%": {
            strokeDasharray: "1, 150",
            strokeDashoffset: "0",
          },
          "50%": {
            strokeDasharray: "90, 150",
            strokeDashoffset: "-35",
          },
          "100%": {
            strokeDasharray: "90, 150",
            strokeDashoffset: "-124",
          },
        },
      },
    },
  },
  plugins: [],
};
