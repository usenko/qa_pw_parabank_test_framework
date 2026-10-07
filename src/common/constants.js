export const SIGN_UP_FIELDS = {
  firstname: 'customer.firstName',
  lastname: 'customer.lastName',
  address: 'customer.address.street',
  city: 'customer.address.city',
  state: 'customer.address.state',
  zipcode: 'customer.address.zipCode',
  phone: 'customer.phoneNumber',
  ssn: 'customer.ssn',
  username: 'customer.username',
  password: 'customer.password',
  repeatedPassword: 'repeatedPassword',
};

export const CUSTOMER_LOOKUP_FIELDS = {
  firstname: 'firstName',
  lastname: 'lastName',
  address: 'address.street',
  city: 'address.city',
  state: 'address.state',
  zipcode: 'address.zipCode',
  ssn: 'ssn',
};

export const BILL_PAYMENT_FIELDS = {
  payeeName: 'payee.name',
  address: 'payee.address.street',
  city: 'payee.address.city',
  state: 'payee.address.state',
  zipCode: 'payee.address.zipCode',
  phone: 'payee.phoneNumber',
  accountNumber: 'payee.accountNumber',
  verifyAccount: 'verifyAccount',
  amount: 'amount',
};

export const BILL_PAYMENT_ERRORS = {
  payeeName: 'Payee name is required.',
  address: 'Address is required.',
  city: 'City is required.',
  state: 'State is required.',
  zipCode: 'Zip Code is required.',
  phone: 'Phone number is required.',
  accountNumber: 'Account number is required.',
  verifyAccount: 'Account number is required.',
  amount: 'The amount cannot be empty.',
};
