import { test } from '../../_fixtures/fixtures';
import { signUpAccount } from '../../../src/ui/actions/signUpAccount';
import { createNewAccount } from '../../../src/ui/actions/createNewAccount';
import { transferFund } from '../../../src/ui/actions/transferFund';
import { getFormattedDate } from '../../../src/common/helpers/calendarHelpers';
import { AccountNavMenu } from '../../../src/ui/components/AccountNavMenu';
import { FindTransactionsPage } from '../../../src/ui/pages/FindTransactionsPage';
import { AccountsOverviewPage } from '../../../src/ui/pages/AccountsOverviewPage';
import { AccountActivityPage } from '../../../src/ui/pages/AccountActivityPage';
import { TransactionDetailsPage } from '../../../src/ui/pages/TransactionDetailsPage';

let newAccountId;
let page;
let transactionId;
let transactionDate;
let transactionDateTomorrow;
const TRANSFER_SUM = 222;

test.describe(`Find Transactions flow`, () => {
  test.beforeAll(async ({ browser, workerAccount }) => {
    const context = await browser.newContext();
    page = await context.newPage();

    await signUpAccount(page, workerAccount);

    const accountId = await createNewAccount(page, 'SAVINGS');
    newAccountId = accountId;

    await transferFund(page, accountId, TRANSFER_SUM);

    const accountsOverviewPage = new AccountsOverviewPage(page);
    const accountActivityPage = new AccountActivityPage(page);
    const transactionDetailsPage = new TransactionDetailsPage(page);

    transactionDate = getFormattedDate('MM-DD-YYYY', 0);
    transactionDateTomorrow = getFormattedDate('MM-DD-YYYY', 1);

    await accountsOverviewPage.open('/parabank/overview.htm');
    await accountsOverviewPage.clickAccountLink(accountId);
    await accountActivityPage.clickTransactionLink(2);
    await transactionDetailsPage.assertMainTextTitle('Transaction Details');
    transactionId = await transactionDetailsPage.getTransactionId();
  });

  test.afterAll(async () => {
    if (page) await page.close();
  });

  let navMenu, accountsOverviewPage, findTransactionsPage;

  test.beforeEach(async () => {
    accountsOverviewPage = new AccountsOverviewPage(page);
    findTransactionsPage = new FindTransactionsPage(page);
  });

  test(`Should able to find transactions by Id`, async () => {
    await findTransactionsPage.open('/parabank/findtrans.htm');
    await findTransactionsPage.selectAccountId(newAccountId);
    await findTransactionsPage.fillTransactionIdField(transactionId);
    await findTransactionsPage.clickFindTransactionButton();
    await findTransactionsPage.assertMainTextTitle('Transaction Results');
    await findTransactionsPage.assertTransactionByType(1, 'debit', '0');
    await findTransactionsPage.assertTransactionByType(
      1,
      'transaction',
      'Funds Transfer Received',
    );
    await findTransactionsPage.assertTransactionByType(
      1,
      'date',
      transactionDate,
    );
    await findTransactionsPage.assertTransactionByType(
      1,
      'credit',
      `${TRANSFER_SUM}`,
    );
  });

  test(`Should able to find transactions by Date`, async () => {
    await findTransactionsPage.open('/parabank/findtrans.htm');
    await findTransactionsPage.selectAccountId(newAccountId);
    await findTransactionsPage.fillTransactionDateField(transactionDate);
    await findTransactionsPage.clickFindTransactionButton(1);
    await findTransactionsPage.assertMainTextTitle('Transaction Results');
    await findTransactionsPage.assertTransactionByType(2, 'debit', '0');
    await findTransactionsPage.assertTransactionByType(
      2,
      'transaction',
      'Funds Transfer Received',
    );
    await findTransactionsPage.assertTransactionByType(
      2,
      'date',
      transactionDate,
    );
    await findTransactionsPage.assertTransactionByType(
      2,
      'credit',
      `${TRANSFER_SUM}`,
    );
  });

  test(`Should able to find transactions by Date Range`, async () => {
    await findTransactionsPage.open('/parabank/findtrans.htm');
    await findTransactionsPage.selectAccountId(newAccountId);
    await findTransactionsPage.fillTransactionDateFromField(transactionDate);
    await findTransactionsPage.fillTransactionDateToField(
      transactionDateTomorrow,
    );
    await findTransactionsPage.clickFindTransactionButton(2);
    await findTransactionsPage.assertMainTextTitle('Transaction Results');
    await findTransactionsPage.assertTransactionByType(2, 'debit', '0');
    await findTransactionsPage.assertTransactionByType(
      2,
      'transaction',
      'Funds Transfer Received',
    );
    await findTransactionsPage.assertTransactionByType(
      2,
      'date',
      transactionDate,
    );
    await findTransactionsPage.assertTransactionByType(
      2,
      'credit',
      `${TRANSFER_SUM}`,
    );
  });
});
