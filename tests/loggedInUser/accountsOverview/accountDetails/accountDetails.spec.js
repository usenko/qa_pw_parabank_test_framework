import { test } from '../../../_fixtures/fixtures';
import { signUpAccount } from '../../../../src/ui/actions/signUpAccount';
import { Severity } from 'allure-js-commons';

test.beforeEach(async ({ page, account }) => {
  await signUpAccount(page, account);
});

test.describe('Account Details', () => {
  test(
    `Should match expected values in account details table`,
    { annotation: { type: 'severity', description: Severity.CRITICAL } },
    async ({ accountsOverviewPage }) => {
      await accountsOverviewPage.open('overview.htm');
      const accountId = await accountsOverviewPage.getAccountIdByLink();
      const balance = await accountsOverviewPage.getCellAccountAmountById(
        accountId,
        'Balance',
      );
      const amount = await accountsOverviewPage.getCellAccountAmountById(
        accountId,
        'Available Amount',
      );
      const accountDetails = {
        'Account Number': accountId,
        'Account Type': 'CHECKING',
        Balance: balance,
        Available: amount,
      };
      await accountsOverviewPage.assertAccountIdIsVisible(accountId);
      await accountsOverviewPage.clickAccountLink(accountId);
      const accountDetailsData =
        await accountsOverviewPage.getAccountDetailsData();
      for (const [key, expectedDataValue] of Object.entries(accountDetails)) {
        await accountsOverviewPage.assertAccountDetailData(
          key,
          expectedDataValue,
          accountDetailsData,
        );
      }
    },
  );
});
