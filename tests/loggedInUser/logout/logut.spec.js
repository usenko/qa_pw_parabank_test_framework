import { test } from '../../_fixtures/fixtures';
import { signUpAccount } from '../../../src/ui/actions/signUpAccount';

test.beforeEach(async ({ page, account, accountNavMenu }) => {
  await signUpAccount(page, account);
});

test.describe('Logout Flow', () => {
  test(`Should be able to logout from account`, async ({ accountNavMenu }) => {
    await accountNavMenu.clickLogOut();
  });
});
