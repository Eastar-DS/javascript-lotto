import $LottoRestartButton from "./RestartButton/LottoRestartButton.js";
import $LottoResultRevenueText from "./RevenueText/LottoResultRevenueText.js";

const $LottoResultModalFooter = (revenueRate) => {
  const $lottoResultModalFooter = createElement("div");

  $lottoResultModalFooter.appendChild(
    createElementsFragment([
      $LottoResultRevenueText(revenueRate),
      $LottoRestartButton(),
    ])
  );

  return $lottoResultModalFooter;
};

export default $LottoResultModalFooter;
