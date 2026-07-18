import type { Locator, Page } from '@playwright/test';

export class HeaderComponent {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get cartLink(): Locator {
    return this.page.locator('[data-test="shopping-cart-link"]');
  }

  get cartBadge(): Locator {
    return this.page.locator('[data-test="shopping-cart-badge"]');
  }

  get burgerButton(): Locator {
    return this.page.locator('#react-burger-menu-btn');
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }

  async openSidebar(): Promise<void> {
    await this.burgerButton.click();
  }
}
