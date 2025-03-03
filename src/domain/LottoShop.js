import { getRandomNumber } from "../utils/random.js";
import { Lotto } from "./Lotto.js";
import { LottoNumber } from "./LottoNumber.js";

const LottoShop = {
  checkAndAddLottoNumbers: (store, number) => {
    if (store.has(number)) return;
    store.add(number);
  },

  issueLottoNumbers: () => {
    return new Lotto(
      [...Array(LottoNumber.CONSTRAINTS.MAX)]
        .map((_, i) => i + 1)
        .sort(() => Math.random() - 0.5)
        .slice(0, Lotto.CONSTRAINTS.COUNT)
    );
  },

  createLottos: (count) => {
    return Array.from({ length: count }, () => LottoShop.issueLottoNumbers());
  },
};

export default LottoShop;
