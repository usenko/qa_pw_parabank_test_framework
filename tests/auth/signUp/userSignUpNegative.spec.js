import { test } from '../../_fixtures/fixtures';

import { VALIDATION_AUTH_ERRORS } from '../../../src/ui/constants/authErrorMessages';

const testParameters = [
  {
    title: 'Empty first name',
    emptyField: 'firstname',
    message: VALIDATION_AUTH_ERRORS.firstName,
  },
  {
    title: 'Empty last name',
    emptyField: 'lastname',
    message: VALIDATION_AUTH_ERRORS.lastName,
  },
  {
    title: 'Empty address',
    emptyField: 'address',
    message: VALIDATION_AUTH_ERRORS.address,
  },
  {
    title: 'Empty city',
    emptyField: 'city',
    message: VALIDATION_AUTH_ERRORS.city,
  },
  {
    title: 'Empty state',
    emptyField: 'state',
    message: VALIDATION_AUTH_ERRORS.state,
  },
  {
    title: 'Empty zipcode',
    emptyField: 'zipcode',
    message: VALIDATION_AUTH_ERRORS.zipCode,
  },
  {
    title: 'Empty ssn',
    emptyField: 'ssn',
    message: VALIDATION_AUTH_ERRORS.ssn,
  },
  {
    title: 'Empty username',
    emptyField: 'username',
    message: VALIDATION_AUTH_ERRORS.username,
  },
  {
    title: 'Empty password',
    emptyField: 'password',
    message: VALIDATION_AUTH_ERRORS.password,
  },
  {
    title: 'Empty confirmation password',
    emptyField: 'repeatedPassword',
    message: VALIDATION_AUTH_ERRORS.repeatedPassword,
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
