import { test } from '../../../_fixtures/fixtures';
import { signUpAccount } from '../../../../src/ui/actions/signUpAccount';
import { Severity } from 'allure-js-commons';

test.beforeEach(async ({ page, account }) => {
  await signUpAccount(page, account);
});

test.describe('Account Overview Dashboard', () => {
  test(
    `Accounts overview shows correct header cell name`,
    { annotation: { type: 'severity', description: Severity.MINOR } },
    async ({ accountsOverviewPage }) => {
      const headerCellsName = ['Account', 'Balance*', 'Available Amount'];
      await accountsOverviewPage.open('overview.htm');
      await accountsOverviewPage.assertMainTextTitle('Accounts Overview');
      for (const cellName of headerCellsName) {
        await accountsOverviewPage.assertAccountsOverviewHasHeaderCell(
          cellName,
        );
      }
    },
  );
  test(
    `Accounts overview shows default account id and balances`,
    { annotation: { type: 'severity', description: Severity.NORMAL } },
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
      await accountsOverviewPage.assertAccountIdIsVisible(accountId);
      await accountsOverviewPage.assertValueIsGreaterThanZero(balance);
      await accountsOverviewPage.assertValueIsGreaterThanZero(amount);
    },
  );
});
