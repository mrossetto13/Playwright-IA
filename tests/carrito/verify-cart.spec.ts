import { expect, test } from '@playwright/test';
import { CartPage } from '../../pages/CartPage';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';
import { PRICES, PRODUCTS, URL_PATTERNS } from '../../utils/constants';
import { users } from '../../utils/test-data';

test('verifica producto y precio en cart.html con un solo item', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);

  await loginPage.open();
  await loginPage.login(users.standard.username, users.standard.password);

  await expect(page).toHaveURL(URL_PATTERNS.inventory);

  const bikeLightCard = productsPage.itemByName(PRODUCTS.bikeLight);
  await expect(bikeLightCard.root).toHaveCount(1);
  await bikeLightCard.addToCart();

  await productsPage.header.openCart();

  await expect(page).toHaveURL(URL_PATTERNS.cart);
  await cartPage.waitForLoaded();

  const cartItem = cartPage.itemByName(PRODUCTS.bikeLight);
  await expect(cartItem.root).toHaveCount(1);
  await expect(cartItem.root).toBeVisible();
  await expect(cartItem.name).toHaveText(PRODUCTS.bikeLight);
  await expect(cartItem.price).toHaveText(PRICES.bikeLight);

  await expect(cartPage.items).toHaveCount(1);
});
