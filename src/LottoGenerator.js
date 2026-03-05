import Lotto from "./Lotto";

const LottoGenerator = {
  makeLottos(buyLottoCount) {
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
    return Array.from({ length: buyLottoCount }, (v, i) => lotto);
  },
};

export default LottoGenerator;
