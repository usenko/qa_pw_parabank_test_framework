import { test as base } from '@playwright/test';
import { AccountsOverviewPage } from '../../src/ui/pages/AccountsOverviewPage';
import { TransferFundsPage } from '../../src/ui/pages/TransferFundsPage';
import { OpenNewAccountPage } from '../../src/ui/pages/OpenNewAccountPage';
import { BillPayPage } from '../../src/ui/pages/BillPayPage';

export const test = base.extend<{
  accountsOverviewPage: AccountsOverviewPage;
  transferFundsPage: TransferFundsPage;
  openNewAccountPage: OpenNewAccountPage;
  billPayPage: BillPayPage;
}>({
  accountsOverviewPage: async ({ page }, use) => {
    const accountsOverviewPage = new AccountsOverviewPage(page);

    await use(accountsOverviewPage);
  },

  transferFundsPage: async ({ page }, use) => {
    const transferFundsPage = new TransferFundsPage(page);

    await use(transferFundsPage);
  },

  openNewAccountPage: async ({ page }, use) => {
    const openNewAccountPage = new OpenNewAccountPage(page);

    await use(openNewAccountPage);
  },

  billPayPage: async ({ page }, use) => {
    const billPayPage = new BillPayPage(page);

    await use(billPayPage);
  },
});
