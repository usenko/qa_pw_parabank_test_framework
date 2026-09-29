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
    this.transactionDateField = this.inputTextLocatorById('transactionDate');
    this.transactionDateFromField = this.inputTextLocatorById('fromDate');
    this.transactionDateToField = this.inputTextLocatorById('toDate');
    this.transactionAmountField = this.inputTextLocatorById('amount');
    this.transactionTableLocator = this.page.locator('#transactionTable');
  }

  async selectAccountId(accountId) {
    await this.step(`Select ${accountId} account id`, async () => {
      await this.selectOptionByLabel(this.accountIdSelector, accountId);
    });
  }

  async fillTransactionIdField(transactionId) {
    await this.step(`Fill Transaction Id field`, async () => {
      await this.transactionIdField.fill(transactionId);
    });
  }

  async fillTransactionDateField(date) {
    await this.step(`Fill Transaction Date field`, async () => {
      await this.transactionDateField.fill(date);
    });
  }

  async fillTransactionDateFromField(date) {
    await this.step(`Fill Transaction Date from field`, async () => {
      await this.transactionDateFromField.fill(date);
    });
  }

  async fillTransactionDateToField(date) {
    await this.step(`Fill Transaction Date to field`, async () => {
      await this.transactionDateToField.fill(date);
    });
  }

  async fillTransactionAmountField(amount) {
    await this.step(`Fill Transaction Amount field`, async () => {
      await this.transactionAmountField.fill(amount.toString());
    });
  }

  async clickFindTransactionButton(index = 0) {
    await this.step(`Click the 'Find Transactions' button`, async () => {
      await Promise.all([
        this.page.waitForResponse(response => {
          return (
            response.url().includes('/transactions/') &&
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
