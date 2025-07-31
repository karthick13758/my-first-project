/** @type {import('@playwright/test').PlaywrightTestConfig} */

const config = {
  use: {
    headless: false,   // Show browser window
    slowMo: 1000     // Slow down actions by 1000 milliseconds (1 second)
  },
};

console.log("✅ Playwright config loaded");
module.exports = config;
