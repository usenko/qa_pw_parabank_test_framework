import { test } from '../../_fixtures/fixtures';
import { signUpAccount } from '../../../src/ui/actions/auth/signUpAccount';
const testParameters = [
  {
    accountType: 'SAVINGS',
  },
  {
    accountType: 'CHECKING',
  },
];
test.beforeEach(async ({ page, account }) => {
  await signUpAccount(page, account);
});

test.describe('Open New Account Flow', () => {
  test(`Should be able to create new Account`, async ({
    accountsOverviewPage,
    openNewAccountPage,
    accountNavMenu,
    page,
  }) => {
    await accountNavMenu.clickNavLink('Open New Account');
    await accountsOverviewPage.assertMainTextTitle('Open New Account');
    await openNewAccountPage.selectAccountType('SAVINGS');
    await openNewAccountPage.clickOpenNewAccountButton();
    await page.pause();
    await accountsOverviewPage.assertMainTextTitle('Account Opened!');
  });
});
