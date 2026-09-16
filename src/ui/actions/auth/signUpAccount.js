import { SignUpPage } from '../../pages/auth/SignUpPage';
import { testStep } from '../../../common/helpers/pwHelpers';

export async function signUpAccount(page, account) {
  await testStep('Sign up account', async () => {
    const signUpPage = new SignUpPage(page);

    await signUpPage.open();
    await signUpPage.clickLinkToRegister();
    await signUpPage.submitSignUpForm(account);
    await signUpPage.assertSuccessfullyRegisterMessage(account.username);
  });
}
