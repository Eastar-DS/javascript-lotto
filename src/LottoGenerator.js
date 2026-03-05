import Lotto from "./Lotto";

const LottoGenerator = {
  calculateBuyLottoCount(money) {
    return money / 1_000;
  },

  makeLottos(buyLottoCount) {
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
    return Array.from({ length: buyLottoCount }, (v, i) => lotto);
  },
};

export default LottoGenerator;
