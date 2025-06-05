/** @type {import('tailwindcss').Config} */
export default {
  content: [
	"./src/**/*.{html,js,jsx,ts,tsx,astro,md}",
    "./pages/**/*.{astro,md}",
    "./components/**/*.{js,jsx,ts,tsx,astro}",
    "./content/**/*.md"
  ],
  theme: {
    extend: {
      // Puedes personalizar tu tema aquí
      colors: {
        pastelPink: "#fcd5ce",
        pastelPurple: "#d8b4f8",
      },
      fontFamily: {
        kawaii: ["'Comic Neue'", "cursive"],
      },
    },
  },
  plugins: [],
};
