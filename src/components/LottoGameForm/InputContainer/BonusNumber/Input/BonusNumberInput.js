const $BonusNumberInput = () => {
  return createElement("input", {
    type: "text",
    inputMode: "numeric",
    minLength: "1",
    maxLength: "2",
    id: "bonus-number",
    class: "lotto-game-input",
  });
};

export default $BonusNumberInput;
