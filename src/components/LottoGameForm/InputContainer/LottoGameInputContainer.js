import $WinningNumberInputBox from "./WinningNumber/WinningNumberInputBox.js";
import $BonusNumberInputBox from "./BonusNumber/BonusNumberInputBox.js";

const $LottoGameInputContainer = () => {
  const $lottoGameInputContainer = createElement("div", {
    class: "lotto-game-input-container",
  });

  $lottoGameInputContainer.appendChild(
    createElementsFragment([$WinningNumberInputBox(), $BonusNumberInputBox()])
  );

  return $lottoGameInputContainer;
};

export default $LottoGameInputContainer;
