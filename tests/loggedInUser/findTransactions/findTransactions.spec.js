import { test } from '../../_fixtures/fixtures';
import { signUpAccount } from '../../../src/ui/actions/signUpAccount';
import { createNewAccount } from '../../../src/ui/actions/createNewAccount';
import { transferFund } from '../../../src/ui/actions/transferFund';
import { getFormattedDate } from '../../../src/common/helpers/calendarHelpers';
import { FindTransactionsPage } from '../../../src/ui/pages/FindTransactionsPage';
import { AccountsOverviewPage } from '../../../src/ui/pages/AccountsOverviewPage';
import { AccountActivityPage } from '../../../src/ui/pages/AccountActivityPage';
import { TransactionDetailsPage } from '../../../src/ui/pages/TransactionDetailsPage';
import { TRANSFER_SUM } from '../../../src/common/constants';
import { generateNewAccountUserData } from '../../../src/common/testData/generateNewAccountUserData';
import { Severity } from 'allure-js-commons';

let newAccountId;
let page;
let transactionId;
let transactionDate;
let transactionDateTomorrow;
let findTransactionsPage;
let context;

test.describe(`Find Transactions flow`, () => {
  test.beforeAll(async ({ browser, logger }) => {
    context = await browser.newContext();
    page = await context.newPage();

    const account = generateNewAccountUserData(logger);
    await signUpAccount(page, account);

    const accountId = await createNewAccount(page, 'SAVINGS');
    newAccountId = accountId;

    await transferFund(page, { value: TRANSFER_SUM, toAccountId: accountId });

    const accountsOverviewPage = new AccountsOverviewPage(page);
    const accountActivityPage = new AccountActivityPage(page);
    const transactionDetailsPage = new TransactionDetailsPage(page);

    transactionDate = getFormattedDate('MM-DD-YYYY');
    transactionDateTomorrow = getFormattedDate('MM-DD-YYYY', 1);

    await accountsOverviewPage.open('overview.htm');
    await accountsOverviewPage.clickAccountLink(accountId);
    await accountActivityPage.clickTransactionLink(2);
    await transactionDetailsPage.assertMainTextTitle('Transaction Details');
    transactionId = await transactionDetailsPage.getTransactionId();
  });

  test.afterAll(async () => {
    await context?.close();
  });

  test.beforeEach(async () => {
    findTransactionsPage = new FindTransactionsPage(page);
  });

  test(
    `Should able to find transactions by Id`,
    { annotation: { type: 'severity', description: Severity.NORMAL } },
    async () => {
      await findTransactionsPage.open('findtrans.htm');
      await findTransactionsPage.selectAccountId(newAccountId);
      await findTransactionsPage.fillTransactionIdField(transactionId);
      await findTransactionsPage.clickFindTransactionButton();
      await findTransactionsPage.assertMainTextTitle('Transaction Results');
      await findTransactionsPage.assertTransactionRowData(1, {
        date: transactionDate,
        transaction: 'Funds Transfer Received',
        debit: '0',
        credit: `${TRANSFER_SUM}`,
      });
    },
  );

  test(
    `Should able to find transactions by Date`,
    { annotation: { type: 'severity', description: Severity.NORMAL } },
    async () => {
      await findTransactionsPage.open('findtrans.htm');
      await findTransactionsPage.selectAccountId(newAccountId);
      await findTransactionsPage.fillTransactionDateField(transactionDate);
      await findTransactionsPage.clickFindTransactionButton(1);
      await findTransactionsPage.assertMainTextTitle('Transaction Results');
      await findTransactionsPage.assertTransactionRowData(2, {
        date: transactionDate,
        transaction: 'Funds Transfer Received',
        debit: '0',
        credit: `${TRANSFER_SUM}`,
      });
    },
  );

  test(
    `Should able to find transactions by Date Range`,
    { annotation: { type: 'severity', description: Severity.NORMAL } },
    async () => {
      await findTransactionsPage.open('findtrans.htm');
      await findTransactionsPage.selectAccountId(newAccountId);
      await findTransactionsPage.fillTransactionDateFromField(transactionDate);
      await findTransactionsPage.fillTransactionDateToField(
        transactionDateTomorrow,
      );
      await findTransactionsPage.clickFindTransactionButton(2);
      await findTransactionsPage.assertMainTextTitle('Transaction Results');
      await findTransactionsPage.assertTransactionRowData(2, {
        date: transactionDate,
        transaction: 'Funds Transfer Received',
        debit: '0',
        credit: `${TRANSFER_SUM}`,
      });
    },
  );

  test(
    `Should able to find transactions by Amount`,
    { annotation: { type: 'severity', description: Severity.NORMAL } },
    async () => {
      await findTransactionsPage.open('findtrans.htm');
      await findTransactionsPage.selectAccountId(newAccountId);
      await findTransactionsPage.fillTransactionAmountField(TRANSFER_SUM);
      await findTransactionsPage.clickFindTransactionButton(3);
      await findTransactionsPage.assertMainTextTitle('Transaction Results');
      await findTransactionsPage.assertTransactionRowData(1, {
        date: transactionDate,
        transaction: 'Funds Transfer Received',
        debit: '0',
        credit: `${TRANSFER_SUM}`,
      });
    },
  );
});
