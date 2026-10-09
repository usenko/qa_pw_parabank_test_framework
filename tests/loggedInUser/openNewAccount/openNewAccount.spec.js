import { test } from '../../_fixtures/fixtures';
import { signUpAccount } from '../../../src/ui/actions/signUpAccount';
import { createNewAccount } from '../../../src/ui/actions/createNewAccount';
import { Severity } from 'allure-js-commons';

const testParameters = ['SAVINGS', 'CHECKING'];
const MIN_OPENING_DEPOSIT = 100;

test.describe('Open New Account Flow', () => {
  test.beforeEach(async ({ page, account }) => {
    await signUpAccount(page, account);
  });

  testParameters.forEach(accountType => {
    test(
      `Should be able to create new ${accountType} Account`,
      { annotation: { type: 'severity', description: Severity.CRITICAL } },
      async ({ page, accountsOverviewPage, accountNavMenu }) => {
        await accountsOverviewPage.open('overview.htm');
        const fromAccountId = await accountsOverviewPage.getAccountIdByLink();

        const fromBalanceBefore =
          await accountsOverviewPage.getCellAccountAmountById(
            fromAccountId,
            'Balance',
          );
        const newAccountId = await createNewAccount(page, accountType);

        await accountNavMenu.clickNavLink('Accounts Overview');
        await accountsOverviewPage.assertAccountIdIsVisible(newAccountId);

        const newAccountBalance =
          await accountsOverviewPage.getCellAccountAmountById(
            newAccountId,
            'Balance',
          );
        await accountsOverviewPage.assertValuesAreEqual(
          newAccountBalance,
          MIN_OPENING_DEPOSIT,
        );

        const fromBalanceAfter =
          await accountsOverviewPage.getCellAccountAmountById(
            fromAccountId,
            'Balance',
          );
        const expectedFromBalance =
          Math.round((fromBalanceBefore - MIN_OPENING_DEPOSIT) * 100) / 100;
        await accountsOverviewPage.assertValuesAreEqual(
          fromBalanceAfter,
          expectedFromBalance,
        );

        await accountsOverviewPage.clickAccountLink(newAccountId);
        const accountDetails =
          await accountsOverviewPage.getAccountDetailsData();
        await accountsOverviewPage.assertAccountDetailData(
          'Account Type',
          accountType,
          accountDetails,
        );
      },
    );
  });
});
