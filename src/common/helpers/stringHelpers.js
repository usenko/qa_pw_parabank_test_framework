export function capitalize(str) {
  const firstLetterCap = str.charAt(0).toUpperCase();

  const remainingLetters = str.slice(1);

  return firstLetterCap + remainingLetters;
}

export function camelCaseToPhrase(str) {
  return str.replace(/([A-Z])/g, ' $1');
}

export function parseAndFormatNumber(str) {
  if (!str || typeof str !== 'string') {
    return '0.00';
  }

  const strWithDot = str.replace(',', '.');
  const cleanedText = strWithDot.replace(/[^0-9.-]+/g, '');
  const numericText = parseFloat(cleanedText);
  if (isNaN(numericText)) {
    return '0.00';
  }
  return numericText.toFixed(2);
}
