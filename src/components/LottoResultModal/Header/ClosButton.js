import { createElement } from "../../../utils/dom/createElement.js";
import { $ } from "../../../utils/dom/selectors.js";

export const CloseButton = () => {
  const closeButton = createElement("button", {
    className: "modal-close-button",
  });

  const closeImage = createElement("img", {
    src: "/public/close.png",
    alt: "모달 닫기 버튼",
  });

  closeButton.append(closeImage);

  closeButton.addEventListener("click", () => {
    const lottoResultModal = $(".lotto-result-modal");
    lottoResultModal.remove();
  });

  return closeButton;
};
