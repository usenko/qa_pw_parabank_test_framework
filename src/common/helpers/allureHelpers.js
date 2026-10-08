import { camelCaseToPhrase, capitalize } from './stringHelpers';
import path from 'path';

const SPEC_FILE_PATTERN = /\.spec\.[jt]s$/;
const PATH_SEPARATOR_PATTERN = /[\\/]/;

function toPhrase(attribute) {
  return capitalize(camelCaseToPhrase(attribute)).trim();
}

export function parseTestTreeHierarchy(testDir, filePath, logger) {
  let attributes = path
    .relative(testDir, filePath)
    .split(PATH_SEPARATOR_PATTERN);

  const fileName = attributes.pop().replace(SPEC_FILE_PATTERN, '');
  const [parentFolder, ...suiteFolders] = attributes;

  const parentSuite = toPhrase(parentFolder);
  const suite = suiteFolders.map(toPhrase).join(' › ');
  const subSuite = toPhrase(fileName);

  logger.debug(
    `Parsed test hierarchy: ${JSON.stringify([parentSuite, suite, subSuite])}`,
  );

  return [parentSuite, suite, subSuite];
}
