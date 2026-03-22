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
  PREFIX: "[ERROR]"
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
  FIFTH: { DISPLAY: "FIFTH", MATCH_COUNT: 3, PRICE: 5e3 }
};
function validateNotEmptyString(string) {
  if (string === "") {
    throw new Error(ERROR_MESSAGE.PREFIX);
  }
}
function validatePositiveNumber(number) {
  if (number <= 0) {
    throw new Error(ERROR_MESSAGE.PREFIX);
  }
}
function validateNumberUpper(upper, number) {
  if (number > upper) {
    throw new Error(ERROR_MESSAGE.PREFIX);
  }
}
function validateNumberLower(lower, number) {
  if (number < lower) {
    throw new Error(ERROR_MESSAGE.PREFIX);
  }
}
function validateStringIsNumber(string) {
  if (isNaN(string)) {
    throw new Error(ERROR_MESSAGE.PREFIX);
  }
}
function validateNumberDivided(number, divideNumber) {
  if (number % divideNumber !== 0) {
    throw new Error(ERROR_MESSAGE.PREFIX);
  }
}
function validateNotDuplicated(array) {
  if (array.length !== new Set(array).size) {
    throw new Error(ERROR_MESSAGE.PREFIX);
  }
}
function validateArrayLength(array, length) {
  if (array.length !== length) {
    throw new Error(ERROR_MESSAGE.PREFIX);
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
      throw new Error(ERROR_MESSAGE.PREFIX);
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
  },
  makeAllRankCount(lottos, winningLotto) {
    const allRankCount = {
      FIRST: 0,
      SECOND: 0,
      THIRD: 0,
      FOURTH: 0,
      FIFTH: 0
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
const InputViewWeb = {
  getMoney() {
    const input = document.getElementById("money-input").value;
    validateNotEmptyString(input);
    validateStringIsNumber(input);
    return Number(input);
  },
  getWinningNumbers() {
    const inputs = document.querySelectorAll(".winning-number");
    const numbers = Array.from(inputs).map((input) => {
      validateNotEmptyString(input.value);
      validateStringIsNumber(input.value);
      return Number(input.value);
    });
    return numbers;
  },
  getBonusNumber() {
    const input = document.getElementById("bonus-number").value;
    validateNotEmptyString(input);
    validateStringIsNumber(input);
    return Number(input);
  }
};
const OutputViewWeb = {
  renderLottos(lottos) {
    const buyCount = document.getElementById("buy-count");
    const lottoList = document.getElementById("lotto-list");
    buyCount.textContent = `총 ${lottos.length}개를 구매하였습니다.`;
    while (lottoList.firstChild) {
      lottoList.removeChild(lottoList.firstChild);
    }
    lottos.forEach((lotto) => {
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
    document.getElementById("lotto-section").classList.remove("hidden");
    document.getElementById("winning-section").classList.remove("hidden");
  },
  renderResult(allRankCount, rate) {
    document.getElementById("rank-5th").textContent = `${allRankCount.FIFTH}개`;
    document.getElementById("rank-4th").textContent = `${allRankCount.FOURTH}개`;
    document.getElementById("rank-3rd").textContent = `${allRankCount.THIRD}개`;
    document.getElementById("rank-2nd").textContent = `${allRankCount.SECOND}개`;
    document.getElementById("rank-1st").textContent = `${allRankCount.FIRST}개`;
    document.getElementById("profit-rate-value").textContent = rate;
    document.getElementById("modal-overlay").classList.remove("hidden");
  },
  closeModal() {
    document.getElementById("modal-overlay").classList.add("hidden");
  },
  resetAll() {
    document.getElementById("modal-overlay").classList.add("hidden");
    document.getElementById("lotto-section").classList.add("hidden");
    document.getElementById("winning-section").classList.add("hidden");
    document.getElementById("money-input").value = "";
    document.querySelectorAll(".winning-number").forEach((input) => {
      input.value = "";
    });
    document.getElementById("bonus-number").value = "";
  }
};
const moneyForm = document.getElementById("money-form");
const resultBtn = document.getElementById("result-btn");
const modalClose = document.getElementById("modal-close");
const restartBtn = document.getElementById("restart-btn");
const lottoState = {
  money: 0,
  lottos: []
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
      winningLotto
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
