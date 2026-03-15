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

const moneyForm = document.getElementById("money-form");
const moneyInput = document.getElementById("money-input");

const lottoSection = document.getElementById("lotto-section");
const buyCount = document.getElementById("buy-count");
const lottoList = document.getElementById("lotto-list");

const winningSection = document.getElementById("winning-section");
const winningNuberInputs = document.querySelectorAll(".winning-number");
const bonusInput = document.getElementById("bonus-number");
const resultBtn = document.getElementById("result-btn");

const modalOverlay = document.getElementById("modal-overlay");
const modalClose = document.getElementById("modal-close");
const profitRate = document.getElementById("profit-rate");
const restartBtn = document.getElementById("restart-btn");

const lottoState = {
  money: 0,
  lottos: [],
};

moneyForm.addEventListener("submit", (event) => {
  event.preventDefault();

  try {
    const moneyString = moneyInput.value;
    validateNotEmptyString(moneyString);
    validateStringIsNumber(moneyString);

    lottoState.money = Number(moneyString);

    validatePositiveNumber(lottoState.money);
    validateNumberDivided(lottoState.money, LOTTO.PRICE);

    const buyLottoCount = lottoState.money / LOTTO.PRICE;
    lottoState.lottos = LottoGenerator.makeLottos(buyLottoCount);

    renderLottos(buyLottoCount);
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

    renderResult(allRankCount, rate);
  } catch (error) {
    alert(error.message);
  }
});

modalClose.addEventListener("click", () => {
  modalOverlay.classList.add("hidden");
});

restartBtn.addEventListener("click", () => {
  modalOverlay.classList.add("hidden");
  lottoSection.classList.add("hidden");
  winningSection.classList.add("hidden");

  moneyInput.value = "";
  winningNuberInputs.forEach((input) => {
    input.value = "";
  });
  bonusInput.value = "";

  lottoState.lottos = [];
  lottoState.money = 0;
});

const renderLottos = (count) => {
  buyCount.textContent = `총 ${count}개를 구매하였습니다.`;

  lottoList.innerHTML = "";
  lottoState.lottos.forEach((lotto) => {
    const li = document.createElement("li");
    li.className = "lotto-item";

    const icon = document.createElement("span");
    icon.className = "lotto-icon";
    icon.textContent = "🎟️";

    const numbers = document.createElement("span");
    numbers.textContent = lotto.getNumbers().join(", ");

    li.appendChild(icon);
    li.appendChild(numbers);
    lottoList.appendChild(li);
  });

  lottoSection.classList.remove("hidden");
  winningSection.classList.remove("hidden");
};

const renderResult = (allRankCount, rate) => {
  document.getElementById("rank-5th").textContent = `${allRankCount.FIFTH}개`;
  document.getElementById("rank-4th").textContent = `${allRankCount.FOURTH}개`;
  document.getElementById("rank-3rd").textContent = `${allRankCount.THIRD}개`;
  document.getElementById("rank-2nd").textContent = `${allRankCount.SECOND}개`;
  document.getElementById("rank-1st").textContent = `${allRankCount.FIRST}개`;
  profitRate.innerHTML = `당신의 총 수익률은 <strong>${rate}</strong>%입니다.`;

  modalOverlay.classList.remove("hidden");
};

const getWinningNumbers = () => {
  const numbers = Array.from(winningNuberInputs).map((input) => {
    validateNotEmptyString(input.value);
    validateStringIsNumber(input.value);
    return Number(input.value);
  });

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
  validateNotEmptyString(bonusInput.value);
  validateStringIsNumber(bonusInput.value);

  const number = Number(bonusInput.value);
  validatePositiveNumber(number);
  validateNumberLower(LOTTO.LOWER, number);
  validateNumberUpper(LOTTO.UPPER, number);

  return number;
};
