import type { Locator } from '@playwright/test';

export class InventoryItemComponent {
  readonly root: Locator;

  constructor(root: Locator) {
    this.root = root;
  }

  get name(): Locator {
    return this.root.locator('[data-test="inventory-item-name"]');
  }

  get price(): Locator {
    return this.root.locator('[data-test="inventory-item-price"]');
  }

  get addToCartButton(): Locator {
    return this.root.getByRole('button', { name: 'Add to cart' });
  }

  async getPriceText(): Promise<string> {
    await this.price.waitFor({ state: 'visible' });
    return (await this.price.innerText()).trim();
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }
}
