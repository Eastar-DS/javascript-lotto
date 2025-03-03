import $LottoResultItem from "./Item/LottoResultItem.js";
import $LottoResultItemHeader from "./ItemHeader/LottoResultItemHeader.js";
import { LOTTO_PRIZE_MONEY } from "../../../../constants/lotto.js";

const $LottoResultList = (prizeResult) => {
  const $lottoResultList = createElement("ul", {
    class: "lotto-result-list",
  });

  const fragment = document.createDocumentFragment();
  fragment.appendChild($LottoResultItemHeader());

  Array.from(prizeResult).forEach(([matchKey, matchCount]) => {
    fragment.appendChild(
      $LottoResultItem(matchKey, LOTTO_PRIZE_MONEY.get(matchKey), matchCount)
    );
  });

  $lottoResultList.appendChild(fragment);

  return $lottoResultList;
};

export default $LottoResultList;
