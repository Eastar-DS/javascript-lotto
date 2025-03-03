import { createElement } from "../../../utils/dom/createElement.js";

export const LottoTicketItem = ({ lottoNumbers }) => {
  const $lottoTicketItem = createElement("li", {
    className: "lotto-ticket-item",
  });

  $lottoTicketItem.append(
    createElement("i", {
      textContent: "🎟",
    })
  );

  $lottoTicketItem.append(
    createElement("span", {
      className: "lotto-numbers",
      textContent: lottoNumbers.join(", "),
    })
  );

  return $lottoTicketItem;
};
