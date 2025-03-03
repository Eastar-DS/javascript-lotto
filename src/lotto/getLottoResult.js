import { getRevenueRate } from "../utils/math.js";
import calculatePrizeResult from "./calculatePrizeResult.js";
import getTotalPrizeMoney from "./getTotalPrizeMoney.js";

const getLottoResult = (
  lottoNumbers,
  winningNumbers,
  bonusNumber,
  lottoPrice
) => {
  const prizeResult = calculatePrizeResult(
    lottoNumbers,
    winningNumbers,
    bonusNumber
  );
  const totalPrizeMoney = getTotalPrizeMoney(prizeResult);
  const revenueRate = getRevenueRate(totalPrizeMoney, lottoPrice);

  return { prizeResult, revenueRate };
};

export default getLottoResult;
