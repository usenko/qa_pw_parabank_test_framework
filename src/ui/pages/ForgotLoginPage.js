import { expect } from '../../common/helpers/pwHelpers';
import { BasePage } from './BasePage';
import { CUSTOMER_LOOKUP_FIELDS } from '../../common/signUpFields';

export class ForgotLoginPage extends BasePage {
  constructor(page, userId = 0) {
    super(page);
    this.page = page;
    this.userId = userId;
    this.findLoginButton = this.getButtonByName('Find My Login Info');
    this.registerLink = this.page.getByRole('link', { name: 'Register' });
  }

  async clickFindLoginButton() {
    await this.step(`Click the 'Register' button`, async () => {
      await Promise.all([
        this.page.waitForResponse(response => {
          return response.url().includes('lookup') && response.status() === 200;
        }),
        this.findLoginButton.click(),
      ]);
      await this.page.waitForURL('**/lookup.htm');
    });
  }

  async submitCustomerLookupForm(account) {
    await this.step(`Fill the 'Customer Lookup' form`, async () => {
      for (const [key, value] of Object.entries(account)) {
        if (CUSTOMER_LOOKUP_FIELDS[key] && value !== undefined) {
          const fieldName = CUSTOMER_LOOKUP_FIELDS[key];
          await this.fillInputFieldByName(fieldName, value);
        }
      }
      await this.clickFindLoginButton();
    });
  }

  //   async submitCustomerLookupForm(account) {
  //   await this.step(`Fill the 'Customer Lookup' form`, async () => {
  //     const targetFields =
  // ['firstname', 'lastname', 'address', 'city', 'state', 'zipcode', 'ssn'];

  //     for (const key of targetFields) {
  //       const value = account[key];

  //       if (value !== undefined && SIGN_UP_FIELDS[key]) {
  //         const fieldName = SIGN_UP_FIELDS[key];
  //         await this.fillInputFieldByName(fieldName, value);
  //       }
  //     }
  //     await this.clickFindLoginButton();
  //   });
  // }

  async assertUsernameRetrieved(username) {
    await this.step(`Assert username ${username} is displayed`, async () => {
      const message = new RegExp(`Username:\\s*${username}`, 'i');
      await expect(this.page.getByText(message)).toBeVisible();
    });
  }
}
