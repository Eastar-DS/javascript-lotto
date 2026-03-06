/**
 * step 1의 시작점이 되는 파일입니다.
 * 브라우저 환경에서 사용하는 css 파일 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

import { LOTTO } from "./constants.js";
import InputView from "./InputView.js";
import LottoGenerator from "./LottoGenerator.js";
import OutputView from "./OutputView.js";
import ScoreBoard from "./ScoreBoard.js";
import WinningLotto from "./WinningLotto.js";

class App {
  static async run() {
    const money = await App.readMoneyUntilCorrect();

    const buyLottoCount = money / LOTTO.PRICE;
    OutputView.printBuyLottoCount(buyLottoCount);

    // 로또 발행
    const lottos = LottoGenerator.makeLottos(buyLottoCount);
    lottos.forEach((lotto) => OutputView.printLottoNumbers(lotto.getNumbers()));

    // 당첨 번호 입력

    const winningNumbers = await App.readWinningNumbersUntilCorrect();

    const winningLotto = await App.getWinningLotto(winningNumbers);

    // 당첨 여부 확인
    const allRankCount = ScoreBoard.makeAllRankCount(lottos, winningLotto);

    // 수익률 확인
    const profitRate = ScoreBoard.getProfitRate(allRankCount, money);

    OutputView.printLottoResult(allRankCount, profitRate);
  }

  static async readMoneyUntilCorrect() {
    try {
      const input = await InputView.readMoney("> 구입금액을 입력해 주세요.");

      return input;
    } catch (error) {
      console.log(error.message);
      return await App.readMoneyUntilCorrect();
    }
  }

  static async readWinningNumbersUntilCorrect() {
    try {
      const winningNumbers =
        await InputView.readWinningNumbers("> 당첨 번호를 입력해 주세요. ");

      return winningNumbers;
    } catch (error) {
      console.log(error.message);
      return await App.readWinningNumbersUntilCorrect();
    }
  }

  static async readBonusNumberUntilCorrect() {
    try {
      const bonusNumber =
        await InputView.readBonusNumber("> 보너스 번호를 입력해 주세요.");

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
}

await App.run();
