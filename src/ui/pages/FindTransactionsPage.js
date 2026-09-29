import { BasePage } from './BasePage';
import { expect } from '../../common/helpers/pwHelpers';

export class FindTransactionsPage extends BasePage {
  constructor(page, userId = 0) {
    super(page);
    this.page = page;
    this.userId = userId;
    this.findTransactionButton = this.getButtonByName('Find Transactions');
    this.accountIdSelector = this.page.locator('#accountId');
    this.transactionIdField = this.inputTextLocatorById('transactionId');
    this.transactionTableLocator = this.page.locator('#transactionTable');
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

  async clickFindTransactionButton(index = 0) {
    await this.step(`Click the 'Find Transactions' button`, async () => {
      await Promise.all([
        this.page.waitForResponse(response => {
          return (
            response.url().includes('/bank/transactions/') &&
            response.request().method() === 'GET' &&
            response.status() === 200
          );
        }),
        this.findTransactionButton.nth(index).click(),
      ]);
      await this.page.waitForURL('**/findtrans.htm');
    });
  }
}
