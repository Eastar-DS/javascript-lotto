import { COMMAND, ERROR_MESSAGE, INPUT_MESSAGE, LOTTO } from "../constants.js";
import Utils from "../Utils.js";
import Validator from "../Validator.js";

const InputView = {
  async readMoney() {
    const input = await Utils.readLineAsync(INPUT_MESSAGE.MONEY);
    Validator.validateNotEmptyString(input);
    Validator.validateStringIsNumber(input);

    const money = Number(input);

    Validator.validateNumberDivided(money, LOTTO.PRICE);
    Validator.validatePositiveNumber(money);

    return money;
  },

  async readWinningNumbers() {
    const input = await Utils.readLineAsync(INPUT_MESSAGE.WINNING_NUMBERS);
    Validator.validateNotEmptyString(input)
    
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
    Validator.validateNotDuplicated(numbers);

    Validator.validateArrayLength(numbers, LOTTO.COUNT);

    return numbers;
  },

  async readBonusNumber() {
    const input = await Utils.readLineAsync(INPUT_MESSAGE.BONUS_NUMBER);
    Validator.validateNotEmptyString(input);
    Validator.validateStringIsNumber(input);
    const bonusNumber = Number(input);

    Validator.validatePositiveNumber(bonusNumber);
    Validator.validateNumberLower(LOTTO.LOWER, bonusNumber);
    Validator.validateNumberUpper(LOTTO.UPPER, bonusNumber);

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
