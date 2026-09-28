import { expect } from '../../common/helpers/pwHelpers';
import { parseAndFormatNumber } from '../../common/helpers/stringHelpers';
import { BasePage } from './BasePage';

export class AccountActivityPage extends BasePage {
  constructor(page, userId = 0) {
    super(page);
    this.page = page;
    this.userId = userId;
    this.detailsTable = this.page.locator('#accountDetails').getByRole('table');
    this.detailsTableLocator = this.page.locator('#transactionTable');
  }

  async getTransactionDataByRow(rowIndex) {
    return await this.step(
      `Get transaction data from Account Activity table (row: ${rowIndex})`,
      async () => {
        const row = this.detailsTableLocator.getByRole('row').nth(rowIndex);
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

  async clickTransactionLink(rowIndex, cellIndex = 1) {
    await this.step(
      `Click on transaction link for ${rowIndex} transaction`,
      async () => {
        await this.detailsTableLocator
          .getByRole('row')
          .nth(rowIndex)
          .getByRole('cell')
          .nth(cellIndex)
          .click();
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
