import { BasePage } from './BasePage';

export class TransactionDetailsPage extends BasePage {
  constructor(page, userId = 0) {
    super(page, userId);
  }

  async getTransactionId() {
    return await this.step(`Get transaction ID`, async () => {
      return await this.getTableRowValueLocator(
        'Transaction ID:',
      ).textContent();
    });
  }
}
