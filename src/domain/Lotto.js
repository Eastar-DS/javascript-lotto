import { ERROR } from "../view/message.js";
import { throwError } from "../utils/throwError.js";
import { LottoNumber } from "./LottoNumber.js";

class Lotto {
  static CONSTRAINTS = Object.freeze({ COUNT: 6 });

  #numbers;

  constructor(numbers) {
    const lottoNumbers = numbers.map(LottoNumber.of);
    this.#numbers = this.#sortLottoNumber(lottoNumbers);
    this.#validate(this.#numbers);
  }

  #checkDuplicate(numbers) {
    const values = numbers.map((num) => num.getValue());
    if (new Set(values).size !== values.length) {
      throwError(ERROR.DUPLICATE);
    }
  }

  #checkLength(numbers) {
    if (numbers.length !== this.constructor.CONSTRAINTS.COUNT) {
      throwError(ERROR.LENGTH);
    }
  }

  #validate(numbers) {
    this.#checkDuplicate(numbers);
    this.#checkLength(numbers);
  }

  #sortLottoNumber(numbers) {
    return numbers.sort((a, b) => a.getValue() - b.getValue());
  }

  getLottoNumbers() {
    return this.#numbers.map((number) => number.getValue());
  }

  getIncludeSameNumbers(givenLottoNumber) {
    return this.getLottoNumbers().filter((number) =>
      givenLottoNumber.includes(number)
    ).length;
  }
}

export { Lotto };
