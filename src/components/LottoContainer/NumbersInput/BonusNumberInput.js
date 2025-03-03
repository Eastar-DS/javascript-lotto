import { createElement } from "../../../utils/dom/createElement.js";

export const BonusNumberInput = () => {
  const $bonusNumberInput = createElement("input", {
    className: "bonus-number-input",
    type: "number",
  });

  return $bonusNumberInput;
};
