import { PRIZE } from "../constant/prize.js";
import { MATCH_TO_RANK_TABLE, RANK_INFO_TABLE } from "../constant/rank.js";

class LottoCalculator {
  #winningNumbers;
  #bonusNumber;
  #prize;

  constructor(winningNumbers, bonusNumber) {
    this.#winningNumbers = winningNumbers;
    this.#bonusNumber = bonusNumber;
    this.#prize = new Map([
      [PRIZE.fifth, []],
      [PRIZE.forth, []],
      [PRIZE.third, []],
      [PRIZE.second, []],
      [PRIZE.first, []],
    ]);
  }

  calculateResult(lottos, purchaseMoney) {
    this.calculatePrize(lottos);
    const totalPrice = this.calculateTotalPrice();
    const profit = this.calculateProfit(totalPrice, purchaseMoney);

    return { prize: this.#prize, profit: profit };
  }

  calculatePrize(lottos) {
    lottos.forEach((lotto) => {
      this.#calculateLottoPrize(lotto);
    });
  }

  #calculateLottoPrize(lotto) {
    const matchCount = lotto.countNumbersMatch(this.#winningNumbers);
    const isMatchBonus = lotto.isMatch(this.#bonusNumber);

    const rank = this.#getRank(matchCount, isMatchBonus);

    if (rank) {
      this.#prize.get(rank).push(lotto);
    }
  }

  #getRank(matchCount, isMatchBonus) {
    if (matchCount < 3 || matchCount > 6) {
      return null;
    }

    const key = `${matchCount}_${isMatchBonus ? "bonus" : "noBonus"}`;

    return MATCH_TO_RANK_TABLE[key];
  }

  calculateTotalPrice() {
    return Array.from(this.#prize.entries()).reduce(
      (sum, [rank, rankLottos]) => {
        const info = RANK_INFO_TABLE[rank];
        return sum + info.price * rankLottos.length;
      },
      0
    );
  }

  calculateProfit(totalPrice, purchaseMoney) {
    return (totalPrice / purchaseMoney) * 100;
  }

  get prize() {
    return new Map(this.#prize);
  }
}

export default LottoCalculator;
