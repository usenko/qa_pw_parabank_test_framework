import { test } from '../../_fixtures/fixtures';
import { signUpAccount } from '../../../src/ui/actions/signUpAccount';
import { generateBillPaymentData } from '../../../src/common/testData/generateBillPaymentData';

test.beforeEach(async ({ page, account }) => {
  await signUpAccount(page, account);
});
test.describe('Bill Payment Service — Positive Flows', () => {
  test(`Should complete bill payment process successfully`, async ({
    billPayPage,
    accountsOverviewPage,
    accountNavMenu,
    accountActivityPage,
  }) => {
    const billPaymentData = generateBillPaymentData();

    await billPayPage.open('parabank/billpay.htm');
    await billPayPage.assertMainTextTitle('Bill Payment Service');
    await billPayPage.submitBillPaymentForm(billPaymentData);
    await billPayPage.assertSuccessPaymentMessageIsShown(
      billPaymentData.payeeName,
      billPaymentData.amount,
    );

    await accountNavMenu.clickNavLink('Accounts Overview');
    const accountId = await accountsOverviewPage.getAccountIdByLink();
    await accountsOverviewPage.clickAccountLink(accountId);
    await accountActivityPage.assertTransactionByType(
      1,
      'debit',
      billPaymentData.amount,
    );
    await accountActivityPage.assertTransactionByType(
      1,
      'transaction',
      `Bill Payment to ${billPaymentData.payeeName}`,
    );
  });
});
