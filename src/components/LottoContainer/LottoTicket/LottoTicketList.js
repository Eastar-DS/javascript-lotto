import { LottoTicketItem } from "./LottoTicketItem.js";
import { $ } from "../../../utils/dom/selectors.js";

export const LottoTicketList = (lottoNumbersData) => {
  const $lottoTicketList = $(".lotto-ticket-list");

  lottoNumbersData.forEach((lottoNumbers) => {
    $lottoTicketList.append(LottoTicketItem({ lottoNumbers }));
  });

  return $lottoTicketList;
};
