import { test } from '../../_fixtures/fixtures';
import { signUpAccount } from '../../../src/ui/actions/signUpAccount';
import { generateNewAccountUserData } from '../../../src/common/testData/generateNewAccountUserData';

test.beforeEach(async ({ page, account, accountNavMenu }) => {
  await signUpAccount(page, account);
});

test.describe('Update Contact Info Flow', () => {
  test(`Should be able to change Profile Information`, async ({
    updateContactInfoPage,
    page,
  }) => {
    const accountData = generateNewAccountUserData();
    const { ssn, username, password, repeatedPassword, ...contactInfoData } =
      accountData;
    await updateContactInfoPage.open('/parabank/updateprofile.htm');
    await updateContactInfoPage.assertMainTextTitle('Update Profile');
    const response =
      await updateContactInfoPage.updateContactInfo(contactInfoData);
    await updateContactInfoPage.assertMainTextTitle('Profile Updated');
    await updateContactInfoPage.assertResponseData(response);
  });
});
