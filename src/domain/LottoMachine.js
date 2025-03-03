class LottoMachine {
  #issuedLottoNumbers;
  #matchedLottoStatus;

  static CONSTRAINTS = Object.freeze({
    MIN_WINNING_COUNT: 3,
    BONUS_MATCH_COUNT: 5,
  });

  static LOTTO_STATUS = Object.freeze([
    { RANK: 1, COUNT: 6, REWORD: 2_000_000_000, IS_BONUS: false },
    { RANK: 2, COUNT: 5, REWORD: 30_000_000, IS_BONUS: true },
    { RANK: 3, COUNT: 5, REWORD: 1_500_000, IS_BONUS: false },
    { RANK: 4, COUNT: 4, REWORD: 50_000, IS_BONUS: false },
    { RANK: 5, COUNT: 3, REWORD: 5000, IS_BONUS: false },
  ]);

  constructor(issuedLottoNumbers) {
    this.#issuedLottoNumbers = issuedLottoNumbers;
    this.#matchedLottoStatus = [];
  }

  updateStatus(callback) {
    const currentStatus = this.constructor.LOTTO_STATUS.find(callback);
    this.#matchedLottoStatus.push(currentStatus);
  }

  getMatchingNumbers(enteredLottoNumbers) {
    return this.#issuedLottoNumbers.map((lotto) => {
      return lotto.getIncludeSameNumbers(enteredLottoNumbers);
    });
  }

  getHasBonusNumbers(bonusLottoNumbers) {
    return this.#issuedLottoNumbers.map((lotto) => {
      return lotto.getIncludeSameNumbers([bonusLottoNumbers]) > 0;
    });
  }

  #updateFinalStatus(matchingNumbers, isBonusArray) {
    matchingNumbers.forEach((matchingNumber, index) => {
      if (matchingNumber < this.constructor.CONSTRAINTS.MIN_WINNING_COUNT)
        return;

      if (
        matchingNumber === this.constructor.CONSTRAINTS.BONUS_MATCH_COUNT &&
        isBonusArray[index]
      ) {
        this.updateStatus(
          (status) =>
            status.COUNT === this.constructor.CONSTRAINTS.BONUS_MATCH_COUNT &&
            status.IS_BONUS
        );
        return;
      }

      this.updateStatus(
        (status) => status.COUNT === matchingNumber && !status.IS_BONUS
      );
    });
  }

  getMatchedLottoStatus(enteredLottoNumbers, bonusLottoNumber) {
    const matchingNumbers = this.getMatchingNumbers(enteredLottoNumbers);
    const isBonusArray = this.getHasBonusNumbers(bonusLottoNumber);

    this.#updateFinalStatus(matchingNumbers, isBonusArray);

    return this.#matchedLottoStatus;
  }
}

export { LottoMachine };
