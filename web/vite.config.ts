import { defineConfig } from "vite";

import path from "path";

import react from "@vitejs/plugin-react";
import viteCompression from "vite-plugin-compression";
import { VitePWA } from "vite-plugin-pwa";
import { createHtmlPlugin as html } from "vite-plugin-html";
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({}),
    svgr({}),
    html({ minify: true }),
    viteCompression({ algorithm: "gzip" }),
    viteCompression({ algorithm: "brotliCompress" }),
    VitePWA({
      devOptions: { enabled: false },
      minify: true,
      registerType: "prompt",
      injectRegister: "inline",
      workbox: {
        globPatterns: ["**/*.{html,css,js,ico,json,png,svg,webp,woff2}"],
      },
      base: "/",
      manifest: {
        name: "RPG",
        short_name: "RPG",
        description: "RPG",
        categories: [],
        start_url: "/",
        display: "standalone",
        orientation: "any",
        theme_color: "#000",
        background_color: "#000",
        icons: [],
      },
    }),
  ],
  server: {
    host: true,
  },
  resolve: {
    alias: {
      "@core": path.resolve(__dirname, "../core/src"),
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    reportCompressedSize: false,
  },
  base: "./",
})
