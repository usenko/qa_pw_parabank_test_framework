import { test } from '../../_fixtures/fixtures';
import { signUpAccount } from '../../../src/ui/actions/signUpAccount';

test.beforeEach(async ({ page, account }) => {
  await signUpAccount(page, account);
});

test.describe('Request Loan Flow', () => {
  test(`Should be able to request the Loan`, async ({
    requestLoanPage,
    accountsOverviewPage,
  }) => {
    await requestLoanPage.open('/requestloan.htm');
    await requestLoanPage.assertMainTextTitle('Apply for a Loan');

    await requestLoanPage.assertMainTextTitle('Loan Request Processed');
    await requestLoanPage.assertElementTextIsVisible(
      'Congratulations, your loan has been approved.',
    );
  });
});
