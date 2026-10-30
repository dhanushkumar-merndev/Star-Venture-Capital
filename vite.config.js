import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, "index.html"),
        approach: resolve(import.meta.dirname, "approach.html"),
        focus: resolve(import.meta.dirname, "focus.html"),
        capabilities: resolve(import.meta.dirname, "capabilities.html"),
        portfolio: resolve(import.meta.dirname, "portfolio.html"),
        process: resolve(import.meta.dirname, "process.html"),
        governance: resolve(import.meta.dirname, "governance.html"),
        enquiry: resolve(import.meta.dirname, "enquiry.html"),
      },
    },
  },
});
