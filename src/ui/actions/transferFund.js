import { testStep } from '../../common/helpers/pwHelpers';
import { TransferFundsPage } from '../pages/TransferFundsPage';

export async function transferFund(
  page,
  { value, fromAccountId, toAccountId } = {},
) {
  await testStep('Transfer Fund', async () => {
    const transferFundsPage = new TransferFundsPage(page);

    await transferFundsPage.open('transfer.htm');
    await transferFundsPage.fillAmountField(value);
    if (fromAccountId !== undefined) {
      await transferFundsPage.selectFromAccountId(fromAccountId);
    }
    if (toAccountId !== undefined) {
      await transferFundsPage.selectToAccountId(toAccountId);
    }
    await transferFundsPage.clickTransferButton();
    await transferFundsPage.assertMainTextTitle('Transfer Complete!');
  });
}
