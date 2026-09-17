import { test } from '../../_fixtures/fixtures';
import { signUpAccount } from '../../../src/ui/actions/auth/signUpAccount';

test.beforeEach(async ({ page, account }) => {
  await signUpAccount(page, account);
});

test('Successful `Sign in` flow test', async ({
  accountNavMenu,
  homePage,
  account,
}) => {
  await accountNavMenu.clickLogOut();
  await homePage.fillInputFieldByName('Username', account.username);
  await homePage.fillInputFieldByName('Password', account.password);
  await homePage.clickLoginButton();
  await homePage.assertMainTextTitle('Accounts Overview');
});
