export const ROUTES = {
  login: '/',
  inventory: '/inventory.html',
  cart: '/cart.html',
} as const;

export const URL_PATTERNS = {
  login: /\/$/,
  inventory: /\/inventory\.html$/,
  cart: /\/cart\.html$/,
} as const;

export const PRODUCTS = {
  backpack: 'Sauce Labs Backpack',
  bikeLight: 'Sauce Labs Bike Light',
} as const;

export const PRICES = {
  backpack: '$29.99',
  bikeLight: '$9.99',
} as const;

export const ERROR_MESSAGES = {
  lockedOut: 'Sorry, this user has been locked out.',
} as const;

export const SELECTORS = {
  inventoryContainer: '[data-test="inventory-container"]',
  inventoryItem: '[data-test="inventory-item"]',
} as const;
