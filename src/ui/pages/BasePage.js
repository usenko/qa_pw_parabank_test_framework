import { expect, testStep } from '../../common/helpers/pwHelpers';

export class BasePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.rightPanel = this.page.locator('#rightPanel');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open(url = '/') {
    await this.step(`Navigate to ${url}`, async () => {
      await this.page.goto(url);
    });
  }

  getMainTitle(titleName) {
    return this.page.getByRole('heading', { name: titleName });
  }

  async assertMainTextTitle(titleName) {
    await this.step(`Assert the main title has ${titleName} text`, async () => {
      await expect(this.getMainTitle(titleName)).toContainText(titleName);
    });
  }

  async assertElementTextIsVisible(text) {
    await this.step(`Verify text element ${text} is visible`, async () => {
      await expect(this.rightPanel.getByText(text)).toBeVisible();
    });
  }

  async assertValidationMessageIsShown(message) {
    await this.step(`Assert the error ${message} is shown`, async () => {
      await expect(
        this.page.getByRole('cell', { name: message }),
      ).toContainText(message);
    });
  }
}
