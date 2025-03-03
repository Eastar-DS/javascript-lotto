import { ERROR } from "../view/message.js";
import { throwError } from "../utils/throwError.js";
import { isEmpty, isNumber, isRange } from "../utils/validation.js";

export const PRICE = Object.freeze({
  UNIT: 1000,
  MIN: 1000,
  MAX: 100000,
});

class Price {
  #price;

  constructor(price) {
    this.#price = price;
    this.#validate(this.#price);
  }

  #validate(price) {
    isEmpty(price);
    isNumber(price);
    isRange({ min: PRICE.MIN, max: PRICE.MAX }, price);
    this.#checkThousandUnit(price);
  }

  #checkThousandUnit(price) {
    if (price % PRICE.UNIT !== 0) {
      throwError(ERROR.UNIT);
    }
  }

  getPrice() {
    return this.#price;
  }
}

export { Price };
