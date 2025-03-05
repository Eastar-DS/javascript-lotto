import { LOTTO_RULE } from "../../constant/rule.js";
import { createDOMElement } from "../../util/createDOMElement.js";

export const createWinningNumberInput = () => {
  return createDOMElement({
    tag: "div",
    class: "number_input_box",
    children: [
      createDOMElement({
        tag: "label",
        class: "body_text",
        textContent: "당첨 번호",
      }),
      createDOMElement({
        tag: "div",
        class: "number_input_wrapper",
        children: Array.from({ length: LOTTO_RULE.lottoNumber.count }).map(
          (_, index) =>
            createDOMElement({
              tag: "input",
              id: `winningNumberInput${index}`,
              class: "number_input",
              type: "number",
            })
        ),
      }),
    ],
  });
};
