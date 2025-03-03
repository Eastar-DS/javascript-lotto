import { createElement } from "../../../utils/dom/createElement.js";

export const WinningNumberInput = () => {
  const winningNumberInput = createElement("input", {
    className: "winning-number-input",
    type: "number",
  });

  return winningNumberInput;
};
