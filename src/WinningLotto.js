import Lotto from "./Lotto";

class WinningLotto {
  #lotto;
  #bonusNumber;

  constructor(winningNumbers, bonusNumber) {
    this.#lotto = new Lotto(winningNumbers);
    if (bonusNumber <= 0) {
      throw new Error("[ERROR]");
    }
    if (bonusNumber < 1 || bonusNumber > 45) {
      throw new Error("[ERROR]");
    }
    if (this.#lotto.getNumbers().includes(bonusNumber)) {
      throw new Error("[ERROR]");
    }
    this.#bonusNumber = bonusNumber;
    // this.#numbers = numbers.sort((a, b) => a - b);
  }
}

export default WinningLotto;
