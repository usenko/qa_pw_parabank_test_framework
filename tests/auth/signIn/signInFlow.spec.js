import { test } from '../../_fixtures/fixtures';
import { signUpAccount } from '../../../src/ui/actions/signUpAccount';
import { LOGIN_ERRORS } from '../../../src/ui/constants/authErrorMessages';
import { Severity } from 'allure-js-commons';

let INVALID_USERNAME = 'invalid_username';
let INVALID_PASSWORD = 'invalid_password';

const testParameters = [
  {
    title: 'invalid_username',
    getCredentials: account => ({
      username: INVALID_USERNAME,
      password: account.password,
    }),
  },
  {
    title: 'invalid_password',
    getCredentials: account => ({
      username: account.username,
      password: INVALID_PASSWORD,
    }),
  },
];

test.describe('Sign in Flow', () => {
  test.describe('Registered user', () => {
    test.beforeEach(async ({ page, account, accountNavMenu }) => {
      await signUpAccount(page, account);
      await accountNavMenu.clickLogOut();
    });

    test(
      'Successful `Sign in` with valid credentials',
      { annotation: { type: 'severity', description: Severity.BLOCKER } },
      async ({ homePage, account }) => {
        await homePage.login(account);
        await homePage.assertMainTextTitle('Accounts Overview');
      },
    );

    testParameters.forEach(({ title, getCredentials }) => {
      test(
        `'Sign in' with ${title} credential`,
        { annotation: { type: 'severity', description: Severity.MINOR } },
        async ({ homePage, account }) => {
          await homePage.login(getCredentials(account), { isSuccess: false });
          await homePage.assertMainTextTitle('Error!');
          await homePage.assertElementTextIsVisible(
            LOGIN_ERRORS.invalidCredentials,
          );
        },
      );
    });
  });

  test.describe('Not registered user', () => {
    test(
      `'Sign in' with empty credentials`,
      { annotation: { type: 'severity', description: Severity.MINOR } },
      async ({ homePage }) => {
        await homePage.open();
        await homePage.login(
          { username: '', password: '' },
          { isSuccess: false },
        );

        await homePage.assertMainTextTitle('Error!');
        await homePage.assertElementTextIsVisible(
          LOGIN_ERRORS.missingCredentials,
        );
      },
    );
  });
});
