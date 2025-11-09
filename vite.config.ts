import { defineConfig } from 'vite';
import tailwind from '@tailwindcss/postcss';

export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwind], // not 'tailwindcss'
    },
  },
});
