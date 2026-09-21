import { test } from '../../_fixtures/fixtures';
import { signUpAccount } from '../../../src/ui/actions/auth/signUpAccount';

test.beforeEach(async ({ page, account }) => {
  await signUpAccount(page, account);
});

test.describe('Accounts Overview Flow', () => {
  // test(`Accounts overview shows correct header cell name`, async ({
  //   accountsOverviewPage,
  // }) => {
  //   const headerCellsName = ['Account', 'Balance*', 'Available Amount'];
  //   await accountsOverviewPage.open('/parabank/overview.htm');
  //   await accountsOverviewPage.assertMainTextTitle('Accounts Overview');
  //   for (const cellName of headerCellsName) {
  //     await accountsOverviewPage.assertAccountsOverviewHasHeaderCell(cellName);
  //   }
  // });

  test(`Accounts overview shows default account id and balances`, async ({
    accountsOverviewPage,
    page,
  }) => {
    await accountsOverviewPage.open('/parabank/overview.htm');
    const defaultAccountId = await accountsOverviewPage.getAccountId();
    const balance = await accountsOverviewPage.getAccountAmountById(
      defaultAccountId,
      'Balance',
    );
    const amount = await accountsOverviewPage.getAccountAmountById(
      defaultAccountId,
      'Available Amount',
    );

    await accountsOverviewPage.assertAccountIdIsVisible(defaultAccountId);
    await accountsOverviewPage.assertValueIsGreaterThanZero(balance);
    await accountsOverviewPage.assertValueIsGreaterThanZero(amount);
    await page.pause();
  });
});
