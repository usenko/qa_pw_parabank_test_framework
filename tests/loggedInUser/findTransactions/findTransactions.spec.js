import { test } from '../../_fixtures/fixtures';
import { signUpAccount } from '../../../src/ui/actions/signUpAccount';
import { createNewAccount } from '../../../src/ui/actions/createNewAccount';
import { transferFund } from '../../../src/ui/actions/transferFund';
import { getFormattedDate } from '../../../src/common/helpers/calendarHelpers';
import { generateNewAccountUserData } from '../../../src/common/testData/generateNewAccountUserData';
import { AccountNavMenu } from '../../../src/ui/components/AccountNavMenu';
import { TransferFundsPage } from '../../../src/ui/pages/TransferFundsPage';
import { AccountsOverviewPage } from '../../../src/ui/pages/AccountsOverviewPage';
import { AccountActivityPage } from '../../../src/ui/pages/AccountActivityPage';

let sharedAccountId;
let page;

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

    await accountsOverviewPage.open();
    await accountsOverviewPage.clickAccountLink(accountId);
    await accountActivityPage.getTransactionDataByRow(2);
  });

  test.afterAll(async () => {
    if (page) await page.close();
  });

  let navMenu, accountsOverviewPage, transferFundsPage;

  test.beforeEach(async () => {
    navMenu = new AccountNavMenu(page);
    accountsOverviewPage = new AccountsOverviewPage(page);
    transferFundsPage = new TransferFundsPage(page);
  });

  test(`Should able to find transactions by Id`, async () => {
    await transferFundsPage.open('/parabank/transfer.htm');

    console.log('Поток тестов использует ID аккаунта:', sharedAccountId);
    await page.pause(); // Дебажим именно page
  });

  test(`Should able to find transactions by Id11`, async () => {
    // Страница осталась авторизованной
    await transferFundsPage.open('/parabank/overview.htm');

    console.log('Тест 2 успешно видит личный кабинет без повторного логина!');
    await page.pause();
  });
});
