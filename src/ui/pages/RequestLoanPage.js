import { expect } from '../../common/helpers/pwHelpers';
import { SIGN_UP_FIELDS } from '../../common/constants';
import { BasePage } from './BasePage';

export class RequestLoanPage extends BasePage {
  constructor(page, userId = 0) {
    super(page);
    this.page = page;
    this.userId = userId;
    this.applyNowButton = this.getButtonByName('Apply Now');
  }

  async applyNowButton() {
    return await this.step('Click "Update Profile" button', async () => {
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

  await;

  async applyLoanForm() {
    return await this.step(`Fill the 'Update Profile' form`, async () => {
      for (const [key, value] of Object.entries(account)) {
        if (SIGN_UP_FIELDS[key] && value !== undefined) {
          const fieldName = SIGN_UP_FIELDS[key];
          await this.fillInputFieldByName(fieldName, value, {
            withDelay: true,
          });
        }
      }
      return await this.clickUpdateProfileButton();
    });
  }
}
