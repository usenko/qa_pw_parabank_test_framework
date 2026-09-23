import { expect } from '../../common/helpers/pwHelpers';
import { BasePage } from './BasePage';

export class OpenNewAccountPage extends BasePage {
  constructor(page, userId = 0) {
    super(page);
    this.page = page;
    this.userId = userId;
    this.accountTypeSelect = this.page.locator('#type');
    this.accountFromSelect = this.page.locator('#fromAccountId');
    this.newAccountId = this.page.locator('#newAccountId');
  }

  async selectAccountType(accountType) {
    await this.step(`Select ${accountType} account type`, async () => {
      await this.accountTypeSelect.selectOption({ label: accountType });
    });
  }

  async selectAccount(accountId) {
    await this.step(`Select ${accountId} account`, async () => {
      await this.accountFromSelect.selectOption({ label: accountId });
    });
  }

  async clickOpenNewAccountButton() {
    await this.step(`Click the 'Open New Account' button`, async () => {
      await Promise.all([
        this.page.waitForResponse(response => {
          console.log('👉 URL:', response.url());
          console.log('👉 Method:', response.request().method());
          return (
            response.url().includes('bank/createAccount') &&
            response.request().method() === 'POST' &&
            response.status() === 200
          );
        }),
        this.getButtonByName('Open New Account').click(),
      ]);
      await this.page.waitForURL('**/openaccount.htm', {
        waitUntil: 'domcontentloaded',
      });
    });
  }

  async getCreatedAccountId() {
    return await this.step(`Get created account id`, async () => {
      await expect(this.page.locator('#newAccountId')).toBeVisible();
      const accountId = await this.newAccountId.textContent();
      return accountId;
    });
  }
}
