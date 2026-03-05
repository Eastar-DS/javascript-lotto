import Lotto from "./Lotto";

class WinningLotto {
  #lotto;
  #bonusNumber;

  constructor(winningNumbers, bonusNumber) {
    this.#lotto = new Lotto(winningNumbers);
    this.#bonusNumber = bonusNumber;
    // this.#numbers = numbers.sort((a, b) => a - b);
  }
}

export default WinningLotto;
