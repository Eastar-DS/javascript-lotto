import { WinningNumberInput } from "./WinningNumberInput.js";
import { WinningNumberLabel } from "./WinningNumberLabel.js";
import { SETTINGS } from "../../../constants/index.js";
import { $ } from "../../../utils/dom/selectors.js";

export const WinningNumberInputContainer = () => {
  const winningNumberInputContainer = $(".winning-number-input-container");

  winningNumberInputContainer.append(WinningNumberLabel());

  const winningNumberWrapper = $(".winning-number-wrapper");

  for (let i = 0; i < SETTINGS.numberCount; i++) {
    winningNumberWrapper.appendChild(WinningNumberInput());
  }

  winningNumberInputContainer.append(winningNumberWrapper);

  return winningNumberInputContainer;
};
