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
    page,
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
    const transactions = await accountActivityPage.getTransactionDataByRow(1);
    await await page.pause();
  });
  //should display error messages when submitting an empty form
});
