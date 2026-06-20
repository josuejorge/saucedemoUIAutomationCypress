import { defineConfig } from 'cypress';
import { allureCypress } from 'allure-cypress/reporter';

export default defineConfig({
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    specPattern: 'cypress/e2e/**/*.cy.ts',
    supportFile: 'cypress/support/e2e.ts',
    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos',
    video: false,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 8000,
    pageLoadTimeout: 30000,
    retries: { runMode: 1, openMode: 0 },
    setupNodeEvents(on, config) {
      allureCypress(on, config, { resultsDir: 'allure-results' });
      return config;
    },
  },
});
