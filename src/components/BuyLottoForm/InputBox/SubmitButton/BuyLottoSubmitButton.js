const $BuyLottoSubmitButton = () => {
  return createElement("button", {
    type: "submit",
    class: "buy-lotto-submit-button",
    disabled: true,
    textContent: "구입",
  });
};

export default $BuyLottoSubmitButton;
