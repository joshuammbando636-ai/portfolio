import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // near-black hero background
        ink: "#141414",
        // warm-neutral palette (body sections)
        paper: "#f5efe3",
        panel: "#ebe0cf",
        espresso: "#2c2017",
        clay: "#a8633c",
        ember: "#d97a42",
        sand: "#8c7a66",
        bloom: "#e7b78c",
        // hero palette tokens
        "warm-bg": "#FBE8D8",
        sun: "#F4A04A",
        plum: "#3E2C68",
        coral: "#F6C9A8",
        lavender: "#9B8DC8",
      },
      fontFamily: {
        display: ["var(--font-bricolage)", "system-ui", "sans-serif"],
        body: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.06em",
      },
    },
  },
  plugins: [],
};

export default config;
