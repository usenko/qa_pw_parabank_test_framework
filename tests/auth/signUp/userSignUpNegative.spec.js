import { test } from '../../_fixtures/fixtures';

import { VALIDATION_AUTH_ERRORS } from '../../../src/ui/constants/authErrorMessages';

const testParameters = [
  {
    title: 'Empty first name',
    emptyField: 'firstname',
    message: VALIDATION_AUTH_ERRORS.FIRSTNAME,
  },
  {
    title: 'Empty last name',
    emptyField: 'lastname',
    message: VALIDATION_AUTH_ERRORS.LASTNAME,
  },
  {
    title: 'Empty address',
    emptyField: 'address',
    message: VALIDATION_AUTH_ERRORS.ADDRESS,
  },
  {
    title: 'Empty city',
    emptyField: 'city',
    message: VALIDATION_AUTH_ERRORS.CITY,
  },
  {
    title: 'Empty state',
    emptyField: 'state',
    message: VALIDATION_AUTH_ERRORS.STATE,
  },
  {
    title: 'Empty zipcode',
    emptyField: 'zipcode',
    message: VALIDATION_AUTH_ERRORS.ZIPCODE,
  },
  {
    title: 'Empty ssn',
    emptyField: 'ssn',
    message: VALIDATION_AUTH_ERRORS.SSN,
  },
  {
    title: 'Empty username',
    emptyField: 'username',
    message: VALIDATION_AUTH_ERRORS.USERNAME,
  },
  {
    title: 'Empty password',
    emptyField: 'password',
    message: VALIDATION_AUTH_ERRORS.PASSWORD,
  },
  {
    title: 'Empty confirmation password',
    emptyField: 'repeatedPassword',
    message: VALIDATION_AUTH_ERRORS.REPEATEDPASSWORD,
  },
];
test.describe('Sign up negative tests', () => {
  test.beforeEach(async ({ signUpPage }) => {
    await signUpPage.open();
    await signUpPage.clickLinkToRegister();
  });
  testParameters.forEach(({ message, title, emptyField }) => {
    test(`Should display validation error when ${title} field`, async ({
      signUpPage,
      account,
    }) => {
      const payload = {
        ...account,
        [emptyField]: '',
      };
      await signUpPage.submitSignUpForm(payload);
      await signUpPage.assertValidationMessageIsShown(message);
    });
  });
});
