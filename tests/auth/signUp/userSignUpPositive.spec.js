import { test } from '../../_fixtures/fixtures';

test('Successful `Sign in` flow test', async ({ page, signUpPage }) => {
  await signUpPage.openUrl();
  await page.pause();
});
