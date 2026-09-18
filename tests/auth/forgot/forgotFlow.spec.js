import { test } from '../../_fixtures/fixtures';
import { signUpAccount } from '../../../src/ui/actions/auth/signUpAccount';
import { SUCCESS_CUSTOMER_LOOKUP_MESSAGE } from '../../../src/ui/constants/authErrorMessages';

test.beforeEach(async ({ page, account, accountNavMenu }) => {
  await signUpAccount(page, account);
  await accountNavMenu.clickLogOut();
});

test.describe('Forgot credentials Flow', () => {
  test.describe('Positive scenarios', () => {
    test(`'Sign in' with invalid username credential`, async ({
      page,
      homePage,
      forgotLoginPage,
      account,
    }) => {
      const payload = { ...account };
      delete payload.username;
      delete payload.phone;
      delete payload.password;
      delete payload.confirmPassword;

      await homePage.clickForgotLink();
      await homePage.assertMainTextTitle('Customer Lookup');
      await forgotLoginPage.submitCustomerLookupForm(payload);
      await forgotLoginPage.assertElementTextIsVisible(
        SUCCESS_CUSTOMER_LOOKUP_MESSAGE,
      );
      await page.pause();
    });
  });
});
