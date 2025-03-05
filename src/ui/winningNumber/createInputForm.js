import { createDOMElement } from "../../util/createDOMElement.js";
import { createResultButton } from "./createResultButton.js";
import { createBonusNumberInput } from "./createBonusNumberInput.js";
import { createWinningNumberInput } from "./createWinningNumberInput.js";

export const createInputForm = () => {
  return createDOMElement({
    tag: "form",
    class: "number_input_form",
    children: [
      createDOMElement({
        tag: "h3",
        class: "body_text",
        textContent: "지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.",
      }),
      createDOMElement({
        tag: "div",
        class: "number_input_container",
        children: [createWinningNumberInput(), createBonusNumberInput()],
      }),
      createResultButton(),
    ],
  });
};
