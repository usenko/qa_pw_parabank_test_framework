import { expect } from '../../common/helpers/pwHelpers';
import { parseAndFormatNumber } from '../../common/helpers/stringHelpers';
import { BasePage } from './BasePage';

export class AccountsOverviewPage extends BasePage {
  constructor(page, userId = 0) {
    super(page);
    this.page = page;
    this.userId = userId;
    this.findLoginButton = this.page.getByRole('button', {
      name: 'Find My Login Info',
    });
  }

  getAccountCellByName(cellname) {
    return this.page.getByRole('cell', { name: cellname });
  }

  getAccountCellByIndex(index = 0) {
    return this.page.getByRole('cell').nth(index);
  }

  async getAccountId() {
    return await this.step(`Get default account Id`, async () => {
      return await this.page
        .getByRole('row')
        .nth(1)
        .getByRole('link')
        .textContent();
    });
  }

  accountRowLocatorById(accountId) {
    return this.page.getByRole('row').filter({ hasText: accountId });
  }

  async getAccountAmountById(accountId, columnName) {
    return await this.step(
      `Get ${columnName} for account:${accountId}`,
      async () => {
        const columns = {
          balance: 1,
          'available amount': 2,
        };
        const columnIndex = columns[columnName.toLowerCase()];
        console.log('columnIndex', columnIndex);
        const textBalance = await this.accountRowLocatorById(accountId)
          .locator(this.getAccountCellByIndex(columnIndex))
          .textContent();

        return parseAndFormatNumber(textBalance);
      },
    );
  }

  async assertAccountIdIsVisible(accountId) {
    await this.step(`Assert that ${accountId} is visible`, async () => {
      await expect(this.accountRowLocatorById(accountId)).toBeVisible();
    });
  }

  async assertValueIsGreaterThanZero(value) {
    await this.step(`Assert Account value is greater than 0`, async () => {
      expect(Number(value)).toBeGreaterThan(0);
    });
  }

  async assertAccountsOverviewHasHeaderCell(cellname) {
    await this.step(`Assert that ${cellname} column is visible`, async () => {
      const headerCell = this.page
        .getByRole('row')
        .nth(0)
        .locator(this.getAccountCellByName(cellname));
      await expect(headerCell).toBeVisible();
    });
  }
}
