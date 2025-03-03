import $LottoResultModalClose from "./CloseButton/LottoResultModalClose.js";
import $LottoResultModalTitle from "./Title/LottoResultModalTitle.js";

const $LottoResultModalHeader = () => {
  const $lottoResultModalHeader = createElement("div", {
    class: "modal-header",
  });

  $lottoResultModalHeader.appendChild(
    createElementsFragment([$LottoResultModalClose(), $LottoResultModalTitle()])
  );

  return $lottoResultModalHeader;
};

export default $LottoResultModalHeader;
