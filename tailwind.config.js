/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "4xl": "0px 0px 30px 8px rgba(227,227,227,0.75)",
        "5xl": "0px 0px 10px 2px #557c93",
      },
      colors: {
        theme: "#2970ff",
      },
    },
  },
  plugins: [],
};

