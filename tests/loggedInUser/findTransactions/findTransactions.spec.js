import { test } from '../../_fixtures/fixtures';
import { signUpAccount } from '../../../src/ui/actions/signUpAccount';
import { createNewAccount } from '../../../src/ui/actions/createNewAccount';
import { transferFund } from '../../../src/ui/actions/transferFund';
import { getFormattedDate } from '../../../src/common/helpers/calendarHelpers';
import { generateNewAccountUserData } from '../../../src/common/testData/generateNewAccountUserData';
import { AccountNavMenu } from '../../../src/ui/components/AccountNavMenu';
import { FindTransactionsPage } from '../../../src/ui/pages/FindTransactionsPage';
import { AccountsOverviewPage } from '../../../src/ui/pages/AccountsOverviewPage';
import { AccountActivityPage } from '../../../src/ui/pages/AccountActivityPage';
import { TransactionDetailsPage } from '../../../src/ui/pages/TransactionDetailsPage';

let sharedAccountId;
let page;
let transactionId;

test.describe(`Find Transactions flow`, () => {
  test.beforeAll(async ({ browser, workerAccount }) => {
    const context = await browser.newContext();
    page = await context.newPage();

    await signUpAccount(page, workerAccount);

    const TRANSFER_SUM = 222;
    const accountId = await createNewAccount(page, 'SAVINGS');
    sharedAccountId = accountId;

    await transferFund(page, accountId, TRANSFER_SUM);

    const accountsOverviewPage = new AccountsOverviewPage(page);
    const accountActivityPage = new AccountActivityPage(page);
    const transactionDetailsPage = new TransactionDetailsPage(page);

    await accountsOverviewPage.open('/parabank/overview.htm');
    await accountsOverviewPage.clickAccountLink(accountId);
    const transactioData = await accountActivityPage.getTransactionDataByRow(2);
    await accountActivityPage.clickTransactionLink(2);
    await transactionDetailsPage.assertMainTextTitle('Transaction Details');
    transactionId = await transactionDetailsPage.getTransactionId();
  });

  test.afterAll(async () => {
    if (page) await page.close();
  });

  let navMenu,
    accountsOverviewPage,
    findTransactionsPage,
    transactionDetailsPage;

  test.beforeEach(async () => {
    navMenu = new AccountNavMenu(page);
    accountsOverviewPage = new AccountsOverviewPage(page);
    findTransactionsPage = new FindTransactionsPage(page);
    transactionDetailsPage = new TransactionDetailsPage(page);
  });

  test(`Should able to find transactions by Id`, async () => {
    await findTransactionsPage.open('/parabank/findtrans.htm');
    await findTransactionsPage.selectAccountId(sharedAccountId);
    await findTransactionsPage.fillTransactionIdField(transactionId);

    console.log('Поток тестов использует ID аккаунта:', sharedAccountId);
    await page.pause(); // Дебажим именно page
  });

  test(`Should able to find transactions by Id11`, async () => {
    // Страница осталась авторизованной
    await findTransactionsPage.open('/parabank/overview.htm');

    console.log('Тест 2 успешно видит личный кабинет без повторного логина!');
    await page.pause();
  });
});
