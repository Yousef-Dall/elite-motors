import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/", // if later you deploy to /something/, change this to "/something/"
  plugins: [react()],
  esbuild: {
    jsx: "automatic",
  },
});
