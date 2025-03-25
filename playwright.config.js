const { defineConfig } = require('@playwright/test')

module.exports = defineConfig({
  use: {
    headless: false,
    ignoreHTTPSErrors: true,
    contextOptions: {
      permissions: ['geolocation'],
    },
    geolocation: { latitude: 1, longitude: 1 },
  },
})
