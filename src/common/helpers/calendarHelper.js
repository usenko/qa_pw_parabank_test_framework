export function getCurrentMonth(monthNumber = 0) {
  const date = new Date();
  date.setDate(1);
  date.setMonth(date.getMonth() + monthNumber);

  return date.toLocaleDateString('en-US', { month: 'long' });
}
