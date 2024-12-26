/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"

export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: 'rgb(224, 230, 247)',
          DEFAULT: '#3c65f5',
          dark: '#2b4ac3'
        },
        'secondary-black': "#212529",
        'primary-black': "#05264e",
        'light-black': "#4f5e64",
      }
    },
  },
  plugins: [daisyui],
}

