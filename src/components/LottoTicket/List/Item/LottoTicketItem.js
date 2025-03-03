const $LottoTicketItem = (lottoNumbers) => {
  const $lottoTicketItem = createElement("li", {
    class: "lotto-ticket-item",
  });

  $lottoTicketItem.appendChild(
    createElementsFragment([
      createElement("span", {
        class: "lotto-ticket-icon",
        textContent: "🎟️",
      }),
      createElement("span", {
        textContent: lottoNumbers.join(", "),
      }),
    ])
  );

  return $lottoTicketItem;
};

export default $LottoTicketItem;
