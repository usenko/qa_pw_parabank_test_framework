import { expect } from '../../common/helpers/pwHelpers';
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

  async updateContactInfoAndIntercept(newData) {
    if (newData.firstName) await this.firstNameInput.fill(newData.firstName);
    if (newData.lastName) await this.lastNameInput.fill(newData.lastName);
    if (newData.address) await this.addressInput.fill(newData.address);
    if (newData.city) await this.cityInput.fill(newData.city);
    if (newData.state) await this.stateInput.fill(newData.state);
    if (newData.zipCode) await this.zipCodeInput.fill(newData.zipCode);
    if (newData.phoneNumber)
      await this.phoneNumberInput.fill(newData.phoneNumber);

    return await this.clickUpdateProfileButton();
  }
}
