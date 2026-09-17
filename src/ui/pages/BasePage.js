import { expect, testStep } from '../../common/helpers/pwHelpers';

export class BasePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.mainTitle = this.page.locator('');
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
}
