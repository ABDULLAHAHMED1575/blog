/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        "curver-height" : "150px"
      },
      aspectRatio:{
        '3/2': '3 / 2',
      },
      colors:{
        primary: "#1565D8",
        dark:{
          light:"#5A7184",
          hard: "#0D2436",
          soft: "#183B56",
          curver: "#40C0CB"
        }
      },
      fontFamily: {
        opensans: ["Open Sans", "san-serif"],
        roboto: ["Roboto", "san-serif"],
      },
      maskImage: {
        'curved-mask': 'radial-gradient(60% var(--c) at top, #0000 calc(100% - 1px), #000)',
      },
    },
  },
  plugins: [
    function({addUtilities}){
      addUtilities({
        '.mask-curved':{
          maskImage:'radial-gradient(60% var(--c) at top, #0000 calc(100% - 1px), #000)',
          WebkitMaskImage: 'radial-gradient(60% var(--c) at top, #0000 calc(100% - 1px), #000)',
        }
      })
    }
  ],
}