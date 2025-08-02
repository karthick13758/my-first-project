// playwright.config.js
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  timeout: 30000,
  retries: 0,
  reporter: 'html',

  projects: [
    {
      name: 'chrome-with-media',
      use: {
        browserName: 'chromium',
        headless: false,
        viewport: { width: 1280, height: 720 },
        permissions: ['camera', 'microphone'],
        launchOptions: {
          args: [
            '--use-fake-ui-for-media-stream',
            '--use-fake-device-for-media-stream'
          ]
        }
      }
    }
  ]
});

