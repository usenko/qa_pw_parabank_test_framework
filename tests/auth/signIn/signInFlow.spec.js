import { test } from '../../_fixtures/fixtures';
import { signUpAccount } from '../../../src/ui/actions/signUpAccount';
import { LOGIN_ERRORS } from '../../../src/ui/constants/authErrorMessages';
import { Severity } from 'allure-js-commons';

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
    test(
      `'Sign in' with invalid username credential`,
      { annotation: { type: 'severity', description: Severity.MINOR } },
      async ({ homePage }) => {
        await homePage.fillInputFieldByName('username', newUsername);
        await homePage.fillInputFieldByName('password', password);
        await homePage.clickLoginButton({ isSuccess: false });
        await homePage.assertMainTextTitle('Error!');
        await homePage.assertElementTextIsVisible(
          LOGIN_ERRORS.invalidCredentials,
        );
      },
    );

    test(
      `'Sign in' with invalid password credential`,
      { annotation: { type: 'severity', description: Severity.MINOR } },
      async ({ homePage }) => {
        await homePage.fillInputFieldByName('username', username);
        await homePage.fillInputFieldByName('password', newPassword);
        await homePage.clickLoginButton({ isSuccess: false });
        await homePage.assertMainTextTitle('Error!');
        await homePage.assertElementTextIsVisible(
          LOGIN_ERRORS.invalidCredentials,
        );
      },
    );

    test(
      `'Sign in' with empty credentials`,
      { annotation: { type: 'severity', description: Severity.MINOR } },
      async ({ homePage }) => {
        await homePage.fillInputFieldByName('username', '');
        await homePage.fillInputFieldByName('password', '');
        await homePage.clickLoginButton({ isSuccess: false });
        await homePage.assertMainTextTitle('Error!');
        await homePage.assertElementTextIsVisible(
          LOGIN_ERRORS.missingCredentials,
        );
      },
    );
  });

  test.describe('Positive scenarios', () => {
    test(
      'Successful `Sign in` with valid credentials',
      { annotation: { type: 'severity', description: Severity.BLOCKER } },
      async ({ homePage, account }) => {
        await homePage.fillInputFieldByName('username', account.username);
        await homePage.fillInputFieldByName('password', account.password);
        await homePage.clickLoginButton();
        await homePage.assertMainTextTitle('Accounts Overview');
      },
    );
  });
});
