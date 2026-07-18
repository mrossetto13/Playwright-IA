import { defineConfig } from '@playwright/test';

export default defineConfig({
  timeout: 30000,
  retries: 1,
  use: {
    baseURL: 'https://www.saucedemo.com',
    video: 'on',
  },
});
