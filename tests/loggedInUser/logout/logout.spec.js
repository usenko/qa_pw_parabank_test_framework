import { test } from '../../_fixtures/fixtures';
import { signUpAccount } from '../../../src/ui/actions/signUpAccount';
import { Severity } from 'allure-js-commons';

test.beforeEach(async ({ page, account }) => {
  await signUpAccount(page, account);
});

test.describe('Logout Flow', () => {
  test(
    `Should be able to logout from account`,
    {
      annotation: { type: 'severity', description: Severity.MINOR },
    },
    async ({ accountNavMenu, homePage }) => {
      await accountNavMenu.clickLogOut();
      await homePage.assertLoginPanelIsVisible();
    },
  );
});
