import { test } from '../../_fixtures/fixtures';
import { signUpAccount } from '../../../src/ui/actions/signUpAccount';

const LOAN_AMOUNT = 100;
const DOWN_PAYMENT = 10;

test.beforeEach(async ({ page, account }) => {
  await signUpAccount(page, account);
});

test.describe('Request Loan Flow', () => {
  test(`Should be able to request the Loan`, async ({
    requestLoanPage,
    accountNavMenu,
    accountsOverviewPage,
  }) => {
    await accountsOverviewPage.open('overview.htm');
    await accountsOverviewPage.assertMainTextTitle('Accounts Overview');
    const defaultAccountId = await accountsOverviewPage.getAccountIdByLink();
    const defaultAccountBalance =
      await accountsOverviewPage.getCellAccountAmountById(
        defaultAccountId,
        'Balance',
      );
    await accountNavMenu.clickNavLink('Request Loan');
    await requestLoanPage.assertMainTextTitle('Apply for a Loan');
    await requestLoanPage.fillInputFieldById('amount', LOAN_AMOUNT.toString());
    await requestLoanPage.fillInputFieldById(
      'downPayment',
      DOWN_PAYMENT.toString(),
    );
    await requestLoanPage.clickApplyNowButton();
    await requestLoanPage.assertMainTextTitle('Loan Request Processed');
    await requestLoanPage.assertElementTextIsVisible(
      'Congratulations, your loan has been approved.',
    );
    const newAccountId = await requestLoanPage.getAccountId();

    await accountNavMenu.clickNavLink('Accounts Overview');
    await accountsOverviewPage.assertMainTextTitle('Accounts Overview');
    const newAccountBalance =
      await accountsOverviewPage.getCellAccountAmountById(
        newAccountId,
        'Balance',
      );
    const defaultAccountBalanceAfter =
      await accountsOverviewPage.getCellAccountAmountById(
        defaultAccountId,
        'Balance',
      );
    await accountsOverviewPage.assertAccountIdIsVisible(newAccountId);
    await accountsOverviewPage.assertValuesAreEqual(
      newAccountBalance,
      LOAN_AMOUNT,
    );
    await accountsOverviewPage.assertValuesAreEqual(
      defaultAccountBalanceAfter,
      defaultAccountBalance - DOWN_PAYMENT,
    );
  });
});
