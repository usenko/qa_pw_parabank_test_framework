import { test } from '../../_fixtures/fixtures';
import { signUpAccount } from '../../../src/ui/actions/signUpAccount';
import { createNewAccount } from '../../../src/ui/actions/createNewAccount';
import { TRANSFER_SUM } from '../../../src/common/constants';
import { Severity } from 'allure-js-commons';

const testParameters = ['SAVINGS', 'CHECKING'];

testParameters.forEach(accountType => {
  test.describe(`Transfer funds flow`, () => {
    test.beforeEach(async ({ page, account }, testInfo) => {
      await signUpAccount(page, account);
      const newAccountId = await createNewAccount(page, accountType);
      testInfo.newAccountId = newAccountId;
    });

    test(
      `Transfer funds to ${accountType} account and check updated balance`,
      { annotation: { type: 'severity', description: Severity.CRITICAL } },
      async (
        { accountNavMenu, transferFundsPage, accountsOverviewPage },
        testInfo,
      ) => {
        const newAccountId = testInfo.newAccountId;

        await accountsOverviewPage.open('overview.htm');
        await accountsOverviewPage.assertMainTextTitle('Accounts Overview');
        const initialBalance =
          await accountsOverviewPage.getCellAccountAmountById(
            newAccountId,
            'Balance',
          );
        await accountNavMenu.clickNavLink('Transfer funds');
        await transferFundsPage.fillAmountField(TRANSFER_SUM);
        await transferFundsPage.selectToAccountId(newAccountId);
        await transferFundsPage.clickTransferButton();
        await transferFundsPage.assertMainTextTitle('Transfer Complete!');

        await accountNavMenu.clickNavLink('Accounts Overview');
        await accountsOverviewPage.assertMainTextTitle('Accounts Overview');
        const currentBalance =
          await accountsOverviewPage.getCellAccountAmountById(
            newAccountId,
            'Balance',
          );
        const totalBalance = initialBalance + TRANSFER_SUM;
        await accountsOverviewPage.assertValuesAreEqual(
          currentBalance,
          totalBalance,
        );
      },
    );
  });
});
