import { test } from '../../_fixtures/fixtures';
import { signUpAccount } from '../../../src/ui/actions/auth/signUpAccount';

test.beforeEach(async ({ page, account }) => {
  await signUpAccount(page, account);
});

test('Successful `Sign in` flow test', async ({ page, accountNavMenu }) => {
  await accountNavMenu.clickLogOut();
  await page.pause();
});
