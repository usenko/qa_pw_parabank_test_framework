import { test } from '../../_fixtures/fixtures';
import { signUpAccount } from '../../../src/ui/actions/signUpAccount';
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
    test(`Should be able to create new ${accountType} Account`, async ({
      accountsOverviewPage,
      openNewAccountPage,
      accountNavMenu,
    }) => {
      await accountsOverviewPage.open('/parabank/overview.htm');
      const accountId = await accountsOverviewPage.getAccountIdByLink();
      await accountNavMenu.clickNavLink('Open New Account');
      await accountsOverviewPage.assertMainTextTitle('Open New Account');
      await openNewAccountPage.selectAccountType(accountType);
      await openNewAccountPage.selectAccount(accountId);
      await openNewAccountPage.clickOpenNewAccountButton();
      await openNewAccountPage.assertMainTextTitle('Account Opened!');

      const newAccontId =
        await openNewAccountPage.getCreatedAccountId(accountId);
      await accountNavMenu.clickNavLink('Accounts Overview');
      await accountsOverviewPage.assertAccountIdIsVisible(newAccontId);
    });
  });
});
