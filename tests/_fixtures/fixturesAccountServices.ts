import { test as base } from '@playwright/test';
import { AccountsOverviewPage } from '../../src/ui/pages/AccountsOverviewPage';
import { TransferFoundsPage } from '../../src/ui/pages/TransferFoundsPage';
import { OpenNewAccountPage } from '../../src/ui/pages/OpenNewAccountPage';

export const test = base.extend<{
  accountsOverviewPage: AccountsOverviewPage;
  transferFoundsPage: TransferFoundsPage;
  openNewAccountPage: OpenNewAccountPage;
}>({
  accountsOverviewPage: async ({ page }, use) => {
    const accountsOverviewPage = new AccountsOverviewPage(page);

    await use(accountsOverviewPage);
  },

  transferFoundsPage: async ({ page }, use) => {
    const transferFoundsPage = new TransferFoundsPage(page);

    await use(transferFoundsPage);
  },

  openNewAccountPage: async ({ page }, use) => {
    const openNewAccountPage = new OpenNewAccountPage(page);

    await use(openNewAccountPage);
  },
});
