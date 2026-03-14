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
  calculateBuyLottoCount(money2) {
    return money2 / LOTTO.PRICE;
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
const moneyForm = document.getElementById("money-form");
const moneyInput = document.getElementById("money-input");
const lottoSection = document.getElementById("lotto-section");
const buyCount = document.getElementById("buy-count");
const lottoList = document.getElementById("lotto-list");
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
    const buyLottoCount = money / LOTTO.PRICE;
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
    numbers.className = "body-text";
    numbers.textContent = lotto.getNumbers().join(", ");
    li.appendChild(icon);
    li.appendChild(numbers);
    lottoList.appendChild(li);
  });
  lottoSection.classList.remove("hidden");
};
