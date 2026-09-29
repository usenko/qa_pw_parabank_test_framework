import { test } from '../../_fixtures/fixtures';
import { signUpAccount } from '../../../src/ui/actions/signUpAccount';

test.beforeEach(async ({ page, account, accountNavMenu }) => {
  await signUpAccount(page, account);
});

test.describe('Update Contact Info Flow', () => {
  test(`Should be able to change Profile Information`, async ({
    updateContactInfoPage,
    page,
  }) => {
    await updateContactInfoPage.open('/parabank/updateprofile.htm');
    await updateContactInfoPage.assertMainTextTitle('Update Profile');
    await page.waitForTimeout(2000);
    const response = await updateContactInfoPage.clickUpdateProfileButton();
    const responseBody = await response.text();
    console.log('JSON бэкенда:', responseBody);
  });
});
