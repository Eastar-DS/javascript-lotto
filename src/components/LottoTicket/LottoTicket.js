import $LottoTicketCountText from "./CountText/LottoTicketCountText.js";
import $LottoTicketList from "./List/LottoTicketList.js";

const $LottoTicket = (lottoNumberSets) => {
  const $lottoTicketBox = createElement("div", {
    class: "lotto-ticket-box",
  });

  $lottoTicketBox.appendChild(
    createElementsFragment([
      $LottoTicketCountText(lottoNumberSets.length),
      $LottoTicketList(lottoNumberSets),
    ])
  );

  return $lottoTicketBox;
};

export default $LottoTicket;
