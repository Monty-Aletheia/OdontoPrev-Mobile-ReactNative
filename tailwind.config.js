/** @type {import('tailwindcss').Config} */
module.exports = {
    // NOTE: Update this to include the paths to all of your component files.
    content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
      extend: {
        colors: {
          dark_blue: "#6B91A9"
        },
        fontFamily: {
          interThin: ["InterThin"],
          interExtraLight: ["InterExtraLight"],
          interLight: ["InterLight"],
          interRegular: ["InterRegular"],
          interMedium: ["InterMedium"],
          interSemiBold: ["InterSemiBold"],
          interBold: ["InterBold"],
          interExtraBold: ["InterExtraBold"],
          interBlack: ["InterBlack"]
        }
      },
    },
    plugins: [],
  }