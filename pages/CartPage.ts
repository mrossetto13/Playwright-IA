import type { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { InventoryItemComponent } from '../components/InventoryItemComponent';
import { SELECTORS } from '../utils/constants';

export class CartPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get items(): Locator {
    return this.page.locator(SELECTORS.inventoryItem);
  }

  itemByName(productName: string): InventoryItemComponent {
    const root = this.items.filter({
      has: this.page.getByText(productName, { exact: true }),
    });

    return new InventoryItemComponent(root);
  }

  async waitForLoaded(): Promise<void> {
    await this.page.locator('[data-test="cart-list"]').waitFor({ state: 'visible' });
  }
}
