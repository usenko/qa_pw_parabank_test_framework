import { test as base } from '@playwright/test';
import { SignUpPage } from '../../src/ui/pages/SignUpPage';
import { HomePage } from '../../src/ui/pages/HomePage';
import { ForgotLoginPage } from '../../src/ui/pages/ForgotLoginPage';

export const test = base.extend<{
  signUpPage: SignUpPage;
  homePage: HomePage;
  forgotLoginPage: ForgotLoginPage;
}>({
  signUpPage: async ({ page }, use) => {
    const signUpPage = new SignUpPage(page);

    await use(signUpPage);
  },

  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);

    await use(homePage);
  },

  forgotLoginPage: async ({ page }, use) => {
    const forgotLoginPage = new ForgotLoginPage(page);

    await use(forgotLoginPage);
  },
});
