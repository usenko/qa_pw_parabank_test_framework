import { test } from '../../_fixtures/fixtures';
import { signUpAccount } from '../../../src/ui/actions/signUpAccount';
import { LOGIN_ERRORS } from '../../../src/ui/constants/authErrorMessages';

let username;
let password;
let newUsername;
let newPassword;

test.beforeEach(async ({ page, account, accountNavMenu }) => {
  await signUpAccount(page, account);
  await accountNavMenu.clickLogOut();

  username = account.username;
  password = account.password;
  newUsername = 'invalid_username';
  newPassword = 'invalid_password';
});

test.describe('Sign in Flow', () => {
  test.describe('Negative scenarios', () => {
    test(`'Sign in' with invalid username credential`, async ({ homePage }) => {
      await homePage.fillInputFieldByName('username', newUsername);
      await homePage.fillInputFieldByName('password', password);
      await homePage.clickLoginButton({ isSuccess: false });
      await homePage.assertMainTextTitle('Error!');
      await homePage.assertElementTextIsVisible(
        LOGIN_ERRORS.INVALID_CREDENTIALS,
      );
    });

    test(`'Sign in' with invalid password credential`, async ({ homePage }) => {
      await homePage.fillInputFieldByName('username', username);
      await homePage.fillInputFieldByName('password', newPassword);
      await homePage.clickLoginButton({ isSuccess: false });
      await homePage.assertMainTextTitle('Error!');
      await homePage.assertElementTextIsVisible(
        LOGIN_ERRORS.INVALID_CREDENTIALS,
      );
    });

    test(`'Sign in' with empty credentials`, async ({ homePage }) => {
      await homePage.fillInputFieldByName('username', '');
      await homePage.fillInputFieldByName('password', '');
      await homePage.clickLoginButton({ isSuccess: false });
      await homePage.assertMainTextTitle('Error!');
      await homePage.assertElementTextIsVisible(
        LOGIN_ERRORS.MISSING_CREDENTIALS,
      );
    });
  });

  test.describe('Positive scenarios', () => {
    test('Successful `Sign in` with valid credentials', async ({
      homePage,
      account,
    }) => {
      await homePage.fillInputFieldByName('username', account.username);
      await homePage.fillInputFieldByName('password', account.password);
      await homePage.clickLoginButton();
      await homePage.assertMainTextTitle('Accounts Overview');
    });
  });
});
