import { test } from '../../_fixtures/fixtures';
import { signUpAccount } from '../../../src/ui/actions/signUpAccount';
import { BILL_PAYMENT_ERRORS } from '../../../src/common/constants';
import { generateBillPaymentData } from '../../../src/common/testData/generateBillPaymentData';
import { Severity } from 'allure-js-commons';

const testParameters = [
  {
    title: 'Empty first name',
    emptyField: 'payeeName',
    message: BILL_PAYMENT_ERRORS.payeeName,
  },
  {
    title: 'Empty address',
    emptyField: 'address',
    message: BILL_PAYMENT_ERRORS.address,
  },
  {
    title: 'Empty city',
    emptyField: 'city',
    message: BILL_PAYMENT_ERRORS.city,
  },
  {
    title: 'Empty state',
    emptyField: 'state',
    message: BILL_PAYMENT_ERRORS.state,
  },
  {
    title: 'Empty zipcode',
    emptyField: 'zipCode',
    message: BILL_PAYMENT_ERRORS.zipCode,
  },
  {
    title: 'Empty phone number',
    emptyField: 'phone',
    message: BILL_PAYMENT_ERRORS.phone,
  },
  {
    title: 'Empty account number',
    emptyField: 'accountNumber',
    message: BILL_PAYMENT_ERRORS.accountNumber,
  },
  {
    title: 'Empty verify account number',
    emptyField: 'verifyAccount',
    message: BILL_PAYMENT_ERRORS.verifyAccount,
  },
  {
    title: 'Empty amount',
    emptyField: 'amount',
    message: BILL_PAYMENT_ERRORS.amount,
  },
];
test.beforeEach(async ({ page, account }) => {
  await signUpAccount(page, account);
});

test.describe('Bill Payment Service — Negative Flows', () => {
  testParameters.forEach(({ message, title, emptyField }) => {
    test(
      `Should display validation error message when ${title} field`,
      { annotation: { type: 'severity', description: Severity.MINOR } },
      async ({ billPayPage }) => {
        const billPaymentData = generateBillPaymentData();
        const payload = {
          ...billPaymentData,
          [emptyField]: '',
        };
        await billPayPage.open('billpay.htm');
        await billPayPage.assertMainTextTitle('Bill Payment Service');
        await billPayPage.submitBillPaymentForm(payload, { isSuccess: false });
        await billPayPage.assertValidationMessageIsShown(message);
      },
    );
  });
});
