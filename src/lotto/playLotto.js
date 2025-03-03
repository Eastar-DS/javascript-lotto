import { retryUntilValidInput } from "../utils/input.js";
import validationRestartInput from "../validation/validationRestartInput.js";
import readRestartInput from "../view/input/readRestartInput.js";
import printLottoResult from "../view/output/printLottoResult.js";
import getWinningNumbersAndBonusNumber from "./getWinningNumbersAndBonusNumber.js";
import purchaseLotto from "./purchaseLotto.js";
import getLottoResult from "./getLottoResult.js";

const playLotto = async () => {
  const { lottoPrice, lottoNumbers } = await purchaseLotto();
  const { winningNumbers, bonusNumber } =
    await getWinningNumbersAndBonusNumber();

  const { prizeResult, revenueRate } = getLottoResult(
    lottoNumbers,
    winningNumbers,
    bonusNumber,
    lottoPrice
  );
  printLottoResult(prizeResult, revenueRate);

  const restartCommand = await retryUntilValidInput({
    readUserInput: readRestartInput,
    validator: validationRestartInput,
  });

  return restartCommand;
};

export default playLotto;
