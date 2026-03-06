import { ERROR_MESSAGE, LOTTO } from "../constants.js";
import Utils from "../Utils.js";
import Validator from "../Validator.js";

const InputView = {
  async readMoney() {
    const input = await Utils.readLineAsync("> 구입금액을 입력해 주세요. ");
    Validator.validateNotEmptyString(input);
    Validator.validateStringIsNumber(input);

    const money = Number(input);

    Validator.validateNumberDivided(money, LOTTO.PRICE);
    Validator.validatePositiveNumber(money);

    return money;
  },

  async readWinningNumbers() {
    const input = await Utils.readLineAsync("> 당첨 번호를 입력해 주세요. ");
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
    Validator.validateNotDuplicated(numbers);

    Validator.validateArrayLength(numbers, LOTTO.COUNT);

    return numbers;
  },

  async readBonusNumber() {
    const input = await Utils.readLineAsync("> 보너스 번호를 입력해 주세요.");
    Validator.validateNotEmptyString(input);
    Validator.validateStringIsNumber(input);
    const bonusNumber = Number(input);

    Validator.validatePositiveNumber(bonusNumber);
    Validator.validateNumberLower(LOTTO.LOWER, bonusNumber);
    Validator.validateNumberUpper(LOTTO.UPPER, bonusNumber);

    return bonusNumber;
  },

  async readRestartCommand() {
    const restartCommand = await Utils.readLineAsync(
      "> 다시 시작하시겠습니까? (y/n) ",
    );
    if (
      !(
        restartCommand === "n" ||
        restartCommand === "N" ||
        restartCommand === "y" ||
        restartCommand === "Y"
      )
    ) {
      throw new Error(ERROR_MESSAGE.PREFIX);
    }
    return restartCommand;
  },
};

export default InputView;
