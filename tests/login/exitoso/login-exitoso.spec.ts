import { expect, test } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { ProductsPage } from '../../../pages/ProductsPage';
import { URL_PATTERNS } from '../../../utils/constants';
import { users } from '../../../utils/test-data';

test('login exitoso con standard_user muestra inventario', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);

  await loginPage.open();
  await loginPage.login(users.standard.username, users.standard.password);

  await expect(page).toHaveURL(URL_PATTERNS.inventory);
  await productsPage.waitForLoaded();

  await expect(productsPage.inventoryList).toBeVisible();

  await expect(productsPage.inventoryItems.first()).toBeVisible();
  await expect(productsPage.inventoryItems).toHaveCount(6);
});
