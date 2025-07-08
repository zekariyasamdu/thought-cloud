// filepath: d:\myProjects\Frontend\Next js\New folder\my-app\tailwind.config.js
/** @type {import('tailwindcss').Config} */
import animate from "tailwindcss-animate";
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}",  "./node_modules/@shadcn/ui/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [animate],
};
