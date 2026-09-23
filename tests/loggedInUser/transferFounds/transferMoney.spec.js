import { test } from '../../_fixtures/fixtures';
import { signUpAccount } from '../../../src/ui/actions/signUpAccount';
import { createNewAccount } from '../../../src/ui/actions/createNewAccount';
const testParameters = [
  {
    accountType: 'SAVINGS',
  },
  {
    accountType: 'CHECKING',
  },
];

test.describe('Open New Account Flow', () => {
  testParameters.forEach(({ accountType }) => {
    test.beforeEach(async ({ page, account }) => {
      await signUpAccount(page, account);
      await createNewAccount(page, accountType);
    });

    test(`Should be able to create new ${accountType} Account`, async ({
      accountsOverviewPage,
      openNewAccountPage,
      accountNavMenu,
    }) => {});
  });
});
