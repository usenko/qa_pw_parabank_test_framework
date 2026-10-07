import { test } from '../../../_fixtures/fixtures';
import { signUpAccount } from '../../../../src/ui/actions/signUpAccount';
import { createNewAccount } from '../../../../src/ui/actions/createNewAccount';
import { transferFund } from '../../../../src/ui/actions/transferFund';
import { getFormattedDate } from '../../../../src/common/helpers/calendarHelpers';

const TRANSFER_SUM = 222;
let newAccountId;
let defaultAccount;
let newAccountBalance;

test.beforeEach(async ({ page, account, accountsOverviewPage }) => {
  await signUpAccount(page, account);
  await accountsOverviewPage.open('overview.htm');
  defaultAccount = await accountsOverviewPage.getAccountIdByLink();

  newAccountId = await createNewAccount(page, 'SAVINGS');

  await accountsOverviewPage.open('overview.htm');
  newAccountBalance = await accountsOverviewPage.getCellAccountAmountById(
    newAccountId,
    'Balance',
  );

  await transferFund(page, {
    value: TRANSFER_SUM,
    fromAccountId: newAccountId,
    toAccountId: defaultAccount,
  });
});

test.describe('Account activity transaction data', () => {
  test('Account activity data table should display correct transaction information', async ({
    accountActivityPage,
    accountsOverviewPage,
  }) => {
    const transactionDate = getFormattedDate('MM-DD-YYYY', 0);

    await accountsOverviewPage.open('overview.htm');
    await accountsOverviewPage.assertMainTextTitle('Accounts Overview');
    await accountsOverviewPage.clickAccountLink(newAccountId);
    await accountsOverviewPage.assertMainTextTitle('Account Details');

    await accountActivityPage.assertTransactionRowData(1, {
      date: transactionDate,
      transaction: 'Funds Transfer Received',
      debit: '0',
      credit: `${newAccountBalance}`,
    });
    await accountActivityPage.assertTransactionRowData(2, {
      date: transactionDate,
      transaction: 'Funds Transfer Sent',
      debit: `${TRANSFER_SUM}`,
      credit: '0',
    });
  });
});
