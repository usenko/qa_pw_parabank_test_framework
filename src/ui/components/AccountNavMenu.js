import { testStep } from '../../common/helpers/pwHelpers';

export class AccountNavMenu {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.navigationLocator = this.page
      .locator('#leftPanel')
      .filter({ hasText: 'Account Services' });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  accountNavMenuItem(itemName) {
    return this.navigationLocator.getByRole('link', {
      name: itemName,
    });
  }

  async clickLogOut() {
    await this.step('Click "Log Out" link"', async () => {
      await this.accountNavMenuItem('Log Out').click();
    });
  }

  //await testStep('Sign up account', async () => {});
}
