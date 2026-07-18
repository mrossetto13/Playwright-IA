import type { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { HeaderComponent } from '../components/HeaderComponent';
import { InventoryItemComponent } from '../components/InventoryItemComponent';
import { SidebarComponent } from '../components/SidebarComponent';
import { SELECTORS } from '../utils/constants';

export class ProductsPage extends BasePage {
  readonly header: HeaderComponent;
  readonly sidebar: SidebarComponent;

  constructor(page: Page) {
    super(page);
    this.header = new HeaderComponent(page);
    this.sidebar = new SidebarComponent(page);
  }

  get inventoryContainer(): Locator {
    return this.page.locator(SELECTORS.inventoryContainer);
  }

  get inventoryList(): Locator {
    return this.page.locator('.inventory_list');
  }

  get inventoryItems(): Locator {
    return this.page.locator(SELECTORS.inventoryItem);
  }

  itemByName(productName: string): InventoryItemComponent {
    const root = this.inventoryItems.filter({
      has: this.page.getByText(productName, { exact: true }),
    });

    return new InventoryItemComponent(root);
  }

  async waitForLoaded(): Promise<void> {
    await this.inventoryContainer.waitFor({ state: 'visible' });
  }
}
