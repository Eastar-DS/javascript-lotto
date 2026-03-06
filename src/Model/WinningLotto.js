import Lotto from "./Lotto.js";

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

export default WinningLotto;
