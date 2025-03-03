import { createElement } from "../../../utils/dom/createElement.js";

export const BonusNumberLabel = () => {
  const $bonusNumberLabel = createElement("label", {
    for: "bonus-number-input",
    textContent: "보너스 번호",
  });

  return $bonusNumberLabel;
};
