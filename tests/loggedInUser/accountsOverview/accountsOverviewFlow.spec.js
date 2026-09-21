import { test } from '../../_fixtures/fixtures';
import { signUpAccount } from '../../../src/ui/actions/auth/signUpAccount';

test.beforeEach(async ({ page, account }) => {
  await signUpAccount(page, account);
});

test.describe('Accounts Overview Flow', () => {
  //   test.describe('Account Overview Dashboard', () => {
  //     test(`Accounts overview shows correct header cell name`, async ({
  //       accountsOverviewPage,
  //     }) => {
  //       const headerCellsName = ['Account', 'Balance*', 'Available Amount'];

  //       await accountsOverviewPage.open('/parabank/overview.htm');
  //       await accountsOverviewPage.assertMainTextTitle('Accounts Overview');
  //       for (const cellName of headerCellsName) {
  //         await accountsOverviewPage.assertAccountsOverviewHasHeaderCell(
  //           cellName,
  //         );
  //       }
  //     });

  //     test(`Accounts overview shows default account id and balances`, async ({
  //       accountsOverviewPage,
  //     }) => {
  //       await accountsOverviewPage.open('/parabank/overview.htm');
  //       const accountId = await accountsOverviewPage.getAccountId();
  //       const balance = await accountsOverviewPage.getCellAccountAmountById(
  //         accountId,
  //         'Balance',
  //       );
  //       const amount = await accountsOverviewPage.getCellAccountAmountById(
  //         accountId,
  //         'Available Amount',
  //       );

  //       await accountsOverviewPage.assertAccountIdIsVisible(accountId);
  //       await accountsOverviewPage.assertValueIsGreaterThanZero(balance);
  //       await accountsOverviewPage.assertValueIsGreaterThanZero(amount);
  //     });
  //   });
  test.describe('Account Details', () => {
    test(`Accounts overview shows default account id and balances`, async ({
      accountsOverviewPage,
      page,
    }) => {
      await accountsOverviewPage.open('/parabank/overview.htm');
      const accountId = await accountsOverviewPage.getAccountId();
      const balance = await accountsOverviewPage.getCellAccountAmountById(
        accountId,
        'Balance',
      );
      const amount = await accountsOverviewPage.getCellAccountAmountById(
        accountId,
        'Available Amount',
      );

      await accountsOverviewPage.assertAccountIdIsVisible(accountId);
      await accountsOverviewPage.clickAccountLink(accountId);
      await accountsOverviewPage.getAccountDetailsData();
      await page.pause();
    });
  });

  test.describe('Account Activity Filtering', () => {});
});
