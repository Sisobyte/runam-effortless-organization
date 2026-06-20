import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  nitro: {
    preset: "vercel",   // ← change from cloudflare to vercel
  },
  tanstackStart: {
    server: { entry: "server" },
  },
});