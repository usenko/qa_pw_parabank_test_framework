export const VALIDATION_AUTH_ERRORS = {
  firstName: 'First name is required.',
  lastName: 'Last name is required.',
  address: 'Address is required.',
  city: 'City is required.',
  state: 'State is required.',
  zipCode: 'Zip Code is required.',
  ssn: 'Social Security Number is required.',
  username: 'Username is required.',
  password: 'Password is required.',
  repeatedPassword: 'Password confirmation is required.',
};

export const LOGIN_ERRORS = {
  missingCredentials: 'Please enter a username and password.',
  invalidCredentials: 'The username and password could not be verified.',
};

export const CUSTOMER_LOOKUP_MESSAGES = {
  success:
    'Your login information was located successfully. You are now logged in.',
  error: 'The customer information provided could not be found.',
};
