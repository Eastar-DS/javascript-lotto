import { LOTTO, ERROR_MESSAGE } from "./constants";
import Lotto from "./Lotto";
import Validator from "./Validator";

class WinningLotto {
  #lotto;
  #bonusNumber;

  constructor(winningNumbers, bonusNumber) {
    this.#lotto = new Lotto(winningNumbers);
    if (!Validator.validatePositiveNumber(bonusNumber)) {
      throw new Error(ERROR_MESSAGE.PREFIX);
    }
    if (
      !Validator.validateNumberLower(LOTTO.LOWER, bonusNumber) ||
      !Validator.validateNumberUpper(LOTTO.UPPER, bonusNumber)
    ) {
      throw new Error(ERROR_MESSAGE.PREFIX);
    }
    if (this.#lotto.getNumbers().includes(bonusNumber)) {
      throw new Error(ERROR_MESSAGE.PREFIX);
    }
    this.#bonusNumber = bonusNumber;
    // this.#numbers = numbers.sort((a, b) => a - b);
  }
}

export default WinningLotto;
