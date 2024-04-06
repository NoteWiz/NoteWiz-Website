import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        primary: "#FFFAF0",
        purple: '#F07CF2',
        secondary: '#55ACEE',

      },
      // spacing: {
      //   'custom-spacing': '40px',
      // }
    },
  },
  plugins: [],
};
export default config;
