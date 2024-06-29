/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      borderRadius: {
        '4xl': '5.0rem', // You can adjust the value as per your preference
      },
      colors: {
        lime: 'hsl(61, 70%, 52%)',
        red: 'hsl(4, 69%, 50%)',
        white: 'hsl(0, 0%, 100%)',
        'slate-100': 'hsl(202, 86%, 94%)',
        'slate-300': 'hsl(203, 41%, 72%)',
        'slate-500': 'hsl(200, 26%, 54%)',
        'slate-700': 'hsl(200, 24%, 40%)',
        'slate-900': 'hsl(202, 55%, 16%)',
      },
      // fontFamily: {
      //   sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      // },
    },
  },
  plugins: [],
};
