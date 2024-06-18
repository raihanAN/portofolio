/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["index.html",
    "Project.html",
    "Project2.html",
    "Project3.html",
    "Project4.html",
    "UI1.html",
    "UI2.html",
    "UI3.html",
    "UI4.html",
    "UI5.html",
    "UI6.html",
    "uxproj.html",
    "Web.html",
    "flutter.html",
    "Flutter1.html",
    "Flutter2.html",
    "Flutter3.html",
    "Flutter4.html",
    "Flutter5.html",
    "Flutter6.html",
  ],
  theme: {
    screens: {
      'xs': '750px',
      'sm': '850px',
      // => @media (min-width: 576px) { ... }

      'md': '960px',
      // => @media (min-width: 960px) { ... }

      'lg': '1100px',
      // => @media (min-width: 1100px) { ... }
      'xl': '1250px',
      '2xl': '1400px',
      '3xl': '1600px',
    },
    extend: {},
  },
  plugins: [],
}

