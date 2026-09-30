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
      const [response] = await Promise.all([
        this.page.waitForResponse(response => {
          const url = response.url();
          const method = response.request().method();
          const status = response.status();

          return (
            url.includes('/customers') &&
            (method === 'POST' || method === 'GET') &&
            status === 200
          );
        }),
        this.updateProfileButton.click(),
      ]);
      await this.page.waitForURL('**/updateprofile.htm');

      return response;
    });
  }

  async updateContactInfo(account) {
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

  async assertResponseData(response) {
    await this.step(`Assert response from server`, async () => {
      expect(response).toBeDefined();
      const responseBody = await response.text();
      console.log('Финальный перехваченный ответ:', responseBody);
      expect(responseBody).toContain('Successfully updated customer profile');
    });
  }
}
