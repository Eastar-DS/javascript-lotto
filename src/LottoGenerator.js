import { LOTTO } from "./constants.js";
import Lotto from "./Lotto.js";
import Utils from "./Utils.js";

const LottoGenerator = {
  calculateBuyLottoCount(money) {
    return money / LOTTO.PRICE;
  },

  makeLottos(buyLottoCount) {
    return Array.from(
      { length: buyLottoCount },
      (v, i) =>
        new Lotto(
          Utils.getRandomNumbers(LOTTO.LOWER, LOTTO.UPPER, LOTTO.COUNT),
        ),
    );
  },
};

export default LottoGenerator;
