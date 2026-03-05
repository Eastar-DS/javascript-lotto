import { LOTTO } from "./constants";
import Lotto from "./Lotto";
import Utils from "./Utils";

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
