import { faker } from '@faker-js/faker';

export function generateNewAccountUserData(logger = null) {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const password = faker.internet.password();

  const account = {
    firstname: firstName,
    lastname: lastName,
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zipcode: faker.location.zipCode(),
    phone: faker.phone.number(),
    ssn: faker.string.numeric('###-##-####'),
    username: `${firstName}_${lastName}`.replaceAll(`'`).toLowerCase(),
    password: password,
    confirmPassword: password,
  };

  if (logger) {
    logger.debug(`Generated new account user data: ${JSON.stringify(account)}`);
  }
  return account;
}
