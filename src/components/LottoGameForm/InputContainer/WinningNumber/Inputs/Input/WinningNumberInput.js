const $WinningNumberInput = () => {
  return createElement("input", {
    type: "text",
    inputMode: "numeric",
    minLength: "1",
    maxLength: "2",
    id: "winning-number",
    class: "lotto-game-input",
  });
};

export default $WinningNumberInput;
