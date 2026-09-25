import { expect } from '../../common/helpers/pwHelpers';
import { parseAndFormatNumber } from '../../common/helpers/stringHelpers';
import { BasePage } from './BasePage';

export class AccountActivityPage extends BasePage {
  constructor(page, userId = 0) {
    super(page);
    this.page = page;
    this.userId = userId;
    this.detailsTable = this.page.locator('#accountDetails').getByRole('table');
    this.activityTableLocator = this.page.locator('#transactionTable');
  }

  async getTransactionDataByRow(rowNumber) {
    return await this.step(
      `Get transaction data from Account Activity table (row: ${rowNumber})`,
      async () => {
        const row = this.activityTableLocator.getByRole('row').nth(rowNumber);
        const cells = await row.getByRole('cell').allTextContents();
        return {
          date: cells[0] || '',
          transaction: cells[1] || '',
          debit: await parseAndFormatNumber(cells[2]),
          credit: await parseAndFormatNumber(cells[3]),
        };
      },
    );
  }

  async assertTransactionByType(rowNumber, fieldType, expectedValue) {
    await this.step(
      `Assert that transaction '${fieldType}' in row ${rowNumber} is equal to '${expectedValue}'`,
      async () => {
        const transactionData = await this.getTransactionDataByRow(rowNumber);
        const typeDataValue = transactionData[fieldType];
        expect(typeDataValue.toString()).toEqual(expectedValue);
      },
    );
  }
}
