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

export default WinningLotto;
