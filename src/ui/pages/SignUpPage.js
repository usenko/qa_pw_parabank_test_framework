import { expect } from '../../common/helpers/pwHelpers';
import { BasePage } from './BasePage';
import { SIGN_UP_FIELDS } from '../../common/signUpFields';

export class SignUpPage extends BasePage {
  constructor(page, userId = 0) {
    super(page);
    this.page = page;
    this.userId = userId;
    this.registerButton = this.page.getByRole('button', { name: 'Register' });
    this.registerLink = this.page.getByRole('link', { name: 'Register' });
  }

  inputTextLocator(inputName) {
    return this.page
      .getByRole('row')
      .filter({ hasText: inputName })
      .locator('input');
  }

  async fillInputFieldByName(inputName, value) {
    await this.step(`Fill the ${inputName} field`, async () => {
      await this.inputTextLocator(inputName).fill(value);
    });
  }

  async clickRegisterButton() {
    await this.step(`Click the 'Register' button`, async () => {
      await Promise.all([
        this.page.waitForResponse(response => {
          return (
            response.url().includes('register') &&
            response.request().method() === 'POST' &&
            response.status() === 200
          );
        }),
        await this.registerButton.click(),
      ]);
      await this.page.waitForURL('**/register.htm');
    });
  }

  async clickLinkToRegister() {
    await this.step(`Click the 'Register' link`, async () => {
      await this.registerLink.click();
    });
  }

  async submitSignUpForm(account) {
    await this.step(`Fill the 'Sign up' form`, async () => {
      for (const [key, value] of Object.entries(account)) {
        if (SIGN_UP_FIELDS[key] && value !== undefined) {
          const fieldName = SIGN_UP_FIELDS[key];
          await this.fillInputFieldByName(fieldName, value);
        }
      }
      await this.clickRegisterButton();
    });
  }

  async assertSuccessfullyRegisterMessage(username) {
    await this.step(`Assert welcome message for ${username}`, async () => {
      const messageText = `Welcome ${username}`;
      await expect(
        this.page.getByRole('heading', {
          name: 'Welcome',
        }),
      ).toContainText(messageText);
    });
  }

  async assertErrorMessageIsShown(message) {
    await this.step(`Assert the error ${message} is shown`, async () => {
      await expect(
        this.page.getByRole('cell', { name: message }),
      ).toContainText(message);
    });
  }
}
