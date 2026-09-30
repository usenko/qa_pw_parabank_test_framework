import { expect } from '../../common/helpers/pwHelpers';
import { SIGN_UP_FIELDS } from '../../common/constants';
import { BasePage } from './BasePage';

export class UpdateContactInfoPage extends BasePage {
  constructor(page, userId = 0) {
    super(page);
    this.page = page;
    this.userId = userId;
    this.updateProfileButton = this.getButtonByName('Update Profile');
  }

  async clickUpdateProfileButton() {
    return await this.step('Click "Update Profile" button', async () => {
      //   await this.page.waitForResponse(
      //     res =>
      //       res.url().includes('/customers/') && res.request().method() === 'GET',
      //   );
      const [response] = await Promise.all([
        this.page.waitForResponse(response => {
          return (
            response.url().includes('/customers/update') &&
            response.request().method() === 'POST' &&
            response.status() === 200
          );
        }),
        this.updateProfileButton.click(),
      ]);
      await this.page.waitForURL('**/updateprofile.htm');

      return response;
    });
  }

  async updateContactInfo(account) {
    await this.step(`Fill the 'Sign up' form`, async () => {
      for (const [key, value] of Object.entries(account)) {
        if (SIGN_UP_FIELDS[key] && value !== undefined) {
          const fieldName = SIGN_UP_FIELDS[key];
          await this.fillInputFieldByName(fieldName, value);
        }
      }
      await this.clickUpdateProfileButton();
    });
  }
}
