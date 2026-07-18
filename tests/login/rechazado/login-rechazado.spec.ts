import 'dotenv/config';
import { expect, test } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { ERROR_MESSAGES, URL_PATTERNS } from '../../../utils/constants';

test('usuario locked desde .env no puede loguearse', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const username = process.env.LOCKED_USERNAME ?? '';
  const password = process.env.LOCKED_PASSWORD ?? '';

  expect(username).toBeTruthy();
  expect(password).toBeTruthy();

  await loginPage.open();

  await loginPage.login(username, password);

  await expect(page).not.toHaveURL(URL_PATTERNS.inventory);

  await expect(loginPage.errorMessage).toBeVisible();
  await expect(loginPage.errorMessage).toContainText(ERROR_MESSAGES.lockedOut);
});
