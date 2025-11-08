// vite.config.cjs
const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react");
const tailwindcss = require("@tailwindcss/vite").default;
const vitePrerender = require("vite-plugin-prerender");

module.exports = defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    vitePrerender({
      staticDir: "dist",
      routes: [
        "/",
        "/generatescreenshot",

        // Elite section
        "/elite",
        "/elite/crypto-recovery",
        "/elite/social-media",
        "/elite/credit-boost",
        "/elite/stop-harassment",
        "/elite/grade-enhancement",
        "/elite/clear-record",
        "/elite/dmv-id",

        // Demo base
        "/demo",
        "/demo/dashboard",

        // General
        "/demo/general/messages",
        "/demo/general/gps",
        "/demo/general/keylogger",
        "/demo/general/calls",
        "/demo/general/contacts",
        "/demo/general/notes",
        "/demo/general/photos",
        "/demo/general/videos",
        "/demo/general/wifi",
        "/demo/general/keywords",
        "/demo/general/apps",
        "/demo/general/bookmarks",
        "/demo/general/history",
        "/demo/general/email",
        "/demo/general/sim",

        // Captures
        "/demo/captures/screenshots",

        // Controls
        "/demo/controls/geofence",
        "/demo/controls/website-block",
        "/demo/controls/wifi-block",
        "/demo/controls/app-block",

        // Social
        "/demo/social/whatsapp",
        "/demo/social/facebook",
        "/demo/social/messenger",
        "/demo/social/instagram",
        "/demo/social/x",
        "/demo/social/tiktok",
        "/demo/social/snapchat",
        "/demo/social/linkedin",
        "/demo/social/zoom",
        "/demo/social/viber",
        "/demo/social/telegram",
        "/demo/social/line",
        "/demo/social/kakaotalk",
        "/demo/social/skype",
        "/demo/social/imo",
        "/demo/social/discord",
        "/demo/social/tinder",
        "/demo/social/badoo",
        "/demo/social/wechat",
      ],
    }),
  ],
  assetsInclude: ["**/*.JPG"],
  optimizeDeps: {
    exclude: ["html2canvas"],
  },
});
