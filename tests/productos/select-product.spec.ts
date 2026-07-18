import { expect, test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';
import { PRICES, PRODUCTS, URL_PATTERNS } from '../../utils/constants';
import { users } from '../../utils/test-data';

test('selecciona Sauce Labs Backpack, valida precio y lo agrega al carrito', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);

  await loginPage.open();
  await loginPage.login(users.standard.username, users.standard.password);

  await expect(page).toHaveURL(URL_PATTERNS.inventory);
  await productsPage.waitForLoaded();

  const productCard = productsPage.itemByName(PRODUCTS.backpack);
  await expect(productCard.root).toHaveCount(1);
  await expect(productCard.root).toBeVisible();
  await expect(productCard.price).toBeVisible();

  const priceText = await productCard.getPriceText();
  expect(priceText).toBe(PRICES.backpack);

  await productCard.addToCart();

  await expect(productsPage.header.cartBadge).toBeVisible();
  await expect(productsPage.header.cartBadge).toHaveText('1');
});
