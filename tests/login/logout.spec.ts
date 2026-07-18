import { expect, test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';
import { ROUTES, URL_PATTERNS } from '../../utils/constants';
import { users } from '../../utils/test-data';

test('logout desde menu lateral bloquea acceso directo a inventory', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);

  await loginPage.open();
  await loginPage.login(users.standard.username, users.standard.password);

  await expect(page).toHaveURL(URL_PATTERNS.inventory);

  await productsPage.header.openSidebar();
  await expect(productsPage.sidebar.logoutLink).toBeVisible();
  await productsPage.sidebar.logout();

  await expect(page).toHaveURL(URL_PATTERNS.login);
  await expect(loginPage.loginButton).toBeVisible();

  await page.goto(ROUTES.inventory);
  await expect(page).not.toHaveURL(URL_PATTERNS.inventory);
  await expect(page).toHaveURL(URL_PATTERNS.login);
  await expect(loginPage.loginButton).toBeVisible();
});
