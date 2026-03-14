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
document.getElementById("restart-btn");
const lottoState = {
  money: 0,
  lottos: []
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
    const allRankCount = ScoreBoard.makeAllRankCount(lottoState.lottos, winningLotto);
    const rate = ScoreBoard.getProfitRate(allRankCount, lottoState.money);
    renderResult(allRankCount, rate);
  } catch (error) {
    alert(error.message);
  }
});
modalClose.addEventListener("click", () => {
  modalOverlay.classList.add("hidden");
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
