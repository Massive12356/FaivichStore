import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { visualizer } from "rollup-plugin-visualizer";
import viteCompression from "vite-plugin-compression"; // ✅ NEW

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    viteCompression({
      algorithm: "brotliCompress", // You can use 'gzip' or add both
      ext: ".br", // File extension for compressed files
      threshold: 1024, // Only compress files >1KB
      verbose: true, // Logs compressed files to terminal
    }),
    visualizer({
      filename: "report.html",
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  server: {
    allowedHosts: ["7f0f-154-161-14-244.ngrok-free.app"],
    host: true,
  },
});
