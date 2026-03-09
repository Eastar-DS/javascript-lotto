/**
 * step 1의 시작점이 되는 파일입니다.
 * 브라우저 환경에서 사용하는 css 파일 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

import { COMMAND, LOTTO } from "./constants.js";
import InputView from "./View/InputView.js";
import LottoGenerator from "./LottoGenerator.js";
import OutputView from "./View/OutputView.js";
import ScoreBoard from "./ScoreBoard.js";
import WinningLotto from "./Model/WinningLotto.js";
import {
  validateArrayLength,
  validateNotDuplicated,
  validateNumberLower,
  validateNumberUpper,
  validatePositiveNumber,
} from "./Validator.js";

class App {
  static async run() {
    while (true) {
      const money = await App.readMoneyUntilCorrect();
      const buyLottoCount = money / LOTTO.PRICE;
      OutputView.printBuyLottoCount(buyLottoCount);

      const lottos = LottoGenerator.makeLottos(buyLottoCount);
      lottos.forEach((lotto) =>
        OutputView.printLottoNumbers(lotto.getNumbers()),
      );

      const winningNumbers = await App.readWinningNumbersUntilCorrect();
      const winningLotto = await App.getWinningLotto(winningNumbers);

      const allRankCount = ScoreBoard.makeAllRankCount(lottos, winningLotto);
      const profitRate = ScoreBoard.getProfitRate(allRankCount, money);
      OutputView.printLottoResult(allRankCount, profitRate);

      const restartCommand = await App.readRestartCommandUntilCorrect();
      if (COMMAND.NO.includes(restartCommand)) break;
    }
  }

  static async readMoneyUntilCorrect() {
    try {
      const input = await InputView.readMoney();

      return input;
    } catch (error) {
      console.log(error.message);
      return await App.readMoneyUntilCorrect();
    }
  }

  static async readWinningNumbersUntilCorrect() {
    try {
      const winningNumbers = await InputView.readWinningNumbers();

      winningNumbers.forEach((number) => {
        validatePositiveNumber(number);
        validateNumberLower(LOTTO.LOWER, number);
        validateNumberUpper(LOTTO.UPPER, number);
      });

      validateNotDuplicated(winningNumbers);
      validateArrayLength(winningNumbers, LOTTO.COUNT);

      return winningNumbers;
    } catch (error) {
      console.log(error.message);
      return await App.readWinningNumbersUntilCorrect();
    }
  }

  static async readBonusNumberUntilCorrect() {
    try {
      const bonusNumber = await InputView.readBonusNumber();

      validatePositiveNumber(bonusNumber);
      validateNumberLower(LOTTO.LOWER, bonusNumber);
      validateNumberUpper(LOTTO.UPPER, bonusNumber);

      return bonusNumber;
    } catch (error) {
      console.log(error.message);
      return await App.readBonusNumberUntilCorrect();
    }
  }

  static async getWinningLotto(winningNumbers) {
    try {
      const bonusNumber = await App.readBonusNumberUntilCorrect();
      const winningLotto = new WinningLotto(winningNumbers, bonusNumber);

      return winningLotto;
    } catch (error) {
      console.log(error.message);
      return await App.getWinningLotto(winningNumbers);
    }
  }

  static async readRestartCommandUntilCorrect() {
    try {
      const restartCommand = await InputView.readRestartCommand();

      return restartCommand;
    } catch (error) {
      console.log(error.message);
      return await App.readRestartCommandUntilCorrect();
    }
  }
}

await App.run();
