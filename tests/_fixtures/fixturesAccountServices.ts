import { test as base } from '@playwright/test';
import { AccountsOverviewPage } from '../../src/ui/pages/AccountsOverviewPage';

export const test = base.extend<{
  accountsOverviewPage: AccountsOverviewPage;
}>({
  accountsOverviewPage: async ({ page }, use) => {
    const accountsOverviewPage = new AccountsOverviewPage(page);

    await use(accountsOverviewPage);
  },
});
