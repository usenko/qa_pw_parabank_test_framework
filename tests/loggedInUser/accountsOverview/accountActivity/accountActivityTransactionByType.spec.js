import { test } from '../../../_fixtures/fixtures';
import { signUpAccount } from '../../../../src/ui/actions/signUpAccount';
import { createNewAccount } from '../../../../src/ui/actions/createNewAccount';
import { transferFund } from '../../../../src/ui/actions/transferFund';
import { AccountActivityPage } from '../../../../src/ui/pages/AccountActivityPage';
import { AccountsOverviewPage } from '../../../../src/ui/pages/AccountsOverviewPage';
import { TRANSFER_SUM } from '../../../../src/common/constants';
import { Severity } from 'allure-js-commons';

let page;
let accountActivityPage;
let newAccountId;
let defaultAccount;
const DEFAULT = 100;

const testParameters = [
  {
    type: 'All',
    data: [
      {
        rowIndex: 1,
        column: 'transaction',
        expected: 'Funds Transfer Sent',
      },
      {
        rowIndex: 1,
        column: 'debit',
        expected: `${DEFAULT}`,
      },
      {
        rowIndex: 2,
        column: 'transaction',
        expected: 'Funds Transfer Received',
      },
      {
        rowIndex: 2,
        column: 'credit',
        expected: `${TRANSFER_SUM}`,
      },
    ],
  },
  {
    type: 'Credit',
    data: [
      {
        rowIndex: 1,
        column: 'transaction',
        expected: 'Funds Transfer Received',
      },
      {
        rowIndex: 1,
        column: 'credit',
        expected: `${TRANSFER_SUM}`,
      },
    ],
  },
  {
    type: 'Debit',
    data: [
      {
        rowIndex: 1,
        column: 'transaction',
        expected: 'Funds Transfer Sent',
      },
      {
        rowIndex: 1,
        column: 'debit',
        expected: `${DEFAULT}`,
      },
    ],
  },
];

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
  await accountsOverviewPage.assertMainTextTitle('Account Details');
});

test.afterAll(async () => {
  if (page) await page.close();
});

test.beforeEach(async () => {
  accountActivityPage = new AccountActivityPage(page);
});

test.describe('Transaction filtering by transaction type', () => {
  testParameters.forEach(({ type, data }) => {
    test(
      `Should be able to filter activities by '${type}' type`,
      { annotation: { type: 'severity', description: Severity.MINOR } },
      async () => {
        await accountActivityPage.selectType(type);
        await accountActivityPage.clickGoButton();
        for (const transaction of data) {
          await accountActivityPage.assertTransactionByType(
            transaction.rowIndex,
            transaction.column,
            transaction.expected,
          );
        }
      },
    );
  });
});
