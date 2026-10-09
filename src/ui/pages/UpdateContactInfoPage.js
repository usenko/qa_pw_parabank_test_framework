import { expect } from '../../common/helpers/pwHelpers';
import { SIGN_UP_FIELDS } from '../../common/constants';
import { BasePage } from './BasePage';

export class UpdateContactInfoPage extends BasePage {
  constructor(page, userId = 0) {
    super(page, userId);
    this.updateProfileButton = this.getButtonByName('Update Profile');
  }

  async openContactInfoPage() {
    await this.step(`Navigate to /parabank/updateprofile.htm`, async () => {
      await Promise.all([
        this.page
          .waitForResponse(
            response =>
              response.url().includes('/customers/') &&
              response.status() === 200,
            { timeout: 1000 },
          )
          .catch(() => {}),

        this.page.goto('/parabank/updateprofile.htm'),
      ]);
    });
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

      expect(responseBody).toContain('Successfully updated customer profile');
    });
  }

  async assertContactValue(inputName, expectedValue) {
    return await this.step(
      `Assert ${inputName} value is ${expectedValue}`,
      async () => {
        await expect(this.inputTextLocatorByName(inputName)).toHaveValue(
          expectedValue,
        );
      },
    );
  }
}
