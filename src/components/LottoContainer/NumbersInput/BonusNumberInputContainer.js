import { BonusNumberInput } from "./BonusNumberInput.js";
import { BonusNumberLabel } from "./BonusNumberLabel.js";
import { $ } from "../../../utils/dom/selectors.js";

export const BonusNumberInputContainer = () => {
  const $bonusNumberInputContainer = $(".bonus-number-input-container");

  $bonusNumberInputContainer.append(BonusNumberLabel(), BonusNumberInput());

  return $bonusNumberInputContainer;
};
