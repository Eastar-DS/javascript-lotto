import { createElement } from "../../../utils/dom/createElement.js";
import { resetApp } from "../../../controller/WebController.js";

export const RetryButton = () => {
  const retryButton = createElement("button", {
    className: "modal-retry-button",
    innerText: "다시 시작하기",
  });

  retryButton.addEventListener("click", resetApp);

  return retryButton;
};
