import { expect } from '../../common/helpers/pwHelpers';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  constructor(page, userId = 0) {
    super(page);
    this.page = page;
    this.userId = userId;
    this.loginPanel = this.page.locator('#loginPanel');
    this.loginButton = this.loginPanel.getByRole('button', { name: 'Log in' });
  }

  inputTextLocator(inputName) {
    return this.loginPanel.locator(`input[name="${inputName.toLowerCase()}"]`);
  }

  async fillInputFieldByName(inputName, value) {
    await this.step(`Fill the ${inputName} field`, async () => {
      await this.inputTextLocator(inputName).fill(value);
    });
  }

  async clickLoginButton() {
    await this.step(`Click the 'Log in' button`, async () => {
      await Promise.all([
        this.page.waitForResponse(response => {
          return (
            response.url().includes('overview') && response.status() === 200
          );
        }),
        await this.loginButton.click(),
      ]);
      await this.page.waitForURL('**/overview.htm');
    });
  }
}
