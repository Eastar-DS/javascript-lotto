import { createElement } from "../../../utils/dom/createElement.js";

export const WinningNumberLabel = () => {
  const winningNumberLabel = createElement("label", {
    for: "winning-number-input",
    textContent: "당첨 번호",
  });

  return winningNumberLabel;
};
