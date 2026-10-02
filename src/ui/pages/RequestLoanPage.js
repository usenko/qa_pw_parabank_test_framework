import { expect } from '../../common/helpers/pwHelpers';
import { SIGN_UP_FIELDS } from '../../common/constants';
import { BasePage } from './BasePage';

export class RequestLoanPage extends BasePage {
  constructor(page, userId = 0) {
    super(page);
    this.page = page;
    this.userId = userId;
    this.applyNowButton = this.getButtonByName('Apply Now');
    this.newAccountIdLocator = this.page.locator('#newAccountId');
  }

  async clickApplyNowButton() {
    return await this.step('Click "Apply Now" button', async () => {
      await Promise.all([
        this.page.waitForResponse(response => {
          const url = response.url();
          const method = response.request().method();
          const status = response.status();

          return (
            url.includes('/requestLoan') && method === 'POST' && status === 200
          );
        }),
        this.applyNowButton.click(),
      ]);
      await this.page.waitForURL('**/requestloan.htm');
    });
  }

  async getAccountId() {
    return await this.step(
      'Get new created account Id from Request Loan page',
      async () => {
        return await this.newAccountIdLocator.textContent();
      },
    );
  }
}
