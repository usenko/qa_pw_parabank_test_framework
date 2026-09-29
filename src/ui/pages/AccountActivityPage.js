import { expect } from '../../common/helpers/pwHelpers';
import { parseAndFormatNumber } from '../../common/helpers/stringHelpers';
import { BasePage } from './BasePage';

export class AccountActivityPage extends BasePage {
  constructor(page, userId = 0) {
    super(page);
    this.page = page;
    this.userId = userId;
    this.detailsTable = this.page.locator('#accountDetails').getByRole('table');
    this.transactionTableLocator = this.page.locator('#transactionTable');
  }

  async clickTransactionLink(rowIndex, cellIndex = 1) {
    await this.step(
      `Click on transaction link for ${rowIndex} transaction`,
      async () => {
        await this.transactionTableLocator
          .getByRole('row')
          .nth(rowIndex)
          .getByRole('cell')
          .nth(cellIndex)
          .click();
      },
    );
  }
}
