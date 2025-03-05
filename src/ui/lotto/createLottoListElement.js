import { createDOMElement } from "../../util/createDOMElement.js";

export const createLottoListElement = (lotto) => {
  return createDOMElement({
    tag: "div",
    class: "lotto_row",
    children: [
      createDOMElement({
        tag: "div",
        class: "lotto_icon",
        textContent: "🎟️",
      }),
      createDOMElement({
        tag: "p",
        class: "body_text",
        textContent: lotto.numbers.join(", "),
      }),
    ],
  });
};
