import { test } from '../../_fixtures/fixtures';
import { signUpAccount } from '../../../src/ui/actions/signUpAccount';

test.beforeEach(async ({ page, account }) => {
  await signUpAccount(page, account);
});
test.describe('Bill Payment Service — Positive Flows', () => {
  test(`Should complete bill payment process successfully`, async ({
    homePage,
    forgotLoginPage,
    account,
  }) => {
    const payload = { ...account };
    const username = account.username;

    await homePage.clickForgotLink();
    await homePage.assertMainTextTitle('Customer Lookup');
    await forgotLoginPage.submitCustomerLookupForm(payload);
    await forgotLoginPage.assertElementTextIsVisible(
      CUSTOMER_LOOKUP_MESSAGES.SUCCESS,
    );
    await forgotLoginPage.assertUsernameRetrieved(username);
  });
  //should display error messages when submitting an empty form
});
