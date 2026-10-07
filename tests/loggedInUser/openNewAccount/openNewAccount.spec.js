import { test } from '../../_fixtures/fixtures';
import { signUpAccount } from '../../../src/ui/actions/signUpAccount';
import { Severity } from 'allure-js-commons';

const testParameters = [
  {
    accountType: 'SAVINGS',
  },
  {
    accountType: 'CHECKING',
  },
];

test.describe('Open New Account Flow', () => {
  test.beforeEach(async ({ page, account }) => {
    await signUpAccount(page, account);
  });
  testParameters.forEach(({ accountType }) => {
    test(
      `Should be able to create new ${accountType} Account`,
      { annotation: { type: 'severity', description: Severity.CRITICAL } },
      async ({ accountsOverviewPage, openNewAccountPage, accountNavMenu }) => {
        await accountsOverviewPage.open('overview.htm');
        const accountId = await accountsOverviewPage.getAccountIdByLink();
        await accountNavMenu.clickNavLink('Open New Account');
        await accountsOverviewPage.assertMainTextTitle('Open New Account');
        await openNewAccountPage.selectAccountType(accountType);
        await openNewAccountPage.selectAccount(accountId);
        await openNewAccountPage.clickOpenNewAccountButton();
        await openNewAccountPage.assertMainTextTitle('Account Opened!');

        const newAccountId =
          await openNewAccountPage.getCreatedAccountId(accountId);
        await accountNavMenu.clickNavLink('Accounts Overview');
        await accountsOverviewPage.assertAccountIdIsVisible(newAccountId);
      },
    );
  });
});
