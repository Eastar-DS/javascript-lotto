(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) return;
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) processPreload(link);
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") continue;
      for (const node of mutation.addedNodes) if (node.tagName === "LINK" && node.rel === "modulepreload") processPreload(node);
    }
  }).observe(document, {
    childList: true,
    subtree: true
  });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials") fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep) return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const LOTTO = {
  UPPER: 45,
  LOWER: 1,
  COUNT: 6,
  PRICE: 1e3
};
const ERROR_MESSAGE = {
  EMPTY: "[ERROR] 값을 입력해주세요.",
  NOT_NUMBER: "[ERROR] 숫자를 입력해주세요.",
  NOT_POSITIVE: "[ERROR] 양수를 입력해주세요.",
  NOT_DIVIDED: "[ERROR] 1,000원 단위로 입력해주세요.",
  OVER_UPPER: "[ERROR] 1~45 사이의 숫자를 입력해주세요.",
  UNDER_LOWER: "[ERROR] 1~45 사이의 숫자를 입력해주세요.",
  DUPLICATED: "[ERROR] 중복되지 않는 숫자를 입력해주세요.",
  INVALID_LENGTH: "[ERROR] 6개의 숫자를 입력해주세요.",
  BONUS_DUPLICATED: "[ERROR] 보너스 번호는 당첨 번호와 중복될 수 없습니다."
};
const RANK = {
  FIRST: {
    DISPLAY: "FIRST",
    MATCH_COUNT: 6,
    PRICE: 2e9
  },
  SECOND: {
    DISPLAY: "SECOND",
    MATCH_COUNT: 5,
    PRICE: 3e7
  },
  THIRD: { DISPLAY: "THIRD", MATCH_COUNT: 5, PRICE: 15e5 },
  FOURTH: { DISPLAY: "FOURTH", MATCH_COUNT: 4, PRICE: 5e4 },
  FIFTH: { DISPLAY: "FIFTH", MATCH_COUNT: 3, PRICE: 5e3 },
  NONE: { DISPLAY: "NONE" }
};
function validateNotEmptyString(string) {
  if (string === "") {
    throw new Error(ERROR_MESSAGE.EMPTY);
  }
}
function validatePositiveNumber(number) {
  if (number <= 0) {
    throw new Error(ERROR_MESSAGE.NOT_POSITIVE);
  }
}
function validateNumberUpper(upper, number) {
  if (number > upper) {
    throw new Error(ERROR_MESSAGE.OVER_UPPER);
  }
}
function validateNumberLower(lower, number) {
  if (number < lower) {
    throw new Error(ERROR_MESSAGE.UNDER_LOWER);
  }
}
function validateStringIsNumber(string) {
  if (isNaN(string)) {
    throw new Error(ERROR_MESSAGE.NOT_NUMBER);
  }
}
function validateNumberDivided(number, divideNumber) {
  if (number % divideNumber !== 0) {
    throw new Error(ERROR_MESSAGE.NOT_DIVIDED);
  }
}
function validateNotDuplicated(array) {
  if (array.length !== new Set(array).size) {
    throw new Error(ERROR_MESSAGE.DUPLICATED);
  }
}
function validateArrayLength(array, length) {
  if (array.length !== length) {
    throw new Error(ERROR_MESSAGE.INVALID_LENGTH);
  }
}
class Lotto {
  #numbers;
  constructor(numbers) {
    numbers.forEach((number) => {
      validatePositiveNumber(number);
      validateNumberLower(LOTTO.LOWER, number);
      validateNumberUpper(LOTTO.UPPER, number);
    });
    validateNotDuplicated(numbers);
    validateArrayLength(numbers, LOTTO.COUNT);
    this.#numbers = numbers.sort((a, b) => a - b);
  }
  checkDuplicate(number) {
    if (this.#numbers.includes(number)) {
      throw new Error(ERROR_MESSAGE.BONUS_DUPLICATED);
    }
  }
  getNumbers() {
    return [...this.#numbers];
  }
}
const readline = {};
const Utils = {
  getRandomNumber(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
  },
  readLineAsync(query) {
    return new Promise((resolve, reject) => {
      if (arguments.length !== 1) {
        reject(new Error("arguments must be 1"));
      }
      if (typeof query !== "string") {
        reject(new Error("query must be string"));
      }
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      rl.question(query, (input) => {
        rl.close();
        resolve(input);
      });
    });
  }
};
const LottoGenerator = {
  calculateBuyLottoCount(money) {
    return money / LOTTO.PRICE;
  },
  getRandomLottoNumbers() {
    const randomNumbers = [];
    while (randomNumbers.length !== LOTTO.COUNT) {
      const randomNumber = Utils.getRandomNumber(LOTTO.LOWER, LOTTO.UPPER);
      if (randomNumbers.includes(randomNumber)) continue;
      randomNumbers.push(randomNumber);
    }
    return randomNumbers;
  },
  makeLottos(buyLottoCount) {
    return Array.from(
      { length: buyLottoCount },
      (v, i) => new Lotto(LottoGenerator.getRandomLottoNumbers())
    );
  }
};
class WinningLotto {
  #lotto;
  #bonusNumber;
  constructor(winningNumbers, bonusNumber) {
    this.#lotto = new Lotto(winningNumbers);
    this.#lotto.checkDuplicate(bonusNumber);
    this.#bonusNumber = bonusNumber;
  }
  getMatchCount(lotto) {
    const winningNumbers = this.#lotto.getNumbers();
    const lottoNumbers = lotto.getNumbers();
    const numbers = [...winningNumbers, ...lottoNumbers];
    return numbers.length - new Set(numbers).size;
  }
  hasBonus(lotto) {
    const lottoNumbers = lotto.getNumbers();
    return lottoNumbers.includes(this.#bonusNumber);
  }
}
const ScoreBoard = {
  getRank(matchCount, hasBonus) {
    if (matchCount === RANK.FIRST.MATCH_COUNT) {
      return RANK.FIRST.DISPLAY;
    }
    if (matchCount === RANK.SECOND.MATCH_COUNT && hasBonus) {
      return RANK.SECOND.DISPLAY;
    }
    if (matchCount === RANK.THIRD.MATCH_COUNT) {
      return RANK.THIRD.DISPLAY;
    }
    if (matchCount === RANK.FOURTH.MATCH_COUNT) {
      return RANK.FOURTH.DISPLAY;
    }
    if (matchCount === RANK.FIFTH.MATCH_COUNT) {
      return RANK.FIFTH.DISPLAY;
    }
    return RANK.NONE.DISPLAY;
  },
  makeAllRankCount(lottos, winningLotto) {
    const allRankCount = {
      FIRST: 0,
      SECOND: 0,
      THIRD: 0,
      FOURTH: 0,
      FIFTH: 0,
      NONE: 0
    };
    lottos.forEach((lotto) => {
      const matchCount = winningLotto.getMatchCount(lotto);
      const hasBonus = winningLotto.hasBonus(lotto);
      allRankCount[ScoreBoard.getRank(matchCount, hasBonus)]++;
    });
    return allRankCount;
  },
  getProfitRate(allRankCount, money) {
    const totalProfit = allRankCount[RANK.FIRST.DISPLAY] * RANK.FIRST.PRICE + allRankCount[RANK.SECOND.DISPLAY] * RANK.SECOND.PRICE + allRankCount[RANK.THIRD.DISPLAY] * RANK.THIRD.PRICE + allRankCount[RANK.FOURTH.DISPLAY] * RANK.FOURTH.PRICE + allRankCount[RANK.FIFTH.DISPLAY] * RANK.FIFTH.PRICE;
    return (totalProfit / money * 100).toFixed(1);
  }
};
const LottoFacade = {
  purchaseLottos(moneyString) {
    validateNotEmptyString(moneyString);
    validateStringIsNumber(moneyString);
    const money = Number(moneyString);
    validatePositiveNumber(money);
    validateNumberDivided(money, LOTTO.PRICE);
    const buyLottoCount = money / LOTTO.PRICE;
    const lottos = LottoGenerator.makeLottos(buyLottoCount);
    return { money, lottos };
  },
  validateWinningNumbers(numbers) {
    numbers.forEach((number) => {
      validatePositiveNumber(number);
      validateNumberLower(LOTTO.LOWER, number);
      validateNumberUpper(LOTTO.UPPER, number);
    });
    validateNotDuplicated(numbers);
    validateArrayLength(numbers, LOTTO.COUNT);
  },
  validateBonusNumber(number) {
    validatePositiveNumber(number);
    validateNumberLower(LOTTO.LOWER, number);
    validateNumberUpper(LOTTO.UPPER, number);
  },
  calculateResult(lottos, winningNumbers, bonusNumber, money) {
    const winningLotto = new WinningLotto(winningNumbers, bonusNumber);
    const allRankCount = ScoreBoard.makeAllRankCount(lottos, winningLotto);
    const rate = ScoreBoard.getProfitRate(allRankCount, money);
    return { allRankCount, rate };
  }
};
const DOM_ID = {
  MONEY_FORM: "money-form",
  MONEY_INPUT: "money-input",
  LOTTO_SECTION: "lotto-section",
  BUY_COUNT: "buy-count",
  LOTTO_LIST: "lotto-list",
  WINNING_SECTION: "winning-section",
  BONUS_NUMBER: "bonus-number",
  RESULT_BTN: "result-btn",
  MODAL_OVERLAY: "modal-overlay",
  MODAL_CLOSE: "modal-close",
  PROFIT_RATE_VALUE: "profit-rate-value",
  RESTART_BTN: "restart-btn",
  RANK_1ST: "rank-1st",
  RANK_2ND: "rank-2nd",
  RANK_3RD: "rank-3rd",
  RANK_4TH: "rank-4th",
  RANK_5TH: "rank-5th"
};
const DOM_CLASS = {
  HIDDEN: "hidden",
  WINNING_NUMBER: "winning-number"
};
const create = (tag, attrs = {}) => {
  const el = document.createElement(tag);
  const { className, text, ...rest } = attrs;
  if (className) el.className = className;
  if (text !== void 0) el.textContent = text;
  Object.entries(rest).forEach(([key, value]) => {
    el.setAttribute(key, value);
  });
  return el;
};
const LottoList = {
  render(lottos) {
    const buyCount = document.getElementById(DOM_ID.BUY_COUNT);
    const lottoList = document.getElementById(DOM_ID.LOTTO_LIST);
    buyCount.textContent = `총 ${lottos.length}개를 구매하였습니다.`;
    while (lottoList.firstChild) {
      lottoList.removeChild(lottoList.firstChild);
    }
    lottos.forEach((lotto) => {
      const li = create("li", { className: "lotto-item" });
      const icon = create("span", { className: "lotto-icon", text: "🎟️" });
      const numbers = create("span", {
        text: lotto.getNumbers().join(", ")
      });
      li.appendChild(icon);
      li.appendChild(numbers);
      lottoList.appendChild(li);
    });
  },
  show() {
    document.getElementById(DOM_ID.LOTTO_SECTION).classList.remove(DOM_CLASS.HIDDEN);
  },
  hide() {
    document.getElementById(DOM_ID.LOTTO_SECTION).classList.add(DOM_CLASS.HIDDEN);
  },
  reset() {
    const lottoList = document.getElementById(DOM_ID.LOTTO_LIST);
    while (lottoList.firstChild) {
      lottoList.removeChild(lottoList.firstChild);
    }
    document.getElementById(DOM_ID.BUY_COUNT).textContent = "";
    this.hide();
  }
};
const MoneyForm = {
  getMoneyString() {
    return document.getElementById(DOM_ID.MONEY_INPUT).value;
  },
  bindSubmit(handler) {
    document.getElementById(DOM_ID.MONEY_FORM).addEventListener("submit", (event) => {
      event.preventDefault();
      handler();
    });
  },
  reset() {
    document.getElementById(DOM_ID.MONEY_INPUT).value = "";
  }
};
const ResultModal = {
  renderResult(allRankCount, rate) {
    document.getElementById(DOM_ID.RANK_5TH).textContent = `${allRankCount.FIFTH}개`;
    document.getElementById(DOM_ID.RANK_4TH).textContent = `${allRankCount.FOURTH}개`;
    document.getElementById(DOM_ID.RANK_3RD).textContent = `${allRankCount.THIRD}개`;
    document.getElementById(DOM_ID.RANK_2ND).textContent = `${allRankCount.SECOND}개`;
    document.getElementById(DOM_ID.RANK_1ST).textContent = `${allRankCount.FIRST}개`;
    document.getElementById(DOM_ID.PROFIT_RATE_VALUE).textContent = rate;
  },
  show() {
    document.getElementById(DOM_ID.MODAL_OVERLAY).classList.remove(DOM_CLASS.HIDDEN);
  },
  close() {
    document.getElementById(DOM_ID.MODAL_OVERLAY).classList.add(DOM_CLASS.HIDDEN);
  },
  reset() {
    document.getElementById(DOM_ID.RANK_5TH).textContent = "0개";
    document.getElementById(DOM_ID.RANK_4TH).textContent = "0개";
    document.getElementById(DOM_ID.RANK_3RD).textContent = "0개";
    document.getElementById(DOM_ID.RANK_2ND).textContent = "0개";
    document.getElementById(DOM_ID.RANK_1ST).textContent = "0개";
    document.getElementById(DOM_ID.PROFIT_RATE_VALUE).textContent = "0";
    this.close();
  },
  bindClose(handler) {
    document.getElementById(DOM_ID.MODAL_CLOSE).addEventListener("click", handler);
  },
  bindRestart(handler) {
    document.getElementById(DOM_ID.RESTART_BTN).addEventListener("click", handler);
  }
};
const WinningForm = {
  getWinningNumbers() {
    const inputs = document.querySelectorAll(`.${DOM_CLASS.WINNING_NUMBER}`);
    const numbers = Array.from(inputs).map((input) => {
      validateNotEmptyString(input.value);
      validateStringIsNumber(input.value);
      return Number(input.value);
    });
    return numbers;
  },
  getBonusNumber() {
    const input = document.getElementById(DOM_ID.BONUS_NUMBER).value;
    validateNotEmptyString(input);
    validateStringIsNumber(input);
    return Number(input);
  },
  show() {
    document.getElementById(DOM_ID.WINNING_SECTION).classList.remove(DOM_CLASS.HIDDEN);
  },
  hide() {
    document.getElementById(DOM_ID.WINNING_SECTION).classList.add(DOM_CLASS.HIDDEN);
  },
  reset() {
    document.querySelectorAll(`.${DOM_CLASS.WINNING_NUMBER}`).forEach((input) => {
      input.value = "";
    });
    document.getElementById(DOM_ID.BONUS_NUMBER).value = "";
    this.hide();
  },
  bindResultClick(handler) {
    document.getElementById(DOM_ID.RESULT_BTN).addEventListener("click", handler);
  }
};
const lottoState = {
  money: 0,
  lottos: []
};
MoneyForm.bindSubmit(() => {
  try {
    const moneyString = MoneyForm.getMoneyString();
    const { money, lottos } = LottoFacade.purchaseLottos(moneyString);
    lottoState.money = money;
    lottoState.lottos = lottos;
    LottoList.render(lottoState.lottos);
    LottoList.show();
    WinningForm.show();
  } catch (error) {
    alert(error.message);
  }
});
WinningForm.bindResultClick(() => {
  try {
    const winningNumbers = WinningForm.getWinningNumbers();
    const bonusNumber = WinningForm.getBonusNumber();
    LottoFacade.validateWinningNumbers(winningNumbers);
    LottoFacade.validateBonusNumber(bonusNumber);
    const { allRankCount, rate } = LottoFacade.calculateResult(
      lottoState.lottos,
      winningNumbers,
      bonusNumber,
      lottoState.money
    );
    ResultModal.renderResult(allRankCount, rate);
    ResultModal.show();
  } catch (error) {
    alert(error.message);
  }
});
ResultModal.bindClose(() => {
  ResultModal.close();
});
ResultModal.bindRestart(() => {
  ResultModal.reset();
  LottoList.reset();
  WinningForm.reset();
  MoneyForm.reset();
  lottoState.lottos = [];
  lottoState.money = 0;
});
