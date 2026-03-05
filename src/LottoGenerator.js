import Lotto from "./Lotto";
import Utils from "./Utils";

const LottoGenerator = {
  calculateBuyLottoCount(money) {
    return money / 1_000;
  },

  makeLottos(buyLottoCount) {
    return Array.from(
      { length: buyLottoCount },
      (v, i) => new Lotto(Utils.getRandomNumbers(1, 45, 6)),
    );
  },
};

export default LottoGenerator;
