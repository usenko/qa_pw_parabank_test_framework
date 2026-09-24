import { expect } from '../../common/helpers/pwHelpers';
import { parseAndFormatNumber } from '../../common/helpers/stringHelpers';
import { BasePage } from './BasePage';

export class AccountsOverviewPage extends BasePage {
  constructor(page, userId = 0) {
    super(page);
    this.page = page;
    this.userId = userId;
    this.detailsTable = this.page.locator('#accountDetails').getByRole('table');
  }

  getAccountCellByName(cellname) {
    return this.page.getByRole('cell', { name: cellname });
  }

  getAccountCellByIndex(index = 0) {
    return this.page.getByRole('cell').nth(index);
  }

  getAccountLink(accountId) {
    return this.page.getByRole('link', { name: accountId });
  }

  async clickAccountLink(accountId) {
    await this.step(`Click on 'Account activity' link`, async () => {
      await Promise.all([
        this.page.waitForResponse(response => {
          return (
            response.url().includes('/bank/accounts') &&
            response.request().method() === 'GET' &&
            response.status() === 200
          );
        }),
        this.page.waitForURL(`**/activity.htm?id=${accountId}`, {
          waitUntil: 'domcontentloaded',
        }),
        this.getAccountLink(accountId).click(),
      ]);
    });
  }

  async getAccountIdByLink() {
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

  async getCellAccountAmountById(accountId, columnName) {
    return await this.step(
      `Get ${columnName} for account:${accountId}`,
      async () => {
        const columns = {
          balance: 1,
          'available amount': 2,
        };
        const columnIndex = columns[columnName.toLowerCase()];
        const textBalance = await this.accountRowLocatorById(accountId)
          .locator(this.getAccountCellByIndex(columnIndex))
          .textContent();

        return parseAndFormatNumber(textBalance);
      },
    );
  }

  async getAccountDetailsData() {
    const rows = this.detailsTable.getByRole('row');
    const rowCount = await rows.count();
    const accountData = {};

    for (let i = 0; i <= rowCount; i++) {
      const currentRow = rows.nth(i);
      const cells = currentRow.getByRole('cell');

      if ((await cells.count()) >= 2) {
        const rawKey = await cells.nth(0).innerText();
        const key = rawKey.replace(':', '').trim();
        const value = await cells.nth(1).innerText();

        if (value.includes('$')) {
          accountData[key] = parseAndFormatNumber(value);
        } else {
          accountData[key] = value;
        }
      }
    }
    return accountData;
  }

  async assertAccountDetailData(keyData, expectedValue, actualData) {
    await this.step(`Assert "${keyData}" account detail data`, async () => {
      expect(actualData).toHaveProperty(keyData);
      expect(actualData[keyData]).toEqual(expectedValue);
    });
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

  async assertValuesAreEqual(actualBalance, expectedBalance) {
    await this.step(
      `Assert balance for the account equals to ${expectedBalance}`,
      async () => {
        expect(actualBalance).toBe(expectedBalance);
      },
    );
  }
}
