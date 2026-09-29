import { defineConfig } from "vite";
import dyadComponentTagger from "@dyad-sh/react-vite-component-tagger";
import react from "@vitejs/plugin-react-swc";
import { fileURLToPath } from "node:url";

export default defineConfig(() => ({
  base: "/magical-manatee-wiggle/",
  server: {
    host: "::",
    port: 8080,
    // Dev-only: allow the hosted sandbox preview hostnames to reach the server.
    allowedHosts: true,
  },
  plugins: [dyadComponentTagger(), react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
}));
