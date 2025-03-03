import $LottoTicketItem from "./Item/LottoTicketItem.js";

const $LottoTicketList = (lottoNumberSets) => {
  const $lottoTicketList = createElement("ul", {
    class: "lotto-ticket-list",
  });

  const fragment = document.createDocumentFragment();
  lottoNumberSets.forEach((lottoNumbers) => {
    fragment.appendChild($LottoTicketItem(lottoNumbers));
  });

  $lottoTicketList.appendChild(fragment);

  return $lottoTicketList;
};

export default $LottoTicketList;
