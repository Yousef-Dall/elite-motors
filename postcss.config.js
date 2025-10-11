// postcss.config.js
import tailwindcss from "@tailwindcss/postcss";

export default {
  // Tailwind FIRST so it handles `@import "tailwindcss";`
  plugins: [tailwindcss],
};
