// generate-sitemap.js
import { SitemapStream, streamToPromise } from "sitemap";
import { writeFile } from "fs/promises";

// All your routes
const links = [
  { url: "/", changefreq: "daily", priority: 1.0 },
  { url: "/generatescreenshot", changefreq: "daily", priority: 0.9 },

  // Elite section
  { url: "/elite", changefreq: "weekly", priority: 0.8 },
  { url: "/elite/crypto-recovery", changefreq: "weekly", priority: 0.7 },
  { url: "/elite/social-media", changefreq: "weekly", priority: 0.7 },
  { url: "/elite/credit-boost", changefreq: "weekly", priority: 0.7 },
  { url: "/elite/stop-harassment", changefreq: "weekly", priority: 0.7 },
  { url: "/elite/grade-enhancement", changefreq: "weekly", priority: 0.7 },
  { url: "/elite/clear-record", changefreq: "weekly", priority: 0.7 },
  { url: "/elite/dmv-id", changefreq: "weekly", priority: 0.7 },

  // Demo base
  { url: "/demo", changefreq: "weekly", priority: 0.8 },
  { url: "/demo/dashboard", changefreq: "weekly", priority: 0.7 },

  // General
  { url: "/demo/general/messages", changefreq: "daily", priority: 0.6 },
  { url: "/demo/general/gps", changefreq: "daily", priority: 0.6 },
  { url: "/demo/general/keylogger", changefreq: "daily", priority: 0.6 },
  { url: "/demo/general/calls", changefreq: "daily", priority: 0.6 },
  { url: "/demo/general/contacts", changefreq: "daily", priority: 0.6 },
  { url: "/demo/general/notes", changefreq: "daily", priority: 0.6 },
  { url: "/demo/general/photos", changefreq: "daily", priority: 0.6 },
  { url: "/demo/general/videos", changefreq: "daily", priority: 0.6 },
  { url: "/demo/general/wifi", changefreq: "daily", priority: 0.6 },
  { url: "/demo/general/keywords", changefreq: "daily", priority: 0.6 },
  { url: "/demo/general/apps", changefreq: "daily", priority: 0.6 },
  { url: "/demo/general/bookmarks", changefreq: "daily", priority: 0.6 },
  { url: "/demo/general/history", changefreq: "daily", priority: 0.6 },
  { url: "/demo/general/email", changefreq: "daily", priority: 0.6 },
  { url: "/demo/general/sim", changefreq: "daily", priority: 0.6 },

  // Captures
  { url: "/demo/captures/screenshots", changefreq: "daily", priority: 0.6 },

  // Controls
  { url: "/demo/controls/geofence", changefreq: "weekly", priority: 0.5 },
  { url: "/demo/controls/website-block", changefreq: "weekly", priority: 0.5 },
  { url: "/demo/controls/wifi-block", changefreq: "weekly", priority: 0.5 },
  { url: "/demo/controls/app-block", changefreq: "weekly", priority: 0.5 },

  // Social
  { url: "/demo/social/whatsapp", changefreq: "daily", priority: 0.6 },
  { url: "/demo/social/facebook", changefreq: "daily", priority: 0.6 },
  { url: "/demo/social/messenger", changefreq: "daily", priority: 0.6 },
  { url: "/demo/social/instagram", changefreq: "daily", priority: 0.6 },
  { url: "/demo/social/x", changefreq: "daily", priority: 0.6 },
  { url: "/demo/social/tiktok", changefreq: "daily", priority: 0.6 },
  { url: "/demo/social/snapchat", changefreq: "daily", priority: 0.6 },
  { url: "/demo/social/linkedin", changefreq: "daily", priority: 0.6 },
  { url: "/demo/social/zoom", changefreq: "daily", priority: 0.6 },
  { url: "/demo/social/viber", changefreq: "daily", priority: 0.6 },
  { url: "/demo/social/telegram", changefreq: "daily", priority: 0.6 },
  { url: "/demo/social/line", changefreq: "daily", priority: 0.6 },
  { url: "/demo/social/kakaotalk", changefreq: "daily", priority: 0.6 },
  { url: "/demo/social/skype", changefreq: "daily", priority: 0.6 },
  { url: "/demo/social/imo", changefreq: "daily", priority: 0.6 },
  { url: "/demo/social/discord", changefreq: "daily", priority: 0.6 },
  { url: "/demo/social/tinder", changefreq: "daily", priority: 0.6 },
  { url: "/demo/social/badoo", changefreq: "daily", priority: 0.6 },
  { url: "/demo/social/wechat", changefreq: "daily", priority: 0.6 },
];

async function generateSitemap() {
  try {
    const stream = new SitemapStream({
      hostname: "https://trevortechsolutions.com",
    });

    // Write each link to the stream
    links.forEach((link) => stream.write(link));

    stream.end();

    // Generate XML
    const xml = await streamToPromise(stream);
    await writeFile("./public/sitemap.xml", xml.toString());

    console.log("✅ Sitemap generated successfully!");
  } catch (err) {
    console.error("❌ Error generating sitemap:", err);
  }
}

generateSitemap();
