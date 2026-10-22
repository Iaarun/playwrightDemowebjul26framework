
import { defineConfig, devices } from '@playwright/test';

const testEnvironment = process.env.TEST_ENV;
if (!['qa', 'stg'].includes(testEnvironment)) {
  throw new Error('Choose a test environment with: npm test -- --env <qa|stg>');
}

export default defineConfig({
  testDir: './tests',
  metadata: { environment: testEnvironment },
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['allure-playwright', { resultsDir: 'allure-results' }],
  ],
  use: {
    browserName:'chromium',
    headless: false,
    baseURL: process.env.BASE_URL || "https://demowebshop.tricentis.com/",
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure'
  },
});
