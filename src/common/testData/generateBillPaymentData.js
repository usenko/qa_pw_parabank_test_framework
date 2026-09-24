import { faker } from '@faker-js/faker';

export function generateNewAccountUserData(logger = null) {
  const paymentData = {
    payeeName: faker.company.name(),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zipCode: faker.location.zipCode(),
    phone: faker.phone.number(),
    accountNumber: faker.string.numeric(5),
    amount: faker.number.int({ min: 100, max: 1000 }),
  };

  if (logger) {
    logger.debug(`Generated bill payment data: ${JSON.stringify(paymentData)}`);
  }
  return paymentData;
}
