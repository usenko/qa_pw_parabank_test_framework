import { test } from '../../_fixtures/fixtures';
import { signUpAccount } from '../../../src/ui/actions/signUpAccount';
import {
  CUSTOMER_LOOKUP_MESSAGES,
  VALIDATION_AUTH_ERRORS,
} from '../../../src/ui/constants/authErrorMessages';
import { Severity } from 'allure-js-commons';

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
  'firstName',
  'lastName',
  'address',
  'city',
  'state',
  'zipCode',
  'ssn',
];

test.describe('Forgot credentials Flow', () => {
  test.describe('Positive scenarios', () => {
    test.beforeEach(async ({ page, account, accountNavMenu }) => {
      await signUpAccount(page, account);
      await accountNavMenu.clickLogOut();
    });

    test(
      `Should successfully retrieve username with valid user data`,
      { annotation: { type: 'severity', description: Severity.CRITICAL } },
      async ({ homePage, forgotLoginPage, account }) => {
        //Check if account variable is correct
        const payload = { ...account };
        const username = account.username;

        await homePage.clickForgotLink();
        await homePage.assertMainTextTitle('Customer Lookup');
        await forgotLoginPage.submitCustomerLookupForm(payload);
        await forgotLoginPage.assertElementTextIsVisible(
          CUSTOMER_LOOKUP_MESSAGES.success,
        );
        await forgotLoginPage.assertUsernameRetrieved(username);
      },
    );
  });

  test.describe('Negative scenarios', () => {
    test(
      `Should display error message when invalid credentials are provided`,
      { annotation: { type: 'severity', description: Severity.MINOR } },
      async ({ homePage, forgotLoginPage }) => {
        await homePage.open();
        await homePage.clickForgotLink();
        await homePage.assertMainTextTitle('Customer Lookup');
        await forgotLoginPage.submitCustomerLookupForm(invalidCredentials);
        await forgotLoginPage.assertMainTextTitle('Error!');
        await forgotLoginPage.assertElementTextIsVisible(
          CUSTOMER_LOOKUP_MESSAGES.error,
        );
      },
    );

    test(
      `Should display validation errors for all required fields when form is submitted empty`,
      { annotation: { type: 'severity', description: Severity.MINOR } },
      async ({ homePage, forgotLoginPage }) => {
        await homePage.open();
        await homePage.clickForgotLink();
        await homePage.assertMainTextTitle('Customer Lookup');
        await forgotLoginPage.clickFindLoginButton();
        for (const field of lookupFields) {
          const errorMessage = VALIDATION_AUTH_ERRORS[field];
          await forgotLoginPage.assertValidationMessageIsShown(errorMessage);
        }
      },
    );
  });
});
