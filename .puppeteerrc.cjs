// Puppeteer only reads this file as CommonJS.
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { join } = require("path");

/** @type {import("puppeteer").Configuration} */
module.exports = {
  // Keeps the Chrome download inside the project so it ships with the deploy.
  cacheDirectory: join(__dirname, ".cache", "puppeteer"),
};
