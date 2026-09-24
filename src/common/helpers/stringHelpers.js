export function capitalize(str) {
  const firstLetterCap = str.charAt(0).toUpperCase();

  const remainingLetters = str.slice(1);

  return firstLetterCap + remainingLetters;
}

export function camelCaseToPhrase(str) {
  return str.replace(/([A-Z])/g, ' $1');
}

export function parseAndFormatNumber(str) {
  if (!str) {
    return 0;
  }
  const stringValue = typeof str === 'string' ? str : str.toString();
  const cleanStr = stringValue.replace(/[$, \s]/g, '');
  const numericText = parseFloat(cleanStr);
  if (isNaN(numericText)) {
    return 0;
  }
  return Math.round(numericText * 100) / 100;
}
