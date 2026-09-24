import { BasePage } from './BasePage';
import { BILL_PAYMENT_FIELDS } from '../../common/constants';
import { expect } from '../../common/helpers/pwHelpers';

export class BillPayPage extends BasePage {
  constructor(page, userId = 0) {
    super(page);
    this.page = page;
    this.userId = userId;
    this.sendPaymentButton = this.getButtonByName('Send Payment');
  }

  async clickSendPaymentButton() {
    await this.step(`Click the 'Send Payment' button`, async () => {
      await Promise.all([
        this.page.waitForResponse(response => {
          return (
            response.url().includes('/bank/billpay') &&
            response.request().method() === 'POST' &&
            response.status() === 200
          );
        }),
        this.sendPaymentButton.click(),
      ]);
      await this.page.waitForURL('**/billpay.htm');
    });
  }

  async submitBillPaymentForm(account) {
    await this.step(`Fill the 'Bill Payment' form`, async () => {
      for (const [key, value] of Object.entries(account)) {
        if (BILL_PAYMENT_FIELDS[key] && value !== undefined) {
          const fieldName = BILL_PAYMENT_FIELDS[key];
          await this.fillInputFieldByName(fieldName, value);
        }
      }
      await this.clickSendPaymentButton();
    });
  }
}
