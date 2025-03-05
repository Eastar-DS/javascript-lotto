import { ERROR_MESSAGE } from "../constant/message.js";
import { LOTTO_RULE } from "../constant/rule.js";
import {
  isDuplicated,
  isIncludesInArray,
  isInRange,
  isInteger,
  isLessThanMin,
  isMultipleOfUnit,
  isNumber,
  isOneOf,
  isValidArrayLength,
} from "../util/validations.js";
import { throwCustomError } from "../util/throwCustomError.js";
import { createValidator } from "./createValidator.js";
import { ERROR_TYPE } from "../constant/errorType.js";

const Validator = {
  validatePurchaseMoney(purchaseMoney) {
    this.validateNumber(purchaseMoney, ERROR_TYPE.purchaseMoney);

    if (isLessThanMin(purchaseMoney, 1))
      throwCustomError(ERROR_MESSAGE.purchaseMoney.notPositive);
    if (!isMultipleOfUnit(purchaseMoney, LOTTO_RULE.purchaseUnit))
      throwCustomError(ERROR_MESSAGE.purchaseMoney.notMultipleOfPurchaseUnit);
  },

  validateWinningNumbers(winningNumbers) {
    winningNumbers.forEach((winningNumber) => {
      this.validateNumber(winningNumber, ERROR_TYPE.winningNumbers);
      this.validateLottoNumberRange(winningNumber, ERROR_TYPE.winningNumbers);
    });

    if (isDuplicated(winningNumbers)) {
      throwCustomError(ERROR_MESSAGE.winningNumbers.notUnique);
    }

    if (!isValidArrayLength(winningNumbers, LOTTO_RULE.lottoNumber.count))
      throwCustomError(ERROR_MESSAGE.winningNumbers.notLottoNumberCount);
  },

  validateBonusNumber(winningNumbers, bonusNumber) {
    this.validateNumber(bonusNumber, ERROR_TYPE.bonusNumber);
    this.validateLottoNumberRange(bonusNumber, ERROR_TYPE.bonusNumber);

    if (isIncludesInArray(winningNumbers, bonusNumber))
      throwCustomError(ERROR_MESSAGE.bonusNumber.duplicateWithWinningNumber);
  },

  validateNumber(number, type) {
    createValidator(
      [
        [isNumber, ERROR_MESSAGE[type].notNumber],
        [isInteger, ERROR_MESSAGE[type].notInteger],
      ],
      number
    );
  },

  validateLottoNumberRange(lottoNumber, type) {
    createValidator(
      [
        [
          (num) =>
            isInRange(
              num,
              LOTTO_RULE.lottoNumber.min,
              LOTTO_RULE.lottoNumber.max
            ),
          ERROR_MESSAGE[type].notInRange,
        ],
      ],
      lottoNumber
    );
  },

  validateRestartRequest(input) {
    if (!isOneOf(input, ["y", "n", "Y", "N"]))
      throwCustomError(ERROR_MESSAGE.restartRequest.notYorN);
  },
};

export default Validator;
