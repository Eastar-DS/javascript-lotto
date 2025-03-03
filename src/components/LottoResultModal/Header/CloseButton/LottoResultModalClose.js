import $CloseIcon from "../../../CloseIcon/index.js";

const $LottoResultModalClose = () => {
  const $modalCloseBox = createElement("p", {
    class: "modal-close-box",
  });
  const $modalCloseButton = createElement("button", {
    class: "modal-close-button",
    type: "button",
  });

  $modalCloseButton.appendChild($CloseIcon("black"));
  $modalCloseBox.appendChild($modalCloseButton);

  return $modalCloseBox;
};

export default $LottoResultModalClose;
