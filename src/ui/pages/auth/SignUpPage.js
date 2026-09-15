import { expect } from '../../../common/helpers/pwHelpers';
import { BasePage } from '../BasePage';

export class SignUpPage extends BasePage {
  constructor(page, userId = 0) {
    super(page);
    this.page = page;
    this.userId = userId;
  }

  inputTextLocator(inputName) {
    return this.page
      .getByRole('row')
      .filter({ hasText: inputName })
      .getByRole('textbox');
  }

  async fillInputFieldByName(inputName, value) {
    await this.step(`Fill the ${inputName} field`, async () => {
      await this.inputTextLocator(inputName).fill(value);
    });
  }

  async clickSignUpButton() {
    await this.step(`Click the 'Register' button`, async () => {
      await this.signUpButton.click();
    });
  }

  async submitSignUpForm(user) {
    await this.step(`Fill the 'Sign up' form`, async () => {});
  }

  async assertErrorMessageContainsText(messageText) {
    await this.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.errorMessage).toContainText(messageText);
    });
  }
}
