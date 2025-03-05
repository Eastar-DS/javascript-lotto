import { LOTTO_RULE } from "../../constant/rule.js";
import Validator from "../../Validator/validator.js";
import WebInputHandler from "./WebInputHandler.js";

const WebInput = {
  getPurchaseMoney() {
    return WebInputHandler({
      elementIds: "purchaseInput",
      parser: Number,
      validator: (input) => Validator.validatePurchaseMoney(input),
    });
  },
  getWinningNumbers() {
    return WebInputHandler({
      elementIds: Array.from({ length: LOTTO_RULE.lottoNumber.count }).map(
        (_, index) => `winningNumberInput${index}`
      ),
      parser: Number,
      validator: (input) => Validator.validateWinningNumbers(input),
    });
  },
  getBonusNumber(winningNumbers) {
    return WebInputHandler({
      elementIds: "bonusNumberInput",
      parser: Number,
      validator: (bonusNumber) =>
        Validator.validateBonusNumber(winningNumbers, bonusNumber),
    });
  },
};

export default WebInput;
