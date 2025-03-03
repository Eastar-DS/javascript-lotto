import $LottoResultList from "./list/LottoResultList.js";

const $LottoResultModalBody = (prizeResult) => {
  const $lottoResultModalBody = createElement("div", {
    class: "modal-body",
  });

  $lottoResultModalBody.appendChild($LottoResultList(prizeResult));

  return $lottoResultModalBody;
};

export default $LottoResultModalBody;
