const $BuyLottoInput = () => {
  return createElement("input", {
    type: "text",
    id: "buy-lotto",
    class: "buy-lotto-input",
    placeholder: "구입 금액(최소 금액 1,000원, 최대 금액 100,000원)",
    minLength: "4",
    maxLength: "6",
    inputMode: "numeric",
    autofocus: true,
  });
};

export default $BuyLottoInput;
