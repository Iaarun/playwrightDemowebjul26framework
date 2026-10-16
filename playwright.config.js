
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    browserName:'chromium',
    headless: false,
    baseURL: process.env.BASE_URL || "https://demowebshop.tricentis.com/",
    trace: 'on-first-retry',
    screenshot: 'only-on-failure'
  },
});

