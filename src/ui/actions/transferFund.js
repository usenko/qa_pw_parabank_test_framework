import { testStep } from '../../common/helpers/pwHelpers';
import { TransferFundsPage } from '../pages/TransferFundsPage';

export async function transferFund(page, accountID, value) {
  await testStep('Transfer Fund', async () => {
    const transferFundsPage = new TransferFundsPage(page);

    await transferFundsPage.open('/transfer.htm');
    await transferFundsPage.fillAmountField(value);
    await transferFundsPage.selectToAccountId(accountID);
    await transferFundsPage.clickTransferButton();
    await transferFundsPage.assertMainTextTitle('Transfer Complete!');
  });
}
