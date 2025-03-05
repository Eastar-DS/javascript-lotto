import { createDOMElement } from "../../util/createDOMElement.js";

export const createCloseButton = () => {
  return createDOMElement({
    tag: "div",
    class: "modal_close_button_wrapper",
    children: [
      createDOMElement({
        tag: "button",
        id: "modalCloseButton",
        class: "modal_close_button",
        type: "button",
        children: [
          createDOMElement({
            tag: "img",
            src: "icon/close.svg",
            alt: "Close",
          }),
        ],
      }),
    ],
  });
};
