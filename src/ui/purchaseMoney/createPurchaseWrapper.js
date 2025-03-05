import { createDOMElement } from "../../util/createDOMElement.js";

export const createPurchaseWrapper = () => {
  const purchaseWrapper = createDOMElement({
    tag: "div",
    class: "purchase_wrapper",
    children: [
      createDOMElement({
        tag: "form",
        class: "purchase_input_wrapper",
        children: [
          createDOMElement({
            tag: "input",
            id: "purchaseInput",
            class: "purchase_input",
            type: "number",
            placeholder: "구입",
          }),
          createDOMElement({
            tag: "button",
            type: "submit",
            tabindex: "-1",
            id: "purchaseButton",
            class: "purchase_button",
            textContent: "구입",
          }),
        ],
      }),
    ],
  });

  return purchaseWrapper;
};
