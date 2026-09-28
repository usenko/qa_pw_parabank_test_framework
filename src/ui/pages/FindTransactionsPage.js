import { BasePage } from './BasePage';
import { expect } from '../../common/helpers/pwHelpers';

export class FindTransactionsPage extends BasePage {
  constructor(page, userId = 0) {
    super(page);
    this.page = page;
    this.userId = userId;
    this.sendPaymentButton = this.getButtonByName('Find Transactions');
    this.accountIdSelector = this.page.locator('#accountId');
    this.transactionIdField = this.inputTextLocatorById('transactionId');
  }

  async selectAccountId(accountId) {
    await this.step(`Select ${accountId} account id`, async () => {
      await this.selectOptionByLabel(this.accountIdSelector, accountId);
    });
  }

  async fillTransactionIdField(transactionId) {
    await this.step(`Fill Transaction id field`, async () => {
      await this.transactionIdField.fill(transactionId);
    });
  }

  async clickSendPaymentButton({ isSuccess = true } = {}) {
    await this.step(`Click the 'Find Transactions' button`, async () => {
      if (isSuccess) {
        await Promise.all([
          this.page.waitForResponse(response => {
            return (
              response.url().includes('/bank/billpay') &&
              response.request().method() === 'POST' &&
              response.status() === 200
            );
          }),
          this.sendPaymentButton.click(),
        ]);
        await this.page.waitForURL('**/billpay.htm');
      } else {
        await this.sendPaymentButton.click();
      }
    });
  }

  async assertSuccessPaymentMessageIsShown(name, amount) {
    await this.step(
      `Assert payment to ${name} for $${amount} is successful`,
      async () => {
        await this.assertMainTextTitle('Bill Payment Complete');
        await expect(this.page.getByText(name)).toBeVisible();
        await expect(this.page.getByText(`$${amount}`)).toBeVisible();
      },
    );
  }
}
