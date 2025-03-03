import $LottoResultModalBody from "./Body/LottoResultModalBody.js";
import $LottoResultModalHeader from "./Header/LottoResultModalHeader.js";
import $LottoResultFooter from "./Footer/LottoResultModalFooter.js";
import initWebLottoGame from "../../lotto/initWebLottoGame.js";
import { setContext } from "../../lotto/lottoGameContext.js";
import { LOTTO_CONTEXT } from "../../constants/lotto.js";

const closeModal = () => {
  const $modalBackground = document.querySelector(".modal-background");

  if (!$modalBackground) {
    throw new Error("모달이 존재하지 않습니다.");
  }

  $modalBackground.remove();
};

const handleLottoResultModalClick = (event) => {
  if (event.target.closest(".modal-close-button")) {
    closeModal();
    return;
  }

  if (event.target.closest(".lotto-restart-button")) {
    closeModal();
    initWebLottoGame();
    setContext(LOTTO_CONTEXT.isPurchased, (prev) => !prev);
    return;
  }
};

const $LottoResultModal = (prizeResult, revenueRate) => {
  const $modalBackGround = createElement("div", {
    class: "modal-background",
  });
  const $modalBox = createElement("div", {
    class: "modal-box",
  });

  $modalBox.appendChild(
    createElementsFragment([
      $LottoResultModalHeader(),
      $LottoResultModalBody(prizeResult),
      $LottoResultFooter(revenueRate),
    ])
  );

  $modalBackGround.appendChild($modalBox);

  const appContainer = document.getElementById("app");

  if (!appContainer) {
    throw new Error("app이 없습니다.");
  }

  appContainer.appendChild($modalBackGround);

  $modalBackGround.addEventListener("click", handleLottoResultModalClick);
};

export default $LottoResultModal;
