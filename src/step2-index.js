/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

import { LOTTO } from "./constants";
import LottoGenerator from "./LottoGenerator";
import WinningLotto from "./Model/WinningLotto";
import ScoreBoard from "./ScoreBoard";
import {
  validateArrayLength,
  validateNotDuplicated,
  validateNotEmptyString,
  validateNumberDivided,
  validateNumberLower,
  validateNumberUpper,
  validatePositiveNumber,
  validateStringIsNumber,
} from "./Validator";
import InputViewWeb from "./View/InputViewWeb";
import OutputViewWeb from "./View/OutputViewWeb";

const moneyForm = document.getElementById("money-form");
const resultBtn = document.getElementById("result-btn");
const modalClose = document.getElementById("modal-close");
const restartBtn = document.getElementById("restart-btn");

const lottoState = {
  money: 0,
  lottos: [],
};

moneyForm.addEventListener("submit", (event) => {
  event.preventDefault();

  try {
    lottoState.money = InputViewWeb.getMoney();

    validatePositiveNumber(lottoState.money);
    validateNumberDivided(lottoState.money, LOTTO.PRICE);

    const buyLottoCount = lottoState.money / LOTTO.PRICE;
    lottoState.lottos = LottoGenerator.makeLottos(buyLottoCount);

    OutputViewWeb.renderLottos(buyLottoCount);
  } catch (error) {
    alert(error.message);
  }
});

resultBtn.addEventListener("click", () => {
  try {
    const winningNumbers = getWinningNumbers();
    const bonusNumber = getBonusNumber();

    const winningLotto = new WinningLotto(winningNumbers, bonusNumber);
    const allRankCount = ScoreBoard.makeAllRankCount(
      lottoState.lottos,
      winningLotto,
    );
    const rate = ScoreBoard.getProfitRate(allRankCount, lottoState.money);

    OutputViewWeb.renderResult(allRankCount, rate);
  } catch (error) {
    alert(error.message);
  }
});

modalClose.addEventListener("click", () => {
  OutputViewWeb.closeModal();
});

restartBtn.addEventListener("click", () => {
  OutputViewWeb.resetAll();

  lottoState.lottos = [];
  lottoState.money = 0;
});

const getWinningNumbers = () => {
  const numbers = InputViewWeb.getWinningNumbers();

  numbers.forEach((number) => {
    validatePositiveNumber(number);
    validateNumberLower(LOTTO.LOWER, number);
    validateNumberUpper(LOTTO.UPPER, number);
  });
  validateNotDuplicated(numbers);
  validateArrayLength(numbers, LOTTO.COUNT);

  return numbers;
};

const getBonusNumber = () => {
  const number = InputViewWeb.getBonusNumber();

  validatePositiveNumber(number);
  validateNumberLower(LOTTO.LOWER, number);
  validateNumberUpper(LOTTO.UPPER, number);

  return number;
};
