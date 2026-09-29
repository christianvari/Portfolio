// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://www.christianvari.dev",
  trailingSlash: "ignore",
  build: { format: "directory" },
  redirects: { "/projects": "/audits/" },
  integrations: [
    sitemap({
      filter: page => !page.includes("/projects"),
      lastmod: new Date(),
    }),
  ],
  vite: { plugins: [tailwindcss()] },
});
