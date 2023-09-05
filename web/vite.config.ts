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
      base: "/rpg-demo/",
      manifest: {
        name: "RPG",
        short_name: "RPG",
        description: "RPG",
        categories: [],
        start_url: "/rpg-demo/",
        display: "standalone",
        orientation: "any",
        theme_color: "#1A1B1E",
        background_color: "#1A1B1E",
        icons: [
          { "src": "/rpg-demo/favicon.ico", "type": "image/x-icon", "sizes": "16x16 32x32" },
          { "src": "/rpg-demo/icon-512.png", "type": "image/png", "sizes": "512x512" },
          { "src": "/rpg-demo/icon-512-maskable.png", "type": "image/png", "sizes": "512x512", "purpose": "maskable" },
          { "src": "/rpg-demo/icon-192.png", "type": "image/png", "sizes": "192x192" },
          { "src": "/rpg-demo/icon-192-maskable.png", "type": "image/png", "sizes": "192x192", "purpose": "maskable" },
        ],
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
