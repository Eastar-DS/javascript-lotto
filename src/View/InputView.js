import { COMMAND, ERROR_MESSAGE, INPUT_MESSAGE, LOTTO } from "../constants.js";
import Utils from "../Utils.js";
import {
  validateNotEmptyString,
  validateNumberDivided,
  validateNumberLower,
  validateNumberUpper,
  validatePositiveNumber,
  validateStringIsNumber,
} from "../Validator.js";

const InputView = {
  async readMoney() {
    const input = await Utils.readLineAsync(INPUT_MESSAGE.MONEY);
    validateNotEmptyString(input);
    validateStringIsNumber(input);

    const money = Number(input);

    validateNumberDivided(money, LOTTO.PRICE);
    validatePositiveNumber(money);

    return money;
  },

  async readWinningNumbers() {
    const input = await Utils.readLineAsync(INPUT_MESSAGE.WINNING_NUMBERS);
    validateNotEmptyString(input);

    const splitInput = input.split(",");
    splitInput.forEach((string) => {
      validateStringIsNumber(string);
    });

    const numbers = splitInput.map((string) => Number(string));
    numbers.forEach((number) => {
      validatePositiveNumber(number);
      validateNumberLower(LOTTO.LOWER, number);
      validateNumberUpper(LOTTO.UPPER, number);
    });
    validateNotDuplicated(numbers);

    validateArrayLength(numbers, LOTTO.COUNT);

    return numbers;
  },

  async readBonusNumber() {
    const input = await Utils.readLineAsync(INPUT_MESSAGE.BONUS_NUMBER);
    validateNotEmptyString(input);
    validateStringIsNumber(input);
    const bonusNumber = Number(input);

    validatePositiveNumber(bonusNumber);
    validateNumberLower(LOTTO.LOWER, bonusNumber);
    validateNumberUpper(LOTTO.UPPER, bonusNumber);

    return bonusNumber;
  },

  async readRestartCommand() {
    const restartCommand = await Utils.readLineAsync(INPUT_MESSAGE.COMMAND);
    if (
      !(
        COMMAND.YES.includes(restartCommand) ||
        COMMAND.NO.includes(restartCommand)
      )
    ) {
      throw new Error(ERROR_MESSAGE.PREFIX);
    }
    return restartCommand;
  },
};

export default InputView;
