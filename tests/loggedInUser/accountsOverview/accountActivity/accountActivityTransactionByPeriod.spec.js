import { test } from '../../../_fixtures/fixtures';
import { signUpAccount } from '../../../../src/ui/actions/signUpAccount';
import { createNewAccount } from '../../../../src/ui/actions/createNewAccount';
import { transferFund } from '../../../../src/ui/actions/transferFund';
import { getCurrentMonth } from '../../../../src/common/helpers/calendarHelpers';
import { AccountActivityPage } from '../../../../src/ui/pages/AccountActivityPage';
import { AccountsOverviewPage } from '../../../../src/ui/pages/AccountsOverviewPage';
import { TRANSFER_SUM } from '../../../../src/common/constants';
import { Severity } from 'allure-js-commons';

let page;
let accountActivityPage;
let newAccountId;
let defaultAccount;
const DEFAULT = 100;

test.beforeAll(async ({ browser, workerAccount }) => {
  const context = await browser.newContext();
  page = await context.newPage();

  const accountsOverviewPage = new AccountsOverviewPage(page);

  await signUpAccount(page, workerAccount);
  await accountsOverviewPage.open('overview.htm');
  defaultAccount = await accountsOverviewPage.getAccountIdByLink();

  newAccountId = await createNewAccount(page, 'SAVINGS');

  await transferFund(page, {
    value: TRANSFER_SUM,
    fromAccountId: newAccountId,
    toAccountId: defaultAccount,
  });
  await accountsOverviewPage.open('overview.htm');
  await accountsOverviewPage.assertMainTextTitle('Accounts Overview');
  await accountsOverviewPage.clickAccountLink(defaultAccount);
});

test.afterAll(async () => {
  if (page) await page.close();
});

test.beforeEach(async () => {
  accountActivityPage = new AccountActivityPage(page);
});

test.describe('Transaction filtering by transaction date', () => {
  test(
    'Should be able to filter activities by current month',
    { annotation: { type: 'severity', description: Severity.MINOR } },
    async () => {
      const currentMonth = getCurrentMonth();
      await accountActivityPage.selectActivityPeriod(currentMonth);
      await accountActivityPage.clickGoButton();
      await accountActivityPage.assertTransactionByType(
        1,
        'debit',
        `${DEFAULT}`,
      );
      await accountActivityPage.assertTransactionByType(
        1,
        'transaction',
        'Funds Transfer Sent',
      );
      await accountActivityPage.assertTransactionByType(
        2,
        'credit',
        `${TRANSFER_SUM}`,
      );
      await accountActivityPage.assertTransactionByType(
        2,
        'transaction',
        'Funds Transfer Received',
      );
    },
  );

  test(
    'Should be able to filter activities by previous month',
    { annotation: { type: 'severity', description: Severity.MINOR } },
    async () => {
      const previousMonth = getCurrentMonth(-1);
      await accountActivityPage.selectActivityPeriod(previousMonth);
      await accountActivityPage.clickGoButton();
      await accountActivityPage.assertElementTextIsVisible(
        'No transactions found.',
      );
    },
  );
});
