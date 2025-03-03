import $WinningNumberLabel from "./label/WinningNumberLabel.js";
import $WinningNumberInputs from "./Inputs/WinningNumberInputs.js";

const $WinningNumberInputBox = () => {
  const $winningNumberInputBox = createElement("div", {
    class: "lotto-game-input-box",
  });

  $winningNumberInputBox.appendChild(
    createElementsFragment([$WinningNumberLabel(), $WinningNumberInputs()])
  );

  return $winningNumberInputBox;
};

export default $WinningNumberInputBox;
