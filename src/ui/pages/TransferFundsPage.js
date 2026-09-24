import { BasePage } from './BasePage';

export class TransferFundsPage extends BasePage {
  constructor(page, userId = 0) {
    super(page);
    this.page = page;
    this.userId = userId;
    this.accountFromSelect = this.page.locator('#fromAccountId');
    this.accountToSelect = this.page.locator('#toAccountId');
    this.ammountField = this.page.locator('#amount');
  }

  async selectFromAccountId(fromAccountId) {
    await this.step(`Select account that should send money`, async () => {
      await this.accountFromSelect.selectOption(fromAccountId);
    });
  }

  async selectToAccountId(toAccountId) {
    await this.step(`Select account that should recieve money`, async () => {
      await this.accountToSelect.selectOption(toAccountId);
    });
  }

  async fillAmountField(amount) {
    await this.step(`Fill amount to be transferred`, async () => {
      await this.ammountField.fill(amount.toString());
    });
  }

  async clickTransferButton() {
    await this.step(`Click the 'Transfer' button`, async () => {
      await Promise.all([
        this.page.waitForResponse(response => {
          return (
            response.url().includes('bank/transfer') &&
            response.request().method() === 'POST' &&
            response.status() === 200
          );
        }),
        this.getButtonByName('Transfer').click(),
      ]);
      await this.page.waitForURL('**/transfer.htm');
    });
  }
}
