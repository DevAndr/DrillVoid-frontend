import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), tailwindcss()],
  server: {
    allowedHosts: [
      "2a75-147-135-220-115.ngrok-free.app",
      "contemptibly-creative-cheetah.cloudpub.ru",
      "*",
    ],
    proxy: {
      "/api": {
        target: "http://localhost:3030",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
