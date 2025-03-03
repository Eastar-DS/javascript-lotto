import { LOTTO_RULE } from "../../../../../constants/lotto.js";
import $WinningNumberInput from "./Input/WinningNumberInput.js";

const $WinningNumberInputs = () => {
  const $winningNumberInputs = createElement("p", {
    class: "winning-number-input-box",
  });

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < LOTTO_RULE.LOTTO_LENGTH; i++) {
    fragment.appendChild($WinningNumberInput());
  }

  $winningNumberInputs.appendChild(fragment);
  return $winningNumberInputs;
};

export default $WinningNumberInputs;
