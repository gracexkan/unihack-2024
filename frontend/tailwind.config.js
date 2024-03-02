/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        btn: "-0.313rem 0.313rem 0.625rem -0.063rem rgb(0 0 0 / 15%)",
        "btn-hovered": "0 0.125rem 0.625rem 0 rgb(0 0 0 / 50%)",
        card: "-0.125rem 0.25rem 0.625rem rgba(0, 0, 0, 0.15)",
        input: "0 0 0.5rem 0.063rem rgba(0, 0, 0, 0.1);",
        "review-card": "0px 2px 2px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
}
