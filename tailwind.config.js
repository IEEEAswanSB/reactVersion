/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      translate: {
        '101': '101%',
      },
      keyframes: {
        marquee: {
          'from': { transform: 'translateX(0%)' },
          'to': { transform: 'translateX(-50%)' }
        }
      },
      animation: {
        marquee: 'marquee 15s linear infinite'
      },
      colors: {
        social: {
          100: '#3b5998', //Facebook hex color
          200: '#0e76a8', //Linkedin hex color
          300: '#00acee', //Twitter hex color
          400: '#8a3ab9', //Instagram hex color
          500: '#171515', //Github hex color
          600: '#facc15',
          1: '#FEDA77',
          2: '#DD2A7B',
          3: '#8134AF',
          4: '#fcde00',
          5: '#03C03C',
        },
        codeStormClr: '#004B82',
        track: {
          1: '#1144ec', //solar
          2: '#3bcbf1', //graphic
          3: '#cc3900', //robotics
          4: '#6c3bf1', //web
          5: '#76ba6e', //arch
        },
      },
    },
    screens: {
      'xs': '350px',
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [],
}

