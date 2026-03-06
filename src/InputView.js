import { ERROR_MESSAGE, LOTTO } from "./constants.js";
import Utils from "./Utils.js";
import Validator from "./Validator.js";

const InputView = {
  async readMoney(inputMessage) {
    const input = await Utils.readLineAsync(inputMessage);
    if (input === "") {
      throw new Error(ERROR_MESSAGE.PREFIX);
    }
    if (isNaN(input)) {
      throw new Error(ERROR_MESSAGE.PREFIX);
    }

    const money = Number(input);
    if (money % LOTTO.PRICE !== 0) {
      throw new Error(ERROR_MESSAGE.PREFIX);
    }
    if (money <= 0) {
      throw new Error(ERROR_MESSAGE.PREFIX);
    }

    return money;
  },

  async readWinningNumbers(inputMessage) {
    const input = await Utils.readLineAsync(inputMessage);
    if (Validator.validateNotEmptyString(input)) {
      throw new Error(ERROR_MESSAGE.PREFIX);
    }
    const splitInput = input.split(",");
    splitInput.forEach((string) => {
      Validator.validateStringIsNumber(string);
    });

    const numbers = splitInput.map((string) => Number(string));
    numbers.forEach((number) => {
      Validator.validatePositiveNumber(number);
      Validator.validateNumberLower(LOTTO.LOWER, number);
      Validator.validateNumberUpper(LOTTO.UPPER, number);
    });

    if (numbers.length !== LOTTO.COUNT) {
      throw new Error(ERROR_MESSAGE.PREFIX);
    }

    return numbers;
  },
};

export default InputView;
