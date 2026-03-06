import { LOTTO, ERROR_MESSAGE } from "./constants.js";
import Lotto from "./Lotto.js";
import Validator from "./Validator.js";

class WinningLotto {
  #lotto;
  #bonusNumber;

  constructor(winningNumbers, bonusNumber) {
    this.#lotto = new Lotto(winningNumbers);

    if (this.#lotto.getNumbers().includes(bonusNumber)) {
      throw new Error(ERROR_MESSAGE.PREFIX);
    }
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

export default WinningLotto;
