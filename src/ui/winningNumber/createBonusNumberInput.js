import { createDOMElement } from "../../util/createDOMElement.js";

export const createBonusNumberInput = () => {
  return createDOMElement({
    tag: "div",
    class: "number_input_box",
    children: [
      createDOMElement({
        tag: "label",
        class: "body_text",
        textContent: "보너스 번호",
      }),
      createDOMElement({
        tag: "div",
        class: "number_input_wrapper",
        children: [
          createDOMElement({
            tag: "input",
            id: "bonusNumberInput",
            class: "number_input",
            type: "number",
          }),
        ],
      }),
    ],
  });
};
