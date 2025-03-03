import $BonusNumberInput from "./Input/BonusNumberInput.js";
import $BonusNumberLabel from "./Label/BonusNumberLabel.js";

const $BonusNumberInputBox = () => {
  const $bonusNumberInputBox = createElement("div", {
    class: "lotto-game-input-box",
  });

  $bonusNumberInputBox.appendChild(
    createElementsFragment([$BonusNumberLabel(), $BonusNumberInput()])
  );

  return $bonusNumberInputBox;
};

export default $BonusNumberInputBox;
