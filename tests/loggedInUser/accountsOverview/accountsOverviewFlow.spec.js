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
  //       const accountId = await accountsOverviewPage.getAccountIdByLink();
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
    test(`Should match expected values in account details table`, async ({
      accountsOverviewPage,
      page,
    }) => {
      await accountsOverviewPage.open('/parabank/overview.htm');
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
      await page.pause();
    });
  });

  test.describe('Account Activity Filtering', () => {});
});
