import { COMMAND, ERROR_MESSAGE, INPUT_MESSAGE, LOTTO } from "../constants.js";
import Utils from "../Utils.js";
import {
  validateNotEmptyString,
  validateStringIsNumber,
} from "../Validator.js";

const InputView = {
  async readMoney() {
    const input = await Utils.readLineAsync(INPUT_MESSAGE.MONEY);
    validateNotEmptyString(input);
    validateStringIsNumber(input);

    const money = Number(input);

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

    return numbers;
  },

  async readBonusNumber() {
    const input = await Utils.readLineAsync(INPUT_MESSAGE.BONUS_NUMBER);
    validateNotEmptyString(input);
    validateStringIsNumber(input);
    const bonusNumber = Number(input);

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
