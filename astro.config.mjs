// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://www.christianvari.dev",
  trailingSlash: "ignore",
  build: { format: "directory" },
  // Old URLs kept working: the audits list and the patent page (moved under /research/).
  redirects: {
    "/projects": "/audits/",
    "/patents/cybersecurity-report-generation":
      "/research/cybersecurity-report-generation/",
  },
  integrations: [
    sitemap({
      filter: page => !/\/(projects|patents)\//.test(page),
      lastmod: new Date(),
    }),
  ],
  vite: { plugins: [tailwindcss()] },
});
