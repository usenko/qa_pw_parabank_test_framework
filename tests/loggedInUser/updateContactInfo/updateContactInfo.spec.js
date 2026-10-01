import { test } from '../../_fixtures/fixtures';
import { signUpAccount } from '../../../src/ui/actions/signUpAccount';
import { generateNewAccountUserData } from '../../../src/common/testData/generateNewAccountUserData';
import { SIGN_UP_FIELDS } from '../../../src/common/constants';

test.beforeEach(async ({ page, account, accountNavMenu }) => {
  await signUpAccount(page, account);
});

test.describe('Update Contact Info Flow', () => {
  test(`Should be able to change Profile Information`, async ({
    updateContactInfoPage,
    page,
  }) => {
    const accountData = generateNewAccountUserData();
    const { ssn, username, password, repeatedPassword, ...contactData } =
      accountData;
    await updateContactInfoPage.openContactInfoPage();
    await updateContactInfoPage.assertMainTextTitle('Update Profile');
    const response = await updateContactInfoPage.updateContactInfo(contactData);
    await updateContactInfoPage.assertMainTextTitle('Profile Updated');
    await updateContactInfoPage.assertResponseData(response);

    await updateContactInfoPage.openContactInfoPage();
    await updateContactInfoPage.assertMainTextTitle('Update Profile');

    for (const [key, expectedValue] of Object.entries(contactData)) {
      const inputName = SIGN_UP_FIELDS[key];

      await updateContactInfoPage.assertContactValue(inputName, expectedValue);
    }
  });
});
