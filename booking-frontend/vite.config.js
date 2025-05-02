import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    host: false,
    proxy: {
      '/api': {
        target: 'https://rentalhome-i7wr.onrender.com',
        changeOrigin: true,
        secure: false,
      },
    }

  },

  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});