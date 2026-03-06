import { ERROR_MESSAGE, LOTTO } from "./constants.js";
import Validator from "./Validator.js";

class Lotto {
  #numbers;

  constructor(numbers) {
    numbers.forEach((number) => {
      Validator.validatePositiveNumber(number);
      Validator.validateNumberLower(LOTTO.LOWER, number);
      Validator.validateNumberUpper(LOTTO.UPPER, number);
    });

    if (numbers.length !== new Set(numbers).size) {
      throw new Error(ERROR_MESSAGE.PREFIX);
    }
    if (numbers.length !== 6) {
      throw new Error(ERROR_MESSAGE.PREFIX);
    }
    this.#numbers = numbers.sort((a, b) => a - b);
  }

  getNumbers() {
    return this.#numbers;
  }
}

export default Lotto;
