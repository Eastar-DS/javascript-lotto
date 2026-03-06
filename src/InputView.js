import { ERROR_MESSAGE, LOTTO } from "./constants.js";
import Utils from "./Utils.js";

const InputView = {
  async readMoney(inputMessage) {
    console.log(inputMessage);
    const input = await Utils.readLineAsync("");
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
};

export default InputView;
