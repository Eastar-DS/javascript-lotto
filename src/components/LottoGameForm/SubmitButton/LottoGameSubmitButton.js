const $LottoGameSubmitButton = () => {
  return createElement("button", {
    type: "submit",
    class: "lotto-game-submit-button",
    textContent: "결과 확인하기",
    disabled: true,
  });
};

export default $LottoGameSubmitButton;
