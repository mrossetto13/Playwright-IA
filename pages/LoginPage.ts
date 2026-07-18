import type { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { ROUTES } from '../utils/constants';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get usernameInput(): Locator {
    return this.page.getByPlaceholder('Username');
  }

  get passwordInput(): Locator {
    return this.page.getByPlaceholder('Password');
  }

  get loginButton(): Locator {
    return this.page.getByRole('button', { name: 'Login' });
  }

  get errorMessage(): Locator {
    return this.page.locator('[data-test="error"]');
  }

  async open(): Promise<void> {
    await this.goto(ROUTES.login);
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
