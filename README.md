# Playwright-IA

Proyecto de automatizacion E2E con Playwright para `saucedemo.com`, organizado con arquitectura Page Object Model (POM), componentes reutilizables y datos centralizados.

## Lo que se implemento

- Setup inicial del proyecto con TypeScript y Playwright.
- Instalacion de `playwright`, `@playwright/test`, `@playwright/mcp`, `dotenv`.
- Estructura de carpetas de pruebas:
  - `tests/login`
  - `tests/productos`
  - `tests/carrito`
  - `tests/e2e`
- Datos de prueba en `data/test-data.json`.
- Configuracion en `playwright.config.ts`:
  - `baseURL: https://www.saucedemo.com`
  - `video: 'on'`
  - `retries: 1`
  - `timeout: 30000`

## Refactor a POM

Se elimino duplicacion de selectores y acciones, separando responsabilidades en:

- `pages/`
  - `BasePage.ts`
  - `LoginPage.ts`
  - `ProductsPage.ts`
  - `CartPage.ts`
- `components/`
  - `HeaderComponent.ts`
  - `SidebarComponent.ts`
  - `InventoryItemComponent.ts`
- `utils/`
  - `constants.ts`
  - `test-data.ts`
  - `test-data.js`

## Tests creados

- Login exitoso: `tests/login/exitoso/login-exitoso.spec.ts`
- Login rechazado (credenciales desde `.env`): `tests/login/rechazado/login-rechazado.spec.ts`
- Logout y bloqueo de acceso directo a inventario: `tests/login/logout.spec.ts`
- Seleccion de producto, validacion de precio y badge: `tests/productos/select-product.spec.ts`
- Verificacion de carrito (`cart.html`): `tests/carrito/verify-cart.spec.ts`
- Flujo E2E completo + validacion API POST externa: `tests/e2e/compra-completa.spec.js`

## Configuracion de entorno

1. Copiar el ejemplo:

```bash
cp .env.example .env
```

2. Ajustar valores si hace falta:

```env
LOCKED_USERNAME=locked_out_user
LOCKED_PASSWORD=secret_sauce
```

## Instalacion y ejecucion

```bash
npm install
npx playwright install
npx playwright test
```

Para ejecutar un test puntual:

```bash
npx playwright test tests/e2e/compra-completa.spec.js
```
