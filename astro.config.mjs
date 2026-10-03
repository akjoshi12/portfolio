import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://atrijoshi.vercel.app",
  trailingSlash: "never",
  build: { format: "file" },
});
