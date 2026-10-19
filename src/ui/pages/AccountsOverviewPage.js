import { expect } from '../../common/helpers/pwHelpers';
import { parseAndFormatNumber } from '../../common/helpers/stringHelpers';
import { BasePage } from './BasePage';

export class AccountsOverviewPage extends BasePage {
  constructor(page, userId = 0) {
    super(page, userId);
    this.detailsTable = this.page.locator('#accountDetails').getByRole('table');
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

  getDetailValueCell(label) {
    return this.detailsTable
      .getByRole('row')
      .filter({
        has: this.page.getByRole('cell', { name: label }),
      })
      .getByRole('cell')
      .nth(1);
  }

  async assertAccountDetailData(keyData, expectedValue) {
    const amoundFields = ['Available', 'Balance'];
    const expectedText = amoundFields.includes(keyData)
      ? `$${Number(expectedValue).toFixed(2)}`
      : String(expectedValue);
    await this.step(`Assert "${keyData}" equals ${expectedText}`, async () => {
      await expect(this.getDetailValueCell(keyData)).toHaveText(expectedText);
    });
  }

  async assertAccountIdIsVisible(accountId) {
    await this.step(`Assert that ${accountId} is visible`, async () => {
      await expect(this.accountRowLocatorById(accountId)).toBeVisible();
    });
  }

  async assertAccountValueEquals(accountId, columnName, expectedValue) {
    await this.step(
      `Assert ${columnName} for account:${accountId} equals ${expectedValue}`,
      async () => {
        const columns = {
          balance: 1,
          'available amount': 2,
        };
        const columnIndex = columns[columnName.toLowerCase()];
        const expectedString = `$${Number(expectedValue).toFixed(2)}`;

        const cellLocator = this.accountRowLocatorById(accountId).locator(
          this.getAccountCellByIndex(columnIndex),
        );
        await expect(cellLocator).toHaveText(expectedString);
      },
    );
  }

  async assertAccountsOverviewHasHeaderCell(cellname) {
    await this.step(`Assert that ${cellname} column is visible`, async () => {
      const headerCell = this.page
        .getByRole('row')
        .nth(0)
        .locator(this.getCellByName(cellname));
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
