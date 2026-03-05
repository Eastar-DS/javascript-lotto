import { ERROR_MESSAGE, LOTTO } from "./constants";
import Validator from "./Validator";

class Lotto {
  #numbers;

  constructor(numbers) {
    if (numbers.some((number) => !Validator.validatePositiveNumber(number))) {
      throw new Error(ERROR_MESSAGE.PREFIX);
    }
    if (
      numbers.some(
        (number) =>
          !Validator.validateNumberLower(LOTTO.LOWER, number) ||
          !Validator.validateNumberUpper(LOTTO.UPPER, number),
      )
    ) {
      throw new Error(ERROR_MESSAGE.PREFIX);
    }
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
