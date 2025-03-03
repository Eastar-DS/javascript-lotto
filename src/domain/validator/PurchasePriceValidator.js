import validationUtils from "../../util/validationUtil.js";

const PURCHASE_PRICE_RANGE = {
  MIN: 1_000,
  MAX: 100_000,
};

const PURCHASE_PRICE = {
  IS_NUMBER_RANGE_OVER: `[ERROR] ${PURCHASE_PRICE_RANGE.MIN.toLocaleString()} 이상 ${PURCHASE_PRICE_RANGE.MAX.toLocaleString()} 이하의 숫자를 입력해야합니다.`,
  IS_NOT_MULTIPLE: `[ERROR] ${PURCHASE_PRICE_RANGE.MIN} 단위로 나누어 떨어지는 숫자여야합니다.`,
};

export default class PurchasePriceValidator {
  static validatePurchasePrice(money) {
    this.#isNotMultiple(money);
    this.#isNumberRangeOver(money);
  }

  static #isNotMultiple(money) {
    if (money % PURCHASE_PRICE_RANGE.MIN !== 0)
      throw new Error(PURCHASE_PRICE.IS_NOT_MULTIPLE);
  }

  static #isNumberRangeOver(money) {
    if (
      validationUtils.isNumberRangeOver(
        money,
        PURCHASE_PRICE_RANGE.MIN,
        PURCHASE_PRICE_RANGE.MAX
      )
    )
      throw new Error(PURCHASE_PRICE.IS_NUMBER_RANGE_OVER);
  }
}
