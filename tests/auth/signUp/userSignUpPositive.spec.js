import { test } from '../../_fixtures/fixtures';

test('Successful `Sign in` flow test', async ({ signUpPage, account }) => {
  await signUpPage.openUrl();
  await signUpPage.clickLinkToRegister();
  await signUpPage.submitSignUpForm(account);
});
