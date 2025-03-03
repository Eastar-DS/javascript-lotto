import { LottoTicketList } from "./LottoTicketList.js";
import { LottoCountText } from "./LottoCountText.js";
import { $ } from "../../../utils/dom/selectors.js";

export const LottoTicketContainer = (lottoNumbersData) => {
  const $lottoTicketContainer = $(".lotto-ticket-container");

  $lottoTicketContainer.append(
    LottoCountText(lottoNumbersData.length),
    LottoTicketList(lottoNumbersData)
  );

  return $lottoTicketContainer;
};
