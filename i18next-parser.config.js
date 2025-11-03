// i18next-parser.config.js
module.exports = {
  locales: ["en", "fr", "de", "ar", "bn", "de", "es", "fr", "ja", "ko", "pt", "ru", "tr", "zh"], // your target languages
  output: "public/locales/$LOCALE/$NAMESPACE.json", // where translations will be saved
  input: ["src/**/*.{js,jsx,ts,tsx}"], // where to scan for text
};
