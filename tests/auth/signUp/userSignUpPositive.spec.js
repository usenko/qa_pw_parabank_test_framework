import { test } from '../../_fixtures/fixtures';
import { Severity } from 'allure-js-commons';

test(
  'Successful `Sign up` flow test',
  { annotation: { type: 'severity', description: Severity.BLOCKER } },
  async ({ signUpPage, account }) => {
    await signUpPage.open();
    await signUpPage.clickLinkToRegister();
    await signUpPage.submitSignUpForm(account);
    await signUpPage.assertSuccessfullyRegisterMessage(account.username);
  },
);
