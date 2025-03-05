import { createDOMElement } from "../../util/createDOMElement.js";

export const createResultButton = () => {
  return createDOMElement({
    tag: "div",
    class: "result_button_wrapper",
    children: [
      createDOMElement({
        tag: "button",
        class: "result_button",
        id: "resultButton",
        type: "submit",
        textContent: "결과 확인하기",
      }),
    ],
  });
};
