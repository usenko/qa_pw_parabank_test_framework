import { test } from '../../_fixtures/fixtures';
import { signUpAccount } from '../../../src/ui/actions/auth/signUpAccount';
import {
  CUSTOMER_LOOKUP_MESSAGES,
  VALIDATION_AUTH_ERRORS,
} from '../../../src/ui/constants/authErrorMessages';

const invalidCredentials = {
  firstname: 'Invalid',
  lastname: 'User',
  address: 'Fake street',
  city: 'FakeCity',
  state: 'FakeState',
  zipcode: '000000',
  ssn: '000000',
};

const lookupFields = [
  'FIRSTNAME',
  'LASTNAME',
  'ADDRESS',
  'CITY',
  'STATE',
  'ZIPCODE',
  'SSN',
];

test.describe('Forgot credentials Flow', () => {
  test.describe('Positive scenarios', () => {
    test.beforeEach(async ({ page, account, accountNavMenu }) => {
      await signUpAccount(page, account);
      await accountNavMenu.clickLogOut();
    });
    test(`Should successfully retrieve username with valid user data`, async ({
      homePage,
      forgotLoginPage,
      account,
    }) => {
      const payload = { ...account };
      const username = account.username;
      delete payload.username;
      delete payload.phone;
      delete payload.password;
      delete payload.confirmPassword;

      await homePage.clickForgotLink();
      await homePage.assertMainTextTitle('Customer Lookup');
      await forgotLoginPage.submitCustomerLookupForm(payload);
      await forgotLoginPage.assertElementTextIsVisible(
        CUSTOMER_LOOKUP_MESSAGES.SUCCESS,
      );
      await forgotLoginPage.assertUsernameRetrieved(username);
    });
  });

  test.describe('Negative scenarios', () => {
    test(`Should display error message when invalid credentials are provided`, async ({
      page,
      homePage,
      forgotLoginPage,
    }) => {
      await homePage.open();
      await homePage.clickForgotLink();
      await homePage.assertMainTextTitle('Customer Lookup');
      await forgotLoginPage.submitCustomerLookupForm(invalidCredentials);
      await forgotLoginPage.assertMainTextTitle('Error!');
      await forgotLoginPage.assertElementTextIsVisible(
        CUSTOMER_LOOKUP_MESSAGES.ERROR,
      );
      await page.pause();
    });

    test(`Should display validation errors for all required fields when form is submitted empty`, async ({
      page,
      homePage,
      forgotLoginPage,
    }) => {
      await homePage.open();
      await homePage.clickForgotLink();
      await homePage.assertMainTextTitle('Customer Lookup');
      await forgotLoginPage.clickFindLoginButton();
      for (const field of lookupFields) {
        const errorMessage = VALIDATION_AUTH_ERRORS[field];
        await forgotLoginPage.assertValidationMessageIsShown(errorMessage);
      }
    });
  });
});
