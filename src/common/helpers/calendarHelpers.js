export function getCurrentMonth(monthNumber = 0) {
  const date = new Date();
  date.setDate(1);
  date.setMonth(date.getMonth() + monthNumber);

  return date.toLocaleDateString('en-US', { month: 'long' });
}

export function getFormattedDate(format = 'DD-MM-YYYY', daysOffset) {
  const date = new Date();

  if (daysOffset != 0) {
    date.setDate(date.setDate() + daysOffset);
  }

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  const formatedDate = {
    'DD-MM-YYYY': `${day}-${month}-${year}`,
    'MM-DD-YYYY': `${month}-${day}-${year}`,
    'YYYY-MM-DD': `${year}-${month}-${day}`,
  };

  return formatedDate[format] || formatedDate['MM-DD-YYYY'];
}
