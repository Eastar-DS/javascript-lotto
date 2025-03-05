import LottoCalculator from "../domain/lottoCalculator.js";
import LottoMachine from "../domain/lottoMachine.js";
import InputView from "../view/console/InputView.js";
import OutputView from "../view/console/OutputView.js";

class ConsoleController {
  async run() {
    const purchaseMoney = await InputView.getPurchaseMoney();

    const lottoMachine = new LottoMachine();
    const lottos = lottoMachine.drawLotto(purchaseMoney);
    OutputView.printLotto(lottos);

    const winningNumbers = await InputView.getWinningNumbers();
    const bonusNumber = await InputView.getBonusNumber(winningNumbers);

    const lottoCalculator = new LottoCalculator(winningNumbers, bonusNumber);
    const result = lottoCalculator.calculateResult(lottos, purchaseMoney);
    OutputView.printResult(result);

    await this.restart();
  }

  async restart() {
    const restartAnswer = await InputView.getRestartRequest();
    if (restartAnswer === "y") {
      await this.run();
    }
  }
}

export default ConsoleController;
