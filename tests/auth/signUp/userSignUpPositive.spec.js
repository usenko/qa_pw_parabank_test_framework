import { test } from '../../_fixtures/fixtures';

test('Successful `Sign up` flow test', async ({ signUpPage, account }) => {
  await signUpPage.open();
  await signUpPage.clickLinkToRegister();
  await signUpPage.submitSignUpForm(account);
  await signUpPage.assertSuccessfullyRegisterMessage(account.username);
});
