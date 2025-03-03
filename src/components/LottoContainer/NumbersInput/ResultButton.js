import { createElement } from "../../../utils/dom/createElement.js";

export const ResultButton = () => {
  const resultButton = createElement("button", {
    className: "result-button",
    type: "submit",
    textContent: "결과 확인하기",
    disabled: true,
  });

  return resultButton;
};
