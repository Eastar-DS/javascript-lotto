/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

import { LOTTO } from "./constants";
import LottoGenerator from "./LottoGenerator";
import {
  validateNotEmptyString,
  validateNumberDivided,
  validatePositiveNumber,
  validateStringIsNumber,
} from "./Validator";

const moneyForm = document.getElementById("money-form");
const moneyInput = document.getElementById("money-input");

const lottoSection = document.getElementById("lotto-section");
const buyCount = document.getElementById("buy-count");
const lottoList = document.getElementById("lotto-list");

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
};
