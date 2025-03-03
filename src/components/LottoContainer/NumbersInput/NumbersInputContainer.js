import { InputGuideText } from "./InputGuideText.js";
import { InputContainer } from "./InputContainer.js";
import { ResultButton } from "./ResultButton.js";
import { $, $$ } from "../../../utils/dom/selectors.js";

export const NumbersInputContainer = () => {
  const $numbersInputContainer = $(".numbers-input-container");

  const resultButton = ResultButton();

  const handleInputChange = (event) => {
    event.preventDefault();
    const inputs = $$("input", $numbersInputContainer);
    const allFilled = Array.from(inputs).every(
      (input) => input.value.trim() !== ""
    );

    resultButton.disabled = !allFilled;
  };

  $numbersInputContainer.append(
    InputGuideText("지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요."),
    InputContainer(),
    resultButton
  );

  $numbersInputContainer.addEventListener("input", handleInputChange);

  return $numbersInputContainer;
};
