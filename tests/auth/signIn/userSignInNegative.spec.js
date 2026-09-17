import { test } from '../../_fixtures/fixtures';
import { signUpAccount } from '../../../src/ui/actions/auth/signUpAccount';

let username;
let password;

test.beforeEach(async ({ page, account }) => {
  await signUpAccount(page, account);
  username = account.username
  password = account.password

test.describe('Login Flow', () => {
  test('`Sign in` with invalid credentials', async ({
    accountNavMenu,
    homePage,
    account,
  }) => {
    await accountNavMenu.clickLogOut();
    await homePage.fillInputFieldByName('Username', account.username);
    await homePage.fillInputFieldByName('Password', account.password);
    await homePage.clickLoginButton();
    await homePage.assertMainTextTitle('Error!');
  });
});
