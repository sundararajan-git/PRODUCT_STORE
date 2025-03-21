import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/product_store/", // ✅ Needed for GitHub Pages
  server: {
    proxy: {
      "/api": {
        target: process.env.VITE_API_URL, // ✅ Uses API from .env file
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
