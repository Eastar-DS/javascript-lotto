import { WinningNumberInputContainer } from "./WinningNumberInputContainer.js";
import { BonusNumberInputContainer } from "./BonusNumberInputContainer.js";
import { $ } from "../../../utils/dom/selectors.js";

export const InputContainer = () => {
  const $inputContainer = $(".input-container");

  $inputContainer.append(
    WinningNumberInputContainer(),
    BonusNumberInputContainer()
  );

  return $inputContainer;
};
