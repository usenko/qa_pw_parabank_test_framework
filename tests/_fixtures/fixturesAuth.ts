import { test as base } from '@playwright/test';
import { SignUpPage } from '../../src/ui/pages/SignUpPage';
import { HomePage } from '../../src/ui/pages/HomePage';

export const test = base.extend<{
  signUpPage: SignUpPage;
  homePage: HomePage;
}>({
  signUpPage: async ({ page }, use) => {
    const signUpPage = new SignUpPage(page);

    await use(signUpPage);
  },

  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);

    await use(homePage);
  },
});
