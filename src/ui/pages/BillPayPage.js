import { expect } from '../../common/helpers/pwHelpers';
import { BasePage } from './BasePage';

export class BillPayPage extends BasePage {
  constructor(page, userId = 0) {
    super(page);
    this.page = page;
    this.userId = userId;
    this.loginPanel = this.page.locator('#loginPanel');
    this.loginButton = this.loginPanel.getByRole('button', { name: 'Log in' });
    this.forgotLoginButton = this.loginPanel.getByRole('link', {
      name: 'Forgot login info?',
    });
  }

  inputTextLocator(inputName) {
    return this.loginPanel.locator(`input[name="${inputName.toLowerCase()}"]`);
  }

  async fillInputFieldByName(inputName, value) {
    await this.step(`Fill the ${inputName} field`, async () => {
      await this.inputTextLocator(inputName).fill(value);
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
}
