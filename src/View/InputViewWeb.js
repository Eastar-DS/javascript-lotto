import { validateNotEmptyString, validateStringIsNumber } from "../Validator";

const InputViewWeb = {
  getMoney() {
    const input = document.getElementById("money-input").value;
    validateNotEmptyString(input);
    validateStringIsNumber(input);

    return Number(input);
  },

  getWinningNumbers() {
    const inputs = document.querySelectorAll(".winning-number");
    const numbers = Array.from(inputs).map((input) => {
      validateNotEmptyString(input.value);
      validateStringIsNumber(input.value);
      return Number(input.value);
    });

    return numbers;
  },

  getBonusNumber() {
    const input = document.getElementById("bonus-number").value;
    validateNotEmptyString(input);
    validateStringIsNumber(input);

    return Number(input);
  },
};

export default InputViewWeb;
