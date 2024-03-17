/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["index.html", "Project.html", "Project2.html", "Project3.html", "UI1.html", "UI2.html", "uxproj.html", "Web.html", "flutter.html", "Flutter1", "Flutter2", "Flutter3", "Flutter4", "Flutter5", "Flutter6"],
  theme: {
    screens: {
      'sm': '850px',
      // => @media (min-width: 576px) { ... }

      'md': '960px',
      // => @media (min-width: 960px) { ... }

      'lg': '1100px',
      // => @media (min-width: 1100px) { ... }
      'xl': '1200px',
      '2xl': '1400px',
    },
    extend: {},
  },
  plugins: [],
}

