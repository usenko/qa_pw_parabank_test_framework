import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  constructor(page, userId = 0) {
    super(page, userId);
    this.loginPanel = this.page.locator('#loginPanel');
    this.loginButton = this.loginPanel.getByRole('button', { name: 'Log in' });
    this.forgotLoginButton = this.loginPanel.getByRole('link', {
      name: 'Forgot login info?',
    });
  }

  async clickLoginButton({ isSuccess = true } = {}) {
    await this.step(`Click the 'Log in' button`, async () => {
      if (isSuccess) {
        await Promise.all([
          this.page.waitForResponse(response => {
            return (
              response.url().includes('overview') && response.status() === 200
            );
          }),
          this.loginButton.click(),
        ]);
        await this.page.waitForURL('**/overview.htm');
      } else {
        await Promise.all([
          this.page.waitForResponse(
            response =>
              response.url().includes('login.htm') && response.status() === 200,
          ),
          this.loginButton.click(),
        ]);
      }
    });
  }

  async login({ username, password }, { isSuccess = true } = {}) {
    await this.step(`Log in as '${username}'`, async () => {
      await this.fillInputFieldByName('username', username);
      await this.fillInputFieldByName('password', password);
      await this.clickLoginButton({ isSuccess });
    });
  }

  async clickForgotLink() {
    await this.step(`Click the 'Forgot login info' button`, async () => {
      await Promise.all([
        this.page.waitForResponse(
          response =>
            response.url().includes('lookup.htm') && response.status() === 200,
        ),
        this.forgotLoginButton.click(),
      ]);

      await this.page.waitForURL('**/lookup.htm');
    });
  }

  async assertLoginPanelIsVisible() {
    await this.step(`Assert login panel is visible`, async () => {
      await this.loginPanel.waitFor({ state: 'visible' });
    });
  }
}
