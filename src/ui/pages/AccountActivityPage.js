import { BasePage } from './BasePage';

export class AccountActivityPage extends BasePage {
  constructor(page, userId = 0) {
    super(page, userId);
    this.detailsTable = this.page.locator('#accountDetails').getByRole('table');
    this.transactionTableLocator = this.page.locator('#transactionTable');
    this.goButton = this.getButtonByName('Go');
    this.activityPeriodSelector = this.page.locator('#month');
    this.typeSelector = this.page.locator('#transactionType');
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

  async clickGoButton() {
    await this.step(`Click on 'Go' button`, async () => {
      await Promise.all([
        this.page.waitForResponse(response => {
          return (
            response.url().includes('/transactions/') &&
            response.request().method() === 'GET' &&
            response.status() === 200
          );
        }),
        this.goButton.click(),
      ]);
    });
  }

  async selectActivityPeriod(month) {
    await this.step(
      `Select ${month} from activity period dropdown`,
      async () => {
        await this.selectOptionByLabel(this.activityPeriodSelector, month);
      },
    );
  }

  async selectType(type) {
    await this.step(
      `Select ${type} from activity period dropdown`,
      async () => {
        await this.selectOptionByLabel(this.typeSelector, type);
      },
    );
  }
}
