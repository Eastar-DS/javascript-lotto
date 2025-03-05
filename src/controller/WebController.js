import LottoCalculator from "../domain/lottoCalculator.js";
import LottoMachine from "../domain/lottoMachine.js";
import LottoState from "../state/LottoState.js";
import WebInput from "../view/web/WebInput.js";
import WebOutput from "../view/web/WebOutput.js";

class WebController {
  init() {
    WebOutput.renderBodyWrapper();
  }

  handlePurchase(event) {
    try {
      event.preventDefault();

      const purchaseMoney = WebInput.getPurchaseMoney();
      const lottoMachine = new LottoMachine();
      const lottos = lottoMachine.drawLotto(purchaseMoney);

      this.#updateLottoList(lottos, purchaseMoney);
    } catch (error) {
      alert(error.message);
    }
  }

  #updateLottoList(lottos, purchaseMoney) {
    const lottoList = document.querySelector(".lotto_list");
    if (lottoList) {
      LottoState.addLottos(lottos);
      LottoState.addPurchaseMoney(purchaseMoney);
      WebOutput.appendLottoList(lottos);
    } else {
      LottoState.setLottos(lottos);
      LottoState.setPurchaseMoney(purchaseMoney);
      WebOutput.renderLottoList();
    }
  }

  handleResult(event) {
    try {
      event.preventDefault();

      const result = this.#calculateResult();
      WebOutput.renderResultModal(result);
      WebOutput.disableButtons();
    } catch (error) {
      alert(error.message);
    }
  }

  #calculateResult() {
    const winningNumbers = WebInput.getWinningNumbers();
    const bonusNumber = WebInput.getBonusNumber(winningNumbers);

    const lottos = LottoState.getLottos();
    const purchaseMoney = LottoState.getPurchaseMoney();

    const lottoCalculator = new LottoCalculator(winningNumbers, bonusNumber);
    const result = lottoCalculator.calculateResult(lottos, purchaseMoney);
    return result;
  }

  handleRestart() {
    this.#modalClose();
    this.#restart();
  }

  handleCloseModal() {
    this.#modalClose();
  }

  #modalClose() {
    const modalBackdrop = document.querySelector(".modal_backdrop");

    modalBackdrop.remove();
  }

  #restart() {
    WebOutput.resetMain();
    this.init();
  }
}

export default WebController;
