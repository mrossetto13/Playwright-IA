const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { ProductsPage } = require('../../pages/ProductsPage');
const { CartPage } = require('../../pages/CartPage');
const { users, urls } = require('../../utils/test-data.js');

test('flujo e2e compra completa con validacion de API y logout', async ({ page, request }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);

  const productName = 'Sauce Labs Backpack';
  const expectedPrice = '$29.99';

  await test.step('1) Login con standard_user', async () => {
    await loginPage.open();
    await loginPage.login(users.standard.username, users.standard.password);

    await expect(page, 'Despues del login debe redirigir a inventory').toHaveURL(
      `${urls.base}${urls.inventory}`,
    );
  });

  await test.step('2) Verificar productos, agregar Backpack y validar contador', async () => {
    await productsPage.waitForLoaded();
    await expect(
      productsPage.inventoryItems.first(),
      'Debe haber al menos un producto visible en inventario',
    ).toBeVisible();

    const backpackItem = productsPage.itemByName(productName);
    await expect(
      backpackItem.root,
      `Debe existir exactamente una card del producto ${productName}`,
    ).toHaveCount(1);
    await expect(backpackItem.price, 'El precio del producto debe ser visible').toBeVisible();

    const uiPrice = await backpackItem.getPriceText();
    expect(uiPrice, 'El precio leido desde la UI debe ser $29.99').toBe(expectedPrice);

    await backpackItem.addToCart();

    await expect(productsPage.header.cartBadge, 'El badge del carrito debe mostrar 1').toHaveText('1');
  });

  await test.step('3) Ir a cart.html, validar producto/precio y contrastar precio con API', async () => {
    await productsPage.header.openCart();

    await expect(page, 'Al abrir carrito debe navegar a cart.html').toHaveURL(`${urls.base}${urls.cart}`);
    await cartPage.waitForLoaded();

    const cartItem = cartPage.itemByName(productName);
    await expect(cartItem.root, 'El producto Backpack debe estar en el carrito').toHaveCount(1);
    await expect(cartItem.price, 'El precio en carrito debe ser $29.99').toHaveText(expectedPrice);

    const apiResponse = await request.post('https://cursotesting.com.ar:3000/producto/', {
      data: {
        nombre: productName,
      },
    });

    expect(apiResponse.ok(), 'El endpoint de producto debe responder OK').toBeTruthy();
    expect(apiResponse.status(), 'El endpoint de producto debe responder 200').toBe(200);

    const apiBody = await apiResponse.json();
    const apiPrice = typeof apiBody.precio === 'number' ? `$${apiBody.precio.toFixed(2)}` : String(apiBody.precio);

    expect(apiPrice, 'El precio devuelto por la API debe ser $29.99').toBe(expectedPrice);

    await expect(cartPage.items, 'En el carrito debe haber exactamente 1 producto').toHaveCount(1);
  });

  await test.step('4) Hacer logout', async () => {
    await page.goto(`${urls.base}${urls.inventory}`);
    await productsPage.header.openSidebar();
    await expect(productsPage.sidebar.logoutLink, 'El link de logout debe estar visible').toBeVisible();
    await productsPage.sidebar.logout();
  });

  await test.step('5) Verificar que vuelve a la pantalla de login', async () => {
    await expect(page, 'Luego de logout debe volver a login').toHaveURL(`${urls.base}/`);
    await expect(loginPage.loginButton, 'El boton Login debe estar visible en pantalla').toBeVisible();
  });
});
