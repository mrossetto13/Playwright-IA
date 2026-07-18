import type { Locator, Page } from '@playwright/test';

export class SidebarComponent {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get logoutLink(): Locator {
    return this.page.locator('#logout_sidebar_link');
  }

  async logout(): Promise<void> {
    await this.logoutLink.click();
  }
}
