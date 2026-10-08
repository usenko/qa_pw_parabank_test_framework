import { test as base } from '@playwright/test';
import { Logger } from '../../src/common/logger/Logger';
import * as allure from 'allure-js-commons';
import { parseTestTreeHierarchy } from '../../src/common/helpers/allureHelpers';
import { generateNewAccountUserData } from '../../src/common/testData/generateNewAccountUserData';
import { AccountNavMenu } from '../../src/ui/components/AccountNavMenu';

export const test = base.extend<
  {
    infoTestLog: string;
    addAllureTestHierarchy: string;
    account: any;
    accountNavMenu: AccountNavMenu;
  },
  {
    logger: Logger;
    workerAccount: any;
  }
>({
  logger: [
    async ({}, use) => {
      const logger = new Logger('error');

      await use(logger);
    },
    { scope: 'worker' },
  ],

  workerAccount: [
    async ({ logger }, use) => {
      const data = generateNewAccountUserData(logger);
      await use(data);
    },
    { scope: 'worker' },
  ],

  account: async ({ logger }, use) => {
    const account = generateNewAccountUserData(logger);

    await use(account);
  },

  accountNavMenu: async ({ page }, use) => {
    const accountNavMenu = new AccountNavMenu(page);

    await use(accountNavMenu);
  },

  infoTestLog: [
    async ({ logger }, use, testInfo) => {
      const indexOfTestSubfolderStart = testInfo.file.indexOf('/tests') + 7;
      const fileName = testInfo.file.substring(indexOfTestSubfolderStart);

      logger.info(`Test started: ${fileName}`);

      await use('infoTestLog');

      logger.info(`Test completed: ${fileName}`);
    },
    { scope: 'test', auto: true },
  ],

  addAllureTestHierarchy: [
    async ({ logger }, use, testInfo) => {
      const fileName = testInfo.file;
      const testDir = testInfo.project.testDir;

      const severityAnnotation = testInfo.annotations.find(
        a => a.type === 'severity',
      );
      const severityValue = severityAnnotation?.description || 'normal';
      await allure.severity(severityValue);
      const [parentSuite, suite, subSuite] = parseTestTreeHierarchy(
        testDir,
        fileName,
        logger,
      );

      await allure.parentSuite(parentSuite);
      await allure.suite(suite);
      if (subSuite) {
        await allure.subSuite(subSuite);
      }

      await use('addAllureTestHierarchy');
    },
    { scope: 'test', auto: true },
  ],
});
