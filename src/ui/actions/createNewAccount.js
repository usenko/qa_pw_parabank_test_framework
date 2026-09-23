import { testStep } from '../../../common/helpers/pwHelpers';
import { OpenNewAccountPage } from '../pages/OpenNewAccountPage';
import { AccountsOverviewPage } from '../pages/ApenNewAccountPage';
import { AccountNavMenu } from '../components/AccountNavMenu';

export async function createNewAccount(page, accountType) {
  return await testStep('Create new account', async () => {
    const openNewAccountPage = new OpenNewAccountPage(page);
    const accountsOverviewPage = new AccountsOverviewPage(page);
    const accountNavMenu = new AccountNavMenu(page);

    await accountsOverviewPage.open('/parabank/overview.htm');
    const accountId = await accountsOverviewPage.getAccountIdByLink();

    await accountNavMenu.clickNavLink('Open New Account');
    await openNewAccountPage.assertMainTextTitle('Open New Account');
    await openNewAccountPage.selectAccountType(accountType);
    await openNewAccountPage.selectAccount(accountId);
    await openNewAccountPage.clickOpenNewAccountButton();
    await openNewAccountPage.assertMainTextTitle('Account Opened!');

    const newAccountId = await openNewAccountPage.getCreatedAccountId();

    return newAccountId;
  });
}
