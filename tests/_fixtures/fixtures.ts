import { mergeTests } from '@playwright/test';
import { test as genericTest } from './fixturesGeneric';
import { test as authTest } from './fixturesAuth';
import { test as accountServisesTest } from './fixturesAccountServices';

export const test = mergeTests(genericTest, authTest, accountServisesTest);
